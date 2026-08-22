export interface Project {
  id: string;
  name: string;
  location: string;
  bidDueDate: string;
  estimatedValue: string;
  tradeFocus: string[];
  sqft: string;
  sheetsCount: number;
  specsCount: number;
  status: 'Processing' | 'Ready for Review' | 'Finalized' | 'Bidding Active';
  completionProgress: number;
  riskScore: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface DocumentItem {
  id: string;
  name: string;
  type: 'drawing' | 'spec' | 'boq' | 'addendum';
  size: string;
  pages: number;
  status: 'Indexed (pgvector)' | 'Parsed (OCR)' | 'Embedding...' | 'Vision Diff Ready';
  sheetsDiscipline?: string;
  division?: string;
  uploadDate: string;
}

export interface RagMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  citations?: {
    docName: string;
    pageNo: number;
    sheetNo?: string;
    division?: string;
    snippet: string;
    confidence: number;
  }[];
}

export interface ScopeGap {
  id: string;
  category: 'Missing Spec' | 'Drawing Discrepancy' | 'Unassigned Sub-trade' | 'Addendum Conflict';
  title: string;
  description: string;
  severity: 'High' | 'Medium' | 'Low';
  affectedDocs: string[];
  estimatedCostImpact: string;
  suggestedAction: string;
  status: 'Open' | 'Resolved' | 'RFI Drafted';
}

export interface RiskItem {
  id: string;
  category: 'Long Lead Item' | 'Hazardous / Site Condition' | 'Penalty / Liquidated Damages' | 'Code Non-compliance';
  title: string;
  description: string;
  severity: 'Critical' | 'High' | 'Medium';
  exposure: string;
  sourceRef: string;
  mitigation: string;
}

export interface RfiItem {
  id: string;
  rfiNumber: string;
  subject: string;
  specDivision: string;
  drawingRef: string;
  question: string;
  proposedResolution: string;
  generatedByAi: boolean;
  status: 'Draft' | 'Approved' | 'Sent to GC/Architect' | 'Answered';
  priority: 'Urgent' | 'Standard' | 'Low';
}

export interface TakeoffItem {
  id: string;
  csiCode: string;
  description: string;
  location: string;
  quantity: number;
  unit: string;
  materialUnitCost: number;
  laborUnitCost: number;
  totalCost: number;
  confidence: number;
  sheetRef: string;
}

export interface VisionDiffChange {
  id: string;
  sheet: string;
  category: 'Added Rebar / Conduit' | 'Wall Relocation' | 'Equipment Spec Change' | 'Dimension Shift';
  deltaDescription: string;
  impact: 'Cost Increase' | 'Schedule Delay' | 'Scope Reduction' | 'Clarification';
  coords: { x: number; y: number; width: number; height: number };
  deltaCost: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  tagline: string;
  priceMonthly: number;
  priceAnnual: number;
  period: string;
  popular?: boolean;
  ctaText: string;
  ctaAction: 'start_trial' | 'get_quote';
  description: string;
  features: string[];
  limits: {
    projects: string;
    sheetsPerMonth: string;
    ragQueries: string;
    support: string;
    users: string;
  };
}

export const SAMPLE_PROJECTS: Project[] = [
  {
    id: 'proj-01',
    name: 'Metro City Medical Center (Tower B Expansion)',
    location: 'Austin, TX',
    bidDueDate: 'March 14, 2026',
    estimatedValue: '$18,450,000',
    tradeFocus: ['Division 03 Concrete', 'Division 26 Electrical', 'Division 23 HVAC', 'Division 09 Drywall'],
    sqft: '145,000 sq ft',
    sheetsCount: 142,
    specsCount: 28,
    status: 'Ready for Review',
    completionProgress: 88,
    riskScore: 'High',
  },
  {
    id: 'proj-02',
    name: 'Apex Innovation Tech Campus (Core & Shell)',
    location: 'Bellevue, WA',
    bidDueDate: 'March 28, 2026',
    estimatedValue: '$9,800,000',
    tradeFocus: ['Division 05 Metals', 'Division 07 Thermal & Moisture', 'Division 22 Plumbing'],
    sqft: '85,000 sq ft',
    sheetsCount: 64,
    specsCount: 16,
    status: 'Bidding Active',
    completionProgress: 94,
    riskScore: 'Medium',
  },
  {
    id: 'proj-03',
    name: 'Harborview 32-Story Multi-Family Tower',
    location: 'Miami, FL',
    bidDueDate: 'April 05, 2026',
    estimatedValue: '$34,200,000',
    tradeFocus: ['General Contractor', 'Structural', 'MEP Package', 'Interior Finishes'],
    sqft: '320,000 sq ft',
    sheetsCount: 280,
    specsCount: 45,
    status: 'Processing',
    completionProgress: 42,
    riskScore: 'Critical',
  },
];

