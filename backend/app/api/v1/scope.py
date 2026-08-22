from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.database import get_db
from app.models.schema import Project, ScopeItem
from app.schemas.pydantic_models import ScopeItemCreate, ScopeItemUpdate, ScopeItemResponse

router = APIRouter(prefix="/projects", tags=["Scope Items & Takeoff Checklist"])

DEFAULT_SCOPE_ITEMS = [
    {
        "csi_code": "03 30 00",
        "description": "Cast-In-Place Concrete Foundations, Grade Beams & Slab-on-Grade",
        "quantity": 1450.0,
        "unit": "CY",
        "unit_cost": 420.0,
        "source_ref": "Drawing S-101 / Spec §03 30 00",
        "status": "verified"
    },
    {
        "csi_code": "09 29 00",
        "description": "Gypsum Board Partitions & Acoustic Corridor Ceilings",
        "quantity": 28400.0,
        "unit": "SQFT",
        "unit_cost": 6.85,
        "source_ref": "Drawing A-102 / Spec §09 29 00",
        "status": "verified"
    },
    {
        "csi_code": "26 05 00",
        "description": "Main Electrical Switchgear, Feeders & Panelboards",
        "quantity": 1.0,
        "unit": "LS",
        "unit_cost": 185000.0,
        "source_ref": "Drawing E-401 / Spec §26 05 00",
        "status": "verified"
    },
    {
        "csi_code": "23 05 00",
        "description": "Rooftop Air Handling Units & SMACNA Supply Ductwork",
        "quantity": 4.0,
        "unit": "EA",
        "unit_cost": 62500.0,
        "source_ref": "Drawing M-201 / Spec §23 05 00",
        "status": "pending_review"
    }
]

@router.get("/{project_id}/scope", response_model=List[ScopeItemResponse])
def get_scope_items(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
        
    items = db.query(ScopeItem).filter(ScopeItem.project_id == project_id).all()
    if not items:
        for s in DEFAULT_SCOPE_ITEMS:
            db_item = ScopeItem(
                project_id=project_id,
                csi_code=s["csi_code"],
                description=s["description"],
                quantity=s["quantity"],
                unit=s["unit"],
                unit_cost=s["unit_cost"],
                source_ref=s["source_ref"],
                status=s["status"]
            )
            db.add(db_item)
        db.commit()
        items = db.query(ScopeItem).filter(ScopeItem.project_id == project_id).all()
    return items

@router.post("/{project_id}/scope", response_model=ScopeItemResponse)
def create_scope_item(project_id: int, data: ScopeItemCreate, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
        
    item = ScopeItem(
        project_id=project_id,
        csi_code=data.csi_code,
        description=data.description,
        quantity=data.quantity or 1.0,
        unit=data.unit or "EA",
        unit_cost=data.unit_cost or 0.0,
        source_ref=data.source_ref,
        status=data.status or "pending_review"
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

@router.patch("/{project_id}/scope/{item_id}", response_model=ScopeItemResponse)
def update_scope_item(project_id: int, item_id: int, data: ScopeItemUpdate, db: Session = Depends(get_db)):
    item = db.query(ScopeItem).filter(ScopeItem.id == item_id, ScopeItem.project_id == project_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Scope item not found")
        
    if data.description is not None:
        item.description = data.description
    if data.quantity is not None:
        item.quantity = data.quantity
    if data.unit is not None:
        item.unit = data.unit
    if data.unit_cost is not None:
        item.unit_cost = data.unit_cost
    if data.status is not None:
        item.status = data.status
        
    db.commit()
    db.refresh(item)
    return item

@router.delete("/{project_id}/scope/{item_id}")
def delete_scope_item(project_id: int, item_id: int, db: Session = Depends(get_db)):
    item = db.query(ScopeItem).filter(ScopeItem.id == item_id, ScopeItem.project_id == project_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Scope item not found")
    db.delete(item)
    db.commit()
    return {"message": "Scope item deleted successfully"}
