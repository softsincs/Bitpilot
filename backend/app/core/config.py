import os
from typing import List
from dotenv import load_dotenv
from pydantic_settings import BaseSettings

env_file_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), ".env")
load_dotenv(env_file_path)

class Settings(BaseSettings):
    PROJECT_NAME: str = "BidPilot AI Backend"
    VERSION: str = "10.2.0"
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "production")
    
    # Security & JWT
    SECRET_KEY: str = os.getenv("SECRET_KEY", "bidpilot-commercial-secret-key-2026-production-jwt-security-key")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # Database
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        "sqlite:///./bidpilot.db"
    )
    
    # CORS Origins (configurable via env)
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]
    
    # S3 Storage Configuration
    AWS_S3_BUCKET: str = os.getenv("AWS_S3_BUCKET", "bidpilot-documents-prod")
    AWS_REGION: str = os.getenv("AWS_REGION", "us-east-1")
    
    # Rate Limiting Configuration
    RATE_LIMIT_AUTH: str = os.getenv("RATE_LIMIT_AUTH", "15/minute")
    RATE_LIMIT_AI: str = os.getenv("RATE_LIMIT_AI", "30/minute")
    RATE_LIMIT_DEFAULT: str = os.getenv("RATE_LIMIT_DEFAULT", "120/minute")
    
    # AI Engine Keys & Config
    GROQ_API_KEY: str = os.getenv("GROQ_API_KEY", "")
    GROQ_MODEL: str = os.getenv("GROQ_MODEL", "llama-3.1-8b-instant")
    AI_TIMEOUT_SECONDS: float = float(os.getenv("AI_TIMEOUT_SECONDS", "10.0"))
    
    class Config:
        case_sensitive = True

settings = Settings()