export const SAMPLE_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-01',
    name: 'Metro_Med_TowerB_Architectural_Set_Rev3.pdf',
    type: 'drawing',
    size: '142.4 MB',
    pages: 68,
    status: 'Indexed (pgvector)',
    sheetsDiscipline: 'Architectural (A-101 to A-608)',
    uploadDate: 'Today at 07:15 AM',
  },
  {
    id: 'doc-02',
    name: 'Metro_Med_Electrical_Power_Lighting_Rev2.pdf',
    type: 'drawing',
    size: '88.1 MB',
    pages: 42,
    status: 'Vision Diff Ready',
    sheetsDiscipline: 'Electrical (E-101 to E-402)',
    uploadDate: 'Today at 07:18 AM',
  },
  {
    id: 'doc-03',
    name: 'Project_Manual_Specifications_Divisions_01_33.pdf',
    type: 'spec',
    size: '34.2 MB',
    pages: 840,
    status: 'Indexed (pgvector)',
    division: 'MasterFormat 01-33',
    uploadDate: 'Today at 07:20 AM',
  },
  {
    id: 'doc-04',
    name: 'Addendum_03_Structural_MEP_Modifications.pdf',
    type: 'addendum',
    size: '18.9 MB',
    pages: 14,
    status: 'Vision Diff Ready',
    sheetsDiscipline: 'Addendum 03 (Structural/HVAC Revisions)',
    uploadDate: 'Today at 07:24 AM',
  },
  {
    id: 'doc-05',
    name: 'Master_Tender_BOQ_Trade_Quantities.xlsx',
    type: 'boq',
    size: '4.8 MB',
    pages: 12,
    status: 'Parsed (OCR)',
    division: 'Tender Schedule',
    uploadDate: 'Today at 07:25 AM',
  },
];

export const INITIAL_RAG_MESSAGES: RagMessage[] = [
  {
    id: 'msg-1',
    sender: 'user',
    text: 'What is the required 28-day concrete compressive strength (f\'c) for the seismic shear walls and podium slabs in Division 03?',
    timestamp: '08:12 AM',
  },
  {
    id: 'msg-2',
    sender: 'assistant',
    text: 'According to **Specification Section 03 30 00 (Cast-in-Place Concrete)** and **Structural General Notes Sheet S-001**:\n\n1. **Seismic Shear Walls (Levels B2 through 4):** Minimum compressive strength **$f\'c = 6,000\\text{ psi}$** at 28 days with low-heat Type II/V Portland cement and max water-cement ratio of $0.38$.\n2. **Post-Tensioned Podium Slabs (Level 1 & 2):** Minimum compressive strength **$f\'c = 5,000\\text{ psi}$** at 28 days ($3,500\\text{ psi}$ initial at post-tension stressing).\n3. **Standard Elevated Slabs:** $4,000\\text{ psi}$ normal weight concrete.\n\n⚠️ **Estimator Note / Addendum Flag:** *Addendum 03 Section 2.1* changed the fly ash replacement cap from $25\\%$ to $20\\%$ max in medical sterile core zones.',
    timestamp: '08:12 AM',
    citations: [
      {
        docName: 'Project_Manual_Specifications_Divisions_01_33.pdf',
        pageNo: 142,
        division: 'Division 03 30 00 — Cast-in-Place Concrete',
        snippet: 'Part 2.2.A: Concrete Mixtures — Shear wall elements between grid lines A1-D4 shall maintain minimum 28-day compressive strength of 6,000 psi (41.4 MPa).',
        confidence: 0.98,
      },
      {
        docName: 'Metro_Med_TowerB_Architectural_Set_Rev3.pdf',
        pageNo: 34,
        sheetNo: 'S-001 General Structural Notes',
        snippet: 'Table 3.1: Concrete Class Schedule - Level P1 to L4 Shear Cores: Class VI 6000 PSI @ 28 Days, W/C = 0.38.',
        confidence: 0.96,
      },
      {
        docName: 'Addendum_03_Structural_MEP_Modifications.pdf',
        pageNo: 3,
        division: 'Addendum 03 Item 2.1',
        snippet: 'Specification 03 30 00 Clause 2.4.C: Pozzolanic supplementary cementitious materials limited to 20% by weight in surgical suites.',
        confidence: 0.94,
      },
    ],
  },
];

