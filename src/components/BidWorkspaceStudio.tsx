import React, { useState } from 'react';
import { 
  SAMPLE_PROJECTS, 
  SAMPLE_DOCUMENTS, 
  INITIAL_RAG_MESSAGES, 
  SAMPLE_SCOPE_GAPS, 
  SAMPLE_RFIS, 
  SAMPLE_TAKEOFF_ITEMS, 
  SAMPLE_VISION_DIFF_CHANGES,
  type DocumentItem,
  type RagMessage,
  type ScopeGap,
  type RfiItem,
  type TakeoffItem,
  type VisionDiffChange
} from '../data/mockBidData';
import { 
  Bot, 
  Sparkles, 
  AlertTriangle, 
  FileCheck2, 
  Eye, 
  Calculator, 
  Send, 
  Check, 
  Download, 
  UploadCloud, 
  RefreshCw, 
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  FileSpreadsheet,
  Zap,
  CheckCircle2,
  Copy
} from 'lucide-react';

interface BidWorkspaceStudioProps {
  initialTab?: string;
  onOpenTrial: () => void;
}

export const BidWorkspaceStudio: React.FC<BidWorkspaceStudioProps> = ({ initialTab = 'spec_rag', onOpenTrial }) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('proj-01');
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  
  // RAG Assistant State
  const [messages, setMessages] = useState<RagMessage[]>(INITIAL_RAG_MESSAGES);
  const [inputQuery, setInputQuery] = useState<string>('');
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [activeCitationModal, setActiveCitationModal] = useState<any | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Scope Gaps State
  const [scopeGaps] = useState<ScopeGap[]>(SAMPLE_SCOPE_GAPS);
  const [gapFilter, setGapFilter] = useState<string>('all');

  // RFIs State
  const [rfis] = useState<RfiItem[]>(SAMPLE_RFIS);
  const [selectedRfiId, setSelectedRfiId] = useState<string>(SAMPLE_RFIS[0]?.id || '');

  // Takeoffs State
  const [takeoffItems] = useState<TakeoffItem[]>(SAMPLE_TAKEOFF_ITEMS);
  const [overheadMargin, setOverheadMargin] = useState<number>(10);
  const [profitMargin, setProfitMargin] = useState<number>(8);
  const [contingencyMargin, setContingencyMargin] = useState<number>(5);

  // Vision Diff State
  const [diffMode, setDiffMode] = useState<'overlay' | 'side_by_side'>('side_by_side');
  const [selectedChangeId, setSelectedChangeId] = useState<string>(SAMPLE_VISION_DIFF_CHANGES[0]?.id || 'diff-01');

  // Ingestion upload simulator
  const [documents, setDocuments] = useState<DocumentItem[]>(SAMPLE_DOCUMENTS);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const currentProject = SAMPLE_PROJECTS.find((p) => p.id === selectedProjectId) || SAMPLE_PROJECTS[0];

  const handleSendQuestion = (questionText?: string) => {
    const q = questionText || inputQuery;
    if (!q.trim()) return;

    const userMsg: RagMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsThinking(true);

    setTimeout(() => {
      let aiResponseText = '';
      let citations: any[] = [];

      if (q.toLowerCase().includes('generator') || q.toLowerCase().includes('fuel') || q.toLowerCase().includes('power')) {
        aiResponseText = `Based on **Mechanical Sheet M-502 (Detail 4)** and **Division 23 11 13 (Facility Fuel-Oil Piping)**:\n\n1. **Generator Fuel Piping:** The 1500kW emergency standby generator requires a dual-wall FRP containment fuel line with continuous ultrasonic leak sensor wiring.\n2. ⚠️ **Scope Conflict Detected:** Electrical Drawing E-401 does not schedule power circuits for the fuel control panel. This is flagged as **Scope Gap #01** and an RFI has been automatically drafted for engineer review.`;
        citations = [
          {
            docName: 'Project_Manual_Specifications_Divisions_01_33.pdf',
            pageNo: 512,
            division: 'Division 23 11 13 Part 2.4',
            snippet: 'Interstitial leak monitoring panel shall provide audio/visual alarms tied into Building Automation System (BAS).',
            confidence: 0.97,
          },
          {
            docName: 'Metro_Med_Electrical_Power_Lighting_Rev2.pdf',
            pageNo: 18,
            sheetNo: 'M-502 Detail 4',
            snippet: 'Fuel supply line to day tank with automatic emergency shut-off valve.',
            confidence: 0.95,
          },
        ];
      } else {
        aiResponseText = `According to **Specification Section 03 30 00 (Cast-in-Place Concrete)** and **Structural General Notes Sheet S-001**:\n\n1. **Seismic Shear Walls (Levels B2 through 4):** Minimum compressive strength **$f\'c = 6,000\\text{ psi}$** at 28 days with low-heat Type II/V Portland cement and maximum water-cement ratio of $0.38$.\n2. **Post-Tensioned Podium Slabs (Level 1 & 2):** Minimum compressive strength **$f\'c = 5,000\\text{ psi}$** at 28 days ($3,500\\text{ psi}$ initial at post-tension stressing).\n3. **Standard Elevated Slabs:** $4,000\\text{ psi}$ normal weight concrete.\n\n⚠️ **Estimator Note / Addendum Flag:** *Addendum 03 Section 2.1* changed the fly ash replacement cap from $25\\%$ to $20\\%$ max in medical sterile core zones.`;
        citations = [
          {
            docName: 'Project_Manual_Specifications_Divisions_01_33.pdf',
            pageNo: 142,
            division: 'Division 03 30 00 — Cast-in-Place Concrete',
            snippet: 'Part 2.2.A: Concrete Mixtures — Shear wall elements between grid lines A1-D4 shall maintain minimum 28-day compressive strength of 6,000 psi (41.4 MPa).',
            confidence: 0.98,
          },
          {
            docName: 'S-001 General Structural Notes.pdf',
            pageNo: 34,
            sheetNo: 'S-001 Notes Table 3.1',
            snippet: 'Concrete Class Schedule - Level P1 to L4 Shear Cores: Class VI 6000 PSI @ 28 Days, W/C = 0.38.',
            confidence: 0.96,
          },
        ];
      }

      const aiMsg: RagMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsThinking(false);
    }, 1100);
  };

  const handleSimulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      const newDoc: DocumentItem = {
        id: `doc-${Date.now()}`,
        name: 'Addendum_04_Fire_Alarm_Revisions.pdf',
        type: 'addendum',
        size: '12.4 MB',
        pages: 8,
        status: 'Indexed (pgvector)',
        sheetsDiscipline: 'Fire Protection (FP-101 to FP-108)',
        uploadDate: 'Just now',
      };
      setDocuments((prev) => [newDoc, ...prev]);
      setIsUploading(false);
    }, 1400);
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExport = (type: string) => {
    alert(`Successfully generated and exported formatted ${type} BidPackage with traceable source citations!`);
  };

  const filteredScopeGaps = gapFilter === 'high' 
    ? scopeGaps.filter(g => g.severity === 'High')
    : scopeGaps;

  const subtotalCost = takeoffItems.reduce((acc, item) => acc + item.totalCost, 0);
  const overheadAmount = (subtotalCost * overheadMargin) / 100;
  const profitAmount = (subtotalCost * profitMargin) / 100;
  const contingencyAmount = (subtotalCost * contingencyMargin) / 100;
  const totalGrandBid = subtotalCost + overheadAmount + profitAmount + contingencyAmount;

  const currentRfi = rfis.find((r) => r.id === selectedRfiId) || rfis[0];

  return (
    <section id="studio" className="py-16 bg-[#f8fafc] border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Card */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-blue-100 text-[#0073b6] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Takeoff & AI Studio</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#011825] font-['Outfit']">
              BidPilot AI Live Estimator Workspace
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Explore real-time blueprint OCR, CSI MasterFormat pgvector RAG, Vision Diff addenda comparison, and automated RFIs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            {/* Project Selector */}
            <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl border border-gray-300 w-full sm:w-auto">
              <span className="text-xs font-bold text-gray-600 pl-1 whitespace-nowrap">Project:</span>
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="bg-white text-xs font-bold text-[#0073b6] py-1.5 px-3 rounded-lg border border-gray-300 focus:outline-none shadow-xs w-full sm:w-auto"
              >
                {SAMPLE_PROJECTS.map((proj) => (
                  <option key={proj.id} value={proj.id}>
                    {proj.name} ({proj.estimatedValue})
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Export Button */}
            <button
              onClick={() => handleExport('Excel (.xlsx)')}
              className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all whitespace-nowrap"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Export Excel (.xlsx)</span>
            </button>
          </div>
        </div>

        {/* Main Studio Frame (Blueprint Dark Navy Slate Header #011825) */}
        <div className="rounded-2xl border border-gray-300 bg-white shadow-xl overflow-hidden">
          
          {/* Navigation Studio Tabs Bar */}
          <div className="bg-[#011825] px-4 pt-3 flex flex-wrap gap-1 border-b border-gray-800">
            <button
              onClick={() => setActiveTab('spec_rag')}
              className={`px-4 py-3 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 ${
                activeTab === 'spec_rag'
                  ? 'bg-white text-[#011825] shadow'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Bot className="w-4 h-4 text-[#0073b6]" />
              <span>1. AI Spec Assistant (RAG)</span>
            </button>

            <button
              onClick={() => setActiveTab('gaps')}
              className={`px-4 py-3 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 ${
                activeTab === 'gaps'
                  ? 'bg-white text-[#011825] shadow'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>2. Scope Gaps & Risks ({scopeGaps.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('rfis')}
              className={`px-4 py-3 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 ${
                activeTab === 'rfis'
                  ? 'bg-white text-[#011825] shadow'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <FileCheck2 className="w-4 h-4 text-emerald-500" />
              <span>3. Automated RFIs ({rfis.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('vision_diff')}
              className={`px-4 py-3 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 ${
                activeTab === 'vision_diff'
                  ? 'bg-white text-[#011825] shadow'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Eye className="w-4 h-4 text-cyan-400" />
              <span>4. Vision Diff (Addenda Engine)</span>
            </button>

            <button
              onClick={() => setActiveTab('takeoff')}
              className={`px-4 py-3 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 ${
                activeTab === 'takeoff'
                  ? 'bg-white text-[#011825] shadow'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Calculator className="w-4 h-4 text-blue-400" />
              <span>5. Takeoff & BOQ Summary</span>
            </button>

            {/* Ingested Documents Status */}
            <div className="ml-auto hidden md:flex items-center gap-2 pb-2 text-xs font-semibold text-gray-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Documents ({documents.length})</span>
              <button
                onClick={handleSimulateUpload}
                disabled={isUploading}
                className="ml-2 px-2.5 py-1 rounded bg-blue-600/30 hover:bg-blue-600/50 text-blue-200 text-[11px] font-bold border border-blue-400/30 flex items-center gap-1"
              >
                {isUploading ? (
                  <>
                    <RefreshCw className="w-3 h-3 animate-spin" />
                    <span>OCR Ingesting...</span>
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-3 h-3" />
                    <span>Upload Addendum</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* TAB 1: AI SPEC ASSISTANT (RAG) */}
          {activeTab === 'spec_rag' && (
            <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white min-h-[560px]">
              
              {/* Chat Viewport (8 Cols) */}
              <div className="lg:col-span-8 flex flex-col justify-between rounded-xl border border-gray-200 bg-gray-50/50 p-4 sm:p-5 shadow-xs">
                
                {/* Messages Stream */}
                <div className="space-y-4 overflow-y-auto max-h-[440px] pr-2">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-3 text-xs sm:text-sm ${
                        msg.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {msg.sender === 'assistant' && (
                        <div className="w-8 h-8 rounded-full bg-[#0073b6] text-white flex items-center justify-center shrink-0 shadow-sm font-bold">
                          <Bot className="w-4 h-4" />
                        </div>
                      )}

                      <div
                        className={`p-4 rounded-2xl max-w-2xl leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-[#0073b6] text-white rounded-tr-none shadow-sm'
                            : 'bg-white text-gray-800 rounded-tl-none border border-gray-200 shadow-sm space-y-3'
                        }`}
                      >
                        <div className="whitespace-pre-line">
                          {msg.text}
                        </div>

                        {/* Citations Box */}
                        {msg.citations && msg.citations.length > 0 && (
                          <div className="pt-3 border-t border-gray-100 space-y-2">
                            <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-amber-500" />
                              <span>Source Citations (Traceable Ground Truth):</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {msg.citations.map((cit, cIdx) => (
                                <button
                                  key={cIdx}
                                  onClick={() => setActiveCitationModal(cit)}
                                  className="text-left p-2.5 rounded-lg bg-blue-50/60 hover:bg-blue-100/70 border border-blue-200 transition-all text-xs space-y-1 group"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="font-bold text-[#0073b6] text-[11px] truncate max-w-[170px]">
                                      {cit.division || cit.sheetNo || cit.docName}
                                    </span>
                                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-1.5 rounded font-bold">
                                      p. {cit.pageNo}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-gray-600 line-clamp-2 italic">
                                    "{cit.snippet}"
                                  </p>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex justify-between items-center text-[10px] opacity-70 pt-1">
                          <span>{msg.timestamp}</span>
                          {msg.sender === 'assistant' && (
                            <button
                              onClick={() => handleCopyText(msg.text, msg.id)}
                              className="hover:underline flex items-center gap-1 font-semibold text-[#0073b6]"
                            >
                              {copiedId === msg.id ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-600" />
                                  <span>Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy Answer</span>
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {isThinking && (
                    <div className="flex items-center gap-2 text-xs text-[#0073b6] font-bold p-3 bg-blue-50 rounded-xl w-fit">
                      <RefreshCw className="w-4 h-4 animate-spin text-[#0073b6]" />
                      <span>pgvector RAG searching 50 CSI divisions & drawings...</span>
                    </div>
                  )}
                </div>

                {/* Input Bar */}
                <div className="pt-4 border-t border-gray-200">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendQuestion();
                    }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      value={inputQuery}
                      onChange={(e) => setInputQuery(e.target.value)}
                      placeholder="Ask any specification or drawing question (e.g. concrete PSI, panel ratings, duct gauges)..."
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-300 text-xs sm:text-sm bg-white focus:outline-none focus:border-[#0073b6] focus:ring-1 focus:ring-[#0073b6]"
                    />
                    <button
                      type="submit"
                      disabled={!inputQuery.trim() || isThinking}
                      className="px-5 py-3 rounded-xl bg-[#0073b6] hover:bg-[#005f96] text-white font-bold text-xs uppercase transition-all disabled:opacity-50 flex items-center gap-1.5 shadow-sm"
                    >
                      <span>Search Specs</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>

              </div>

              {/* Sidebar Helper Prompts & Indexed Specs (4 Cols) */}
              <div className="lg:col-span-4 space-y-4">
                
                {/* Quick Test Prompts Box */}
                <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#011825]">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span>Quick Test Prompts</span>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => handleSendQuestion('What is the required concrete compressive strength (f\'c) for shear walls in Division 03?')}
                      className="w-full text-left p-2.5 rounded-lg border border-gray-200 hover:border-[#0073b6] hover:bg-blue-50/50 transition-all text-xs font-semibold text-gray-800 flex items-center justify-between"
                    >
                      <span>"Concrete f'c strength & fly ash limits"</span>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                    </button>

                    <button
                      onClick={() => handleSendQuestion('What are the generator fuel line specifications and power wiring requirements?')}
                      className="w-full text-left p-2.5 rounded-lg border border-gray-200 hover:border-[#0073b6] hover:bg-blue-50/50 transition-all text-xs font-semibold text-gray-800 flex items-center justify-between"
                    >
                      <span>"Generator fuel line spec & power wiring"</span>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                    </button>

                    <button
                      onClick={() => handleSendQuestion('Are emergency shutoff valves required on mechanical fuel risers?')}
                      className="w-full text-left p-2.5 rounded-lg border border-gray-200 hover:border-[#0073b6] hover:bg-blue-50/50 transition-all text-xs font-semibold text-gray-800 flex items-center justify-between"
                    >
                      <span>"Emergency fuel shutoff valves on risers"</span>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Ground Truth Citation Policy */}
                <div className="p-4 rounded-xl bg-[#0a2540] text-white space-y-2 shadow-xs">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Traceable Citations Policy</span>
                  </div>
                  <p className="text-[11px] text-blue-100/90 leading-relaxed">
                    BidPilot AI adheres to strict <strong>Copilot, Not Autopilot</strong> standards: every number, PSI rating, and scope gap includes verifiable page numbers and sheet coordinates.
                  </p>
                </div>

                {/* Ingested Documents List */}
                <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-xs space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-600 flex justify-between items-center">
                    <span>Indexed Tender Set</span>
                    <span className="text-[10px] font-mono text-[#0073b6] bg-blue-50 px-2 py-0.5 rounded">
                      {documents.length} Files
                    </span>
                  </div>

                  <div className="space-y-1.5 max-h-48 overflow-y-auto text-xs">
                    {documents.map((doc) => (
                      <div key={doc.id} className="p-2 rounded-lg bg-gray-50 border border-gray-200 flex justify-between items-center">
                        <div className="truncate max-w-[180px]">
                          <div className="font-bold text-[#011825] truncate">{doc.name}</div>
                          <span className="text-[10px] text-gray-500">{doc.sheetsDiscipline}</span>
                        </div>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 shrink-0">
                          Indexed
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: SCOPE GAPS & RISKS */}
          {activeTab === 'gaps' && (
            <div className="p-4 sm:p-6 space-y-6 bg-white">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-[#011825] font-['Outfit']">
                    Automated Scope Gap & Conflict Register
                  </h3>
                  <p className="text-xs text-gray-600">
                    AI cross-checked 142 architectural/MEP drawing sheets against 840 pages of specifications.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setGapFilter('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                      gapFilter === 'all' ? 'bg-[#0073b6] text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    All ({scopeGaps.length})
                  </button>
                  <button
                    onClick={() => setGapFilter('high')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                      gapFilter === 'high' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    High Financial Impact
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredScopeGaps.map((gap) => (
                  <div
                    key={gap.id}
                    className="p-5 rounded-xl border border-gray-200 bg-white hover:border-[#0073b6] hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-[#0073b6]">
                          {gap.category}
                        </span>
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                          gap.severity === 'High' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {gap.severity} Severity
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-[#011825]">
                        {gap.title}
                      </h4>

                      <p className="text-xs text-gray-600 leading-relaxed">
                        {gap.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-gray-500">Est. Exposure: </span>
                        <strong className="text-red-600 font-bold">{gap.estimatedCostImpact}</strong>
                      </div>

                      <button
                        onClick={() => {
                          setActiveTab('rfis');
                          setSelectedRfiId(SAMPLE_RFIS[0]?.id || '');
                        }}
                        className="text-[#0073b6] hover:underline font-bold flex items-center gap-1"
                      >
                        <span>View Drafted RFI</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: AUTOMATED RFIS */}
          {activeTab === 'rfis' && (
            <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white">
              
              {/* RFI Selector (4 Cols) */}
              <div className="lg:col-span-4 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Pre-Drafted RFI Queue ({rfis.length})
                </div>

                <div className="space-y-2">
                  {rfis.map((rfi) => (
                    <button
                      key={rfi.id}
                      onClick={() => setSelectedRfiId(rfi.id)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all space-y-1 ${
                        selectedRfiId === rfi.id
                          ? 'border-[#0073b6] bg-blue-50/70 shadow-xs'
                          : 'border-gray-200 bg-white hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-xs font-bold text-[#0073b6]">{rfi.rfiNumber}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">{rfi.status}</span>
                      </div>
                      <div className="text-xs font-bold text-[#011825] line-clamp-1">{rfi.subject}</div>
                      <div className="text-[11px] text-gray-500">{rfi.specDivision} • {rfi.drawingRef}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* RFI Formal Document Preview (8 Cols) */}
              <div className="lg:col-span-8 p-6 rounded-xl border border-gray-300 bg-white shadow-xs space-y-4">
                
                <div className="flex flex-wrap justify-between items-start gap-4 pb-4 border-b border-gray-200">
                  <div>
                    <span className="text-xs font-bold text-gray-500 uppercase">REQUEST FOR INFORMATION</span>
                    <h3 className="text-xl font-black text-[#011825] font-['Outfit']">
                      {currentRfi.rfiNumber}: {currentRfi.subject}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleExport(`RFI ${currentRfi.rfiNumber}`)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#0073b6] text-white font-bold text-xs flex items-center gap-1 shadow-xs"
                    >
                      <Download className="w-3 h-3" />
                      <span>Export Procore / AIA G716</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <div>
                    <span className="text-gray-500 block">Project:</span>
                    <strong className="text-gray-900">{currentProject.name}</strong>
                  </div>
                  <div>
                    <span className="text-gray-500 block">CSI Division:</span>
                    <strong className="text-gray-900">{currentRfi.specDivision}</strong>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Drawing Ref:</span>
                    <strong className="text-gray-900">{currentRfi.drawingRef}</strong>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Priority:</span>
                    <strong className="text-red-600">{currentRfi.priority}</strong>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">Question / Conflict Description:</h4>
                  <div className="p-3.5 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-800 leading-relaxed">
                    {currentRfi.question}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0073b6]">Recommended Contractor Resolution:</h4>
                  <div className="p-3.5 rounded-lg bg-blue-50 border border-blue-200 text-xs text-gray-800 leading-relaxed">
                    {currentRfi.proposedResolution}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 4: VISION DIFF (ADDENDA ENGINE) */}
          {activeTab === 'vision_diff' && (
            <div className="p-4 sm:p-6 space-y-6 bg-white">
              
              <div className="flex flex-wrap justify-between items-center gap-4">
                <div>
                  <h3 className="text-lg font-bold text-[#011825] font-['Outfit']">
                    OpenCV Computer Vision Addenda Comparator
                  </h3>
                  <p className="text-xs text-gray-600">
                    Comparing <strong>Original Tender Drawing Sheet M-102 (Rev 0)</strong> vs <strong>Addendum 03 Drawing Sheet M-102 (Rev 3)</strong>.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setDiffMode('side_by_side')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                      diffMode === 'side_by_side' ? 'bg-[#0073b6] text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    Side-by-Side
                  </button>
                  <button
                    onClick={() => setDiffMode('overlay')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                      diffMode === 'overlay' ? 'bg-[#0073b6] text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    Red/Green Overlay
                  </button>
                </div>
              </div>

              {/* Drawing Viewport Simulation */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                <div className="lg:col-span-8 rounded-2xl bg-[#041a30] border border-blue-500/40 p-4 relative overflow-hidden flex flex-col justify-between min-h-[380px]">
                  <div className="flex justify-between items-center text-xs text-blue-200 pb-2 border-b border-blue-500/30">
                    <span className="font-mono">Sheet M-102 (Mechanical Riser & Core Layout)</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 3 Modified Delta Regions Flagged
                    </span>
                  </div>

                  {/* Blueprint Graphic with Red Bounding Boxes */}
                  <div className="relative flex-1 my-4 rounded-xl border border-blue-400/20 bg-blueprint-grid flex items-center justify-center p-6">
                    <div className="relative w-full max-w-lg aspect-video border-2 border-dashed border-blue-400/50 rounded-lg p-4 flex flex-col justify-between bg-black/40">
                      
                      {/* Bounding Box 1 */}
                      <div className="absolute top-6 left-8 p-2 rounded border-2 border-red-500 bg-red-500/20 text-[11px] font-mono text-red-200 font-bold flex items-center gap-1 animate-pulse">
                        <AlertTriangle className="w-3 h-3 text-red-400" />
                        <span>Addendum 03 Delta: Added 4" Riser (+120 LF) [+$14,200]</span>
                      </div>

                      {/* Bounding Box 2 */}
                      <div className="absolute bottom-8 right-8 p-2 rounded border-2 border-amber-500 bg-amber-500/20 text-[11px] font-mono text-amber-200 font-bold flex items-center gap-1">
                        <span>Relocated Day Tank Control Panel [+$4,800]</span>
                      </div>

                      <div className="text-center text-blue-300/40 font-mono text-xs select-none">
                        [ Computer Vision Alignment: 99.8% Coordinate Match ]
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] text-blue-300 font-mono flex justify-between items-center">
                    <span>Algorithm: OpenCV Multi-Scale Template Matching + Structural SSIM</span>
                    <span className="text-white font-bold">Total Addenda Variance: +$19,000</span>
                  </div>
                </div>

                {/* Changes List Sidebar */}
                <div className="lg:col-span-4 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Detected Addenda Deltas ({SAMPLE_VISION_DIFF_CHANGES.length})
                  </div>

                  <div className="space-y-2">
                    {SAMPLE_VISION_DIFF_CHANGES.map((change: VisionDiffChange) => (
                      <div
                        key={change.id}
                        onClick={() => setSelectedChangeId(change.id)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-1 ${
                          selectedChangeId === change.id
                            ? 'border-red-500 bg-red-50/60 shadow-xs'
                            : 'border-gray-200 bg-white hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-xs text-[#011825]">{change.category}</span>
                          <span className="text-xs font-extrabold text-red-600">{change.deltaCost}</span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">{change.deltaDescription}</p>
                        <div className="text-[10px] text-gray-500 font-mono pt-1">
                          Sheet: {change.sheet} • Impact: {change.impact}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 5: TAKEOFF & BOQ SUMMARY */}
          {activeTab === 'takeoff' && (
            <div className="p-4 sm:p-6 space-y-6 bg-white">
              
              {/* Takeoff Table */}
              <div className="overflow-x-auto border border-gray-200 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#011825] text-white uppercase text-[11px] font-bold tracking-wider">
                    <tr>
                      <th className="p-3.5">CSI Code</th>
                      <th className="p-3.5">Description</th>
                      <th className="p-3.5 text-right">Quantity</th>
                      <th className="p-3.5 text-center">Unit</th>
                      <th className="p-3.5 text-right">Material Rate</th>
                      <th className="p-3.5 text-right">Labor Rate</th>
                      <th className="p-3.5 text-right">Total Line Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {takeoffItems.map((item, idx) => (
                      <tr key={item.id} className={idx % 2 === 1 ? 'bg-[#f8fafc]' : 'bg-white'}>
                        <td className="p-3.5 font-mono font-bold text-[#0073b6]">{item.csiCode}</td>
                        <td className="p-3.5 font-semibold text-[#011825]">{item.description}</td>
                        <td className="p-3.5 text-right font-mono font-bold">{item.quantity.toLocaleString()}</td>
                        <td className="p-3.5 text-center font-bold text-gray-500">{item.unit}</td>
                        <td className="p-3.5 text-right font-mono">${item.materialUnitCost.toFixed(2)}</td>
                        <td className="p-3.5 text-right font-mono">${item.laborUnitCost.toFixed(2)}</td>
                        <td className="p-3.5 text-right font-mono font-bold text-[#011825]">${item.totalCost.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Sliders & Summary Calculations */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-200">
                
                {/* Margin Sliders (7 Cols) */}
                <div className="lg:col-span-7 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    Estimator Markup & Risk Factors:
                  </h4>

                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between font-bold mb-1">
                        <span>Overhead Markup</span>
                        <span className="text-[#0073b6]">{overheadMargin}% (${overheadAmount.toLocaleString()})</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="25"
                        value={overheadMargin}
                        onChange={(e) => setOverheadMargin(Number(e.target.value))}
                        className="w-full accent-[#0073b6]"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between font-bold mb-1">
                        <span>Profit Margin</span>
                        <span className="text-emerald-700">{profitMargin}% (${profitAmount.toLocaleString()})</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="25"
                        value={profitMargin}
                        onChange={(e) => setProfitMargin(Number(e.target.value))}
                        className="w-full accent-emerald-600"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between font-bold mb-1">
                        <span>Contingency & Escalation</span>
                        <span className="text-amber-700">{contingencyMargin}% (${contingencyAmount.toLocaleString()})</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="15"
                        value={contingencyMargin}
                        onChange={(e) => setContingencyMargin(Number(e.target.value))}
                        className="w-full accent-amber-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Final Bid Box (5 Cols) */}
                <div className="lg:col-span-5 p-5 rounded-xl bg-[#011825] text-white flex flex-col justify-between space-y-4 shadow-md">
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-gray-300">
                      <span>Direct Material & Labor:</span>
                      <span className="font-mono">${subtotalCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Overhead ({overheadMargin}%):</span>
                      <span className="font-mono">+${overheadAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Profit ({profitMargin}%):</span>
                      <span className="font-mono">+${profitAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-300 pb-2 border-b border-gray-700">
                      <span>Contingency ({contingencyMargin}%):</span>
                      <span className="font-mono">+${contingencyAmount.toLocaleString()}</span>
                    </div>

                    <div className="pt-2 flex justify-between items-baseline">
                      <span className="font-bold text-sm uppercase text-cyan-300">Total Proposed Bid:</span>
                      <span className="text-2xl font-black font-['Outfit'] text-white">
                        ${Math.round(totalGrandBid).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleExport('BidPackage Submission Form')}
                    className="w-full py-3 rounded-lg ps-btn-red text-center text-xs font-extrabold uppercase tracking-wider shadow-md"
                  >
                    GENERATE BID PROPOSAL
                  </button>
                </div>

              </div>

            </div>
          )}

        </div>

      </div>

      {/* Citation Deep-Dive Modal */}
      {activeCitationModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#011825] border border-blue-500 rounded-2xl max-w-2xl w-full p-6 space-y-4 text-white shadow-2xl relative">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                  Traceable Blueprint Citation
                </span>
                <h3 className="text-lg font-bold font-['Outfit'] mt-0.5">
                  {activeCitationModal.division || activeCitationModal.sheetNo || activeCitationModal.docName}
                </h3>
              </div>
              <button
                onClick={() => setActiveCitationModal(null)}
                className="text-gray-400 hover:text-white text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#041a30] border border-blue-900 space-y-2 text-xs">
              <div className="flex justify-between text-gray-400 font-mono text-[11px]">
                <span>Document: {activeCitationModal.docName}</span>
                <span className="text-emerald-400 font-bold">Page {activeCitationModal.pageNo}</span>
              </div>
              <p className="text-blue-100 italic leading-relaxed pt-2 border-t border-blue-900/60">
                "{activeCitationModal.snippet}"
              </p>
            </div>

            <div className="text-[11px] text-gray-400 flex justify-between items-center">
              <span>Confidence Score: <strong>{(activeCitationModal.confidence * 100).toFixed(1)}%</strong></span>
              <button
                onClick={() => setActiveCitationModal(null)}
                className="px-4 py-2 rounded bg-[#0073b6] text-white font-bold text-xs"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
