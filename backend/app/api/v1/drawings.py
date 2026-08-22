import json
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.database import get_db
from app.models.schema import Project, DrawingDiff
from app.services.vision_diff_service import VisionDiffService

router = APIRouter(prefix="/projects", tags=["Vision Diff & Drawing Comparison"])

@router.get("/{project_id}/drawings/diff")
def list_drawing_diffs(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
        
    diffs = db.query(DrawingDiff).filter(DrawingDiff.project_id == project_id).all()
    if not diffs:
        # Seed initial standard diff
        res = VisionDiffService.compare_drawings("E-401", "Rev 0", "Rev 1 (Addendum #01)")
        db_diff = DrawingDiff(
            project_id=project_id,
            sheet_no="E-401",
            old_revision="Rev 0",
            new_revision="Rev 1 (Addendum #01)",
            changes_json=json.dumps(res["changes"]),
            delta_cost=res["net_cost_impact"]
        )
        db.add(db_diff)
        db.commit()
        db.refresh(db_diff)
        diffs = [db_diff]
        
    output = []
    for d in diffs:
        changes = json.loads(d.changes_json) if d.changes_json else []
        output.append({
            "id": d.id,
            "project_id": d.project_id,
            "sheet_no": d.sheet_no,
            "old_revision": d.old_revision,
            "new_revision": d.new_revision,
            "changes": changes,
            "changes_detected": len(changes),
            "delta_cost": d.delta_cost,
            "created_at": d.created_at
        })
    return output

@router.post("/{project_id}/drawings/diff")
def trigger_drawing_diff(
    project_id: int, 
    sheet_no: str = "E-401", 
    old_rev: str = "Rev 0", 
    new_rev: str = "Rev 1 (Addendum #01)",
    db: Session = Depends(get_db)
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
        
    result = VisionDiffService.compare_drawings(sheet_no, old_rev, new_rev)
    
    db_diff = DrawingDiff(
        project_id=project_id,
        sheet_no=sheet_no,
        old_revision=old_rev,
        new_revision=new_rev,
        changes_json=json.dumps(result["changes"]),
        delta_cost=result["net_cost_impact"]
    )
    db.add(db_diff)
    db.commit()
    db.refresh(db_diff)
    
    result["id"] = db_diff.id
    result["created_at"] = db_diff.created_at
    return result

@router.get("/{project_id}/drawings/diff/{diff_id}")
def get_diff_result(project_id: int, diff_id: int, db: Session = Depends(get_db)):
    d = db.query(DrawingDiff).filter(DrawingDiff.id == diff_id, DrawingDiff.project_id == project_id).first()
    if d:
        changes = json.loads(d.changes_json) if d.changes_json else []
        return {
            "id": d.id,
            "project_id": d.project_id,
            "sheet_no": d.sheet_no,
            "old_revision": d.old_revision,
            "new_revision": d.new_revision,
            "changes": changes,
            "changes_detected": len(changes),
            "delta_cost": d.delta_cost,
            "created_at": d.created_at
        }
    return VisionDiffService.compare_drawings("E-401", "Rev 0", "Rev 1 (Addendum #01)")
