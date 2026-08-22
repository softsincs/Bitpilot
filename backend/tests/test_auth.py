import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.core.security import get_password_hash, verify_password, validate_password_strength, create_access_token, decode_access_token
from datetime import timedelta

client = TestClient(app)

def test_password_strength_validator():
    # Too short
    valid, msg = validate_password_strength("Short1!")
    assert not valid
    assert "at least 8 characters" in msg

    # No uppercase
    valid, msg = validate_password_strength("password123!")
    assert not valid
    assert "uppercase" in msg

    # No lowercase
    valid, msg = validate_password_strength("PASSWORD123!")
    assert not valid
    assert "lowercase" in msg

    # No digit
    valid, msg = validate_password_strength("Password!!!!")
    assert not valid
    assert "digit" in msg

    # No special char
    valid, msg = validate_password_strength("Password123")
    assert not valid
    assert "special character" in msg

    # Valid strong password
    valid, msg = validate_password_strength("StrongPass2026!")
    assert valid

def test_password_hashing_and_verification():
    raw_pwd = "EstimatorSecure2026!"
    hashed = get_password_hash(raw_pwd)
    
    assert hashed.startswith("pbkdf2_sha256$")
    assert verify_password(raw_pwd, hashed)
    assert not verify_password("WrongPassword123!", hashed)
    assert not verify_password("", hashed)
    assert not verify_password(raw_pwd, "")

def test_jwt_token_generation_and_decoding():
    email = "estimator_test@bidpilot.ai"
    role = "Preconstruction_Manager"
    token = create_access_token(subject=email, role=role)
    
    payload = decode_access_token(token)
    assert payload is not None
    assert payload["sub"] == email
    assert payload["role"] == role

def test_expired_token_handling():
    email = "expired_test@bidpilot.ai"
    # Token expired 10 minutes ago
    token = create_access_token(subject=email, expires_delta=timedelta(minutes=-10))
    payload = decode_access_token(token)
    assert payload is None

import uuid

def test_register_and_login_flow():
    unique_id = uuid.uuid4().hex[:8]
    test_email = f"test_user_{unique_id}@contractor.com"

    
    # 1. Register with mismatched confirm password
    mismatch_resp = client.post("/api/v1/auth/register", json={
        "name": "Test Estimator",
        "email": test_email,
        "password": "ValidPassword2026!",
        "confirm_password": "DifferentPassword2026!",
        "company_name": "Test Builders LLC",
        "role": "Estimator"
    })
    assert mismatch_resp.status_code == 422

    # 2. Register with weak password
    weak_resp = client.post("/api/v1/auth/register", json={
        "name": "Test Estimator",
        "email": test_email,
        "password": "weak",
        "confirm_password": "weak",
        "company_name": "Test Builders LLC",
        "role": "Estimator"
    })
    assert weak_resp.status_code == 422

    # 3. Register valid user
    reg_resp = client.post("/api/v1/auth/register", json={
        "name": "Test Estimator",
        "email": test_email,
        "password": "ValidPassword2026!",
        "confirm_password": "ValidPassword2026!",
        "company_name": "Test Builders LLC",
        "role": "Estimator"
    })
    assert reg_resp.status_code in [200, 201]
    reg_data = reg_resp.json()
    assert "access_token" in reg_data
    assert reg_data["email"] == test_email.lower()
    assert reg_data["role"] == "Estimator"

    # 4. Duplicate registration rejected
    dup_resp = client.post("/api/v1/auth/register", json={
        "name": "Test Estimator",
        "email": test_email,
        "password": "ValidPassword2026!",
        "confirm_password": "ValidPassword2026!",
        "company_name": "Test Builders LLC"
    })
    assert dup_resp.status_code == 400

    # 5. Successful login
    login_resp = client.post("/api/v1/auth/login", json={
        "email": test_email,
        "password": "ValidPassword2026!"
    })
    assert login_resp.status_code == 200
    login_data = login_resp.json()
    assert "access_token" in login_data
    assert login_data["email"] == test_email.lower()

    # 6. Invalid password login
    bad_login = client.post("/api/v1/auth/login", json={
        "email": test_email,
        "password": "WrongPassword123!"
    })
    assert bad_login.status_code == 401
