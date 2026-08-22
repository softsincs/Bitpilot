# 🏗️ BidPilot AI — Comprehensive Manual Testing Guide

**Autonomous Pre-Construction & Bid Intelligence Platform for Commercial General Contractors and Specialty Trades**

---

## 1. Executive Summary & Purpose

### What type of application is this?
BidPilot AI is a specialized cloud platform engineered for North American commercial general contractors, pre-construction executives, and specialty trade estimators. It combines **FastAPI**, **pgvector CSI MasterFormat specification retrieval**, **Vision Diff architectural blueprint comparison**, and **Groq LPU LLM inference** into a unified 24-module workspace.

### What problem does it solve?
In commercial construction estimating, missing uncaptured plan addenda or specification requirements (e.g., generator fuel line double-wall containment, concrete PSI compressive strength changes) leads to massive $50,000+ budget overruns and contractor disputes. BidPilot AI eliminates scope gaps by cross-referencing hundreds of blueprint sheets in seconds, automatically drafting formal RFIs to the Architect of Record, and isolating visual delta revisions.

### Who are the intended users?
- **Chief Estimators & Senior Takeoff Specialists**
- **Commercial General Contractors (GCs)**
- **Specialty Trade Subcontractors** (Concrete, Electrical, Mechanical/HVAC, Plumbing, Finishes)
- **Preconstruction Managers & Project Executives**

---

## 2. Dynamic User Roles & Permissions Matrix

| User Role | View Projects & Takeoffs | Ask AI Spec Copilot | Run Blueprint Vision Diff | Create & Edit RFIs | Delete Projects & RFIs | Generate Executive Reports | System Admin Controls |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Estimator** | ✅ | ✅ | ✅ | Draft Only | ❌ | View Only | ❌ |
| **Bid_Manager** | ✅ | ✅ | ✅ | ✅ Full Edit | ✅ | ✅ | ❌ |
| **Preconstruction_Manager** | ✅ | ✅ | ✅ | ✅ Full Edit | ✅ | ✅ Export | ❌ |
| **Admin** | ✅ | ✅ | ✅ | ✅ Full Edit | ✅ Full Delete | ✅ Export | ✅ Full Control |

---

## 3. Account Creation, Login & Session Management

### How to Create an Account:
1. Navigate to the top navigation bar and click **ACCOUNT / LOGIN** or visit the `#account` URL hash.
2. Under the Login box, click **CREATE AN ACCOUNT** or click the **GET STARTED** button on the right.
3. Fill in the required registration fields:
   - **Full Name**: (e.g., `John Doe`)
   - **E-Mail Address**: Must be a valid email format (e.g., `john@horizonbuilders.com`).
   - **Company / Organization Name**: (e.g., `Apex Horizon Builders LLC`)
   - **Role & Permission Level**: Select one of `Estimator`, `Bid Manager`, `Preconstruction Manager`, or `Admin`.
   - **Create Password**: Must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.
   - **Confirm Password**: Must match the created password exactly.
4. Observe the live **Password Strength Meter** (Weak $\rightarrow$ Medium $\rightarrow$ Strong $\rightarrow$ Very Strong) and the real-time **Passwords Match** badge.
5. Click **REGISTER & ACTIVATE**.
6. A success message will appear confirming account creation and prefilling your login email.

### How to Log In:
1. Enter your registered email address and password.
2. Click **LOGIN**.
3. Upon authentication, you will be redirected into the **BidPilot AI Contractor Hub** with your name and assigned role displayed in the top navbar.

### How to Log Out:
1. In the top-right user menu of the Contractor Hub, click **Sign out**.
2. All active JWT session tokens and user state are securely flushed from local storage.

---

## 4. Step-by-Step Core Workflows & Feature Testing

