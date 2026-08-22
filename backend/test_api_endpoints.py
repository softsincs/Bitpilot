import asyncio
import httpx
from app.main import app

async def run_tests():
    print("=== STARTING BIDPILOT AI API ENDPOINT TESTS ===", flush=True)
    
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://testserver") as client:
        # 1. Health check
        res = await client.get("/api/v1/health")
        assert res.status_code == 200, f"Health check failed: {res.text}"
        print(f"[PASS] 1. Health Check: {res.json()}", flush=True)
        
        # 2. Create Project
        proj_payload = {
            "name": "Midwest Regional Medical Center Phase 2",
            "trade_focus": "General Contractor",
            "user_email": "estimator@apexhorizon.com",
            "location": "Chicago, IL",
            "estimated_value": 4850000.0,
            "sqft": 65000.0
        }
        res = await client.post("/api/v1/projects", json=proj_payload)
        assert res.status_code == 200, f"Create project failed: {res.text}"
        project = res.json()
        proj_id = project["id"]
        print(f"[PASS] 2. Project Created (ID: {proj_id}): {project['name']}", flush=True)
        
        # 3. Document Ingestion
        doc_res = await client.post(
            f"/api/v1/projects/{proj_id}/documents",
            files={"file": ("Drawing_Sheet_E401_Emergency_Power.pdf", b"%PDF-1.4 simulated binary drawing stream", "application/pdf")},
            data={"doc_type": "drawing"}
        )
        assert doc_res.status_code == 200, f"Upload document failed: {doc_res.text}"
        print(f"[PASS] 3. Document Uploaded & Ingested: {doc_res.json()['name']}", flush=True)
        
        # 4. Pipeline Status
        status_res = await client.get(f"/api/v1/projects/{proj_id}/status")
        assert status_res.status_code == 200, f"Status check failed: {status_res.text}"
        print(f"[PASS] 4. Pipeline Status: {status_res.json()['vector_indexing_status']}", flush=True)
        
        # 5. Scope Items Checklist
        scope_res = await client.get(f"/api/v1/projects/{proj_id}/scope")
        assert scope_res.status_code == 200, f"Get scope failed: {scope_res.text}"
        scopes = scope_res.json()
        assert len(scopes) > 0
        print(f"[PASS] 5. Scope Items Retrieved ({len(scopes)} items)", flush=True)
        
        # Update scope status (Approve)
        item_id = scopes[0]["id"]
        patch_res = await client.patch(f"/api/v1/projects/{proj_id}/scope/{item_id}", json={"status": "verified"})
        assert patch_res.status_code == 200
        print("[PASS] 5b. Scope Item Status Updated to 'verified'", flush=True)
        
        # 6. Scope Gaps Report
        gaps_res = await client.get(f"/api/v1/projects/{proj_id}/scope-gaps")
        assert gaps_res.status_code == 200
        gaps = gaps_res.json()
        print(f"[PASS] 6. Scope Gaps Retrieved ({len(gaps)} gaps detected)", flush=True)
        
        # 7. Risk Analysis
        risks_res = await client.get(f"/api/v1/projects/{proj_id}/risks")
        assert risks_res.status_code == 200
        risks = risks_res.json()
        print(f"[PASS] 7. Risks Retrieved ({len(risks)} risk exposures)", flush=True)
        
        # 8. RFI Generator & Management
        rfis_res = await client.get(f"/api/v1/projects/{proj_id}/rfis")
        assert rfis_res.status_code == 200
        rfis = rfis_res.json()
        print(f"[PASS] 8. RFIs Listed ({len(rfis)} RFIs)", flush=True)
        
        # 9. Comments & Collaboration
        comment_res = await client.post(
            f"/api/v1/projects/{proj_id}/comments",
            json={"user_id": None, "target_type": "gap", "target_id": gaps[0]["id"], "text": "Architect confirmed this in Addendum 2 meeting."}
        )
        assert comment_res.status_code == 200
        print("[PASS] 9. Comment Added for Team Collaboration", flush=True)
        
        # 10. Vision Diff Drawing Comparison
        diff_res = await client.post(f"/api/v1/projects/{proj_id}/drawings/diff?sheet_no=E-401")
        assert diff_res.status_code == 200
        diff_data = diff_res.json()
        print(f"[PASS] 10. Vision Diff Computed: {diff_data['changes_detected']} changes detected (Net Impact: ${diff_data['net_cost_impact']})", flush=True)
        
        # 11. AI Spec Assistant RAG Q&A
        rag_res = await client.post(
            f"/api/v1/projects/{proj_id}/ask",
            json={"query": "What is the concrete compressive strength required for shear walls?"}
        )
        assert rag_res.status_code == 200
        rag_data = rag_res.json()
        print(f"[PASS] 11. AI Spec Copilot Q&A: Citations Count = {len(rag_data['citations'])}, Latency = {rag_data['latency_ms']}ms", flush=True)
        
        # 12. Export Report
        exp_res = await client.get(f"/api/v1/projects/{proj_id}/export/markdown")
        assert exp_res.status_code == 200
        print("[PASS] 12. Project Tender Report Exported (Markdown)", flush=True)
        
        print("\n[SUCCESS] ALL 12 ARCHITECTURAL MODULES PASSED VALIDATION WITH 100% SUCCESS!", flush=True)

if __name__ == "__main__":
    asyncio.run(run_tests())
