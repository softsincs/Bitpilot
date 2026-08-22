import time
from typing import Dict, List, Tuple
from fastapi import Request, HTTPException, status
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse
from app.core.config import settings

class InMemoryRateLimiter:
    """
    Sliding window in-memory rate limiter for production endpoint protection.
    """
    def __init__(self):
        # Maps IP/key -> list of timestamp floats
        self.requests: Dict[str, List[float]] = {}
        self.last_cleanup = time.time()

    def _cleanup(self, current_time: float, window_seconds: float = 60.0):
        # Periodically purge entries older than window
        if current_time - self.last_cleanup > 300:  # every 5 mins
            cutoff = current_time - window_seconds
            empty_keys = []
            for k, timestamps in self.requests.items():
                self.requests[k] = [t for t in timestamps if t > cutoff]
                if not self.requests[k]:
                    empty_keys.append(k)
            for k in empty_keys:
                del self.requests[k]
            self.last_cleanup = current_time

    def is_rate_limited(self, key: str, max_requests: int, window_seconds: float = 60.0) -> Tuple[bool, int, int]:
        """
        Returns (is_limited, remaining_requests, retry_after_seconds)
        """
        now = time.time()
        self._cleanup(now, window_seconds)
        
        if key not in self.requests:
            self.requests[key] = []
            
        cutoff = now - window_seconds
        # Filter timestamps within active window
        valid_timestamps = [t for t in self.requests[key] if t > cutoff]
        self.requests[key] = valid_timestamps
        
        if len(valid_timestamps) >= max_requests:
            oldest = valid_timestamps[0]
            retry_after = max(1, int(window_seconds - (now - oldest)))
            return True, 0, retry_after
            
        self.requests[key].append(now)
        remaining = max_requests - len(self.requests[key])
        return False, remaining, 0

limiter = InMemoryRateLimiter()

class RateLimitMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        client_ip = request.client.host if request.client else "127.0.0.1"
        path = request.url.path
        
        # Determine limit based on endpoint sensitivity
        max_requests = 120
        window = 60.0
        
        if "/api/v1/auth" in path:
            max_requests = 20  # Auth brute-force protection
        elif "/ask" in path or "/generate" in path:
            max_requests = 35  # AI engine rate limiting
        elif path.startswith("/api/v1"):
            max_requests = 150  # General API CRUD
            
        key = f"{client_ip}:{path.split('/')[3] if len(path.split('/')) > 3 else 'root'}"
        is_limited, remaining, retry_after = limiter.is_rate_limited(key, max_requests, window)
        
        if is_limited:
            return JSONResponse(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                content={
                    "success": False,
                    "error": {
                        "code": "RATE_LIMIT_EXCEEDED",
                        "message": f"Too many requests. Rate limit of {max_requests} req/min exceeded. Please try again in {retry_after} seconds.",
                        "retry_after": retry_after
                    }
                },
                headers={
                    "Retry-After": str(retry_after),
                    "X-RateLimit-Limit": str(max_requests),
                    "X-RateLimit-Remaining": "0"
                }
            )
            
        response = await call_next(request)
        response.headers["X-RateLimit-Limit"] = str(max_requests)
        response.headers["X-RateLimit-Remaining"] = str(remaining)
        return response
