from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.models.database import get_db
from app.models.schema import User, Company
from app.schemas.pydantic_models import UserLogin, UserRegister, Token, UserProfile
from app.core.security import (
    create_access_token, 
    verify_password, 
    get_password_hash, 
    validate_password_strength
)
from app.core.dependencies import get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/login", response_model=Token)
def login(credentials: UserLogin, db: Session = Depends(get_db)):
    clean_email = credentials.email.lower().strip()
    user = db.query(User).filter(User.email == clean_email).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password. Please check your credentials or create an account."
        )
        
    if not verify_password(credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password. Please check your credentials."
        )
    
    token = create_access_token(subject=user.email, role=user.role or "Estimator")
    company_name = user.company.name if user.company else "Apex Horizon Builders LLC"
    
    return Token(
        access_token=token,
        token_type="bearer",
        user_name=user.name,
        email=user.email,
        role=user.role or "Estimator",
        company=company_name
    )

@router.post("/register", response_model=Token)
def register(data: UserRegister, db: Session = Depends(get_db)):
    clean_email = data.email.lower().strip()
    
    # 1. Check if user already exists
    existing = db.query(User).filter(User.email == clean_email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email address is already registered."
        )
        
    # 2. Check Password strength
    is_valid, msg = validate_password_strength(data.password)
    if not is_valid:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=msg
        )
    
    # 3. Associate or create company
    company_name = (data.company_name or "Apex Horizon Builders LLC").strip()
    company = db.query(Company).filter(Company.name == company_name).first()
    if not company:
        company = Company(name=company_name, plan_tier="pro")
        db.add(company)
        db.commit()
        db.refresh(company)
        
    # 4. Create User with Salted PBKDF2 hash
    user = User(
        name=data.name.strip(),
        email=clean_email,
        hashed_password=get_password_hash(data.password),
        company_id=company.id,
        role=data.role or "Estimator"
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    
    token = create_access_token(subject=user.email, role=user.role)
    return Token(
        access_token=token,
        token_type="bearer",
        user_name=user.name,
        email=user.email,
        role=user.role,
        company=company.name
    )

@router.get("/me", response_model=UserProfile)
def get_current_user_profile(current_user: User = Depends(get_current_user)):
    return current_user

