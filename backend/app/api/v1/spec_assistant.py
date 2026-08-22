from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.models.database import get_db
from app.schemas.pydantic_models import AskQuestionRequest, AskQuestionResponse
from app.services.rag_service import RAGService

router = APIRouter(tags=["AI Spec Assistant (pgvector RAG)"])

@router.post("/projects/{project_id}/ask", response_model=AskQuestionResponse)
def ask_spec_assistant(project_id: int, request: AskQuestionRequest, db: Session = Depends(get_db)):
    req_query = request.query or request.question
    if not req_query:
        raise HTTPException(status_code=400, detail="Query cannot be empty")
        
    response = RAGService.ask(
        query=req_query,
        csi_filter=request.csi_division_filter,
        project_id=project_id,
        db=db
    )
    return response

@router.post("/projects/ask", response_model=AskQuestionResponse)
@router.post("/spec_assistant/ask", response_model=AskQuestionResponse)
def ask_global_assistant(request: AskQuestionRequest, db: Session = Depends(get_db)):
    req_query = request.query or request.question
    if not req_query:
        raise HTTPException(status_code=400, detail="Query cannot be empty")
        
    response = RAGService.ask(
        query=req_query,
        csi_filter=request.csi_division_filter,
        project_id=request.project_id if hasattr(request, "project_id") else None,
        db=db
    )
    return response

