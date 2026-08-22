from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from app.models.database import get_db
from app.models.schema import Project, Company, User
from app.schemas.pydantic_models import ProjectCreate, ProjectResponse
from app.core.dependencies import get_current_user, get_current_user_optional, require_roles

router = APIRouter(prefix="/projects", tags=["Projects"])

@router.get("", response_model=List[ProjectResponse])
def list_projects(
    user_email: Optional[str] = Query(None), 
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    query = db.query(Project)
    
    # Priority: authenticated user's email, or query param
    target_email = None
    if current_user and current_user.email:
        target_email = current_user.email.lower().strip()
    elif user_email:
        target_email = user_email.lower().strip()
        
    if target_email:
        query = query.filter(Project.user_email == target_email)
        
    projects = query.order_by(Project.created_at.desc()).all()
    return projects

@router.post("", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
def create_project(
    data: ProjectCreate, 
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    user_email = None
    if current_user and current_user.email:
        user_email = current_user.email.lower().strip()
    elif data.user_email:
        user_email = str(data.user_email).lower().strip()
        
    project = Project(
        name=data.name.strip(),
        trade_focus=data.trade_focus or "General Contractor",
        user_email=user_email,
        location=data.location or "Lahore",
        estimated_value=data.estimated_value or 0.0,
        sqft=data.sqft or 0.0,
        status="Draft",
        created_by=current_user.id if current_user else None
    )
    db.add(project)
    db.commit()
    db.refresh(project)
    return project

@router.get("/{project_id}", response_model=ProjectResponse)
def get_project(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail=f"Project #{project_id} not found")
    return project

@router.delete("/{project_id}")
def delete_project(
    project_id: int, 
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail=f"Project #{project_id} not found")
        
    # If user is authenticated, ensure role has permission to delete projects (Bid_Manager, Preconstruction_Manager, Admin)
    if current_user:
        role = current_user.role or "Estimator"
        if role not in ["Admin", "Preconstruction_Manager", "Bid_Manager"]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Estimators cannot delete projects. Only Bid Managers and Admins can delete projects."
            )
            
    db.delete(project)
    db.commit()
    return {"success": True, "message": f"Project #{project_id} deleted successfully"}

