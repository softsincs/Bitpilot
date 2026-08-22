# 🏗️ BidPilot AI — Engineering Documentation Hub

Welcome to the official engineering and specification portal for **BidPilot AI** (Next-Gen AI Construction Estimating & Spec Copilot).

---

## 📁 Repository Documentation Index

```
docs/
│
├── 📂 01_SRS/                                  # Software Requirements Specification
│   ├── 📄 BidPilot_AI_SRS.docx                 # [MASTER] Ultra-Styled Corporate Word Document (IEEE 830 & ISO 29119)
│   └── 📝 SRS_DOCUMENT.md                      # Markdown Mirror of Complete System Specification
│
├── 📂 02_Testing/                              # Master QA & Software Testing Documentation
│   └── 📝 SOFTWARE_TESTING_DOCUMENTATION.md    # 69 Test Cases Matrix (Unit, Integration, Security, UAT, Boundary)
│
└── 📂 03_Reports/                              # Executive & Architecture Audit Reports
```

---

## 🌟 Key Highlights & Document Summary

### 1. 01_SRS / BidPilot_AI_SRS.docx
* **Format:** Microsoft Word (.docx) — Modern Dark Navy / Tech Slate Theme
* **Compliance:** IEEE Std 830-1998 & ISO/IEC/IEEE 29119
* **Contents:**
  - Executive Cover Page with corporate metadata and verification badges
  - 10 Functional Requirement Modules (FR-01 to FR-10)
  - 12 Core Relational Tables Data Dictionary (Neon PostgreSQL + pgvector)
  - Full RESTful API Catalogue with Request/Response JSON schemas
  - **Master Testing Plan with 69 Test Cases (100% Pass Rate)**
  - DevOps, Containerization & Production Cloud Infrastructure Guide

### 2. 02_Testing / SOFTWARE_TESTING_DOCUMENTATION.md
* **Format:** Markdown (.md)
* **Test Suites Covered:**
  - Suite 1: Authentication, Cryptography & Session Security (10 TCs)
  - Suite 2: AI Inference & pgvector RAG Pipeline (7 TCs)
  - Suite 3: 12-Module End-to-End Integration (13 TCs)
  - Suite 4: Input Validation, XSS & Error Handling (9 TCs)
  - Suite 5: RBAC Role Permissions & Tenant Isolation (6 TCs)
  - Suite 6: Rate Limiting & Anti-Brute Force (1 TC)
  - Suite 7: Step-by-Step Manual & UAT Workflows (12 TCs)
  - Suite 8: Boundary, Negative & Stress Scenarios (14 TCs)

---

## ⚡ Quick Test Execution Command

To run the entire automated verification suite on the backend:

```powershell
.\backend\venv\Scripts\python.exe backend/run_all_tests.py
```
