import os
import hmac
import hashlib
import re
from datetime import datetime, timedelta, timezone
from typing import Optional, Any, Tuple
from jose import jwt, JWTError
from app.core.config import settings

def validate_password_strength(password: str) -> Tuple[bool, str]:
    """
    Validate that password meets production security criteria:
    - Minimum 8 characters
    - At least 1 uppercase letter
    - At least 1 lowercase letter
    - At least 1 number
    - At least 1 special character
    """
    if len(password) < 8:
        return False, "Password must be at least 8 characters long"
    if len(password) > 128:
        return False, "Password must not exceed 128 characters"
    if not re.search(r"[A-Z]", password):
        return False, "Password must contain at least one uppercase letter (A-Z)"
    if not re.search(r"[a-z]", password):
        return False, "Password must contain at least one lowercase letter (a-z)"
    if not re.search(r"[0-9]", password):
        return False, "Password must contain at least one digit (0-9)"
    if not re.search(r"[!@#$%^&*(),.?\":{}|<>\-_+=\[\]\\/`~]", password):
        return False, "Password must contain at least one special character (!@#$%^&*...)"
    return True, "Password meets security requirements"

def get_password_hash(password: str) -> str:
    """
    Hashes password using PBKDF2-HMAC-SHA256 with random salt.
    Format: pbkdf2_sha256$iterations$salt$hash
    """
    salt = os.urandom(16).hex()
    iterations = 100000
    hash_bytes = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt.encode('utf-8'), iterations)
    return f"pbkdf2_sha256${iterations}${salt}${hash_bytes.hex()}"

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Securely verifies plain password against hash.
    Supports PBKDF2, legacy SHA-256 fallback, and constant-time comparison.
    """
    if not hashed_password or not plain_password:
        return False
        
    # Standard PBKDF2 verification
    if hashed_password.startswith("pbkdf2_sha256$"):
        try:
            parts = hashed_password.split("$")
            if len(parts) == 4:
                iterations = int(parts[1])
                salt = parts[2]
                expected_hash = parts[3]
                calc_hash = hashlib.pbkdf2_hmac(
                    'sha256', 
                    plain_password.encode('utf-8'), 
                    salt.encode('utf-8'), 
                    iterations
                ).hex()
                return hmac.compare_digest(calc_hash, expected_hash)
        except Exception:
            return False
            
    # Legacy SHA-256 check for backwards compatibility
    try:
        calc_hash = hashlib.sha256(plain_password.encode('utf-8')).hexdigest()
        if hmac.compare_digest(calc_hash, hashed_password):
            return True
    except Exception:
        pass
        
    return False

def create_access_token(subject: str | Any, role: str = "Estimator", expires_delta: Optional[timedelta] = None) -> str:
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode = {
        "exp": expire, 
        "sub": str(subject),
        "role": role,
        "iat": datetime.now(timezone.utc)
    }
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str) -> Optional[dict]:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return payload
    except JWTError:
        return None

