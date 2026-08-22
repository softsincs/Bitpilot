from typing import List, Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.models.database import get_db
from app.models.schema import User
from app.core.security import decode_access_token

security = HTTPBearer(auto_error=False)

def get_current_user_optional(
    auth_header: Optional[HTTPAuthorizationCredentials] = Depends(security),
    db: Session = Depends(get_db)
) -> Optional[User]:
    if not auth_header or not auth_header.credentials:
        return None
    payload = decode_access_token(auth_header.credentials)
    if not payload or "sub" not in payload:
        return None
    user = db.query(User).filter(User.email == payload["sub"]).first()
    if not user:
        # Construct dynamic user context from valid verified JWT claims
        user = User(
            id=0,
            name=payload["sub"].split("@")[0].capitalize(),
            email=payload["sub"],
            hashed_password="",
            role=payload.get("role", "Estimator")
        )
    return user

def get_current_user(
    auth_header: Optional[HTTPAuthorizationCredentials] = Depends(security),
    db: Session = Depends(get_db)
) -> User:
    if not auth_header or not auth_header.credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required. Please provide a valid Bearer token.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    payload = decode_access_token(auth_header.credentials)
    if not payload or "sub" not in payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired access token.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    user = db.query(User).filter(User.email == payload["sub"]).first()
    if not user:
        # Construct dynamic user from token claims
        user = User(
            id=0,
            name=payload["sub"].split("@")[0].capitalize(),
            email=payload["sub"],
            hashed_password="",
            role=payload.get("role", "Estimator")
        )
    return user

def require_roles(allowed_roles: List[str]):
    """
    Role-Based Access Control (RBAC) Dependency.
    Allowed roles list: e.g. ['Admin', 'Preconstruction_Manager', 'Bid_Manager', 'Estimator']
    """
    def role_checker(current_user: User = Depends(get_current_user)) -> User:
        user_role = (current_user.role or "Estimator").strip()
        # Admin has superuser access across all roles
        if user_role == "Admin" or user_role in allowed_roles:
            return current_user
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Access denied. Required role: {', '.join(allowed_roles)}. Your role: {user_role}."
        )
    return role_checker

