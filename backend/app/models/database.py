import logging
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from app.core.config import settings

logger = logging.getLogger("bidpilot.db")

# Engine configuration with resilient connection handling
try:
    if settings.DATABASE_URL.startswith("sqlite"):
        engine = create_engine(
            settings.DATABASE_URL, 
            connect_args={"check_same_thread": False}
        )
    else:
        # PostgreSQL with pgvector connection
        engine = create_engine(
            settings.DATABASE_URL, 
            pool_pre_ping=True,
            pool_recycle=300
        )
except Exception as e:
    logger.warning(f"Unable to connect to primary DATABASE_URL ({e}). Falling back to local SQLite engine.")
    engine = create_engine(
        "sqlite:///./bidpilot.db", 
        connect_args={"check_same_thread": False}
    )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Dependency to get DB session per request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