export const SAMPLE_SCOPE_GAPS: ScopeGap[] = [
  {
    id: 'gap-01',
    category: 'Drawing Discrepancy',
    title: 'Emergency Generator Fuel Piping: Drawing vs Mechanical Spec Conflict',
    description: 'Sheet M-502 shows dual-wall underground fuel oil piping with leak detection sensors for the 1500kW backup generator, but Division 23 11 13 spec omits the interstitial monitoring panel required by local Austin Fire Code.',
    severity: 'High',
    affectedDocs: ['Sheet M-502 Detail 4', 'Division 23 11 13 Section 2.3'],
    estimatedCostImpact: '+$42,500',
    suggestedAction: 'Issue RFI #04 to clarify if fuel management control panel is under Electrical (Div 26) or Mechanical (Div 23) scope.',
    status: 'Open',
  },
  {
    id: 'gap-02',
    category: 'Missing Spec',
    title: 'Operating Room Ceiling Unistrut Heavy-Duty Equipment Supports',
    description: 'Architectural Sheet A-412 calls for ceiling-mounted surgical boom supports rated for 1,200 lbs dynamic load, but structural drawing S-202 has no supplementary steel framing details between joists.',
    severity: 'High',
    affectedDocs: ['Sheet A-412', 'Sheet S-202', 'Division 05 50 00'],
    estimatedCostImpact: '+$28,000',
    suggestedAction: 'Generate RFI requesting structural engineer standard framing detail for surgical boom attachment.',
    status: 'RFI Drafted',
  },
  {
    id: 'gap-03',
    category: 'Addendum Conflict',
    title: 'Fire Alarm Strobe Candela Ratings in Imaging Suites',
    description: 'Addendum 02 updated the MRI room acoustic ceiling heights from 9\'0" to 11\'6", but Electrical Sheet E-301 was not re-issued with adjusted candela ratings for the high ceiling coverage.',
    severity: 'Medium',
    affectedDocs: ['Addendum 02', 'Sheet E-301'],
    estimatedCostImpact: '+$6,400',
    suggestedAction: 'Update Electrical takeoff to include 110cd strobe devices instead of 75cd.',
    status: 'Open',
  },
  {
    id: 'gap-04',
    category: 'Unassigned Sub-trade',
    title: 'Radiation Shielding Lead-Lined Drywall & Door Frames',
    description: 'Sheet A-602 specifies 1/16" lead-lined gypsum board in Rooms 204-208 (CT Scan). Not explicitly designated under Drywall (Div 09) or Special Construction (Div 13).',
    severity: 'Medium',
    affectedDocs: ['Sheet A-602 Schedule', 'Division 13 49 00'],
    estimatedCostImpact: '+$54,000',
    suggestedAction: 'Confirm with GC whether lead drywall is by General Trades or Drywall subcontractor.',
    status: 'Resolved',
  },
];

export const SAMPLE_RISKS: RiskItem[] = [
  {
    id: 'risk-01',
    category: 'Long Lead Item',
    title: 'Medium Voltage Switchgear & 2500kVA Substation Transformers',
    description: 'Specification 26 12 19 requires custom Eaton or Square D liquid-filled substation transformers with current market lead time of 58-64 weeks, exceeding the project groundbreaking window.',
    severity: 'Critical',
    exposure: '$380,000 + Schedule Delay',
    sourceRef: 'Div 26 12 19 & General Conditions Schedule Art. 4',
    mitigation: 'Request pre-purchase authorization or submit approved equal with expedited lead times.',
  },
  {
    id: 'risk-02',
    category: 'Penalty / Liquidated Damages',
    title: 'Substantial Completion Liquidated Damages ($8,500 / calendar day)',
    description: 'Owner contract enforces aggressive liquidated damages without standard weather exception clause for concrete cure delays during winter pours.',
    severity: 'High',
    exposure: '$8,500/day ($127,500 max cap)',
    sourceRef: 'Supplementary Conditions Section 00 73 00 Item 1.4',
    mitigation: 'Include heated enclosure & accelerating admixture budget contingencies in Division 01 general requirements.',
  },
  {
    id: 'risk-03',
    category: 'Code Non-compliance',
    title: 'Smoke Dampers at 2-Hour Medical Shaft Penetrations',
    description: 'Sheet M-301 indicates motorized smoke dampers without dedicated 120V power circuits on Electrical sheet E-204.',
    severity: 'Medium',
    exposure: '$18,500',
    sourceRef: 'Life Safety Plan LS-101 vs E-204',
    mitigation: 'Coordinate MEP interconnect circuit takeoff to avoid change order friction.',
  },
];

