import re
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, EmailStr, Field, field_validator, model_validator
from datetime import datetime

# --- AUTH SCHEMAS ---
class UserLogin(BaseModel):
    email: EmailStr = Field(..., description="User corporate or standard email address")
    password: str = Field(..., min_length=1, max_length=128, description="Account password")

    @field_validator("email", mode="before")
    @classmethod
    def normalize_email(cls, v: str) -> str:
        if isinstance(v, str):
            return v.strip().lower()
        return v

class UserRegister(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, description="Full name of estimator/contractor")
    email: EmailStr = Field(..., description="Corporate or business email address")
    password: str = Field(..., min_length=8, max_length=128, description="Strong password")
    confirm_password: Optional[str] = Field(None, min_length=8, max_length=128, description="Confirm password matching field")
    company_name: Optional[str] = Field("Apex Horizon Builders LLC", min_length=2, max_length=150)
    role: Optional[str] = Field("Estimator", description="Assigned role: Estimator, Bid_Manager, Preconstruction_Manager, Admin")

    @field_validator("name", mode="before")
    @classmethod
    def clean_name(cls, v: str) -> str:
        if isinstance(v, str):
            clean = v.strip()
            if len(clean) < 2:
                raise ValueError("Name must be at least 2 characters long")
            return clean
        return v

    @field_validator("email", mode="before")
    @classmethod
    def clean_email(cls, v: str) -> str:
        if isinstance(v, str):
            return v.strip().lower()
        return v

    @field_validator("role")
    @classmethod
    def validate_role(cls, v: Optional[str]) -> str:
        valid_roles = {"Estimator", "Bid_Manager", "Preconstruction_Manager", "Admin"}
        if v and v.strip() not in valid_roles:
            return "Estimator"
        return v or "Estimator"

    @model_validator(mode="after")
    def check_passwords_match(self) -> 'UserRegister':
        if self.confirm_password is not None and self.password != self.confirm_password:
            raise ValueError("Password and Confirm Password do not match")
        return self

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_name: str
    email: str
    role: str
    company: str

class UserProfile(BaseModel):
    id: int
    name: str
    email: str
    role: str
    company_id: Optional[int] = None
    created_at: datetime
    
    class Config:
        from_attributes = True

# --- PROJECT SCHEMAS ---
class ProjectCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=200, description="Project tender name")
    trade_focus: Optional[str] = Field("General Contractor", max_length=100)
    user_email: Optional[EmailStr] = None
    location: Optional[str] = Field("Lahore", max_length=150)
    estimated_value: Optional[float] = Field(0.0, ge=0, le=1000000000000.0)
    sqft: Optional[float] = Field(0.0, ge=0, le=100000000.0)

    @field_validator("name", mode="before")
    @classmethod
    def sanitize_project_name(cls, v: str) -> str:
        if isinstance(v, str):
            clean = v.strip()
            if not clean:
                raise ValueError("Project name cannot be empty")
            return clean
        return v

class ProjectResponse(BaseModel):
    id: int
    name: str
    trade_focus: str
    user_email: Optional[str] = None
    location: Optional[str] = "Lahore"
    status: str
    estimated_value: float
    sqft: float
    created_at: datetime
    
    class Config:
        from_attributes = True

# --- DOCUMENT SCHEMAS ---
class DocumentResponse(BaseModel):
    id: int
    project_id: int
    name: str
    type: str
    file_size_bytes: int
    status: str
    created_at: datetime
    
    class Config:
        from_attributes = True

# --- SPEC RAG Q&A SCHEMAS ---
class AskQuestionRequest(BaseModel):
    query: Optional[str] = Field(None, max_length=2000)
    question: Optional[str] = Field(None, max_length=2000)
    csi_division_filter: Optional[str] = Field(None, max_length=100)
    trade_focus: Optional[str] = Field(None, max_length=100)
    top_k: Optional[int] = Field(3, ge=1, le=10)

    @field_validator("query", "question", mode="before")
    @classmethod
    def clean_query(cls, v: Optional[str]) -> Optional[str]:
        if isinstance(v, str):
            return v.strip()
        return v

class SpecCitation(BaseModel):
    csi_division: str
    section_code: str
    sheet_or_page: str
    excerpt: str
    confidence_score: float

