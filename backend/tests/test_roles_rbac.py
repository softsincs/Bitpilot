import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.core.security import create_access_token

client = TestClient(app)

def test_rbac_roles_permissions():
    # 1. Create a project
    proj_resp = client.post("/api/v1/projects", json={
        "name": "RBAC Security Test Tower",
        "trade_focus": "Commercial GC"
    })
    assert proj_resp.status_code == 201
    proj_id = proj_resp.json()["id"]

    # 2. Token with role 'Estimator' attempting to DELETE project -> should be FORBIDDEN (403)
    estimator_token = create_access_token(subject="estimator_user@company.com", role="Estimator")
    del_resp_estimator = client.delete(
        f"/api/v1/projects/{proj_id}",
        headers={"Authorization": f"Bearer {estimator_token}"}
    )
    assert del_resp_estimator.status_code == 403
    assert "Estimators cannot delete projects" in del_resp_estimator.json()["error"]["message"]

    # 3. Token with role 'Admin' attempting to DELETE project -> should SUCCEED (200)
    admin_token = create_access_token(subject="admin_user@company.com", role="Admin")
    del_resp_admin = client.delete(
        f"/api/v1/projects/{proj_id}",
        headers={"Authorization": f"Bearer {admin_token}"}
    )
    assert del_resp_admin.status_code == 200
    assert del_resp_admin.json()["success"] is True

def test_user_project_isolation():
    user1_email = "user_alpha@construction.com"
    user2_email = "user_beta@construction.com"

    # User 1 creates project
    client.post("/api/v1/projects", json={
        "name": "Alpha Dedicated Project",
        "user_email": user1_email
    })

    # User 2 creates project
    client.post("/api/v1/projects", json={
        "name": "Beta Dedicated Project",
        "user_email": user2_email
    })

    # Querying projects for User 1 only returns User 1's projects
    resp1 = client.get(f"/api/v1/projects?user_email={user1_email}")
    assert resp1.status_code == 200
    projects_alpha = resp1.json()
    assert all(p["user_email"] == user1_email for p in projects_alpha)
    assert any(p["name"] == "Alpha Dedicated Project" for p in projects_alpha)
    assert not any(p["name"] == "Beta Dedicated Project" for p in projects_alpha)