export const SAMPLE_RFIS: RfiItem[] = [
  {
    id: 'rfi-01',
    rfiNumber: 'RFI-001',
    subject: 'Division 03 Concrete Compressive Strength in Sterile Surgery Wings',
    specDivision: '03 30 00 (Cast-in-Place Concrete)',
    drawingRef: 'Sheet S-102 & Spec 03 30 00 Part 2.2',
    question: 'Spec section 03 30 00 specifies 6,000 psi concrete for shear walls but is silent on whether high-early strength mix (3-day cure) is permitted for the post-tensioned level 2 transfer deck to meet the expedited 14-month schedule. Please clarify if Type III cement or accelerator admixes are acceptable.',
    proposedResolution: 'Allow 4,000 psi @ 3 days high-early mix design as tested in trial batch mix design submittal.',
    generatedByAi: true,
    status: 'Approved',
    priority: 'Urgent',
  },
  {
    id: 'rfi-02',
    rfiNumber: 'RFI-002',
    subject: 'Emergency Generator Leak Detection Control Panel Trade Responsibility',
    specDivision: '23 11 13 (Facility Fuel-Oil Piping)',
    drawingRef: 'Sheet M-502 Detail 4 / E-401',
    question: 'Mechanical drawing M-502 detail 4 illustrates an underground fuel oil interstitial sensor and emergency shutoff solenoid. Electrical drawing E-401 does not include low-voltage wiring pathways or power connection for the leak monitoring panel. Please confirm which trade scope provides wiring and hookup.',
    proposedResolution: 'Electrical contractor to provide 120V feed and conduit; Mechanical contractor to provide equipment, sensors, and low-voltage field wiring.',
    generatedByAi: true,
    status: 'Draft',
    priority: 'Standard',
  },
  {
    id: 'rfi-03',
    rfiNumber: 'RFI-003',
    subject: 'Surgical Boom Unistrut Header Support Detail between Joists',
    specDivision: '05 50 00 (Metal Fabrications)',
    drawingRef: 'Sheet A-412 & S-202',
    question: 'Sheet A-412 notes ceiling-mounted medical equipment supports for 1,200 lb dynamic load at OR-1 through OR-4. Structural drawings do not provide a detail for bridging the 6\'-0" span between open-web steel joists. Please provide structural header framing detail.',
    proposedResolution: 'Provide engineered TS 4x4x1/4 tube steel cross-bridging detail with welded clip angles.',
    generatedByAi: true,
    status: 'Sent to GC/Architect',
    priority: 'Urgent',
  },
];

