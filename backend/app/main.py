import logging
from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.core.config import settings
from app.models.database import engine, Base
from app.api.v1 import auth, projects, documents, spec_assistant, reports, rfis, drawings, health, scope, comments
from app.core.rate_limiter import RateLimitMiddleware

from sqlalchemy import text
from sqlalchemy.orm import Session
from app.models.schema import User, Company
from app.core.security import get_password_hash

# Configure server-side production logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("bidpilot.backend")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Auto-create database tables on startup
    Base.metadata.create_all(bind=engine)
    
    # Auto-fix column nullability and seed default demo user
    with Session(engine) as db:
        try:
            db.execute(text("ALTER TABLE comments ALTER COLUMN user_id DROP NOT NULL;"))
            db.commit()
        except Exception:
            db.rollback()
            
        demo_user = db.query(User).filter(User.email == "estimator@apexhorizon.com").first()
        if not demo_user:
            demo_user = User(
                name="Apex Chief Estimator",
                email="estimator@apexhorizon.com",
                hashed_password=get_password_hash("DemoEstimator2026!"),
                role="Estimator"
            )
            db.add(demo_user)
            db.commit()
            db.refresh(demo_user)
            
    logger.info("BidPilot AI database initialized and verified successfully.")
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="AI Construction Estimator Copilot for U.S. Commercial Construction — FastAPI & pgvector Specification Backend",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# 1. Rate Limiting Middleware
app.add_middleware(RateLimitMiddleware)

# 2. CORS Middleware with configured origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS or ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Security Headers Middleware
@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    return response

# 4. Global Exception Handlers (Sanitized, Structured JSON Errors)
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errors = []
    for err in exc.errors():
        field = " -> ".join(str(loc) for loc in err.get("loc", []))
        errors.append({
            "field": field,
            "message": err.get("msg", "Invalid value"),
            "type": err.get("type", "validation_error")
        })
    logger.warning(f"Validation failure on {request.url.path}: {errors}")
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "success": False,
            "error": {
                "code": "VALIDATION_ERROR",
                "message": "Input validation failed. Please check the submitted fields.",
                "details": errors
            }
        }
    )

@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": {
                "code": f"HTTP_{exc.status_code}",
                "message": exc.detail if isinstance(exc.detail, str) else "An HTTP error occurred",
            }
        }
    )

@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled server exception on {request.url.path}: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "success": False,
            "error": {
                "code": "INTERNAL_SERVER_ERROR",
                "message": "An internal server error occurred. Our engineering team has been notified."
            }
        }
    )

# Mount API v1 Routers
app.include_router(health.router, prefix=settings.API_V1_STR)
app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(projects.router, prefix=settings.API_V1_STR)
app.include_router(documents.router, prefix=settings.API_V1_STR)
app.include_router(scope.router, prefix=settings.API_V1_STR)
app.include_router(comments.router, prefix=settings.API_V1_STR)
app.include_router(spec_assistant.router, prefix=settings.API_V1_STR)
app.include_router(reports.router, prefix=settings.API_V1_STR)
app.include_router(rfis.router, prefix=settings.API_V1_STR)
app.include_router(drawings.router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {
        "message": "Welcome to BidPilot AI Backend API",
        "docs": "/docs",
        "status": "online",
        "version": settings.VERSION
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)

