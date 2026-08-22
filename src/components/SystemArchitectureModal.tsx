import React, { useState } from 'react';
import { 
  X, 
  Cpu, 
  Database, 
  Layers, 
  Workflow, 
  Code2, 
  Lock,
  Cloud,
  ShieldCheck,
  TrendingUp,
  Server,
  Terminal,
  FileCheck2,
  ChevronRight,
  Copy,
  Check
} from 'lucide-react';

interface SystemArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SystemArchitectureModal: React.FC<SystemArchitectureModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'layers' | 'pipeline' | 'database' | 'api' | 'infra' | 'roadmap'>('overview');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopySpec = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="bg-[#030d1d] border border-blue-500/40 rounded-3xl max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Top Bar */}
        <div className="bg-[#011426] p-4 sm:p-6 border-b border-blue-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white font-['Outfit']">
                  BidPilot AI — Complete System Architecture & Project Flow
                </h3>
                <span className="px-2 py-0.5 rounded bg-blue-950 text-cyan-300 text-[10px] font-bold border border-cyan-800">
                  U.S. Commercial Construction Spec
                </span>
              </div>
              <p className="text-xs text-slate-400">
                AI Construction Estimator Copilot for U.S. Commercial General Contractors & Subcontractors
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Tabs Bar */}
        <div className="bg-[#020b18] px-6 pt-2 border-b border-slate-800 flex gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#041226] text-cyan-300 border-t-2 border-x border-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>1. Executive Summary & Topology</span>
          </button>

          <button
            onClick={() => setActiveTab('layers')}
            className={`px-3.5 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === 'layers'
                ? 'bg-[#041226] text-cyan-300 border-t-2 border-x border-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>2. Component Breakdown</span>
          </button>

          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-3.5 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === 'pipeline'
                ? 'bg-[#041226] text-cyan-300 border-t-2 border-x border-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Workflow className="w-3.5 h-3.5" />
            <span>3. End-to-End Data Pipeline</span>
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`px-3.5 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === 'database'
                ? 'bg-[#041226] text-cyan-300 border-t-2 border-x border-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>4. PostgreSQL + pgvector Schema</span>
          </button>

          <button
            onClick={() => setActiveTab('api')}
            className={`px-3.5 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === 'api'
                ? 'bg-[#041226] text-cyan-300 border-t-2 border-x border-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>5. FastAPI Endpoints</span>
          </button>

          <button
            onClick={() => setActiveTab('infra')}
            className={`px-3.5 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === 'infra'
                ? 'bg-[#041226] text-cyan-300 border-t-2 border-x border-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cloud className="w-3.5 h-3.5" />
            <span>6. Infra & Security</span>
          </button>

          <button
            onClick={() => setActiveTab('roadmap')}
            className={`px-3.5 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === 'roadmap'
                ? 'bg-[#041226] text-cyan-300 border-t-2 border-x border-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>7. Phased Rollout & SaaS Fit</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs text-slate-300">
          
          {/* TAB 1: EXECUTIVE SUMMARY & TOPOLOGY */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Section 1: Executive Summary */}
              <div className="p-5 rounded-2xl bg-[#010914] border border-blue-500/30 space-y-3">
                <h4 className="text-sm font-bold text-cyan-300 uppercase tracking-wider font-['Outfit']">
                  1. Executive Summary
                </h4>
                <p className="leading-relaxed text-slate-300">
                  <strong>BidPilot AI</strong> is an AI-powered copilot that helps commercial construction estimators analyze drawings, specifications, BOQs, and tender documents faster and more accurately — <em>without replacing the estimator’s judgment</em>. This document defines the complete technical architecture: system layers, data flow, AI pipeline, database design, API structure, infrastructure, security, and phased rollout.
                </p>
              </div>

              {/* Section 2: High-Level System Architecture Diagram */}
              <div className="p-5 rounded-2xl bg-[#010914] border border-blue-500/30 space-y-4">
                <h4 className="text-sm font-bold text-cyan-300 uppercase tracking-wider font-['Outfit']">
                  2. High-Level System Architecture
                </h4>

                {/* ASCII Diagram Box */}
                <div className="p-4 rounded-xl bg-black border border-blue-900/80 font-mono text-[11px] text-cyan-400 overflow-x-auto leading-relaxed">
                  <pre>{`┌─────────────────────────────────────────────────────────────────┐
│ FRONTEND — Next.js + React + Tailwind CSS                       │
│ Upload UI · Chat/Q&A · Reports · Team Dashboard · Bid Workspace │
└───────────────────────────────┬─────────────────────────────────┘
                                │ REST / WebSocket
┌───────────────────────────────▼─────────────────────────────────┐
│ BACKEND API — FastAPI (Python)                                  │
│ Auth (JWT/OAuth) · Project Mgmt · Orchestration · Rate Limiting │
└───────────────────────────────┬─────────────────────────────────┘
                                │
        ┌───────────────────────┼────────────────────────┐
        ▼                       ▼                        ▼
┌───────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   AI LAYER    │     │    DATA LAYER    │     │   ASYNC LAYER    │
│  OCR Engine   │     │  PostgreSQL +    │     │  Redis Queue +   │
│  Vector RAG   │     │    pgvector      │     │  Celery Workers  │
│  LLM Engine   │     │  S3 (raw docs)   │     │  (long-running   │
│  Vision Diff  │     │                  │     │    AI jobs)      │
└───────────────┘     └──────────────────┘     └──────────────────┘`}</pre>
                </div>

                {/* Design Principle Callout */}
                <div className="p-4 rounded-xl bg-blue-950/60 border border-blue-800/60 space-y-1.5">
                  <strong className="text-white text-xs block">Architectural Design Principle:</strong>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    The frontend never talks to the AI layer directly. All AI calls are orchestrated by FastAPI, queued through Redis/Celery for anything longer than a few seconds (OCR, embeddings, drawing diff, LLM analysis), and results are streamed/polled back to the UI.
                  </p>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: COMPONENT BREAKDOWN */}
          {activeTab === 'layers' && (
            <div className="space-y-6">
              <h4 className="text-sm font-bold text-cyan-300 uppercase tracking-wider font-['Outfit']">
                3. Component Breakdown
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* 3.1 Frontend — Next.js */}
                <div className="p-5 rounded-xl bg-[#010914] border border-blue-500/30 space-y-2.5">
                  <span className="font-bold text-white uppercase text-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    3.1 Frontend — Next.js + React
                  </span>
                  <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                    <li>• <strong>Upload module:</strong> drag-and-drop for PDFs (drawings, specs, BOQ, addenda), chunked upload for large files (drawing sets can be 500MB+).</li>
                    <li>• <strong>Chat interface:</strong> natural-language Q&A against project documents (spec assistant).</li>
                    <li>• <strong>Reports view:</strong> scope gap report, risk report, RFI list, project summary — all exportable (PDF/Word/Excel).</li>
                    <li>• <strong>Team dashboard:</strong> project list, document status, comments, approvals, bid status tracker.</li>
                    <li>• <strong>Drawing viewer:</strong> PDF/CAD viewer with overlay markup for detected changes (diff engine output).</li>
                  </ul>
                </div>

                {/* 3.2 Backend API — FastAPI */}
                <div className="p-5 rounded-xl bg-[#010914] border border-blue-500/30 space-y-2.5">
                  <span className="font-bold text-white uppercase text-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-400" />
                    3.2 Backend API — FastAPI (Python)
                  </span>
                  <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                    <li>• <strong>Auth:</strong> JWT-based session auth, role-based access control (Estimator, Bid Manager, Preconstruction Manager, Admin).</li>
                    <li>• <strong>Project orchestration:</strong> creates a processing pipeline per uploaded document set, tracks job status.</li>
                    <li>• <strong>Job dispatcher:</strong> pushes heavy tasks (OCR, embedding, LLM analysis, vision diff) to Redis queue.</li>
                    <li>• <strong>API Gateway pattern:</strong> single entry point for frontend; internally routes to AI microservices.</li>
                  </ul>
                </div>

                {/* 3.3 AI Layer */}
                <div className="p-5 rounded-xl bg-[#010914] border border-blue-500/30 space-y-2.5">
                  <span className="font-bold text-white uppercase text-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    3.3 AI Layer Engines & Stack
                  </span>
                  <div className="space-y-2 text-[11px]">
                    <div className="p-2 rounded bg-black/60 border border-slate-800">
                      <strong className="text-cyan-300">OCR Engine:</strong> Parses scanned/native PDFs into structured text + layout (Tesseract / AWS Textract / Azure Document Intelligence).
                    </div>
                    <div className="p-2 rounded bg-black/60 border border-slate-800">
                      <strong className="text-cyan-300">Vector RAG:</strong> Chunk + embed specs/drawings text, semantic search for spec assistant (pgvector + OpenAI/Claude embeddings).
                    </div>
                    <div className="p-2 rounded bg-black/60 border border-slate-800">
                      <strong className="text-cyan-300">LLM Engine:</strong> Summarization, scope gap detection, RFI drafting, risk analysis (Claude API structured outputs).
                    </div>
                    <div className="p-2 rounded bg-black/60 border border-slate-800">
                      <strong className="text-cyan-300">Vision Diff:</strong> Compares drawing revisions (raster/vector) to detect changes (OpenCV + CV model for symbol/dimension detection).
                    </div>
                  </div>
                </div>

                {/* 3.4 Data Layer */}
                <div className="p-5 rounded-xl bg-[#010914] border border-blue-500/30 space-y-2.5">
                  <span className="font-bold text-white uppercase text-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    3.4 Data & Storage Layer
                  </span>
                  <ul className="space-y-2 text-slate-300 text-[11px] leading-relaxed">
                    <li>• <strong>PostgreSQL + pgvector:</strong> relational data (projects, users, documents, RFIs, risks) + vector embeddings in the same store to simplify ops.</li>
                    <li>• <strong>AWS S3:</strong> raw document storage (original PDFs, drawing sheets, generated reports).</li>
                    <li>• <strong>Redis Cluster:</strong> job queue + caching (recent search results, session data).</li>
                  </ul>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: END-TO-END DATA FLOW & AI PIPELINE */}
          {activeTab === 'pipeline' && (
            <div className="space-y-6">
              
              {/* Section 4: End-to-End Data Flow */}
              <div className="p-5 rounded-2xl bg-[#010914] border border-blue-500/30 space-y-4">
                <h4 className="text-sm font-bold text-cyan-300 uppercase tracking-wider font-['Outfit']">
                  4. End-to-End Data Flow (Document $\rightarrow$ Bid Decision)
                </h4>

                <div className="space-y-2.5 text-[11px]">
                  {[
                    { step: '1. Upload Documents', desc: 'Estimator uploads drawings, specs, BOQ' },
                    { step: '2. Preprocessing', desc: 'OCR → split by sheet/section → classify (drawing / spec / BOQ / addendum)' },
                    { step: '3. Chunk & Embed', desc: 'Text chunked → embeddings generated → stored in pgvector, linked to source page' },
                    { step: '4. AI Analysis', desc: 'RAG retrieval + LLM agents run: Project summary agent, Scope extraction agent, Gap/conflict detection agent, Risk analysis agent, RFI drafting agent' },
                    { step: '5. Generated Outputs', desc: 'Summary · Scope checklist · Gap report · Risk report · Draft RFIs' },
                    { step: '6. Estimator Review (Mandatory)', desc: 'Approve / edit / reject each AI output. Mandatory human-in-the-loop control point.' },
                    { step: '7. Final Bid Decision', desc: 'Estimator finalizes bid using AI-assisted inputs — AI never submits the bid itself.' },
                  ].map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-black/60 border border-blue-900/60 flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-900 text-cyan-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <div>
                        <strong className="text-white text-xs">{item.step}</strong>
                        <p className="text-slate-300 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-800/50 text-amber-200 text-[11px]">
                  <strong>Key Control Point:</strong> Step 6 is mandatory in the workflow — every AI output is presented as a draft/recommendation, not an auto-applied change. This preserves the “copilot, not autopilot” positioning.
                </div>
              </div>

              {/* Section 5: AI Pipeline Detail */}
              <div className="p-5 rounded-2xl bg-[#010914] border border-blue-500/30 space-y-3">
                <h4 className="text-sm font-bold text-cyan-300 uppercase tracking-wider font-['Outfit']">
                  5. AI Pipeline Detail (Per Document Set)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                  <div className="p-3 rounded-lg bg-black/40 border border-slate-800">
                    <strong className="text-cyan-300">1. Ingestion:</strong> File type detection (native PDF vs scanned), page count, size validation.
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-slate-800">
                    <strong className="text-cyan-300">2. OCR/Parsing:</strong> Text + table extraction; drawing sheets get title-block parsing (sheet no, revision, discipline).
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-slate-800">
                    <strong className="text-cyan-300">3. Classification:</strong> Each page/section tagged (drawing, spec division, BOQ line, addendum) using lightweight classifier.
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-slate-800">
                    <strong className="text-cyan-300">4. Chunking Strategy:</strong> Specs chunked by CSI MasterFormat division/section; drawings chunked by sheet + callouts; BOQ by line item.
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-slate-800">
                    <strong className="text-cyan-300">5. Embedding + Indexing:</strong> Chunks embedded and stored with metadata (project_id, doc_type, sheet_no, page_no) for filtered retrieval.
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-slate-800">
                    <strong className="text-cyan-300">6. Agent Orchestration:</strong> Controller (FastAPI + LangGraph) runs analysis agents with RAG context scoped to relevant trade.
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-slate-800">
                    <strong className="text-cyan-300">7. Structured Output:</strong> Every agent returns structured JSON so frontend renders checklists, tables, and cards.
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-slate-800">
                    <strong className="text-cyan-300">8. Traceability:</strong> Every AI claim links back to a source page/sheet, so the estimator can verify instead of blindly trusting.
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: DATABASE SCHEMA */}
          {activeTab === 'database' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-cyan-300 uppercase tracking-wider font-['Outfit']">
                6. Database Schema (PostgreSQL + pgvector Core Tables)
              </h4>

              <div className="p-5 rounded-2xl bg-[#010914] border border-blue-500/30 font-mono text-[11px] space-y-3 overflow-x-auto">
                <div className="text-slate-300">
                  <span className="text-cyan-400 font-bold">users</span> (id, name, email, role, company_id)
                </div>
                <div className="text-slate-300">
                  <span className="text-cyan-400 font-bold">companies</span> (id, name, plan_tier)
                </div>
                <div className="text-slate-300">
                  <span className="text-cyan-400 font-bold">projects</span> (id, company_id, name, trade_focus, status, created_by)
                </div>
                <div className="text-slate-300">
                  <span className="text-cyan-400 font-bold">documents</span> (id, project_id, type [drawing/spec/boq/addendum], s3_key, status)
                </div>
                <div className="text-slate-300">
                  <span className="text-cyan-400 font-bold">document_pages</span> (id, document_id, page_no, ocr_text, sheet_no, revision)
                </div>
                <div className="text-emerald-300">
                  <span className="text-emerald-400 font-bold">chunks</span> (id, document_page_id, content, <span className="text-amber-400">embedding VECTOR(1536)</span>, metadata)
                </div>
                <div className="text-slate-300">
                  <span className="text-cyan-400 font-bold">scope_items</span> (id, project_id, description, source_ref, status)
                </div>
                <div className="text-slate-300">
                  <span className="text-cyan-400 font-bold">gaps</span> (id, project_id, description, related_docs, severity)
                </div>
                <div className="text-slate-300">
                  <span className="text-cyan-400 font-bold">risks</span> (id, project_id, category, description, severity, source_ref)
                </div>
                <div className="text-slate-300">
                  <span className="text-cyan-400 font-bold">rfis</span> (id, project_id, question, status, generated_by_ai, source_ref)
                </div>
                <div className="text-slate-300">
                  <span className="text-cyan-400 font-bold">drawing_diffs</span> (id, project_id, old_doc_id, new_doc_id, changes_json)
                </div>
                <div className="text-slate-300">
                  <span className="text-cyan-400 font-bold">comments</span> (id, project_id, user_id, target_type, target_id, text)
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: API STRUCTURE */}
          {activeTab === 'api' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-cyan-300 uppercase tracking-wider font-['Outfit']">
                7. API Structure (FastAPI Key Endpoints)
              </h4>

              <div className="space-y-2 font-mono text-[11px]">
                {[
                  { method: 'POST', path: '/auth/login', desc: 'JWT authentication and user session creation' },
                  { method: 'POST', path: '/projects', desc: 'Create commercial construction project' },
                  { method: 'POST', path: '/projects/{id}/documents', desc: 'Upload document (async Celery job created)' },
                  { method: 'GET', path: '/projects/{id}/status', desc: 'Pipeline status (OCR / embed / multi-agent analysis)' },
                  { method: 'POST', path: '/projects/{id}/ask', desc: 'Spec assistant natural language Q&A (pgvector RAG)' },
                  { method: 'GET', path: '/projects/{id}/summary', desc: 'Retrieve AI structured project summary' },
                  { method: 'GET', path: '/projects/{id}/scope-gaps', desc: 'Retrieve cross-checked scope gap report' },
                  { method: 'GET', path: '/projects/{id}/risks', desc: 'Retrieve itemized bid risk report' },
                  { method: 'POST', path: '/projects/{id}/rfis/generate', desc: 'Trigger automated RFI draft generation' },
                  { method: 'GET', path: '/projects/{id}/rfis', desc: 'List RFIs (draft / approved / rejected)' },
                  { method: 'POST', path: '/projects/{id}/drawings/diff', desc: 'Trigger OpenCV drawing delta comparison' },
                  { method: 'GET', path: '/projects/{id}/drawings/diff/{diff_id}', desc: 'Retrieve vision diff results with cost tags' },
                ].map((ep, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#010914] border border-blue-900/60 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        ep.method === 'POST' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-blue-950 text-blue-400 border border-blue-800'
                      }`}>
                        {ep.method}
                      </span>
                      <span className="text-white font-bold">{ep.path}</span>
                    </div>
                    <span className="text-slate-400 text-[10px] font-sans text-right">{ep.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: INFRASTRUCTURE & SECURITY */}
          {activeTab === 'infra' && (
            <div className="space-y-6">
              
              {/* Section 8: Infrastructure & Deployment */}
              <div className="p-5 rounded-2xl bg-[#010914] border border-blue-500/30 space-y-3">
                <h4 className="text-sm font-bold text-cyan-300 uppercase tracking-wider font-['Outfit']">
                  8. Infrastructure & Deployment
                </h4>
                <ul className="space-y-2 text-[11px] leading-relaxed">
                  <li>• <strong>Cloud:</strong> AWS (or Azure) — EKS/ECS for containerized services, S3 for storage, RDS for PostgreSQL (with pgvector extension enabled).</li>
                  <li>• <strong>Async workers:</strong> Celery workers on autoscaling worker nodes, separate pool for GPU/vision-diff jobs vs CPU-only LLM/OCR calls.</li>
                  <li>• <strong>CDN:</strong> CloudFront for frontend static assets and drawing thumbnails.</li>
                  <li>• <strong>CI/CD:</strong> GitHub Actions → build/test → deploy to staging → manual promote to production.</li>
                  <li>• <strong>Observability:</strong> Structured logging per pipeline stage, job status tracking table, alerting on stuck/failed jobs (important since document processing can take minutes).</li>
                </ul>
              </div>

              {/* Section 9: Security & Compliance */}
              <div className="p-5 rounded-2xl bg-[#010914] border border-blue-500/30 space-y-3">
                <h4 className="text-sm font-bold text-cyan-300 uppercase tracking-wider font-['Outfit']">
                  9. Security & Compliance Considerations
                </h4>
                <ul className="space-y-2 text-[11px] leading-relaxed">
                  <li>• Documents often contain confidential project/client data $\rightarrow$ encryption at rest (S3 SSE) and in transit (TLS 1.3).</li>
                  <li>• Role-based access per project/company (multi-tenant isolation at the database query level).</li>
                  <li>• Audit trail on every AI-generated output and every estimator edit/approval (important for liability — AI recommendations must be traceable).</li>
                  <li>• Data retention/deletion policy per client contract (some GCs will require project data purged after bid submission).</li>
                </ul>
              </div>

            </div>
          )}

          {/* TAB 7: PHASED ROLLOUT & BUSINESS MODEL */}
          {activeTab === 'roadmap' && (
            <div className="space-y-6">
              
              {/* Section 10: MVP Scope vs Later Phases */}
              <div className="p-5 rounded-2xl bg-[#010914] border border-blue-500/30 space-y-4">
                <h4 className="text-sm font-bold text-cyan-300 uppercase tracking-wider font-['Outfit']">
                  10. MVP Scope vs Later Phases
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[11px]">
                  <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-700/40 space-y-2">
                    <strong className="text-cyan-300 block text-xs">Phase 1 (MVP)</strong>
                    <ul className="space-y-1 text-slate-300">
                      <li>• PDF upload + preprocessing</li>
                      <li>• AI project summary</li>
                      <li>• Specification search (RAG Q&A)</li>
                      <li>• Scope checklist</li>
                      <li>• RFI generator</li>
                      <li>• Bid risk report</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-700/40 space-y-2">
                    <strong className="text-indigo-300 block text-xs">Phase 2</strong>
                    <ul className="space-y-1 text-slate-300">
                      <li>• Drawing comparison (vision diff engine)</li>
                      <li>• Quantity takeoff calculation</li>
                      <li>• Trade-specific fine-tuned agents (Electrical, HVAC, Plumbing, Concrete)</li>
                      <li>• Procore / Autodesk ACC integrations</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-700/40 space-y-2">
                    <strong className="text-emerald-300 block text-xs">Phase 3</strong>
                    <ul className="space-y-1 text-slate-300">
                      <li>• Custom AI models per enterprise client</li>
                      <li>• Predictive bid-win analytics</li>
                      <li>• Multi-project portfolio risk dashboard</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 11: Why This Architecture Fits Business Model */}
              <div className="p-5 rounded-2xl bg-[#010914] border border-blue-500/30 space-y-3">
                <h4 className="text-sm font-bold text-cyan-300 uppercase tracking-wider font-['Outfit']">
                  11. Why This Architecture Fits the Business Model
                </h4>
                <div className="space-y-2.5 text-[11px]">
                  <div className="p-3 rounded-lg bg-black/40 border border-slate-800">
                    <strong className="text-white">Starter Tier:</strong> Limited projects $\rightarrow$ single-tenant row-level limits on the same shared infra, no extra engineering cost.
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-slate-800">
                    <strong className="text-white">Professional Tier:</strong> Unlimited projects + team features $\rightarrow$ this is where the async queue and collaboration dashboard architecture pays off (multiple concurrent document sets processing).
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-slate-800">
                    <strong className="text-white">Enterprise Tier:</strong> Integrations + custom AI models $\rightarrow$ the agent-orchestration layer is already modular per trade, so a custom model swap-in per client is a config change, not a rebuild.
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-[#011426] p-4 px-6 border-t border-blue-900/60 flex items-center justify-between">
          <div className="text-[11px] text-slate-400">
            Specification Version: <span className="text-cyan-300 font-mono">v10.2-PRODUCTION</span> • ConstructConnect Compliance
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCopySpec}
              className="px-4 py-2 bg-blue-950 hover:bg-blue-900 border border-blue-800 rounded-lg text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Spec Copied!' : 'Copy Architecture Spec'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-[#0073b6] hover:bg-[#005f96] text-white text-xs font-bold uppercase rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