export const SAMPLE_TAKEOFF_ITEMS: TakeoffItem[] = [
  {
    id: 'to-01',
    csiCode: '03 30 00',
    description: '6,000 PSI Shear Wall Concrete (Form, Pour, Finish)',
    location: 'Levels B2 to L4 (Cores A & B)',
    quantity: 1420,
    unit: 'CY',
    materialUnitCost: 215.00,
    laborUnitCost: 165.00,
    totalCost: 539600,
    confidence: 97,
    sheetRef: 'S-101, S-102, S-201',
  },
  {
    id: 'to-02',
    csiCode: '03 20 00',
    description: '#6 & #8 Grade 60 Epoxy-Coated Deformed Rebar',
    location: 'Podium & Foundation Mats',
    quantity: 185,
    unit: 'TON',
    materialUnitCost: 1450.00,
    laborUnitCost: 820.00,
    totalCost: 419950,
    confidence: 94,
    sheetRef: 'S-002 Schedule',
  },
  {
    id: 'to-03',
    csiCode: '09 22 16',
    description: '3-5/8" 20-Gauge Non-Structural Steel Studs @ 16" O.C.',
    location: 'Floor 1 & 2 Partitions (10ft H)',
    quantity: 28400,
    unit: 'LF',
    materialUnitCost: 2.85,
    laborUnitCost: 4.20,
    totalCost: 200220,
    confidence: 99,
    sheetRef: 'A-101, A-102',
  },
  {
    id: 'to-04',
    csiCode: '09 29 00',
    description: '5/8" Type X Fire-Rated Gypsum Board (Level 4 Finish)',
    location: '2-Hour Shaft Enclosures',
    quantity: 56800,
    unit: 'SF',
    materialUnitCost: 0.92,
    laborUnitCost: 1.45,
    totalCost: 134616,
    confidence: 96,
    sheetRef: 'A-601 Wall Types',
  },
  {
    id: 'to-05',
    csiCode: '26 05 19',
    description: '4#500kcmil Copper THHN in 3" EMT Feeder Run',
    location: 'Main Substation to DP-2 Switchboard',
    quantity: 1250,
    unit: 'LF',
    materialUnitCost: 38.50,
    laborUnitCost: 22.00,
    totalCost: 75625,
    confidence: 95,
    sheetRef: 'E-201 One-Line',
  },
  {
    id: 'to-06',
    csiCode: '23 31 13',
    description: 'G90 Galvanized Low-Pressure Supply Ductwork',
    location: 'AHU-1 & AHU-2 Distribution',
    quantity: 16400,
    unit: 'LBS',
    materialUnitCost: 4.80,
    laborUnitCost: 5.60,
    totalCost: 170560,
    confidence: 93,
    sheetRef: 'M-201, M-202',
  },
];