### Workflow A: Commercial Project Creation & Isolation
1. From the Hub Dashboard, click **New Tender Project** or **Create Project**.
2. **Inputs**:
   - Project Name: `Apex Regional Medical Center Expansion`
   - Client / General Contractor: `Turner Construction`
   - Location: `Dallas, TX`
   - Trade Focus: `General Contractor` / `Electrical`
3. **Expected Result**: The project is saved to the backend database with isolated tenant ownership and rendered instantly in your Active Projects list.

---

### Workflow B: AI Spec & Drawing Copilot (pgvector RAG)
1. Open any project in the workspace and click **AI Spec Copilot** (or bottom floating button).
2. **Test Prompts & Expected Results**:
   - **Query 1**: `"What is the compressive strength requirement for foundation shear walls in Section 03 30 00?"`
     - *Expected Output*: AI returns minimum $f'c = 6,000\text{ psi}$ with citation `Project Manual Vol. 2, Page 14, §2.03.B — Division 03 Concrete`.
   - **Query 2**: `"What fuel piping is required for the emergency generator in 26 32 13?"`
     - *Expected Output*: AI cites Schedule 40 seamless black steel with dual-wall interstitial leak detection and FACP solenoid shutoff.
   - **Query 3 (Empty Query)**: Submit a blank prompt.
     - *Expected Output*: Helpful validation guidance prompting a valid specification query without crashing.

---

### Workflow C: Tri-Mode Blueprint Vision Diff Comparison
1. In the Project Studio, open the **Drawings & Revision Sets** tab.
2. Select sheet `E-401_Electrical_Power_Plan.pdf`.
3. Click **Launch Vision Diff (Rev 0 vs Rev 1 Addendum #01)**.
4. Toggle between comparison modes:
   - **Split Comparison**: Side-by-side view with zoom and pan.
   - **Overlay Blueprint**: Red/blue high-contrast layer overlay with revision clouds (`Δ1`).
   - **Delta Discrepancies**: Isolated change list tagging dollar exposure (e.g. `+$42,500 Scope Add` for dual-wall containment).
5. Click **Promote to PCO (Potential Change Order)** to incorporate the delta directly into the bid ledger.

---

### Workflow D: Automated RFI Generation & CSI Gap Matrix
1. In the Project Studio, open the **RFIs & Scope Gaps** tab.
2. Click **Auto-Generate RFIs with AI**.
3. **Expected Result**: BidPilot drafts formal RFIs (e.g. `RFI-001: Emergency Generator Fuel Line Specification Conflict`), complete with question, proposed resolution, and CSI Division references ready for export to PDF/Markdown.

---

## 5. Failure & Boundary Testing Scenarios

| Scenario | Input / Action | Expected Behavior |
|---|---|---|
| **Invalid Email** | `invalid-email-string` | Form highlights input and displays `"Please enter a valid email format"` |
| **Password Mismatch** | Password: `Password123!` / Confirm: `Mismatch999!` | Submit disabled; displays `"Passwords do not match"` |
| **Weak Password** | `weakpass` | Displays `"Password must be at least 8 characters long"` |
| **Duplicate Registration** | Register with existing user email | Returns HTTP 400 with `"An account with this email address is already registered"` |
| **Brute Force Login** | 20+ login requests in under 1 minute | Server returns HTTP 429 `"Rate limit exceeded. Please try again in 60s"` |
| **Unauthorized Action** | Estimator role calling `DELETE /api/v1/projects/{id}` | Server returns HTTP 403 Forbidden with `"Estimators cannot delete projects"` |
| **Upstream AI Timeout** | AI provider down or delayed $>10\text{s}$ | Gracefully falls back to verifiable CSI MasterFormat spec citations without crashing |

---

## 6. How to Run Automated Verification Tests

Execute all unit, integration, and security tests using the dedicated virtual environment:

```bash
# Backend Automated Test Suite (17/17 tests)
.\backend\venv\Scripts\python.exe backend/run_all_tests.py

# Frontend Type-check & Production Bundle Build
npm run build
```
