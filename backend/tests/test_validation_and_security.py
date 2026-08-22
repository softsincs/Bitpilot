import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_project_create_validation():
    # Empty project name
    resp = client.post("/api/v1/projects", json={
        "name": "   ",
        "trade_focus": "General Contractor"
    })
    assert resp.status_code == 422
    data = resp.json()
    assert data["success"] is False
    assert data["error"]["code"] == "VALIDATION_ERROR"

    # Negative estimated value
    resp2 = client.post("/api/v1/projects", json={
        "name": "Valid Project Name",
        "estimated_value": -5000.0
    })
    assert resp2.status_code == 422

    # Malicious XSS string payload handled cleanly
    xss_payload = "<script>alert('XSS')</script> Commercial Warehouse"
    resp3 = client.post("/api/v1/projects", json={
        "name": xss_payload,
        "trade_focus": "General Contractor",
        "location": "Dallas, TX"
    })
    assert resp3.status_code == 201
    assert resp3.json()["name"] == xss_payload

def test_rfi_validation():
    # Create project first
    proj_resp = client.post("/api/v1/projects", json={
        "name": "RFI Validation Project",
        "trade_focus": "Electrical"
    })
    assert proj_resp.status_code == 201
    proj_id = proj_resp.json()["id"]

    # Short subject (<3 chars)
    resp = client.post(f"/api/v1/projects/{proj_id}/rfis", json={
        "subject": "Hi",
        "question": "What is the conduit spec?"
    })
    assert resp.status_code == 422

    # Short question (<5 chars)
    resp2 = client.post(f"/api/v1/projects/{proj_id}/rfis", json={
        "subject": "Conduit Specification Conflict",
        "question": "Why?"
    })
    assert resp2.status_code == 422

    # Valid RFI creation
    resp3 = client.post(f"/api/v1/projects/{proj_id}/rfis", json={
        "subject": "Switchgear Feeder Conductor Material",
        "question": "Drawing Sheet E-401 lists copper conductors while note specifies aluminum. Please clarify.",
        "proposed_resolution": "Bid on copper feeder conductors."
    })
    assert resp3.status_code == 200
    assert resp3.json()["subject"] == "Switchgear Feeder Conductor Material"

def test_scope_item_validation():
    proj_resp = client.post("/api/v1/projects", json={
        "name": "Scope Validation Project"
    })
    proj_id = proj_resp.json()["id"]

    # Invalid negative quantity
    resp = client.post(f"/api/v1/projects/{proj_id}/scope", json={
        "csi_code": "03 30 00",
        "description": "Foundation Concrete",
        "quantity": -100.0,
        "unit_cost": 420.0
    })
    assert resp.status_code == 422

    # Valid scope item
    resp2 = client.post(f"/api/v1/projects/{proj_id}/scope", json={
        "csi_code": "03 30 00",
        "description": "Foundation Slab-on-Grade 4000 PSI",
        "quantity": 550.0,
        "unit_cost": 380.0
    })
    assert resp2.status_code == 200
    assert resp2.json()["csi_code"] == "03 30 00"

def test_security_headers_present():
    resp = client.get("/api/v1/health")
    assert resp.status_code == 200
    assert resp.headers.get("X-Content-Type-Options") == "nosniff"
    assert resp.headers.get("X-Frame-Options") == "DENY"
    assert resp.headers.get("X-XSS-Protection") == "1; mode=block"

def test_nonexistent_route_sanitized_error():
    resp = client.get("/api/v1/nonexistent-endpoint-12345")
    assert resp.status_code == 404
    data = resp.json()
    assert data["success"] is False
    assert "error" in data