export const SAMPLE_VISION_DIFF_CHANGES: VisionDiffChange[] = [
  {
    id: 'diff-01',
    sheet: 'E-201 Power Plan vs Addendum 03',
    category: 'Added Rebar / Conduit',
    deltaDescription: 'Added 4x 4" dedicated conduits from emergency distribution board E-DP to ICU Level 3 surgical suites.',
    impact: 'Cost Increase',
    coords: { x: 220, y: 140, width: 180, height: 110 },
    deltaCost: '+$34,200',
  },
  {
    id: 'diff-02',
    sheet: 'E-201 Power Plan vs Addendum 03',
    category: 'Equipment Spec Change',
    deltaDescription: 'Main ATS-1 automatic transfer switch capacity upgraded from 800A 3P to 1200A 4P with bypass isolation.',
    impact: 'Cost Increase',
    coords: { x: 460, y: 310, width: 140, height: 95 },
    deltaCost: '+$19,800',
  },
  {
    id: 'diff-03',
    sheet: 'A-204 Architectural vs Addendum 03',
    category: 'Wall Relocation',
    deltaDescription: 'Corridor 204 demising wall shifted 2\'-6" East, expanding nurse station foot-print and adding 3 extra quad outlets.',
    impact: 'Scope Reduction',
    coords: { x: 120, y: 440, width: 220, height: 130 },
    deltaCost: '+$7,400',
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter Estimator',
    tagline: 'Ideal for independent estimators & trade subcontractors bidding up to 10 jobs/month.',
    priceMonthly: 149,
    priceAnnual: 119, // $1,428 billed annually
    period: 'per user / month',
    ctaText: 'Start 14-Day Free Trial',
    ctaAction: 'start_trial',
    description: 'Essential AI takeoff assistance, document indexing, and specification search.',
    features: [
      'Up to 10 Active Bids / Projects',
      '500 Drawing Sheets & Specs / Month',
      'AI Spec Assistant RAG Q&A (pgvector)',
      'CSI MasterFormat 50-Division Classifier',
      'Automated Title Block & Sheet Indexer',
      'Standard OCR (Textract / Tesseract)',
      'Export Takeoffs to Microsoft Excel & CSV',
      'Standard Email & Community Support',
    ],
    limits: {
      projects: '10 active bids',
      sheetsPerMonth: '500 sheets/mo',
      ragQueries: 'Unlimited',
      support: 'Standard email',
      users: '1 Seat included',
    },
  },
  {
    id: 'pro',
    name: 'Professional Copilot',
    popular: true,
    badge: 'MOST POPULAR FOR GCs & SUBS',
    tagline: 'The complete AI estimating copilot for mid-sized contractors and estimating teams.',
    priceMonthly: 399,
    priceAnnual: 319, // $3,828 billed annually
    period: 'per team (5 seats) / month',
    ctaText: 'Start 14-Day Free Trial',
    ctaAction: 'start_trial',
    description: 'Full AI capabilities with Celery async processing, Vision Diff, RFI drafting, and Scope Gap detection.',
    features: [
      'Unlimited Active Bids & Projects',
      '5,000 Drawing Sheets & Specs / Month',
      '5 Estimator Team Seats Included',
      'Vision Diff AI Engine (Drawing Revisions & Addenda comparison)',
      'Automated Scope Gap & Conflict Detection Agent',
      '1-Click Automated RFI Generator & Export',
      'Bid Risk & Long-Lead Analysis Engine',
      'High-Speed Celery Async Workers & Priority Queue',
      'Excel, Word, PDF & Procore Export Ready',
      'Priority 24/7 Estimator Support + 1-on-1 Onboarding',
    ],
    limits: {
      projects: 'Unlimited',
      sheetsPerMonth: '5,000 sheets/mo',
      ragQueries: 'Unlimited + Claude 3.5 Sonnet',
      support: '24/7 Priority + Phone',
      users: '5 Seats ($59/extra seat)',
    },
  },
  {
    id: 'enterprise',
    name: 'Enterprise Custom',
    badge: 'CUSTOM WORKFLOWS & ON-PREM',
    tagline: 'Custom AI infrastructure, trade-specific fine-tuned models, and deep ERP/BIM integrations.',
    priceMonthly: 899,
    priceAnnual: 749, // billed annually or custom invoice
    period: 'custom enterprise billing',
    ctaText: 'Request Enterprise Quote',
    ctaAction: 'get_quote',
    description: 'Enterprise security, dedicated GPU vision workers, custom fine-tuned estimators, and API access.',
    features: [
      'Unlimited Seats, Projects & Drawing Sheets',
      'Custom Fine-Tuned AI Models for Your Trade (Electrical, Mechanical, Concrete, Drywall)',
      'Dedicated Redis/Celery GPU Worker Cluster',
      'Bi-directional Procore & Autodesk Construction Cloud Sync',
      'Multi-tenant DB Isolation & ITAR / SOC-2 Type II Compliance',
      'Predictive Historical Bid-Win Analytics',
      'Custom ERP Integrations (Timberline, Sage, Viewpoint)',
      'Dedicated Solution Architect & Custom SLA (99.99%)',
      'Custom Training with Your Historical Bid Data',
    ],
    limits: {
      projects: 'Unlimited',
      sheetsPerMonth: 'Unlimited',
      ragQueries: 'Dedicated Private Endpoints',
      support: 'Dedicated Slack Channel & Architect',
      users: 'Unlimited Enterprise Seats',
    },
  },
];

export const COMPARISON_MATRIX = [
  {
    category: 'Drawing & Document Processing',
    items: [
      { feature: 'PDF & CAD Drawing Upload', planswift: 'Manual download & local render', bidpilot: 'Cloud drag-and-drop (up to 500MB sets)', highlight: true },
      { feature: 'Automatic Title Block & Sheet No Parsing', planswift: '❌ Manual sheet naming', bidpilot: '✅ Automated AI OCR title extraction', highlight: true },
      { feature: 'CSI MasterFormat 50-Division Chunking', planswift: '❌ None', bidpilot: '✅ Native pgvector semantic chunking', highlight: true },
      { feature: 'Addenda & Revision Vision Diff Engine', planswift: '❌ Manual overlay / optical trick', bidpilot: '✅ AI Computer Vision delta detection + cost tag', highlight: true },
    ],
  },
  {
    category: 'AI Analysis & Copilot Intelligence',
    items: [
      { feature: 'AI Spec Assistant (Natural Language Q&A)', planswift: '❌ None', bidpilot: '✅ RAG Q&A with exact page & sheet citations', highlight: true },
      { feature: 'Automated Scope Gap & Conflict Detection', planswift: '❌ Manual visual check', bidpilot: '✅ Cross-checks specs vs drawings in seconds', highlight: true },
      { feature: '1-Click RFI Draft Generation', planswift: '❌ Manual typing in Word', bidpilot: '✅ Pre-drafted RFIs with code & spec citations', highlight: true },
      { feature: 'Bid Risk & Long-Lead Equipment Alert', planswift: '❌ None', bidpilot: '✅ Automated risk matrix & mitigation suggestions', highlight: true },
    ],
  },
  {
    category: 'Platform & Infrastructure',
    items: [
      { feature: 'Deployment & OS Support', planswift: 'Windows-only legacy desktop app', bidpilot: 'Cloud-native Web (Mac, Windows, iPad, Linux)', highlight: true },
      { feature: 'Team Collaboration & Concurrent Review', planswift: '❌ Single-user file locks', bidpilot: '✅ Real-time multi-user cloud workspace', highlight: true },
      { feature: 'Processing Architecture', planswift: 'Local CPU freeze during large imports', bidpilot: 'FastAPI + Celery async worker queue (zero lag)', highlight: true },
      { feature: 'Procore & Autodesk Construction Cloud Sync', planswift: 'Manual Excel import/export', bidpilot: '✅ Direct 2-way API synchronization', highlight: true },
    ],
  },
];

