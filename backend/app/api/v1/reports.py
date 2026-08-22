from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.database import get_db
from app.models.schema import Project, Gap, Risk
from app.schemas.pydantic_models import GapResponse, RiskResponse, GapUpdate, RiskUpdate
from app.services.llm_service import LLMService

router = APIRouter(prefix="/projects", tags=["AI Reports & Analysis"])

@router.get("/{project_id}/summary")
def get_project_summary(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
        
    return LLMService.generate_project_summary(project.name, project.trade_focus)

@router.get("/{project_id}/scope-gaps", response_model=List[GapResponse])
def get_scope_gaps(project_id: int, db: Session = Depends(get_db)):
    gaps = db.query(Gap).filter(Gap.project_id == project_id).all()
    if not gaps:
        raw_gaps = LLMService.detect_scope_gaps()
        for g in raw_gaps:
            db_gap = Gap(
                project_id=project_id,
                title=g["title"],
                description=g["description"],
                severity=g["severity"],
                cost_impact=g["cost_impact"],
                related_docs=g["related_docs"],
                status=g["status"]
            )
            db.add(db_gap)
        db.commit()
        gaps = db.query(Gap).filter(Gap.project_id == project_id).all()
    return gaps

@router.get("/{project_id}/risks", response_model=List[RiskResponse])
def get_risks(project_id: int, db: Session = Depends(get_db)):
    risks = db.query(Risk).filter(Risk.project_id == project_id).all()
    if not risks:
        raw_risks = LLMService.analyze_risks()
        for r in raw_risks:
            db_risk = Risk(
                project_id=project_id,
                category=r["category"],
                description=r["description"],
                severity=r["severity"],
                exposure=r["exposure"],
                mitigation=r["mitigation"],
                source_ref=r["source_ref"]
            )
            db.add(db_risk)
        db.commit()
        risks = db.query(Risk).filter(Risk.project_id == project_id).all()
    return risks

@router.patch("/{project_id}/gaps/{gap_id}", response_model=GapResponse)
def update_gap(project_id: int, gap_id: int, data: GapUpdate, db: Session = Depends(get_db)):
    gap = db.query(Gap).filter(Gap.id == gap_id, Gap.project_id == project_id).first()
    if not gap:
        raise HTTPException(status_code=404, detail="Scope gap not found")
    if data.title is not None:
        gap.title = data.title
    if data.description is not None:
        gap.description = data.description
    if data.severity is not None:
        gap.severity = data.severity
    if data.cost_impact is not None:
        gap.cost_impact = data.cost_impact
    if data.status is not None:
        gap.status = data.status
    db.commit()
    db.refresh(gap)
    return gap

@router.patch("/{project_id}/risks/{risk_id}", response_model=RiskResponse)
def update_risk(project_id: int, risk_id: int, data: RiskUpdate, db: Session = Depends(get_db)):
    risk = db.query(Risk).filter(Risk.id == risk_id, Risk.project_id == project_id).first()
    if not risk:
        raise HTTPException(status_code=404, detail="Risk item not found")
    if data.category is not None:
        risk.category = data.category
    if data.description is not None:
        risk.description = data.description
    if data.severity is not None:
        risk.severity = data.severity
    if data.exposure is not None:
        risk.exposure = data.exposure
    if data.mitigation is not None:
        risk.mitigation = data.mitigation
    if data.source_ref is not None:
        risk.source_ref = data.source_ref
    db.commit()
    db.refresh(risk)
    return risk

@router.get("/{project_id}/export/{export_format}")
def export_project_report(project_id: int, export_format: str = "json", db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
        
    summary = LLMService.generate_project_summary(project.name, project.trade_focus)
    gaps = db.query(Gap).filter(Gap.project_id == project_id).all()
    risks = db.query(Risk).filter(Risk.project_id == project_id).all()
    from app.models.schema import RFI, ScopeItem
    rfis = db.query(RFI).filter(RFI.project_id == project_id).all()
    scopes = db.query(ScopeItem).filter(ScopeItem.project_id == project_id).all()
    
    report_data = {
        "project_id": project.id,
        "project_name": project.name,
        "trade_focus": project.trade_focus,
        "status": project.status,
        "summary": summary,
        "scope_items_count": len(scopes),
        "scope_items": [{"csi": s.csi_code, "desc": s.description, "qty": s.quantity, "unit": s.unit, "cost": s.unit_cost, "status": s.status} for s in scopes],
        "scope_gaps_count": len(gaps),
        "scope_gaps": [{"title": g.title, "severity": g.severity, "cost_impact": g.cost_impact, "status": g.status} for g in gaps],
        "risks_count": len(risks),
        "risks": [{"category": r.category, "severity": r.severity, "exposure": r.exposure, "mitigation": r.mitigation} for r in risks],
        "rfis_count": len(rfis),
        "rfis": [{"rfi_no": r.rfi_no, "subject": r.subject, "status": r.status} for r in rfis]
    }
    
    if export_format.lower() in ["markdown", "md"]:
        md_text = f"# 🏗️ BidPilot AI Comprehensive Tender Report\n\n"
        md_text += f"**Project:** {project.name} | **Trade:** {project.trade_focus}\n\n"
        md_text += f"## 1. Executive Summary\n{summary.get('executive_brief', '')}\n\n"
        md_text += f"## 2. Identified Scope Gaps ({len(gaps)})\n"
        for g in gaps:
            md_text += f"- **[{g.severity}] {g.title}**: {g.description} (Impact: ${g.cost_impact:,.2f}) [{g.status}]\n"
        md_text += f"\n## 3. Bid Risk Matrix ({len(risks)})\n"
        for r in risks:
            md_text += f"- **[{r.severity}] {r.category}**: {r.description} (Exposure: ${r.exposure:,.2f})\n"
        md_text += f"\n## 4. RFIs Drafted ({len(rfis)})\n"
        for rf in rfis:
            md_text += f"- **{rf.rfi_no}**: {rf.subject} [{rf.status}]\n"
        return {"format": "markdown", "content": md_text}
        
    return report_data