class AskQuestionResponse(BaseModel):
    query: str
    answer: str
    citations: List[SpecCitation]
    latency_ms: float
    status: str = "success"

# --- SCOPE ITEMS SCHEMAS ---
class ScopeItemCreate(BaseModel):
    csi_code: str = Field(..., min_length=2, max_length=50)
    description: str = Field(..., min_length=2, max_length=1000)
    quantity: Optional[float] = Field(1.0, ge=0)
    unit: Optional[str] = Field("EA", max_length=20)
    unit_cost: Optional[float] = Field(0.0, ge=0)
    source_ref: Optional[str] = Field(None, max_length=255)
    status: Optional[str] = Field("pending_review", max_length=50)

class ScopeItemUpdate(BaseModel):
    description: Optional[str] = Field(None, min_length=1, max_length=1000)
    quantity: Optional[float] = Field(None, ge=0)
    unit: Optional[str] = Field(None, max_length=20)
    unit_cost: Optional[float] = Field(None, ge=0)
    status: Optional[str] = Field(None, max_length=50)

class ScopeItemResponse(BaseModel):
    id: int
    project_id: int
    csi_code: str
    description: str
    quantity: float
    unit: str
    unit_cost: float
    source_ref: Optional[str] = None
    status: str
    
    class Config:
        from_attributes = True

# --- RFI SCHEMAS ---
class RFICreate(BaseModel):
    subject: str = Field(..., min_length=3, max_length=255)
    question: str = Field(..., min_length=5, max_length=5000)
    proposed_resolution: Optional[str] = Field(None, max_length=5000)
    source_ref: Optional[str] = Field(None, max_length=255)

class RFIUpdate(BaseModel):
    subject: Optional[str] = Field(None, min_length=3, max_length=255)
    question: Optional[str] = Field(None, min_length=5, max_length=5000)
    proposed_resolution: Optional[str] = Field(None, max_length=5000)
    status: Optional[str] = Field(None, max_length=50)
    source_ref: Optional[str] = Field(None, max_length=255)

class RFIResponse(BaseModel):
    id: int
    rfi_no: str
    subject: str
    question: str
    proposed_resolution: Optional[str] = None
    status: str
    generated_by_ai: bool
    source_ref: Optional[str] = None
    
    class Config:
        from_attributes = True

# --- SCOPE GAPS & RISKS SCHEMAS ---
class GapUpdate(BaseModel):
    title: Optional[str] = Field(None, max_length=255)
    description: Optional[str] = Field(None, max_length=5000)
    severity: Optional[str] = Field(None, max_length=50)
    cost_impact: Optional[float] = Field(None, ge=0)
    status: Optional[str] = Field(None, max_length=50)

class GapResponse(BaseModel):
    id: int
    title: str
    description: str
    severity: str
    cost_impact: float
    related_docs: Optional[str] = None
    status: str
    
    class Config:
        from_attributes = True

class RiskUpdate(BaseModel):
    category: Optional[str] = Field(None, max_length=100)
    description: Optional[str] = Field(None, max_length=5000)
    severity: Optional[str] = Field(None, max_length=50)
    exposure: Optional[float] = Field(None, ge=0)
    mitigation: Optional[str] = Field(None, max_length=5000)
    source_ref: Optional[str] = Field(None, max_length=255)

class RiskResponse(BaseModel):
    id: int
    category: str
    description: str
    severity: str
    exposure: float
    mitigation: Optional[str] = None
    source_ref: Optional[str] = None
    
    class Config:
        from_attributes = True

# --- COMMENT SCHEMAS ---
class CommentCreate(BaseModel):
    user_id: Optional[int] = 1
    target_type: str = Field("scope", max_length=50)
    target_id: int = Field(..., gt=0)
    text: str = Field(..., min_length=1, max_length=2000)

class CommentResponse(BaseModel):
    id: int
    project_id: int
    user_id: Optional[int] = None
    target_type: str
    target_id: int
    text: str
    created_at: datetime
    
    class Config:
        from_attributes = True

# --- VISION DIFF SCHEMAS ---
class VisionDiffResponse(BaseModel):
    id: int
    project_id: int
    sheet_no: str
    old_revision: str
    new_revision: str
    changes: List[Dict[str, Any]]
    delta_cost: float
    created_at: datetime