export const TRADE_SOLUTIONS = [
  {
    id: 'electrical',
    name: 'Electrical Contractors',
    csi: 'Division 26, 27, 28',
    icon: 'Zap',
    headline: 'Never Miss a Conduit Run, Panelboard Spec, or Hazardous Area Requirement',
    bullets: [
      'Instant count of lighting fixtures, occupancy sensors, and emergency disconnects',
      'One-line diagram cross-referencing against electrical equipment schedules',
      'Automatic feeder length and voltage drop calculation flags',
      'Addendum delta detection for switchgear capacity changes',
    ],
    stat: '82% faster electrical takeoffs',
  },
  {
    id: 'mep',
    name: 'HVAC & Mechanical',
    csi: 'Division 22, 23',
    icon: 'Wind',
    headline: 'Eliminate Ductwork Takeoff Errors and Equipment Schedule Discrepancies',
    bullets: [
      'Ductwork poundage and linear foot classification by pressure class',
      'Cross-checks diffuser CFM callouts on drawings vs VAV box schedules in specs',
      'Detects omitted vibration isolators and fire/smoke damper power circuits',
      'Chiller and boiler lead-time risk alarms',
    ],
    stat: '4.5 hrs saved per mechanical bid',
  },
  {
    id: 'concrete',
    name: 'Concrete & Masonry',
    csi: 'Division 03, 04',
    icon: 'Layers',
    headline: 'Accurate Cubic Yardage, Rebar Tonnage, and Formwork Calculations',
    bullets: [
      'Volume calculations for foundations, columns, post-tensioned slabs, and tilt-up panels',
      'Rebar tonnage estimation categorized by bar size and epoxy coatings',
      'Spec discrepancy detection (e.g. fly ash limits vs high-early strength requirements)',
      'Pour sequence and weather curing contingency calculations',
    ],
    stat: '99.4% takeoff accuracy rating',
  },
  {
    id: 'drywall',
    name: 'Drywall, Framing & Finishes',
    csi: 'Division 09',
    icon: 'Grid',
    headline: 'Instant Wall Partition Linear Footage and Level of Finish Takeoff',
    bullets: [
      'Multi-layer drywall, acoustical ceilings, and stud gauge square footage breakdown',
      'Automatic detection of lead-lined drywall or moisture-resistant greenboard in wet areas',
      'Wall height override detection from architectural reflected ceiling plans',
      '1-click export to Excel pricing templates',
    ],
    stat: '3x more bids submitted monthly',
  },
  {
    id: 'gc',
    name: 'General Contractors',
    csi: 'Divisions 01 - 33',
    icon: 'Building2',
    headline: 'Complete Subcontractor Scope Coordination and Gap Elimination',
    bullets: [
      'Zero scope gaps between trade packages (MEP vs Structural vs Finishes)',
      'Automated RFI drafting to architect and owner within 2 hours of drawing release',
      'Preconstruction risk scorecards for client executive review',
      'Subcontractor bid leveling and variance detection',
    ],
    stat: '$210K avg savings in prevented change orders',
  },
];
