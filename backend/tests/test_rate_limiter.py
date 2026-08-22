import pytest
from app.core.rate_limiter import InMemoryRateLimiter
import time

def test_sliding_window_rate_limiter():
    limiter = InMemoryRateLimiter()
    key = "test_client_ip"
    max_reqs = 5
    window = 1.0  # 1 second window for rapid test

    # First 5 requests should succeed
    for i in range(max_reqs):
        is_limited, remaining, retry_after = limiter.is_rate_limited(key, max_reqs, window)
        assert is_limited is False
        assert remaining == max_reqs - (i + 1)
        assert retry_after == 0

    # 6th request within window must be rate limited
    is_limited, remaining, retry_after = limiter.is_rate_limited(key, max_reqs, window)
    assert is_limited is True
    assert remaining == 0
    assert retry_after >= 1

    # After window expiration, requests should be allowed again
    time.sleep(1.1)
    is_limited, remaining, retry_after = limiter.is_rate_limited(key, max_reqs, window)
    assert is_limited is False
    assert remaining == max_reqs - 1
