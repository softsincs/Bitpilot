from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.database import get_db
from app.models.schema import Project, RFI
from app.schemas.pydantic_models import RFIResponse, RFICreate, RFIUpdate
from app.services.llm_service import LLMService

router = APIRouter(prefix="/projects", tags=["RFI Management"])

@router.get("/{project_id}/rfis", response_model=List[RFIResponse])
def list_rfis(project_id: int, db: Session = Depends(get_db)):
    rfis = db.query(RFI).filter(RFI.project_id == project_id).all()
    if not rfis:
        raw_rfis = LLMService.generate_rfis()
        for r in raw_rfis:
            db_rfi = RFI(
                project_id=project_id,
                rfi_no=r["rfi_no"],
                subject=r["subject"],
                question=r["question"],
                proposed_resolution=r["proposed_resolution"],
                status=r["status"],
                generated_by_ai=True,
                source_ref=r["source_ref"]
            )
            db.add(db_rfi)
        db.commit()
        rfis = db.query(RFI).filter(RFI.project_id == project_id).all()
    return rfis

@router.post("/{project_id}/rfis/generate", response_model=List[RFIResponse])
def trigger_rfi_generation(project_id: int, db: Session = Depends(get_db)):
    raw_rfis = LLMService.generate_rfis()
    created = []
    for r in raw_rfis:
        db_rfi = RFI(
            project_id=project_id,
            rfi_no=f"RFI-{len(created) + 101:03d}",
            subject=r["subject"],
            question=r["question"],
            proposed_resolution=r["proposed_resolution"],
            status="Draft",
            generated_by_ai=True,
            source_ref=r["source_ref"]
        )
        db.add(db_rfi)
        created.append(db_rfi)
    db.commit()
    return created

@router.post("/{project_id}/rfis", response_model=RFIResponse)
def create_manual_rfi(project_id: int, data: RFICreate, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
        
    count = db.query(RFI).filter(RFI.project_id == project_id).count()
    rfi = RFI(
        project_id=project_id,
        rfi_no=f"RFI-{count + 101:03d}",
        subject=data.subject,
        question=data.question,
        proposed_resolution=data.proposed_resolution,
        status="Draft",
        generated_by_ai=False,
        source_ref=data.source_ref
    )
    db.add(rfi)
    db.commit()
    db.refresh(rfi)
    return rfi

@router.patch("/{project_id}/rfis/{rfi_id}", response_model=RFIResponse)
def update_rfi(project_id: int, rfi_id: int, data: RFIUpdate, db: Session = Depends(get_db)):
    rfi = db.query(RFI).filter(RFI.id == rfi_id, RFI.project_id == project_id).first()
    if not rfi:
        raise HTTPException(status_code=404, detail="RFI not found")
    if data.subject is not None:
        rfi.subject = data.subject
    if data.question is not None:
        rfi.question = data.question
    if data.proposed_resolution is not None:
        rfi.proposed_resolution = data.proposed_resolution
    if data.status is not None:
        rfi.status = data.status
    if data.source_ref is not None:
        rfi.source_ref = data.source_ref
    db.commit()
    db.refresh(rfi)
    return rfi

@router.delete("/{project_id}/rfis/{rfi_id}")
def delete_rfi(project_id: int, rfi_id: int, db: Session = Depends(get_db)):
    rfi = db.query(RFI).filter(RFI.id == rfi_id, RFI.project_id == project_id).first()
    if not rfi:
        raise HTTPException(status_code=404, detail="RFI not found")
    db.delete(rfi)
    db.commit()
    return {"message": "RFI deleted successfully"}

