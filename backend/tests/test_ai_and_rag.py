import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.services.llm_service import LLMService
from app.services.rag_service import RAGService

client = TestClient(app)

def test_llm_service_empty_query():
    res = LLMService.call_groq("")
    assert res["success"] is False
    assert res["error"] == "EMPTY_PROMPT"

def test_llm_service_prompt_sanitization():
    # Long query over 3000 chars is safely handled
    long_prompt = "Concrete mix specification query " * 150
    res = LLMService.call_groq(long_prompt)
    assert isinstance(res, dict)
    assert "content" in res

def test_rag_service_retrieval_and_citations():
    # Concrete question
    resp = RAGService.ask("What is the compressive strength requirement for foundation shear walls in 03 30 00?")
    assert resp.status == "success"
    assert len(resp.citations) > 0
    assert "03 30 00" in resp.citations[0].section_code
    assert "6,000 psi" in resp.citations[0].excerpt or "6,000" in resp.answer

    # Electrical question
    resp_elec = RAGService.ask("What fuel piping is required for the emergency generator in 26 32 13?")
    assert len(resp_elec.citations) > 0
    assert "26 32 13" in resp_elec.citations[0].section_code
    assert "leak detection" in resp_elec.citations[0].excerpt.lower()

    # Empty question
    resp_empty = RAGService.ask("   ")
    assert resp_empty.status == "empty_query"

def test_spec_assistant_api_endpoint():
    # Create project first
    proj = client.post("/api/v1/projects", json={"name": "AI Spec Test Project"}).json()
    proj_id = proj["id"]

    # Valid question via API
    resp = client.post(f"/api/v1/projects/{proj_id}/ask", json={
        "question": "What is the HVAC ductwork fabrication standard?"
    })
    assert resp.status_code == 200
    data = resp.json()
    assert "answer" in data
    assert len(data["citations"]) > 0
    assert "23 31 13" in data["citations"][0]["section_code"]
    assert "SMACNA" in data["citations"][0]["excerpt"]

    # Empty question -> 400 Bad Request
    resp_empty = client.post(f"/api/v1/projects/{proj_id}/ask", json={})
    assert resp_empty.status_code == 400
