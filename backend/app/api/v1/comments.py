from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.models.database import get_db
from app.models.schema import Project, Comment, User
from app.schemas.pydantic_models import CommentCreate, CommentResponse

router = APIRouter(prefix="/projects", tags=["Team Comments & Collaboration"])

@router.get("/{project_id}/comments", response_model=List[CommentResponse])
def list_comments(
    project_id: int, 
    target_type: Optional[str] = Query(None),
    target_id: Optional[int] = Query(None),
    db: Session = Depends(get_db)
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
        
    query = db.query(Comment).filter(Comment.project_id == project_id)
    if target_type:
        query = query.filter(Comment.target_type == target_type)
    if target_id is not None:
        query = query.filter(Comment.target_id == target_id)
        
    return query.order_by(Comment.created_at.asc()).all()

@router.post("/{project_id}/comments", response_model=CommentResponse)
def create_comment(project_id: int, data: CommentCreate, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
        
    valid_user_id = None
    if data.user_id:
        user = db.query(User).filter(User.id == data.user_id).first()
        if user:
            valid_user_id = user.id
            
    if not valid_user_id:
        first_user = db.query(User).first()
        if not first_user:
            first_user = User(
                name="Apex Chief Estimator",
                email="estimator@apexhorizon.com",
                hashed_password="...",
                role="Estimator"
            )
            db.add(first_user)
            db.commit()
            db.refresh(first_user)
        valid_user_id = first_user.id

    comment = Comment(
        project_id=project_id,
        user_id=valid_user_id,
        target_type=data.target_type,
        target_id=data.target_id,
        text=data.text
    )
    db.add(comment)
    db.commit()
    db.refresh(comment)
    return comment

@router.delete("/{project_id}/comments/{comment_id}")
def delete_comment(project_id: int, comment_id: int, db: Session = Depends(get_db)):
    comment = db.query(Comment).filter(Comment.id == comment_id, Comment.project_id == project_id).first()
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    db.delete(comment)
    db.commit()
    return {"message": "Comment deleted successfully"}
