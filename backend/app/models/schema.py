from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, Boolean, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.models.database import Base

class Company(Base):
    __tablename__ = "companies"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    plan_tier = Column(String(50), default="pro")  # starter, pro, enterprise
    sso_enabled = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    users = relationship("User", back_populates="company")
    projects = relationship("Project", back_populates="company")

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey("companies.id"), nullable=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(String(50), default="Estimator")  # Estimator, Bid_Manager, Preconstruction_Manager, Admin
    created_at = Column(DateTime, default=datetime.utcnow)
    
    company = relationship("Company", back_populates="users")
    projects = relationship("Project", back_populates="creator")

class Project(Base):
    __tablename__ = "projects"
    
    id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey("companies.id"), nullable=True)
    user_email = Column(String(255), nullable=True, index=True)
    name = Column(String(255), nullable=False)
    trade_focus = Column(String(100), default="General Contractor")
    location = Column(String(255), default="Lahore")
    status = Column(String(50), default="Draft")  # Draft, In Review, Takeoff Complete, Submitted
    estimated_value = Column(Float, default=0.0)
    sqft = Column(Float, default=0.0)
    created_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    company = relationship("Company", back_populates="projects")
    creator = relationship("User", back_populates="projects")
    documents = relationship("Document", back_populates="project", cascade="all, delete-orphan")
    scope_items = relationship("ScopeItem", back_populates="project", cascade="all, delete-orphan")
    gaps = relationship("Gap", back_populates="project", cascade="all, delete-orphan")
    risks = relationship("Risk", back_populates="project", cascade="all, delete-orphan")
    rfis = relationship("RFI", back_populates="project", cascade="all, delete-orphan")
    drawing_diffs = relationship("DrawingDiff", back_populates="project", cascade="all, delete-orphan")

class Document(Base):
    __tablename__ = "documents"
    
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    name = Column(String(255), nullable=False)
    type = Column(String(50), nullable=False)  # drawing, spec, boq, addendum
    s3_key = Column(String(500), nullable=True)
    file_size_bytes = Column(Integer, default=0)
    status = Column(String(50), default="processed")  # uploaded, processing, processed, error
    created_at = Column(DateTime, default=datetime.utcnow)
    
    project = relationship("Project", back_populates="documents")
    pages = relationship("DocumentPage", back_populates="document", cascade="all, delete-orphan")

class DocumentPage(Base):
    __tablename__ = "document_pages"
    
    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(Integer, ForeignKey("documents.id"), nullable=False)
    page_no = Column(Integer, nullable=False)
    sheet_no = Column(String(50), nullable=True)  # e.g., A101, E201, S302
    revision = Column(String(50), default="0")
    discipline = Column(String(50), default="Architectural")  # Architectural, Structural, MEP, Civil
    ocr_text = Column(Text, nullable=True)
    
    document = relationship("Document", back_populates="pages")
    chunks = relationship("Chunk", back_populates="page", cascade="all, delete-orphan")

class Chunk(Base):
    __tablename__ = "chunks"
    
    id = Column(Integer, primary_key=True, index=True)
    document_page_id = Column(Integer, ForeignKey("document_pages.id"), nullable=False)
    content = Column(Text, nullable=False)
    csi_division = Column(String(50), nullable=True)  # e.g., Division 03, Division 26
    embedding_json = Column(Text, nullable=True)  # Stored as serialized JSON list for vector cosine lookup
    metadata_json = Column(Text, nullable=True)
    
    page = relationship("DocumentPage", back_populates="chunks")

class ScopeItem(Base):
    __tablename__ = "scope_items"
    
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    csi_code = Column(String(50), nullable=False)  # e.g., 03 30 00
    description = Column(String(500), nullable=False)
    quantity = Column(Float, default=0.0)
    unit = Column(String(20), default="EA")  # SQFT, LF, CY, EA
    unit_cost = Column(Float, default=0.0)
    source_ref = Column(String(255), nullable=True)  # e.g., Sheet A102 / Spec §2.03
    status = Column(String(50), default="verified")  # verified, pending_review, rejected
    
    project = relationship("Project", back_populates="scope_items")

class Gap(Base):
    __tablename__ = "gaps"
    
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    severity = Column(String(50), default="High")  # Critical, High, Medium, Low
    cost_impact = Column(Float, default=0.0)
    related_docs = Column(String(255), nullable=True)
    status = Column(String(50), default="Open")  # Open, Resolved, Flagged
    
    project = relationship("Project", back_populates="gaps")

class Risk(Base):
    __tablename__ = "risks"
    
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    category = Column(String(100), default="Long-Lead Equipment")
    description = Column(Text, nullable=False)
    severity = Column(String(50), default="Medium")
    exposure = Column(Float, default=0.0)
    mitigation = Column(Text, nullable=True)
    source_ref = Column(String(255), nullable=True)
    
    project = relationship("Project", back_populates="risks")

class RFI(Base):
    __tablename__ = "rfis"
    
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    rfi_no = Column(String(50), nullable=False)
    subject = Column(String(255), nullable=False)
    question = Column(Text, nullable=False)
    proposed_resolution = Column(Text, nullable=True)
    status = Column(String(50), default="Draft")  # Draft, Submitted, Answered
    generated_by_ai = Column(Boolean, default=True)
    source_ref = Column(String(255), nullable=True)
    
    project = relationship("Project", back_populates="rfis")

class DrawingDiff(Base):
    __tablename__ = "drawing_diffs"
    
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    sheet_no = Column(String(50), nullable=False)
    old_revision = Column(String(50), default="Rev 0")
    new_revision = Column(String(50), default="Rev 1 (Addendum #01)")
    changes_json = Column(Text, nullable=True)
    delta_cost = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    project = relationship("Project", back_populates="drawing_diffs")

class Comment(Base):
    __tablename__ = "comments"
    
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    target_type = Column(String(50), default="scope")  # scope, gap, risk, rfi
    target_id = Column(Integer, nullable=False)
    text = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
