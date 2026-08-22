from fastapi import APIRouter
from app.core.config import settings

router = APIRouter(tags=["System Health"])

@router.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "api_v1": settings.API_V1_STR,
        "rag_engine": "pgvector + text-embedding-3",
        "vision_engine": "OpenCV Computer Vision",
        "timestamp": "2026-08-15T13:25:00Z"
    }
