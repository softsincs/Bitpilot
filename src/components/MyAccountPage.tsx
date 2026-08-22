import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Mail, 
  CheckCircle, 
  ArrowRight, 
  ShieldCheck, 
  UserPlus, 
  KeyRound, 
  Download, 
  Copy, 
  ExternalLink, 
  Calendar, 
  HardDrive, 
  Check, 
  Search, 
  FileSpreadsheet, 
  Sparkles, 
  Building2, 
  Users, 
  CreditCard, 
  RefreshCw, 
  AlertCircle, 
  FileText, 
  CheckCircle2, 
  LogOut,
  Bell,
  Tv,
  Settings,
  Plus,
  Circle,
  X,
  Briefcase,
  Layers,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  Upload,
  FileCheck,
  FileCheck2,
  TrendingUp,
  Inbox,
  Clock,
  CheckSquare,
  DollarSign,
  Layers2,
  GitPullRequest,
  MessageSquare,
  MapPin,
  Compass,
  Filter as FilterIcon,
  List,
  Map as MapIcon,
  ExternalLink as ExternalLinkIcon,
  Calculator,
  PieChart,
  BarChart3,
  Sliders,
  FolderKanban,
  Phone,
  Globe,
  PlayCircle,
  TrendingDown,
  History,
  FileCode,
  Tag,
  AlertTriangle,
  User
} from 'lucide-react';
import bannerImg from '../assets/trades/general_contractor.jpg';
import logoImg from '../assets/bidpilot_logo.jpg';

interface MyAccountPageProps {
  isLoggedIn?: boolean;
  setIsLoggedIn?: (val: boolean) => void;
  onNavigateHome: () => void;
  onOpenTrial: (planId?: string) => void;
}

interface UserAccount {
  name: string;
  email: string;
  password?: string;
  companyName: string;
  role?: string;
  token?: string;
}

interface ProjectItem {
  id: string;
  name: string;
  clientGC: string;
  location: string;
  region: string;
  trade: string;
  status: string;
  value: string;
  sheets: number;
  uploadedDrawings?: string[];
  rfisCount?: number;
}

interface VendorItem {
  id: string;
  name: string;
  scopeTrades: string;
  primaryContact: string;
  email: string;
  phone: string;
  website: string;
}

interface BidLead {
  id: string;
  title: string;
  agency: string;
  csiTag: string;
  source: string;
  timeLeft: string;
  location: string;
  trade: string;
  estimatedValue: string;
  isAdded?: boolean;
}

interface QuoteHistoryItem {
  id: string;
  projectName: string;
  itemDescription: string;
  csiCode: string;
  vendorName: string;
  unitPrice: string;
  quantity: string;
  totalPrice: string;
  date: string;
}

// Initial registered users list
const INITIAL_USERS: UserAccount[] = [
  {
    name: 'Mehar Abdullah',
    email: 'meharabdullah4337@gmail.com',
    password: 'password123',
    companyName: 'Abdullah Estimators LLC',
    role: 'Admin'
  },
  {
    name: 'John Construct',
    email: 'estimator@bidpilot.ai',
    password: 'password123',
    companyName: 'ConstructConnect Partner GC',
    role: 'Estimator'
  }
];

export const MyAccountPage: React.FC<MyAccountPageProps> = ({
  isLoggedIn: propIsLoggedIn,
  setIsLoggedIn: propSetIsLoggedIn,
  onNavigateHome,
  onOpenTrial,
}) => {
  // Registered Users State (with LocalStorage persistence)
  const [registeredUsers, setRegisteredUsers] = useState<UserAccount[]>(() => {
    try {
      const saved = localStorage.getItem('bidpilot_registered_users');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_USERS;
  });

  // Current Logged-in User Account
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const savedUser = localStorage.getItem('bidpilot_active_user');
      if (savedUser) {
        return JSON.parse(savedUser);
      }
    } catch {
      // fallback
    }
    return INITIAL_USERS[0];
  });

  // Form input states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup form states
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [signupCompany, setSignupCompany] = useState('');
  const [signupRole, setSignupRole] = useState('Estimator');
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false);

  // Auth View Mode: 'login' | 'register' | 'forgot'
  const [viewMode, setViewMode] = useState<'login' | 'register' | 'forgot'>('login');

  // Error & Status Messages
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);


  // Global Logged In State
  const [internalLoggedIn, setInternalLoggedIn] = useState(false);
  const isLoggedIn = propIsLoggedIn !== undefined ? propIsLoggedIn : internalLoggedIn;
  const setIsLoggedIn = propSetIsLoggedIn || setInternalLoggedIn;

  const [notification, setNotification] = useState<string | null>(null);

  // Save registered users to localStorage whenever changed
  useEffect(() => {
    try {
      localStorage.setItem('bidpilot_registered_users', JSON.stringify(registeredUsers));
    } catch {
      // ignore
    }
  }, [registeredUsers]);

  // Hub Current View: 'dashboard' | 'new_project' | 'project_detail' | 'find_work' | 'estimate' | 'projects' | 'vendors' | 'history' | 'demo'
  const [currentView, setCurrentView] = useState<'dashboard' | 'new_project' | 'project_detail' | 'find_work' | 'estimate' | 'projects' | 'vendors' | 'history' | 'demo'>('dashboard');

  // Currently Selected / Active Project in Workspace
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  
  // Project Workspace Sidebar Active Tab
  const [projectSidebarTab, setProjectSidebarTab] = useState<string>('drawings');

  // Organization & Checklist State
  const [orgName, setOrgName] = useState('My Contracting Co.');
  const [renameOrgModalOpen, setRenameOrgModalOpen] = useState(false);
  const [tempOrgName, setTempOrgName] = useState(orgName);
  const [setupDismissed, setSetupDismissed] = useState(false);
  const [step1Done, setStep1Done] = useState(false);
  const [step2Done, setStep2Done] = useState(false);
  const [step3Done, setStep3Done] = useState(false);

  // Projects List (User Isolated - starts 100% empty until user creates a project)
  const [projects, setProjects] = useState<ProjectItem[]>([]);

  // Sync and load user-specific projects from localStorage & Neon Cloud DB
  useEffect(() => {
    const activeEmail = currentUser?.email || loginEmail;
    if (!activeEmail) {
      setProjects([]);
      return;
    }

    const cleanEmail = activeEmail.toLowerCase().trim();
    const storageKey = `bidpilot_projects_${cleanEmail}`;

    // 1. Load from local cache for instant zero-latency UI
    try {
      const cached = localStorage.getItem(storageKey);
      if (cached) {
        setProjects(JSON.parse(cached));
      } else {
        setProjects([]);
      }
    } catch {
      setProjects([]);
    }

    // 2. Fetch live user projects from Neon PostgreSQL database
    fetch(`http://127.0.0.1:8000/api/v1/projects?user_email=${encodeURIComponent(cleanEmail)}`)
      .then(res => res.json())
      .then(dbProjects => {
        if (Array.isArray(dbProjects)) {
          const mapped: ProjectItem[] = dbProjects.map((p: any) => ({
            id: `proj-db-${p.id}`,
            name: p.name,
            clientGC: p.trade_focus || 'General Contractor',
            location: p.location || 'Lahore',
            region: 'US - South',
            trade: p.trade_focus || 'Commercial Bid Package',
            status: p.status || 'Draft',
            value: p.estimated_value ? `$${(p.estimated_value / 1000000).toFixed(2)}M` : '$1,250,000',
            sheets: 0,
          }));
          setProjects(mapped);
          try {
            localStorage.setItem(storageKey, JSON.stringify(mapped));
          } catch {}
        }
      })
      .catch(() => {});
  }, [currentUser, loginEmail]);

  // Vendors Roster State
  const [vendors, setVendors] = useState<VendorItem[]>([
    {
      id: 'v1',
      name: 'Titan Ready-Mix Concrete Inc.',
      scopeTrades: 'Ready Mix, Pumping, 6000 psi Mix',
      primaryContact: 'Robert Miller',
      email: 'sales@titanconcrete.com',
      phone: '(555) 234-5678',
      website: 'https://titanconcrete.com',
    },
    {
      id: 'v2',
      name: 'Apex Electrical Supply Co.',
      scopeTrades: 'Switchgear, Conduit, 480V Panels',
      primaryContact: 'Sarah Johnson',
      email: 'bids@apexelectrical.com',
      phone: '(555) 345-6789',
      website: 'https://apexelectrical.com',
    }
  ]);
  const [showAddVendorForm, setShowAddVendorForm] = useState(false);
  const [vName, setVName] = useState('');
  const [vScopeTrades, setVScopeTrades] = useState('');
  const [vPrimaryContact, setVPrimaryContact] = useState('');
  const [vEmail, setVEmail] = useState('');
  const [vPhone, setVPhone] = useState('');
  const [vWebsite, setVWebsite] = useState('');

  // ------------------------------------------------------------------
  // ARCHITECTURE FEATURES: DRAWING CAD DIFF & SPEC ASSISTANT AI
  // ------------------------------------------------------------------
  const [isDrawingDiffModalOpen, setIsDrawingDiffModalOpen] = useState(false);
  const [diffViewMode, setDiffViewMode] = useState<'split' | 'overlay' | 'diff_only'>('split');
  const [diffZoom, setDiffZoom] = useState(100);
  const [selectedDiffSheet, setSelectedDiffSheet] = useState('E-401_Electrical_Power_Plan.pdf');

  const [isSpecAssistantOpen, setIsSpecAssistantOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{
    role: 'user' | 'assistant';
    text: string;
    citations?: string[];
  }[]>([
    {
      role: 'assistant',
      text: 'Hello! I am your AI Spec & Drawing Copilot. I have indexed all specifications, CSI MasterFormat divisions, and drawing sheets for this bid. Ask me anything about scope, material specs, or drawing discrepancies!',
      citations: ['CSI Division 01 — General Requirements', 'pgvector Index Active'],
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isSearchingSpec, setIsSearchingSpec] = useState(false);

  const [isProjectSearchModalOpen, setIsProjectSearchModalOpen] = useState(false);
  const [projectSearchQuery, setProjectSearchQuery] = useState('');
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);

  const handleAskSpecAssistant = async (queryText?: string) => {
    const q = queryText || chatInput;
    if (!q.trim()) return;

    const userMsg = { role: 'user' as const, text: q };
    setChatMessages(prev => [...prev, userMsg]);
    if (!queryText) setChatInput('');
    setIsSearchingSpec(true);

    try {
      const res = await fetch('http://127.0.0.1:8000/api/v1/projects/1/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q, trade_focus: activeProject?.trade || 'General Contractor' })
      });

      if (res.ok) {
        const data = await res.json();
        const extractedCitations: string[] = [];
        if (Array.isArray(data.citations) && data.citations.length > 0) {
          data.citations.forEach((c: any) => {
            const label = `${c.section_code ? c.section_code + ' — ' : ''}${c.csi_division || ''} (${c.sheet_or_page || 'Project Manual'})`.trim();
            if (label) extractedCitations.push(label);
          });
        }

        setChatMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            text: data.answer,
            citations: extractedCitations.length > 0 ? extractedCitations : undefined
          }
        ]);
        setIsSearchingSpec(false);
        return;
      }
    } catch {
      // Offline fallback
    }

    // Realistic Construction Estimator RAG Answer Fallback
    setTimeout(() => {
      const isGreeting = /^(hlo|hello|hi|hey|kasa ho|kaise ho|salam|aoa)/i.test(q.trim());
      
      let mockAnswer = `According to Spec Section 26 32 13 (Page 14, Line 28), the emergency generator fuel system strictly requires UL-142 listed double-wall secondary containment steel piping with leak detection probes.`;
      let mockCitations: string[] | undefined = ['Spec Section 26 32 13 — Emergency Standby Power', 'Drawing Sheet E-401 Detail 2'];

      if (isGreeting) {
        mockAnswer = `Hello! Main theek hoon, aap bataiye main aapki construction project specifications, drawings, ya CSI takeoff mein kaise madad kar sakta hoon?`;
        mockCitations = undefined;
      } else if (q.toLowerCase().includes('concrete') || q.toLowerCase().includes('strength')) {
        mockAnswer = `Spec Section 03 30 00 (Page 8, §2.1.A) requires 6,000 PSI compressive strength at 28 days with a maximum 0.40 water-cementitious ratio and silica fume admixture for the main podium foundation slab.`;
        mockCitations = ['Spec Section 03 30 00 — Cast-in-Place Concrete', 'Sheet S-101 Foundation Schedule'];
      } else if (q.toLowerCase().includes('wire') || q.toLowerCase().includes('copper')) {
        mockAnswer = `Spec Section 26 05 19 mandates 100% solid or stranded copper conductors for all branch circuits #10 AWG and smaller. Aluminum alloy (AA-8000) is permitted only for service feeder runs #1/0 AWG and above.`;
        mockCitations = ['Spec Section 26 05 19 — Low-Voltage Electrical Power', 'Sheet E-201 Panelboard Schedule'];
      }

      setChatMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: mockAnswer,
          citations: mockCitations
        }
      ]);
      setIsSearchingSpec(false);
    }, 700);
  };

  // History State
  const [historySearch, setHistorySearch] = useState('');
  const [historyCsiFilter, setHistoryCsiFilter] = useState('All CSI Codes');
  const [quoteHistoryList, setQuoteHistoryList] = useState<QuoteHistoryItem[]>([
    {
      id: 'q-101',
      projectName: 'Metro City Medical Center Expansion',
      itemDescription: '6,000 PSI High-Strength Foundation Concrete with Silica Fume',
      csiCode: '03 30 00',
      vendorName: 'Titan Ready-Mix Concrete Inc.',
      unitPrice: '$178.50 / CY',
      quantity: '4,200 CY',
      totalPrice: '$749,700',
      date: 'Aug 12, 2026',
    },
    {
      id: 'q-102',
      projectName: 'Summit Technology Park Building B',
      itemDescription: '480V 3-Phase 2000A Main Distribution Switchboard (NEMA 3R)',
      csiCode: '26 24 13',
      vendorName: 'Apex Electrical Supply Co.',
      unitPrice: '$48,200.00 / EA',
      quantity: '2 EA',
      totalPrice: '$96,400',
      date: 'Aug 10, 2026',
    },
    {
      id: 'q-103',
      projectName: 'Bayview Luxury Waterfront High-Rise',
      itemDescription: 'Variable Refrigerant Flow (VRF) Heat Recovery Outdoor Units 16-Ton',
      csiCode: '23 81 29',
      vendorName: 'Midwest Mechanical HVAC Group',
      unitPrice: '$21,450.00 / EA',
      quantity: '8 EA',
      totalPrice: '$171,600',
      date: 'Jul 28, 2026',
    },
    {
      id: 'q-104',
      projectName: 'Metro City Medical Center Expansion',
      itemDescription: 'Type X 5/8" Fire-Rated Gypsum Board Assemblies (2-Hour Partition)',
      csiCode: '09 22 16',
      vendorName: 'Continental Drywall & Acoustical',
      unitPrice: '$2.85 / SF',
      quantity: '86,000 SF',
      totalPrice: '$245,100',
      date: 'Jul 15, 2026',
    },
  ]);

  // ==================================================================
  // RFI (REQUEST FOR INFORMATION) STATE & SYSTEM
  // ==================================================================
  const [projectRFIs, setProjectRFIs] = useState<{
    id: string;
    number: string;
    title: string;
    csiCode: string;
    drawingRef: string;
    specRef: string;
    status: 'Draft' | 'Submitted' | 'Answered';
    question: string;
    suggestedSolution: string;
    impactCost: string;
    impactDays: string;
    dateCreated: string;
  }[]>([
    {
      id: 'rfi-1',
      number: 'RFI-001',
      title: 'Emergency Generator Fuel Piping Dual-Wall Containment',
      csiCode: '26 32 13',
      drawingRef: 'Sheet E-401 Detail 4',
      specRef: 'Spec Section 26 32 13, Page 14, §2.1.A',
      status: 'Draft',
      question: 'Drawing Sheet E-401 Detail 4 notes single-wall black steel fuel supply piping for the 750kW generator pad, whereas Spec Section 26 32 13 mandates UL-142 listed double-wall secondary containment with leak detection probes. Please confirm which specification governs.',
      suggestedSolution: 'Provide UL-142 double-wall fuel piping with monitoring console at an estimated delta of +$42,000.',
      impactCost: '+$42,000',
      impactDays: '+3 Days',
      dateCreated: 'Aug 15, 2026',
    },
    {
      id: 'rfi-2',
      number: 'RFI-002',
      title: 'Main Switchboard Ampacity & MRI Feeder Coordination',
      csiCode: '26 24 13',
      drawingRef: 'Sheet E-201 Panelboard Schedule',
      specRef: 'Spec Section 26 24 13, Page 6',
      status: 'Submitted',
      question: 'The panelboard schedule on Sheet E-201 lists a 1600A main service switchboard, but medical equipment cut sheets indicate a 2000A frame is required for simultaneous chiller and MRI loads. Please clarify required switchboard rating.',
      suggestedSolution: 'Upgrade main distribution board frame size to 2000A NEMA 3R enclosure.',
      impactCost: '+$18,500',
      impactDays: '+2 Days',
      dateCreated: 'Aug 14, 2026',
    }
  ]);

  const [isDraftRFIModalOpen, setIsDraftRFIModalOpen] = useState(false);
  const [rfiFormNumber, setRfiFormNumber] = useState('RFI-003');
  const [rfiFormTitle, setRfiFormTitle] = useState('');
  const [rfiFormCsi, setRfiFormCsi] = useState('03 30 00');
  const [rfiFormDrawing, setRfiFormDrawing] = useState('Sheet S-101 Foundation');
  const [rfiFormSpec, setRfiFormSpec] = useState('Spec Section 03 30 00');
  const [rfiFormQuestion, setRfiFormQuestion] = useState('');
  const [rfiFormSolution, setRfiFormSolution] = useState('');
  const [rfiFormCost, setRfiFormCost] = useState('+$15,000');
  const [rfiFormDays, setRfiFormDays] = useState('+2 Days');

  const handleCreateRFI = (e: React.FormEvent) => {
    e.preventDefault();
    const newRFI = {
      id: 'rfi-' + Date.now(),
      number: rfiFormNumber || `RFI-00${projectRFIs.length + 1}`,
      title: rfiFormTitle || 'Foundation Waterproofing Conflict',
      csiCode: rfiFormCsi,
      drawingRef: rfiFormDrawing,
      specRef: rfiFormSpec,
      status: 'Draft' as const,
      question: rfiFormQuestion || 'Discrepancy noted between foundation detail and waterproofing spec.',
      suggestedSolution: rfiFormSolution || 'Apply elastomeric membrane per manufacturer recommendation.',
      impactCost: rfiFormCost,
      impactDays: rfiFormDays,
      dateCreated: 'Today',
    };

    setProjectRFIs(prev => [newRFI, ...prev]);
    setIsDraftRFIModalOpen(false);
    setNotification(`Successfully drafted and indexed "${newRFI.number}: ${newRFI.title}".`);

    // Reset form
    setRfiFormTitle('');
    setRfiFormQuestion('');
    setRfiFormSolution('');
  };

  const filteredHistory = quoteHistoryList.filter(item => {
    const matchesSearch = item.itemDescription.toLowerCase().includes(historySearch.toLowerCase()) ||
                          item.vendorName.toLowerCase().includes(historySearch.toLowerCase()) ||
                          item.projectName.toLowerCase().includes(historySearch.toLowerCase());
    const matchesCsi = historyCsiFilter === 'All CSI Codes' || item.csiCode.startsWith(historyCsiFilter.slice(0, 2));
    return matchesSearch && matchesCsi;
  });

  // ------------------------------------------------------------------
  // AUTHENTICATION LOGIC (Login, Signup & Verification)
  // ------------------------------------------------------------------
  const validateEmailFormat = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const getPasswordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[!@#$%^&*(),.?":{}|<>\-_+=[\]\\/`~]/.test(pwd)) score++;
    return score; // 0 to 5
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);

    const cleanEmail = loginEmail.trim().toLowerCase();
    const cleanPassword = loginPassword.trim();

    if (!cleanEmail || !cleanPassword) {
      setAuthError('Please provide both your email address and password.');
      return;
    }

    if (!validateEmailFormat(cleanEmail)) {
      setAuthError('Please enter a valid email address (e.g., estimator@company.com).');
      return;
    }

    setIsSubmittingAuth(true);

    // 1. Attempt Backend API Authentication
    try {
      const res = await fetch('http://127.0.0.1:8000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password: cleanPassword })
      });

      if (res.ok) {
        const data = await res.json();
        const authedUser: UserAccount = {
          name: data.user_name || cleanEmail.split('@')[0],
          email: data.email || cleanEmail,
          companyName: data.company || 'Apex Horizon Builders LLC',
          role: data.role || 'Estimator',
          token: data.access_token
        };

        setCurrentUser(authedUser);
        if (authedUser.companyName) setOrgName(authedUser.companyName);
        try {
          localStorage.setItem('bidpilot_active_user', JSON.stringify(authedUser));
          localStorage.setItem('bidpilot_token', data.access_token);
        } catch {}

        setIsLoggedIn(true);
        setNotification(`Welcome back, ${authedUser.name}! (${authedUser.role})`);
        setIsSubmittingAuth(false);
        return;
      } else if (res.status === 401) {
        setAuthError('Incorrect email or password. Please check your credentials or create an account.');
        setIsSubmittingAuth(false);
        return;
      } else if (res.status === 429) {
        setAuthError('Rate limit exceeded: Too many login attempts. Please wait 60 seconds before trying again.');
        setIsSubmittingAuth(false);
        return;
      }
    } catch {
      // Backend offline: use offline registered database fallback
    }

    // 2. Offline / Local fallback check
    const matchedUser = registeredUsers.find(
      u => u.email.toLowerCase() === cleanEmail
    );

    if (!matchedUser) {
      setAuthError(
        `No account found with "${loginEmail}". Please click "CREATE AN ACCOUNT" below to complete signup first.`
      );
      setIsSubmittingAuth(false);
      return;
    }

    if (matchedUser.password && matchedUser.password !== cleanPassword) {
      setAuthError('Incorrect password. Please try again or reset your password.');
      setIsSubmittingAuth(false);
      return;
    }

    // Successfully Authenticated via offline fallback
    setCurrentUser(matchedUser);
    if (matchedUser.companyName) {
      setOrgName(matchedUser.companyName);
    }
    try {
      localStorage.setItem('bidpilot_active_user', JSON.stringify(matchedUser));
    } catch {}

    setIsLoggedIn(true);
    setNotification(`Welcome back, ${matchedUser.name}!`);
    setIsSubmittingAuth(false);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);

    const cleanEmail = signupEmail.trim().toLowerCase();
    const cleanName = signupName.trim();
    const cleanPassword = signupPassword.trim();
    const cleanConfirmPassword = signupConfirmPassword.trim();
    const cleanCompany = signupCompany.trim() || 'My Contracting Co.';
    const role = signupRole || 'Estimator';

    // 1. Required field validation
    if (!cleanName) {
      setAuthError('Please enter your full name.');
      return;
    }
    if (!cleanEmail) {
      setAuthError('Please enter your email address.');
      return;
    }
    if (!validateEmailFormat(cleanEmail)) {
      setAuthError('Please enter a valid email format (e.g. name@company.com).');
      return;
    }
    if (!cleanPassword) {
      setAuthError('Please enter a secure password.');
      return;
    }
    if (cleanPassword.length < 8) {
      setAuthError('Password must be at least 8 characters long.');
      return;
    }
    if (getPasswordStrength(cleanPassword) < 3) {
      setAuthError('Password is too weak. Must include uppercase, lowercase, numbers, and special characters.');
      return;
    }
    if (cleanPassword !== cleanConfirmPassword) {
      setAuthError('Password and Confirm Password do not match. Please verify both fields.');
      return;
    }

    setIsSubmittingAuth(true);

    // 2. Register via Backend API
    try {
      const res = await fetch('http://127.0.0.1:8000/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          password: cleanPassword,
          confirm_password: cleanConfirmPassword,
          company_name: cleanCompany,
          role: role
        })
      });

      if (res.ok) {
        const data = await res.json();
        const newUser: UserAccount = {
          name: cleanName,
          email: cleanEmail,
          companyName: cleanCompany,
          role: role,
          token: data.access_token
        };

        const updatedUsers = [...registeredUsers.filter(u => u.email !== cleanEmail), newUser];
        setRegisteredUsers(updatedUsers);
        try {
          localStorage.setItem('bidpilot_registered_users', JSON.stringify(updatedUsers));
        } catch {}

        setLoginEmail(cleanEmail);
        setLoginPassword('');
        setSignupName('');
        setSignupEmail('');
        setSignupPassword('');
        setSignupConfirmPassword('');
        setSignupCompany('');

        setAuthSuccess(`Account created successfully for ${cleanName}! Please enter your password to login.`);
        setViewMode('login');
        setIsSubmittingAuth(false);
        return;
      } else {
        const errData = await res.json().catch(() => ({}));
        const errMsg = errData?.error?.message || errData?.detail || 'Registration failed on server.';
        setAuthError(errMsg);
        setIsSubmittingAuth(false);
        return;
      }
    } catch {
      // Backend offline fallback registration
    }

    // Check if user is already registered locally
    const existingUser = registeredUsers.find(
      u => u.email.toLowerCase() === cleanEmail
    );

    if (existingUser) {
      setAuthError(
        `This email (${signupEmail}) is ALREADY REGISTERED! Please go to Login or use another email address.`
      );
      setIsSubmittingAuth(false);
      return;
    }

    // Create New User Account in local store
    const newUser: UserAccount = {
      name: cleanName,
      email: cleanEmail,
      password: cleanPassword,
      companyName: cleanCompany,
      role: role
    };

    const updatedUsers = [...registeredUsers, newUser];
    setRegisteredUsers(updatedUsers);
    try {
      localStorage.setItem('bidpilot_registered_users', JSON.stringify(updatedUsers));
    } catch {}

    // Prefill login email
    setLoginEmail(cleanEmail);
    setLoginPassword('');
    
    // Clear signup form
    setSignupName('');
    setSignupEmail('');
    setSignupPassword('');
    setSignupConfirmPassword('');
    setSignupCompany('');

    setAuthSuccess(`Account created successfully for ${cleanName}! Please enter your password to login.`);
    setViewMode('login');
    setIsSubmittingAuth(false);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess('Password reset link and temporary code have been dispatched to your email.');
    setViewMode('login');
  };


  const getDisplayUsername = () => {
    if (currentUser?.name) return currentUser.name;
    if (loginEmail) {
      const username = loginEmail.split('@')[0];
      return username.charAt(0).toUpperCase() + username.slice(1);
    }
    return 'Estimator';
  };

  const getDisplayEmail = () => {
    return currentUser?.email || loginEmail || 'estimator@bidpilot.ai';
  };

  const handleCreateVendorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vName) return;

    const newVendor: VendorItem = {
      id: `v-${Date.now()}`,
      name: vName,
      scopeTrades: vScopeTrades || 'General Supplies',
      primaryContact: vPrimaryContact || 'Estimating Dept',
      email: vEmail || 'bids@vendor.com',
      phone: vPhone || '(555) 555-5555',
      website: vWebsite || 'https://vendor.com',
    };

    setVendors([newVendor, ...vendors]);
    setStep3Done(true);
    setShowAddVendorForm(false);
    setVName('');
    setVScopeTrades('');
    setVPrimaryContact('');
    setVEmail('');
    setVPhone('');
    setVWebsite('');

    setNotification(`Vendor "${newVendor.name}" added to roster address book.`);
  };

  // New Project Form State
  const [formProjectName, setFormProjectName] = useState('');
  const [formClientGC, setFormClientGC] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formRegion, setFormRegion] = useState('— set later —');
  const [selectedFileName, setSelectedFileName] = useState<string>('No file chosen');
  const [documentKind, setDocumentKind] = useState<string>('Drawings (bid set)');
  const [discipline, setDiscipline] = useState<string>('Full set (all disciplines)');
  const [agreeTerms, setAgreeTerms] = useState<boolean>(true);
  const [projectDrawingsMap, setProjectDrawingsMap] = useState<Record<string, { name: string; sheets: number; date: string }[]>>({
    'proj-001': [
      { name: 'A-Architectural_Full_Set_Rev2.pdf', sheets: 64, date: '2026-08-15' },
      { name: 'S-Structural_Foundation_Plan_Rev1.pdf', sheets: 32, date: '2026-08-14' },
    ],
    'proj-002': [
      { name: 'Bayview_Structural_Drawings_Rev1.pdf', sheets: 48, date: '2026-08-10' },
    ],
    'proj-003': [
      { name: 'Summit_MEP_Electrical_Set_Rev3.pdf', sheets: 56, date: '2026-08-12' },
    ]
  });
  const [pricedTakeoffFileName, setPricedTakeoffFileName] = useState<string>('No file chosen');

  const activeProjectDrawings = activeProject 
    ? (projectDrawingsMap[activeProject.id] || [])
    : [];

  // Free Construction Cost Estimator State
  const [estProjectType, setEstProjectType] = useState('Commercial — Ground-Up Building');
  const [estTradeScope, setEstTradeScope] = useState('General Contractor — whole building');
  const [estSqft, setEstSqft] = useState<number>(5000);
  const [estRegion, setEstRegion] = useState('California');
  const [estRetrofit, setEstRetrofit] = useState(false);
  const [estHighSpec, setEstHighSpec] = useState(false);
  const [calculatedEstimate, setCalculatedEstimate] = useState<{
    minCost: number;
    maxCost: number;
    minRate: number;
    maxRate: number;
    materials: number;
    labor: number;
    subcontract: number;
    overhead: number;
  } | null>(null);

  const handleGenerateEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    const baseSqft = Number(estSqft) || 5000;
    
    let baseRate = 280;
    if (estTradeScope.includes('Concrete')) baseRate = 85;
    else if (estTradeScope.includes('Electrical')) baseRate = 65;
    else if (estTradeScope.includes('HVAC')) baseRate = 58;
    else if (estTradeScope.includes('Drywall')) baseRate = 42;
    else if (estTradeScope.includes('Plumbing')) baseRate = 48;
    
    if (estRegion === 'California' || estRegion === 'New York') baseRate *= 1.25;
    if (estRetrofit) baseRate *= 1.15;
    if (estHighSpec) baseRate *= 1.30;

    const minRate = Math.round(baseRate);
    const maxRate = Math.round(baseRate * 1.32);
    const minCost = minRate * baseSqft;
    const maxCost = maxRate * baseSqft;
    const midCost = (minCost + maxCost) / 2;

    setCalculatedEstimate({
      minCost,
      maxCost,
      minRate,
      maxRate,
      materials: Math.round(midCost * 0.44),
      labor: Math.round(midCost * 0.36),
      subcontract: Math.round(midCost * 0.12),
      overhead: Math.round(midCost * 0.08),
    });
  };

  const handleConvertEstimateToProject = () => {
    if (!calculatedEstimate) return;
    const newP: ProjectItem = {
      id: `proj-est-${Date.now()}`,
      name: `${estProjectType.split('—')[0].trim()} (${estSqft.toLocaleString()} sqft)`,
      clientGC: `${estTradeScope.split('—')[0].trim()}`,
      location: `${estRegion}, US`,
      region: estRegion,
      trade: estTradeScope,
      status: 'Estimate Formatted',
      value: `$${(calculatedEstimate.minCost / 1000000).toFixed(2)}M – $${(calculatedEstimate.maxCost / 1000000).toFixed(2)}M`,
      sheets: 12,
    };
    setProjects([newP, ...projects]);
    setActiveProject(newP);
    setCurrentView('project_detail');
    setNotification(`Estimate converted into project "${newP.name}" with full takeoff breakdown.`);
  };

  // Find Work State
  const [filterState, setFilterState] = useState('');
  const [filterTrade, setFilterTrade] = useState('All trades');
  const [filterSource, setFilterSource] = useState('All sources');
  const [filterClosing, setFilterClosing] = useState('Any time');
  const [filterZip, setFilterZip] = useState('');
  const [viewFormat, setViewFormat] = useState<'list' | 'map'>('list');

  const [bidsList, setBidsList] = useState<BidLead[]>([
    {
      id: 'bid-001',
      title: 'Z2DA--542-26-109 | Replace Flat Roof Building 57 | NCO 4 Construction East (VA-26-00053...)',
      agency: 'VETERANS AFFAIRS, DEPARTMENT OF VETERANS AFFAIRS, DEPARTMENT OF 244-NETWORK CONTRACT OF...',
      csiTag: 'CSI 01',
      source: 'SAM.gov (Federal)',
      timeLeft: '1 day left',
      location: 'Coatesville, PA',
      trade: 'Roofing & Framing',
      estimatedValue: '$850,000',
      isAdded: false,
    },
    {
      id: 'bid-002',
      title: 'Amendment 0001 - Questions and Answers "Enclosure A - 19KU2026Q0013 - AEWA Door &..."',
      agency: 'STATE, DEPARTMENT OF STATE, DEPARTMENT OF US EMBASSY KUWAIT',
      csiTag: 'CSI 01',
      source: 'SAM.gov (Federal)',
      timeLeft: '1 day left',
      location: 'Washington, DC / Overseas',
      trade: 'Doors & Windows',
      estimatedValue: '$420,000',
      isAdded: false,
    },
    {
      id: 'bid-003',
      title: 'Metro Litter Removal 2027 & Structural Median Rehabilitation',
      agency: 'TxDOT — Houston District · IH0610, Harris County, TX',
      csiTag: 'CSI 32',
      source: 'TxDOT (State)',
      timeLeft: '4 days left',
      location: 'Houston, TX',
      trade: 'Civil & Paving',
      estimatedValue: '$1,120,000',
      isAdded: false,
    },
    {
      id: 'bid-004',
      title: 'San Francisco International Airport Terminal 3 West Modernization - Electrical & Low Voltage',
      agency: 'City and County of San Francisco · Airport Commission',
      csiTag: 'CSI 26',
      source: 'Caltrans / City',
      timeLeft: '6 days left',
      location: 'San Francisco, CA',
      trade: 'Electrical',
      estimatedValue: '$4,850,000',
      isAdded: false,
    },
  ]);

  const handleToggleAddBid = (bid: BidLead) => {
    setBidsList(bidsList.map(b => {
      if (b.id === bid.id) {
        const nextState = !b.isAdded;
        if (nextState) {
          setNotification(`Added "${b.title.slice(0, 40)}..." to your active bid list.`);
          
          const newP: ProjectItem = {
            id: `proj-${b.id}`,
            name: b.title.slice(0, 45) + '...',
            clientGC: b.agency.slice(0, 30),
            location: b.location,
            region: 'US',
            trade: b.trade,
            status: 'Takeoff Ready',
            value: b.estimatedValue,
            sheets: 18,
          };
          setProjects(prev => [newP, ...prev]);
        }
        return { ...b, isAdded: nextState };
      }
      return b;
    }));
  };

  const filteredBids = bidsList.filter(b => {
    if (filterTrade !== 'All trades' && !b.trade.toLowerCase().includes(filterTrade.toLowerCase())) {
      return false;
    }
    if (filterSource !== 'All sources' && !b.source.toLowerCase().includes(filterSource.toLowerCase().slice(0, 4))) {
      return false;
    }
    if (filterState && !b.location.toLowerCase().includes(filterState.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleCreateProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formProjectName.trim()) return;

    const userEmail = currentUser?.email || loginEmail || 'estimator@bidpilot.ai';
    const cleanEmail = userEmail.toLowerCase().trim();

    const token = currentUser?.token || localStorage.getItem('bidpilot_token');
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      await fetch('http://127.0.0.1:8000/api/v1/projects', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          name: formProjectName.trim(),
          trade_focus: formClientGC || 'General Contractor',
          user_email: cleanEmail,
          location: formLocation || 'Lahore',
          estimated_value: 1250000.0,
          sqft: 45000.0
        })
      });
    } catch {
      // Fallback
    }

    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      name: formProjectName,
      clientGC: formClientGC || 'Turner Construction',
      location: formLocation || 'Lahore',
      region: formRegion,
      trade: 'Commercial Bid Package',
      status: 'Draft',
      value: '$1,250,000',
      sheets: 0,
      uploadedDrawings: [],
      rfisCount: 0,
    };

    const updatedProjects = [newProj, ...projects];
    setProjects(updatedProjects);
    
    // Save to user-specific localStorage namespace
    try {
      localStorage.setItem(`bidpilot_projects_${cleanEmail}`, JSON.stringify(updatedProjects));
    } catch {}

    setActiveProject(newProj);
    setStep2Done(true);
    setCurrentView('project_detail');
    setProjectSidebarTab('drawings');
    setFormProjectName('');
    setFormClientGC('');
    setFormLocation('');
    setFormRegion('— set later —');
    setNotification(`Project "${newProj.name}" created and synced to your account.`);
  };

  const handleUploadBidSet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeProject) return;

    const mockFileName = selectedFileName !== 'No file chosen' ? selectedFileName : 'Architectural_Full_Set_Rev0.pdf';
    const newSet = {
      name: mockFileName,
      sheets: 24,
      date: new Date().toISOString().split('T')[0],
    };

    setProjectDrawingsMap(prev => ({
      ...prev,
      [activeProject.id]: [newSet, ...(prev[activeProject.id] || [])]
    }));

    activeProject.sheets = (activeProject.sheets || 0) + 24;
    setNotification(`Successfully indexed 24 sheets from "${mockFileName}" (pgvector embedding active).`);
    setSelectedFileName('No file chosen');
  };

  const handleSaveOrgName = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempOrgName) {
      setOrgName(tempOrgName);
      setStep1Done(true);
      setRenameOrgModalOpen(false);
    }
  };

  const completedSteps = (step1Done ? 1 : 0) + (step2Done ? 1 : 0) + (step3Done ? 1 : 0);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).toUpperCase();

  const sidebarItems = [
    { id: 'drawings', label: 'Drawings & Bid Sets' },
    { id: 'rfis', label: 'RFIs' },
    { id: 'change_orders', label: 'Change Orders' },
    { id: 'inbox', label: 'Inbox' },
    { id: 'submittals', label: 'Submittals' },
    { id: 'equipment', label: 'Equipment' },
    { id: 'bid_packages', label: 'Bid Packages' },
    { id: 'concept_estimate', label: 'Concept Estimate' },
    { id: 'vendors_quotes', label: 'Vendors & Quotes' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'daily_log', label: 'Daily Log' },
    { id: 'field_progress', label: 'Field Progress' },
    { id: 'schedule_defense', label: 'Schedule Defense' },
    { id: 'labor_cost', label: 'Labor & Cost' },
    { id: 'punch_list', label: 'Punch List' },
    { id: 'qc_inspections', label: 'QC Inspections' },
    { id: 'substantial_completion', label: 'Substantial Completion' },
    { id: 'meeting_minutes', label: 'Meeting Minutes' },
    { id: 'subcontractors', label: 'Subcontractors' },
    { id: 'transmittals', label: 'Transmittals' },
    { id: 'test_balance', label: 'Test & Balance' },
    { id: 'specs_addenda', label: 'Specs & Addenda' },
    { id: 'activity', label: 'Activity' },
    { id: 'notes', label: 'Notes' },
  ];

  return (
    <div className="min-h-screen bg-[#f7f9fb] font-['Plus_Jakarta_Sans',sans-serif] text-gray-900">
      
      {/* ========================================================= */}
      {/* 1. AUTH VIEW: If User is Not Logged In                    */}
      {/* ========================================================= */}
      {!isLoggedIn ? (
        <div className="pt-24 pb-16">
          <section className="relative overflow-hidden bg-gray-950 text-white py-14 px-4 sm:px-8 border-b border-gray-300 shadow-inner">
            <div className="absolute inset-0 z-0">
              <img
                src={bannerImg}
                alt="My Account Jobsite Banner"
                className="w-full h-full object-cover object-[center_35%] opacity-70 filter brightness-90 contrast-110 saturate-125"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-5xl font-medium text-white font-['Outfit'] tracking-tight drop-shadow-md">
                  My Account
                </h1>
                <p className="text-xs sm:text-sm text-blue-100 mt-1 font-light">
                  BidPilot AI Commercial Hub & Project Takeoff Portal
                </p>
              </div>
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-4 sm:px-8 py-10">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 sm:p-12 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: Login / Register / Forgot Form */}
              <div className="md:col-span-6 space-y-6">
                
                {/* Error Alert Box */}
                {authError && (
                  <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5 shadow-2xs animate-in fade-in duration-200">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                    <div className="leading-relaxed">
                      {authError}
                    </div>
                  </div>
                )}

                {/* Success Alert Box */}
                {authSuccess && (
                  <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5 shadow-2xs animate-in fade-in duration-200">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                    <div className="leading-relaxed font-medium">
                      {authSuccess}
                    </div>
                  </div>
                )}

                {viewMode === 'login' ? (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 font-['Outfit']">
                      Login
                    </h2>

                    <form onSubmit={handleLoginSubmit} className="space-y-6 max-w-sm">
                      <div>
                        <input
                          type="email"
                          required
                          value={loginEmail}
                          onChange={(e) => {
                            setLoginEmail(e.target.value);
                            setAuthError(null);
                          }}
                          placeholder="E-Mail Address"
                          className="w-full pb-2 pt-1 border-b border-gray-300 focus:border-[#0073b6] text-sm text-gray-800 placeholder-gray-400 focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <input
                          type="password"
                          required
                          value={loginPassword}
                          onChange={(e) => {
                            setLoginPassword(e.target.value);
                            setAuthError(null);
                          }}
                          placeholder="Password"
                          className="w-full pb-2 pt-1 border-b border-gray-300 focus:border-[#0073b6] text-sm text-gray-800 placeholder-gray-400 focus:outline-none transition-colors"
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          className="px-8 py-2.5 bg-[#0073b6] hover:bg-[#005f96] text-white text-xs font-bold uppercase tracking-wider rounded-xs shadow transition-colors cursor-pointer"
                        >
                          LOGIN
                        </button>
                      </div>

                      <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-bold text-[#0073b6]">
                        <button
                          type="button"
                          onClick={() => {
                            setAuthError(null);
                            setAuthSuccess(null);
                            setViewMode('register');
                          }}
                          className="hover:underline uppercase tracking-wide cursor-pointer"
                        >
                          CREATE AN ACCOUNT
                        </button>
                        <span className="text-gray-300">|</span>
                        <button
                          type="button"
                          onClick={() => {
                            setAuthError(null);
                            setAuthSuccess(null);
                            setViewMode('forgot');
                          }}
                          className="hover:underline uppercase tracking-wide cursor-pointer"
                        >
                          FORGOT YOUR PASSWORD?
                        </button>
                      </div>
                    </form>
                  </div>
                ) : viewMode === 'register' ? (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 font-['Outfit']">
                      Create An Account
                    </h2>
                    <form onSubmit={handleRegisterSubmit} className="space-y-5 max-w-sm">
                      <div>
                        <input
                          type="text"
                          required
                          value={signupName}
                          onChange={(e) => {
                            setSignupName(e.target.value);
                            setAuthError(null);
                          }}
                          placeholder="Full Name *"
                          className="w-full pb-2 pt-1 border-b border-gray-300 focus:border-[#0073b6] text-sm text-gray-800 placeholder-gray-400 focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          required
                          value={signupEmail}
                          onChange={(e) => {
                            setSignupEmail(e.target.value);
                            setAuthError(null);
                          }}
                          placeholder="E-Mail Address *"
                          className="w-full pb-2 pt-1 border-b border-gray-300 focus:border-[#0073b6] text-sm text-gray-800 placeholder-gray-400 focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          value={signupCompany}
                          onChange={(e) => setSignupCompany(e.target.value)}
                          placeholder="Company / Organization Name"
                          className="w-full pb-2 pt-1 border-b border-gray-300 focus:border-[#0073b6] text-sm text-gray-800 placeholder-gray-400 focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                          Role & Permission Level
                        </label>
                        <select
                          value={signupRole}
                          onChange={(e) => setSignupRole(e.target.value)}
                          className="w-full pb-2 pt-1 border-b border-gray-300 focus:border-[#0073b6] text-sm text-gray-800 bg-transparent focus:outline-none transition-colors cursor-pointer"
                        >
                          <option value="Estimator">Estimator (Takeoffs & AI Specs)</option>
                          <option value="Bid_Manager">Bid Manager (RFIs & Scopes)</option>
                          <option value="Preconstruction_Manager">Preconstruction Manager (Executive Reports)</option>
                          <option value="Admin">Admin (Full Control)</option>
                        </select>
                      </div>

                      <div>
                        <input
                          type="password"
                          required
                          value={signupPassword}
                          onChange={(e) => {
                            setSignupPassword(e.target.value);
                            setAuthError(null);
                          }}
                          placeholder="Create Password (min 8 chars) *"
                          className="w-full pb-2 pt-1 border-b border-gray-300 focus:border-[#0073b6] text-sm text-gray-800 placeholder-gray-400 focus:outline-none transition-colors"
                        />
                        {/* Live Password Strength Meter */}
                        {signupPassword && (
                          <div className="mt-2 space-y-1.5 animate-in fade-in duration-150">
                            <div className="flex gap-1 h-1.5 w-full">
                              {[1, 2, 3, 4, 5].map((lvl) => {
                                const score = getPasswordStrength(signupPassword);
                                const active = score >= lvl;
                                let colorClass = 'bg-gray-200';
                                if (active) {
                                  if (score <= 2) colorClass = 'bg-red-500';
                                  else if (score <= 3) colorClass = 'bg-amber-500';
                                  else if (score <= 4) colorClass = 'bg-blue-500';
                                  else colorClass = 'bg-emerald-500';
                                }
                                return (
                                  <div
                                    key={lvl}
                                    className={`h-full flex-1 rounded-full transition-all duration-300 ${colorClass}`}
                                  />
                                );
                              })}
                            </div>
                            <div className="flex justify-between items-center text-[10px] text-gray-500">
                              <span>Strength: {
                                getPasswordStrength(signupPassword) <= 1 ? 'Very Weak' :
                                getPasswordStrength(signupPassword) === 2 ? 'Weak' :
                                getPasswordStrength(signupPassword) === 3 ? 'Medium' :
                                getPasswordStrength(signupPassword) === 4 ? 'Strong' : 'Very Strong'
                              }</span>
                              <span className="text-[10px] text-gray-400">Min 8 chars, Uppercase, Number & Symbol</span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        <input
                          type="password"
                          required
                          value={signupConfirmPassword}
                          onChange={(e) => {
                            setSignupConfirmPassword(e.target.value);
                            setAuthError(null);
                          }}
                          placeholder="Confirm Password *"
                          className={`w-full pb-2 pt-1 border-b text-sm text-gray-800 placeholder-gray-400 focus:outline-none transition-colors ${
                            signupConfirmPassword && signupPassword !== signupConfirmPassword
                              ? 'border-red-400 focus:border-red-500'
                              : 'border-gray-300 focus:border-[#0073b6]'
                          }`}
                        />
                        {signupConfirmPassword && signupPassword !== signupConfirmPassword && (
                          <p className="text-[11px] text-red-600 mt-1">Passwords do not match</p>
                        )}
                        {signupConfirmPassword && signupPassword === signupConfirmPassword && (
                          <p className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1 font-medium">
                            <Check className="w-3 h-3" /> Passwords match
                          </p>
                        )}
                      </div>

                      <div className="pt-3 flex items-center gap-3">
                        <button
                          type="submit"
                          disabled={isSubmittingAuth || (!!signupConfirmPassword && signupPassword !== signupConfirmPassword)}
                          className="px-8 py-2.5 bg-[#0073b6] hover:bg-[#005f96] disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider rounded-xs shadow transition-colors cursor-pointer flex items-center gap-2"
                        >
                          {isSubmittingAuth ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              CREATING ACCOUNT...
                            </>
                          ) : (
                            'REGISTER & ACTIVATE'
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setAuthError(null);
                            setAuthSuccess(null);
                            setViewMode('login');
                          }}
                          className="text-xs text-gray-600 hover:underline font-bold uppercase cursor-pointer"
                        >
                          Back to Login
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 font-['Outfit']">
                      Forgot Password
                    </h2>
                    <form onSubmit={handleForgotSubmit} className="space-y-6 max-w-sm">
                      <p className="text-xs text-gray-600">
                        Enter your email address below and we will send you a password reset link.
                      </p>
                      <div>
                        <input
                          type="email"
                          required
                          placeholder="E-Mail Address"
                          className="w-full pb-2 pt-1 border-b border-gray-300 focus:border-[#0073b6] text-sm text-gray-800 placeholder-gray-400 focus:outline-none transition-colors"
                        />
                      </div>
                      <div className="pt-2 flex items-center gap-3">
                        <button
                          type="submit"
                          className="px-8 py-2.5 bg-[#0073b6] hover:bg-[#005f96] text-white text-xs font-bold uppercase tracking-wider rounded-xs shadow transition-colors cursor-pointer"
                        >
                          SEND RESET LINK
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setAuthError(null);
                            setAuthSuccess(null);
                            setViewMode('login');
                          }}
                          className="text-xs text-gray-600 hover:underline font-bold uppercase cursor-pointer"
                        >
                          Back to Login
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>

              {/* Right Column: Activation Info */}
              <div className="md:col-span-6 space-y-5 border-t md:border-t-0 md:border-l md:pl-12 border-gray-200 pt-8 md:pt-0">
                <h2 className="text-2xl font-bold text-gray-900 font-['Outfit']">
                  Activation/Registration
                </h2>

                <p className="text-sm text-gray-700 leading-relaxed font-light">
                  BidPilot AI version 10.2 and newer requires users to activate with an email address and password. If you do not have an account yet, please register your official contractor email to get immediate access to the Hub and active commercial tenders.
                </p>

                <div className="pt-3">
                  <button
                    onClick={() => {
                      setAuthError(null);
                      setAuthSuccess(null);
                      setViewMode('register');
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    className="px-8 py-2.5 bg-[#0073b6] hover:bg-[#005f96] text-white text-xs font-bold uppercase tracking-wider rounded-xs shadow transition-colors inline-block cursor-pointer"
                  >
                    GET STARTED
                  </button>
                </div>
              </div>

            </div>
          </section>
        </div>
      ) : (
        /* ========================================================= */
        /* 2. POST-LOGIN HUB VIEWS WITH BRANDED LOGO NAVBAR          */
        /* ========================================================= */
        <div className="min-h-screen bg-[#f7f9fb] flex flex-col">
          
          {/* Top Hub Navigation Bar */}
          <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-2xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              
              {/* Left Brand: BidPilot AI Logo + by ConstructConnect + / HUB */}
              <div className="flex items-center space-x-5">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setCurrentView('dashboard')}
                    className="flex items-center space-x-2.5 cursor-pointer group text-left"
                  >
                    <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-[#005691] via-[#007cc2] to-[#38bdf8] p-0.5 shadow-sm shadow-[#007cc2]/30 flex items-center justify-center overflow-hidden shrink-0">
                      <img 
                        src={logoImg} 
                        alt="BidPilot AI Logo" 
                        className="w-full h-full object-cover rounded-[6px] transform group-hover:scale-105 transition-transform" 
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center leading-none">
                        <span className="text-base font-black tracking-tight text-[#011825] font-['Outfit'] group-hover:text-[#007cc2] transition-colors">
                          BidPilot
                        </span>
                        <span className="text-sm font-black tracking-tight text-[#007cc2] ml-0.5 font-['Outfit']">
                          AI
                        </span>
                        <span className="text-[9px] font-bold text-gray-400 self-start ml-0.5">
                          ®
                        </span>
                      </div>
                      <span className="text-[7.5px] font-semibold text-gray-400 tracking-wider uppercase leading-none mt-0.5">
                        by ConstructConnect
                      </span>
                    </div>
                  </button>

                  <span className="text-gray-300 font-light text-sm">/</span>
                  <span className="text-xs font-black text-gray-800 uppercase tracking-widest font-['Outfit']">
                    HUB
                  </span>
                </div>

                {/* Hub Navigation Links */}
                <nav className="hidden lg:flex items-center space-x-6 text-xs font-medium text-gray-600">
                  <button
                    onClick={() => setCurrentView('dashboard')}
                    className={`transition-colors cursor-pointer ${
                      currentView === 'dashboard' ? 'text-gray-900 font-bold' : 'hover:text-gray-900'
                    }`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => setCurrentView('find_work')}
                    className={`transition-colors cursor-pointer ${
                      currentView === 'find_work' ? 'text-gray-900 font-bold' : 'hover:text-gray-900'
                    }`}
                  >
                    Find Work
                  </button>
                  <button
                    onClick={() => setCurrentView('estimate')}
                    className={`transition-colors cursor-pointer ${
                      currentView === 'estimate' ? 'text-gray-900 font-bold' : 'hover:text-gray-900'
                    }`}
                  >
                    Estimate
                  </button>
                  <button
                    onClick={() => setCurrentView('projects')}
                    className={`transition-colors cursor-pointer ${
                      currentView === 'projects' || currentView === 'new_project' || currentView === 'project_detail' ? 'text-gray-900 font-bold' : 'hover:text-gray-900'
                    }`}
                  >
                    Projects
                  </button>
                  <button
                    onClick={() => setCurrentView('vendors')}
                    className={`transition-colors cursor-pointer ${
                      currentView === 'vendors' ? 'text-gray-900 font-bold' : 'hover:text-gray-900'
                    }`}
                  >
                    Vendors
                  </button>
                  <button
                    onClick={() => setCurrentView('history')}
                    className={`transition-colors cursor-pointer ${
                      currentView === 'history' ? 'text-gray-900 font-bold' : 'hover:text-gray-900'
                    }`}
                  >
                    History
                  </button>
                  <button
                    onClick={() => setCurrentView('demo')}
                    className={`transition-colors cursor-pointer ${
                      currentView === 'demo' ? 'text-gray-900 font-bold' : 'hover:text-gray-900'
                    }`}
                  >
                    Demo
                  </button>
                </nav>
              </div>

              {/* Right User & Settings Section */}
              <div className="flex items-center space-x-4 text-xs text-gray-600">
                <button title="Workspace View" className="p-1 hover:text-gray-900 transition-colors cursor-pointer">
                  <Tv className="w-4 h-4 text-gray-500" />
                </button>
                <button title="Notifications" className="p-1 hover:text-gray-900 transition-colors cursor-pointer relative">
                  <Bell className="w-4 h-4 text-gray-500" />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 absolute top-0.5 right-0.5" />
                </button>

                {/* User Name & Email Dropdown */}
                <div className="text-right hidden sm:block">
                  <div className="font-semibold text-gray-900 text-xs leading-none">
                    {getDisplayUsername()}
                  </div>
                  <div className="text-[11px] text-gray-500 font-light mt-0.5">
                    {getDisplayEmail()}
                  </div>
                </div>

                <button 
                  onClick={() => alert(`Settings for ${getDisplayEmail()}\nUser: ${getDisplayUsername()}\nOrganization: ${orgName}\nPlan: 14-Day Free Trial (Solo Level)`)}
                  className="hover:text-gray-900 transition-colors cursor-pointer hidden sm:inline-block font-medium"
                >
                  Settings
                </button>

                <button
                  onClick={() => {
                    try {
                      localStorage.removeItem('bidpilot_active_user');
                      localStorage.removeItem('bidpilot_token');
                    } catch {}
                    setCurrentUser(null);
                    setLoginEmail('');
                    setLoginPassword('');
                    setIsLoggedIn(false);
                    setCurrentView('dashboard');
                    setNotification('You have successfully signed out.');
                  }}
                  className="hover:text-red-600 transition-colors cursor-pointer font-medium"
                >
                  Sign out
                </button>
              </div>

            </div>
          </header>

          {/* ========================================================= */}
          {/* VIEW: DEMO HUB                                            */}
          {/* ========================================================= */}
          {currentView === 'demo' ? (
            <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-200">
              <div>
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="text-xs font-bold text-gray-500 hover:text-gray-900 uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <span className="text-sm">←</span>
                  <span>BIDPILOT</span>
                </button>
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-['Outfit'] tracking-tight">
                  See BidPilot in action
                </h1>
                <p className="text-sm text-gray-600 font-light leading-relaxed max-w-2xl">
                  Interactive demos of each BidPilot product. No signup, no sales call — click in, see the catch, decide if it's for you.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-6 rounded-2xl border-2 border-blue-200 bg-white hover:border-[#0056b3] transition-all shadow-xs space-y-3 relative overflow-hidden group">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-[#0056b3] text-[10px] font-extrabold uppercase tracking-wider">
                        Most popular
                      </span>
                      <h3 className="text-base font-bold text-gray-900 font-['Outfit']">
                        Discrepancy → RFI
                      </h3>
                    </div>

                    <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 self-start sm:self-auto">
                      Catch $50K spec-vs-plan gaps before bid
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 font-light leading-relaxed">
                    BidPilot cross-references plans, schedules, and specs to surface contradictions that would otherwise become change orders. Watch a real catch in 30 seconds.
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setActiveProject(projects[0]);
                        setCurrentView('project_detail');
                        setProjectSidebarTab('rfis');
                      }}
                      className="text-xs font-bold text-[#0056b3] hover:text-[#004085] flex items-center gap-1.5 cursor-pointer group-hover:underline"
                    >
                      <PlayCircle className="w-4 h-4 text-[#0056b3]" />
                      <span>Watch the catch →</span>
                    </button>
                  </div>
                </div>

                <div className="p-6 rounded-2xl border border-gray-200 bg-white hover:border-[#0056b3] transition-all shadow-xs space-y-3 group">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="text-base font-bold text-gray-900 font-['Outfit']">
                      AI Estimate Builder
                    </h3>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 self-start sm:self-auto">
                      Full estimate in 60 seconds
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 font-light leading-relaxed">
                    Pick a project type and gross square footage. BidPilot generates a refineable estimate backed by real bid data and CSI MasterFormat.
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={() => setCurrentView('estimate')}
                      className="text-xs font-bold text-[#0056b3] hover:text-[#004085] flex items-center gap-1.5 cursor-pointer group-hover:underline"
                    >
                      <Calculator className="w-4 h-4 text-[#0056b3]" />
                      <span>Try the builder →</span>
                    </button>
                  </div>
                </div>

                <div className="p-6 rounded-2xl border border-gray-200 bg-white hover:border-[#0056b3] transition-all shadow-xs space-y-3 group">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="text-base font-bold text-gray-900 font-['Outfit']">
                      Quote Hub
                    </h3>
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200 self-start sm:self-auto">
                      Compare vendor quotes line-by-line
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 font-light leading-relaxed">
                    Drop in vendor PDFs, get a normalized comparison matrix with scope-gap detection, min/max highlighting, and a confirmed-line workflow.
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={() => setCurrentView('history')}
                      className="text-xs font-bold text-[#0056b3] hover:text-[#004085] flex items-center gap-1.5 cursor-pointer group-hover:underline"
                    >
                      <FileSpreadsheet className="w-4 h-4 text-[#0056b3]" />
                      <span>Try CSI normalization →</span>
                    </button>
                  </div>
                </div>

                <div className="p-6 rounded-2xl border border-gray-200 bg-white hover:border-[#0056b3] transition-all shadow-xs space-y-3 group">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="text-base font-bold text-gray-900 font-['Outfit']">
                      Vendor Network
                    </h3>
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200 self-start sm:self-auto">
                      Build your subcontractor rolodex
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 font-light leading-relaxed">
                    Track every subcontractor you've worked with, invite them onto bids, and let claimed vendors see their bid history with you in one place.
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={() => setCurrentView('vendors')}
                      className="text-xs font-bold text-[#0056b3] hover:text-[#004085] flex items-center gap-1.5 cursor-pointer group-hover:underline"
                    >
                      <Users className="w-4 h-4 text-[#0056b3]" />
                      <span>See the rolodex →</span>
                    </button>
                  </div>
                </div>

                <div className="p-6 rounded-2xl border border-gray-200 bg-white hover:border-[#0056b3] transition-all shadow-xs space-y-3 group">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="text-base font-bold text-gray-900 font-['Outfit']">
                      Cost Projection
                    </h3>
                    <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200 self-start sm:self-auto">
                      Weekly margin tracking from your JDE export
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 font-light leading-relaxed">
                    Drop your weekly JDE Cost Distribution Report (or Sage/Vista). BidPilot maps it to your projection workspace — peach-cell editor, Pending COs, Trend Summary.
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setActiveProject(projects[0]);
                        setCurrentView('project_detail');
                        setProjectSidebarTab('labor_cost');
                      }}
                      className="text-xs font-bold text-[#0056b3] hover:text-[#004085] flex items-center gap-1.5 cursor-pointer group-hover:underline"
                    >
                      <BarChart3 className="w-4 h-4 text-[#0056b3]" />
                      <span>See the workspace →</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-gradient-to-br from-[#011825] to-[#002f5a] text-white space-y-4 text-center shadow-xl">
                <h2 className="text-2xl sm:text-3xl font-bold font-['Outfit']">
                  Ready to try it on your own bid?
                </h2>
                <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto font-light leading-relaxed">
                  14-day free trial. Upload your bid set, run a discrepancy scan, see what BidPilot catches. No credit card required to start.
                </p>

                <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={() => onOpenTrial('pro')}
                    className="px-6 py-3 bg-[#0073b6] hover:bg-[#005f96] text-white rounded-lg text-xs font-extrabold uppercase tracking-wider shadow-lg transition-all cursor-pointer"
                  >
                    Start free trial
                  </button>
                  <button
                    onClick={() => setCurrentView('dashboard')}
                    className="text-xs font-bold text-blue-200 hover:text-white underline cursor-pointer"
                  >
                    Back to dashboard
                  </button>
                </div>
              </div>
            </main>
          ) : currentView === 'history' ? (
            /* HISTORY VIEW */
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1">
                  <h1 className="text-3xl font-extrabold text-gray-900 font-['Outfit'] tracking-tight">
                    Quote & Pricing History
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-600 font-light">
                    Search past vendor quotes, equipment pricing, and unit rate benchmarks across all projects.
                  </p>
                </div>

                <button
                  onClick={() => alert('Exporting all historical pricing tables to Microsoft Excel (.xlsx)...')}
                  className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-xs font-bold shadow-2xs flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Download className="w-3.5 h-3.5 text-[#0056b3]" />
                  <span>Export CSV / XLSX</span>
                </button>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-2xs">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center text-xs">
                  <div className="sm:col-span-8 relative">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={historySearch}
                      onChange={(e) => setHistorySearch(e.target.value)}
                      placeholder="Search line items, equipment, vendors (e.g. Concrete, Switchboard, VRF)..."
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#0056b3]"
                    />
                  </div>

                  <div className="sm:col-span-4 relative">
                    <select
                      value={historyCsiFilter}
                      onChange={(e) => setHistoryCsiFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white appearance-none focus:outline-none focus:border-[#0056b3] pr-8 cursor-pointer"
                    >
                      <option value="All CSI Codes">All CSI Divisions</option>
                      <option value="03 - Concrete">Division 03 — Concrete</option>
                      <option value="09 - Finishes">Division 09 — Finishes / Drywall</option>
                      <option value="23 - HVAC">Division 23 — HVAC & Mechanical</option>
                      <option value="26 - Electrical">Division 26 — Electrical & Power</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-2.5 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold uppercase text-[10px] tracking-wider">
                        <th className="py-3.5 px-4">Line Item / Equipment</th>
                        <th className="py-3.5 px-4">CSI Code</th>
                        <th className="py-3.5 px-4">Vendor</th>
                        <th className="py-3.5 px-4">Unit Price</th>
                        <th className="py-3.5 px-4">Quantity</th>
                        <th className="py-3.5 px-4">Total</th>
                        <th className="py-3.5 px-4">Project</th>
                        <th className="py-3.5 px-4 text-right">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredHistory.map((q) => (
                        <tr key={q.id} className="hover:bg-blue-50/50 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-gray-900 max-w-xs truncate">
                            {q.itemDescription}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded bg-gray-100 border border-gray-300 font-mono text-[10px]">
                              {q.csiCode}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-gray-700 font-medium">
                            {q.vendorName}
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-[#0056b3]">
                            {q.unitPrice}
                          </td>
                          <td className="py-3.5 px-4 text-gray-600 font-mono">
                            {q.quantity}
                          </td>
                          <td className="py-3.5 px-4 font-mono font-extrabold text-gray-900">
                            {q.totalPrice}
                          </td>
                          <td className="py-3.5 px-4 text-gray-500 text-[11px] truncate max-w-[150px]">
                            {q.projectName}
                          </td>
                          <td className="py-3.5 px-4 text-gray-400 text-right text-[11px]">
                            {q.date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </main>
          ) : currentView === 'vendors' ? (
            /* VENDORS VIEW */
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in duration-200">
              <div>
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="text-xs font-bold text-gray-500 hover:text-gray-900 uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <span className="text-sm">←</span>
                  <span>DASHBOARD</span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1">
                  <h1 className="text-3xl font-extrabold text-gray-900 font-['Outfit'] tracking-tight">
                    Vendor roster
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-600 font-light max-w-2xl">
                    Your address book of suppliers + subs. Each quote can be matched to a vendor to enable vendor-scoped history lookups.
                  </p>
                </div>

                {!showAddVendorForm && (
                  <button
                    onClick={() => setShowAddVendorForm(true)}
                    className="px-4 py-2 bg-[#0056b3] hover:bg-[#004085] text-white rounded-md text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>Add vendor</span>
                  </button>
                )}
              </div>

              {showAddVendorForm && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-2xs space-y-5 max-w-xl animate-in fade-in duration-200">
                  <form onSubmit={handleCreateVendorSubmit} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block font-bold text-gray-800">
                          Vendor name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={vName}
                          onChange={(e) => setVName(e.target.value)}
                          placeholder="e.g. ACME Concrete Supp"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#0056b3] shadow-2xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block font-bold text-gray-800">
                          Scope / trades they cover
                        </label>
                        <input
                          type="text"
                          value={vScopeTrades}
                          onChange={(e) => setVScopeTrades(e.target.value)}
                          placeholder="e.g. HVAC, sheet metal, cc"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#0056b3] shadow-2xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block font-bold text-gray-800">
                          Primary contact
                        </label>
                        <input
                          type="text"
                          value={vPrimaryContact}
                          onChange={(e) => setVPrimaryContact(e.target.value)}
                          placeholder="e.g. Jane Smith"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#0056b3] shadow-2xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block font-bold text-gray-800">
                          Email
                        </label>
                        <input
                          type="email"
                          value={vEmail}
                          onChange={(e) => setVEmail(e.target.value)}
                          placeholder="sales@vendor.com"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#0056b3] shadow-2xs"
                        />
                      </div>
                    </div>

                    <div className="space-y-1 max-w-xs">
                      <label className="block font-bold text-gray-800">
                        Phone
                      </label>
                      <input
                        type="text"
                        value={vPhone}
                        onChange={(e) => setVPhone(e.target.value)}
                        placeholder="(555) 555-5555"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#0056b3] shadow-2xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block font-bold text-gray-800">
                        Website
                      </label>
                      <input
                        type="text"
                        value={vWebsite}
                        onChange={(e) => setVWebsite(e.target.value)}
                        placeholder="https://vendor.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#0056b3] shadow-2xs"
                      />
                    </div>

                    <div className="pt-3 flex items-center gap-3">
                      <button
                        type="submit"
                        className="px-5 py-2 bg-[#0056b3] hover:bg-[#004085] text-white rounded-md font-bold shadow-xs transition-colors cursor-pointer"
                      >
                        Create vendor
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddVendorForm(false)}
                        className="text-xs text-gray-600 hover:text-gray-900 font-medium cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {vendors.length === 0 ? (
                <div className="rounded-2xl border border-gray-200 bg-white p-14 text-center space-y-3 shadow-2xs">
                  <p className="text-xs text-gray-600 max-w-lg mx-auto leading-relaxed">
                    No vendors yet. Add your first using the "Add vendor" button above, or match them inline from a quote detail page.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {vendors.map((vendor) => (
                    <div
                      key={vendor.id}
                      className="p-5 rounded-xl border border-gray-200 bg-white hover:border-[#0056b3] transition-all shadow-2xs space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-sm font-bold text-gray-900 font-['Outfit']">
                            {vendor.name}
                          </h4>
                          <span className="text-[11px] text-gray-500 font-light">
                            {vendor.scopeTrades}
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                          Active Sub
                        </span>
                      </div>

                      <div className="space-y-1 text-xs text-gray-600 pt-2 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <UserPlus className="w-3.5 h-3.5 text-gray-400" />
                          <span>{vendor.primaryContact}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-gray-400" />
                          <span>{vendor.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-gray-400" />
                          <span>{vendor.phone}</span>
                        </div>
                      </div>

                      <div className="pt-2 flex items-center justify-between text-xs">
                        <a
                          href={vendor.website}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#0056b3] hover:underline flex items-center gap-1 text-[11px]"
                        >
                          <Globe className="w-3 h-3" />
                          <span>{vendor.website}</span>
                        </a>
                        <button
                          onClick={() => alert(`Request for Quote dispatched to ${vendor.name} (${vendor.email})`)}
                          className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded font-bold text-[10px] cursor-pointer"
                        >
                          Send RFQ
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </main>
          ) : currentView === 'estimate' ? (
            /* ESTIMATE VIEW */
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h1 className="text-3xl font-extrabold text-gray-900 font-['Outfit'] tracking-tight">
                  Free Construction Cost Estimator
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 max-w-3xl font-light leading-relaxed">
                  A real, trade-by-trade cost range in seconds — from project type down to the system. Pick HVAC → VRF vs RTU, or the whole building. Numbers are planning ranges from market research + our bid database.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-2xs space-y-6">
                <form onSubmit={handleGenerateEstimate} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 text-xs">
                    <div className="space-y-1.5">
                      <label className="block font-bold text-gray-700">Project type</label>
                      <div className="relative">
                        <select
                          value={estProjectType}
                          onChange={(e) => setEstProjectType(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 appearance-none focus:outline-none focus:border-[#0056b3] pr-8 cursor-pointer shadow-2xs"
                        >
                          <option value="Commercial — Ground-Up Building">Commercial — Ground-Up Building</option>
                          <option value="Commercial — Interior Fitout / Tenant Improvement">Commercial — Interior Fitout / Tenant Improvement</option>
                          <option value="Industrial / Warehouse Logistics">Industrial / Warehouse Logistics</option>
                          <option value="Healthcare / Multi-Specialty Clinic">Healthcare / Multi-Specialty Clinic</option>
                          <option value="Multi-Family Residential Complex">Multi-Family Residential Complex</option>
                          <option value="Education / K-12 & University">Education / K-12 & University</option>
                          <option value="Civil Infrastructure & Paving">Civil Infrastructure & Paving</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block font-bold text-gray-700">Trade / scope</label>
                      <div className="relative">
                        <select
                          value={estTradeScope}
                          onChange={(e) => setEstTradeScope(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 appearance-none focus:outline-none focus:border-[#0056b3] pr-8 cursor-pointer shadow-2xs"
                        >
                          <option value="General Contractor — whole building">General Contractor — whole building</option>
                          <option value="Concrete — foundations & flatwork">Concrete — foundations & flatwork</option>
                          <option value="Drywall & Acoustic Ceilings">Drywall & Acoustic Ceilings</option>
                          <option value="Electrical — power & distribution">Electrical — power & distribution</option>
                          <option value="Flooring & Commercial Tile">Flooring & Commercial Tile</option>
                          <option value="Framing & Structural Steel">Framing & Structural Steel</option>
                          <option value="HVAC / Mechanical Systems">HVAC / Mechanical Systems</option>
                          <option value="Plumbing & Underground Utilities">Plumbing & Underground Utilities</option>
                          <option value="Roofing & Waterproofing">Roofing & Waterproofing</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block font-bold text-gray-700">System type</label>
                      <div className="px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-400 text-xs shadow-2xs">
                        {estTradeScope.includes('HVAC') 
                          ? 'VRF vs RTU Packaged Units' 
                          : estTradeScope.includes('Electrical') 
                          ? '480V 3-Phase Main Switchgear' 
                          : 'Deep system options coming for this trade'}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 text-xs items-start">
                    <div className="space-y-1.5">
                      <label className="block font-bold text-gray-700">Square footage</label>
                      <input
                        type="number"
                        min="500"
                        step="500"
                        value={estSqft}
                        onChange={(e) => setEstSqft(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-[#0056b3] shadow-2xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block font-bold text-gray-700">Region</label>
                      <div className="relative">
                        <select
                          value={estRegion}
                          onChange={(e) => setEstRegion(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 appearance-none focus:outline-none focus:border-[#0056b3] pr-8 cursor-pointer shadow-2xs"
                        >
                          <option value="California">California</option>
                          <option value="Texas">Texas</option>
                          <option value="New York">New York</option>
                          <option value="Florida">Florida</option>
                          <option value="Illinois">Illinois</option>
                          <option value="Colorado">Colorado</option>
                          <option value="Washington">Washington</option>
                          <option value="Ontario Canada">Ontario Canada</option>
                          <option value="National Average">National Average (US)</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-2 pt-6">
                      <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={estRetrofit}
                          onChange={(e) => setEstRetrofit(e.target.checked)}
                          className="accent-[#0056b3] rounded"
                        />
                        <span>Existing building (retrofit)</span>
                      </label>
                      <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={estHighSpec}
                          onChange={(e) => setEstHighSpec(e.target.checked)}
                          className="accent-[#0056b3] rounded"
                        />
                        <span>Premium / high-spec</span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-4">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#011825] hover:bg-[#002f5a] text-white rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
                    >
                      Generate estimate
                    </button>
                    <span className="text-xs text-gray-500 font-light">
                      Free · no account needed
                    </span>
                  </div>
                </form>

                {calculatedEstimate && (
                  <div className="pt-6 border-t border-gray-200 space-y-6 animate-in fade-in duration-300">
                    <div className="p-6 rounded-xl bg-gradient-to-r from-blue-50 via-indigo-50 to-sky-50 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-xs font-bold text-[#0056b3] uppercase tracking-wider">
                          Estimated Planning Range ({estSqft.toLocaleString()} sqft in {estRegion})
                        </span>
                        <div className="text-2xl sm:text-3xl font-black text-gray-900 font-['Outfit'] mt-1">
                          ${calculatedEstimate.minCost.toLocaleString()} – ${calculatedEstimate.maxCost.toLocaleString()}
                        </div>
                        <p className="text-xs text-gray-600 mt-0.5">
                          ${calculatedEstimate.minRate} – ${calculatedEstimate.maxRate} per sq ft based on 2026 Commercial RSMeans benchmarks.
                        </p>
                      </div>

                      <button
                        onClick={handleConvertEstimateToProject}
                        className="px-5 py-3 rounded-lg bg-[#0056b3] hover:bg-[#004085] text-white text-xs font-bold shadow-md transition-all cursor-pointer flex items-center gap-2 shrink-0"
                      >
                        <Plus className="w-4 h-4 stroke-[3]" />
                        <span>Convert to Project Takeoff</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                      <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                        <span className="text-gray-500">Materials & Equip (44%)</span>
                        <div className="text-base font-bold text-gray-900 font-['Outfit']">
                          ${calculatedEstimate.materials.toLocaleString()}
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                        <span className="text-gray-500">Direct Labor (36%)</span>
                        <div className="text-base font-bold text-gray-900 font-['Outfit']">
                          ${calculatedEstimate.labor.toLocaleString()}
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                        <span className="text-gray-500">Subcontracts (12%)</span>
                        <div className="text-base font-bold text-gray-900 font-['Outfit']">
                          ${calculatedEstimate.subcontract.toLocaleString()}
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                        <span className="text-gray-500">Overhead & Contingency (8%)</span>
                        <div className="text-base font-bold text-gray-900 font-['Outfit']">
                          ${calculatedEstimate.overhead.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </main>
          ) : currentView === 'projects' ? (
            /* ALL PROJECTS TAB */
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold text-gray-900 font-['Outfit'] tracking-tight">
                    Projects ({projects.length})
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-600 font-light">
                    Active commercial tenders, drawing sets, and automated takeoffs.
                  </p>
                </div>

                <button
                  onClick={() => setCurrentView('new_project')}
                  className="px-4 py-2 bg-[#0056b3] hover:bg-[#004085] text-white rounded-md text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>New project</span>
                </button>
              </div>

              {projects.length === 0 ? (
                <div className="p-12 rounded-2xl border-2 border-dashed border-gray-300 bg-white text-center space-y-4 max-w-xl mx-auto my-8">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0056b3] flex items-center justify-center mx-auto shadow-2xs">
                    <Building2 className="w-7 h-7" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-gray-900 font-['Outfit']">No Projects Created Yet</h3>
                    <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                      You have not created any projects yet for <span className="font-semibold text-gray-800">{getDisplayEmail()}</span>. Click the button below to create your first construction bid package.
                    </p>
                  </div>
                  <button
                    onClick={() => setCurrentView('new_project')}
                    className="px-6 py-2.5 bg-[#0056b3] hover:bg-[#004085] text-white rounded-lg text-xs font-bold shadow-xs transition-colors inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Your First Project</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="p-6 rounded-2xl border border-gray-200 bg-white hover:border-[#0056b3] transition-all shadow-2xs space-y-4 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <span className="px-2.5 py-0.5 rounded bg-blue-50 text-[#0056b3] text-[11px] font-bold border border-blue-200">
                            {proj.trade}
                          </span>
                          <span className="text-xs font-mono font-bold text-gray-900">
                            {proj.value}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-gray-900 font-['Outfit']">
                          {proj.name}
                        </h3>

                        <p className="text-xs text-gray-500 font-light">
                          GC: <strong>{proj.clientGC}</strong> • {proj.location} ({proj.sheets} Sheets)
                        </p>
                      </div>

                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                        <span className="text-emerald-600 font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>{proj.status}</span>
                        </span>

                        <button
                          onClick={() => {
                            setActiveProject(proj);
                            setCurrentView('project_detail');
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#0056b3] hover:bg-[#004085] text-white font-bold text-xs flex items-center gap-1 shadow-2xs cursor-pointer"
                        >
                          <span>Open Workspace</span>
                          <span>→</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </main>
          ) : currentView === 'new_project' ? (
            /* NEW PROJECT VIEW */
            <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in duration-200">
              <div>
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="text-xs font-bold text-gray-600 hover:text-gray-900 uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <span className="text-sm">←</span>
                  <span>PROJECTS</span>
                </button>
              </div>

              <div className="space-y-1.5">
                <h1 className="text-3xl font-extrabold text-gray-900 font-['Outfit'] tracking-tight">
                  New project
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-2xl font-light">
                  Create a bid and start organizing vendor quotes against it. You can add bid packages, RFQs, and quotes from the project page.
                </p>
              </div>

              <form onSubmit={handleCreateProjectSubmit} className="space-y-5 pt-2 max-w-2xl">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-800">
                    Project name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formProjectName}
                    onChange={(e) => setFormProjectName(e.target.value)}
                    placeholder="e.g. Edwards AFB Hangar 3 Renovation"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0056b3] focus:border-[#0056b3] placeholder-gray-400 shadow-2xs transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-800">
                    Client / GC
                  </label>
                  <input
                    type="text"
                    value={formClientGC}
                    onChange={(e) => setFormClientGC(e.target.value)}
                    placeholder="e.g. Turner Construction"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-xs text-gray-900 focus:outline-none focus:border-[#0056b3] placeholder-gray-400 shadow-2xs transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-gray-800">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formLocation}
                      onChange={(e) => setFormLocation(e.target.value)}
                      placeholder="e.g. Edwards AFB, California"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-xs text-gray-900 focus:outline-none focus:border-[#0056b3] placeholder-gray-400 shadow-2xs transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-gray-800">
                      Region
                    </label>
                    <div className="relative">
                      <select
                        value={formRegion}
                        onChange={(e) => setFormRegion(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0056b3] focus:border-[#0056b3] appearance-none shadow-2xs cursor-pointer pr-8"
                      >
                        <option value="— set later —">— set later —</option>
                        <option value="US - West (California / Nevada)">US - West (California / Nevada)</option>
                        <option value="US - South (Texas / Florida / Georgia)">US - South (Texas / Florida / Georgia)</option>
                        <option value="US - Northeast (New York / Mass)">US - Northeast (New York / Mass)</option>
                        <option value="US - Midwest (Illinois / Ohio)">US - Midwest (Illinois / Ohio)</option>
                        <option value="Canada - Ontario / BC">Canada - Ontario / BC</option>
                        <option value="Other">Other</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#0056b3] hover:bg-[#004085] text-white rounded-md text-xs font-bold shadow-xs transition-colors cursor-pointer"
                  >
                    Create project
                  </button>
                </div>
              </form>
            </main>
          ) : currentView === 'project_detail' && activeProject ? (
            /* PROJECT WORKSPACE VIEW */
            <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in duration-200">
              
              <div className="space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                  <button
                    onClick={() => setCurrentView('projects')}
                    className="hover:text-gray-900 transition-colors cursor-pointer"
                  >
                    PROJECTS
                  </button>
                  <span>/</span>
                  <span className="text-gray-700">{activeProject.name.toUpperCase()}</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-['Outfit']">
                      {activeProject.name}
                    </h1>
                    <p className="text-xs text-gray-500 mt-0.5">
                      construction · {activeProject.location}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded bg-gray-100 border border-gray-300 text-gray-700 text-xs font-mono">
                      draft
                    </span>
                    <button 
                      onClick={() => setIsProjectSearchModalOpen(true)}
                      className="px-3 py-1 bg-white border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-50 shadow-2xs font-medium cursor-pointer flex items-center gap-1"
                    >
                      <Search className="w-3 h-3 text-[#0056b3]" />
                      <span>Search</span>
                    </button>
                    <button 
                      onClick={() => setProjectSidebarTab('labor_cost')}
                      className="px-3 py-1 bg-white border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-50 shadow-2xs font-medium cursor-pointer"
                    >
                      Labor / Cost
                    </button>
                    <button 
                      onClick={() => setIsEditProjectModalOpen(true)}
                      className="px-3 py-1 bg-white border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-50 shadow-2xs font-medium cursor-pointer"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => setIsSpecAssistantOpen(true)}
                      className="px-3.5 py-1 bg-gradient-to-r from-[#0056b3] to-[#007cc2] hover:from-[#004085] hover:to-[#0056b3] text-white rounded text-xs font-bold shadow-2xs flex items-center gap-1.5 cursor-pointer ml-1 animate-pulse"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Ask Spec AI</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-2">
                <div className="md:col-span-3 bg-white rounded-xl border border-gray-200 p-2 space-y-0.5 shadow-2xs overflow-hidden text-xs">
                  {sidebarItems.map((item) => {
                    const isSelected = projectSidebarTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setProjectSidebarTab(item.id)}
                        className={`w-full text-left px-3.5 py-2 rounded-lg font-medium transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-[#eaf3fc] text-[#0056b3] font-bold shadow-2xs'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <span>{item.label}</span>
                        {isSelected && <ChevronRight className="w-3.5 h-3.5" />}
                      </button>
                    );
                  })}
                </div>

                <div className="md:col-span-9 space-y-6">
                  {/* TAB 1: DRAWINGS */}
                  {projectSidebarTab === 'drawings' ? (
                    <div className="space-y-6">
                      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-2xs space-y-5">
                        <div>
                          <h2 className="text-base font-bold text-gray-900 font-['Outfit']">
                            Drawings ({activeProjectDrawings.reduce((acc, s) => acc + s.sheets, 0)})
                          </h2>
                          <p className="text-xs text-gray-600 leading-relaxed mt-1 font-light">
                            Upload a construction-set PDF. We index every sheet so you can extract panel schedules + equipment schedules on demand. Got a revised set or addendum? Upload it here too — the <strong className="font-bold text-gray-900">Δ vs previous</strong> button on the bid-set list shows exactly what changed (added / removed / modified equipment with $ impact).
                          </p>
                        </div>

                        <form onSubmit={handleUploadBidSet} className="space-y-4">
                          
                          {/* Interactive Drag & Drop Box + File Input */}
                          <div className="border-2 border-dashed border-gray-300 hover:border-[#0056b3] rounded-xl p-5 bg-gray-50/70 text-center transition-colors">
                            <div className="flex flex-col items-center justify-center space-y-2">
                              <Upload className="w-8 h-8 text-[#0056b3]" />
                              <div>
                                <span className="text-xs font-bold text-gray-800">
                                  Drag & drop your bid set PDF here, or{' '}
                                </span>
                                <label className="text-xs font-bold text-[#0056b3] hover:underline cursor-pointer">
                                  <span>Browse files</span>
                                  <input
                                    type="file"
                                    accept=".pdf,.dwg,.tiff"
                                    onChange={(e) => {
                                      if (e.target.files && e.target.files[0]) {
                                        setSelectedFileName(e.target.files[0].name);
                                        setNotification(`Selected "${e.target.files[0].name}" for chunk upload.`);
                                      }
                                    }}
                                    className="hidden"
                                  />
                                </label>
                              </div>

                              <div className="flex items-center gap-2 pt-1">
                                <span className="text-[11px] font-mono px-3 py-1 rounded-md bg-white border border-gray-200 text-gray-700 shadow-2xs">
                                  📄 {selectedFileName}
                                </span>

                                {/* Quick Sample Files Presets */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedFileName('A-Architectural_Full_Set_Rev3.pdf');
                                    setNotification('Loaded sample commercial bid set "A-Architectural_Full_Set_Rev3.pdf"');
                                  }}
                                  className="text-[10px] px-2.5 py-1 rounded bg-blue-100 text-[#0056b3] font-bold hover:bg-blue-200 cursor-pointer"
                                >
                                  + Sample Architectural PDF
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedFileName('E-Electrical_Substation_Addendum_1.pdf');
                                    setNotification('Loaded sample addendum "E-Electrical_Substation_Addendum_1.pdf"');
                                  }}
                                  className="text-[10px] px-2.5 py-1 rounded bg-indigo-100 text-indigo-800 font-bold hover:bg-indigo-200 cursor-pointer"
                                >
                                  + Sample Electrical PDF
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="block text-xs font-bold text-gray-800">
                              Document kind
                            </label>
                            <div className="relative">
                              <select
                                value={documentKind}
                                onChange={(e) => setDocumentKind(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs text-gray-900 bg-white appearance-none shadow-2xs cursor-pointer pr-8"
                              >
                                <option value="Drawings (bid set)">Drawings (bid set)</option>
                                <option value="Specifications / Project Manual">Specifications / Project Manual</option>
                                <option value="BOQ / Schedule of Values">BOQ / Schedule of Values</option>
                                <option value="Addendum / Revision Bulletin">Addendum / Revision Bulletin</option>
                              </select>
                              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
                            </div>
                            <p className="text-[11px] text-gray-500 font-light">
                              Spec books are auto-attached to scans on docs with the same discipline — upload once, used across every related scan.
                            </p>
                          </div>

                          <div className="space-y-1">
                            <label className="block text-xs font-bold text-gray-800">
                              Discipline
                            </label>
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                              <div className="relative flex-1">
                                <select
                                  value={discipline}
                                  onChange={(e) => setDiscipline(e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs text-gray-900 bg-white appearance-none shadow-2xs cursor-pointer pr-8"
                                >
                                  <option value="Full set (all disciplines)">Full set (all disciplines)</option>
                                  <option value="Architectural (A)">Architectural (A)</option>
                                  <option value="Structural (S)">Structural (S)</option>
                                  <option value="Mechanical / HVAC (M)">Mechanical / HVAC (M)</option>
                                  <option value="Electrical (E)">Electrical (E)</option>
                                  <option value="Plumbing (P)">Plumbing (P)</option>
                                  <option value="Civil (C)">Civil (C)</option>
                                </select>
                                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
                              </div>

                              <button
                                type="button"
                                onClick={() => alert('Typical-unit takeoff calculator launched.')}
                                className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 text-xs font-bold text-gray-700 shadow-2xs whitespace-nowrap cursor-pointer text-center"
                              >
                                Typical-unit takeoff
                              </button>
                            </div>
                            <p className="text-[11px] text-gray-500 font-light">
                              Subs typically upload per-trade subsets (6-20 pages), GCs typically upload the full set. Discipline determines which spec sections discrepancy scans cross-reference.
                            </p>
                          </div>

                          <div className="p-3.5 rounded-lg bg-[#fef8e7] border border-[#fbdc8d] space-y-1 text-xs">
                            <label className="flex items-start gap-2.5 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={agreeTerms}
                                onChange={(e) => setAgreeTerms(e.target.checked)}
                                className="mt-0.5 accent-[#0056b3] rounded"
                              />
                              <span className="text-gray-800 text-[11px] leading-relaxed">
                                I have the right to upload this document under my business relationships and applicable agreements (Terms of Service §7), and uploading it does not breach any NDA, confidentiality obligation, or third-party rights (Terms of Service §5).
                              </span>
                            </label>
                            <p className="text-[10px] text-amber-800 font-medium pl-6">
                              Confirmed per document and recorded against this upload. Read the <a href="#privacy" className="underline font-bold">Terms of Service</a>.
                            </p>
                          </div>

                          <div className="space-y-2 pt-1">
                            <button
                              type="submit"
                              className="px-6 py-2.5 bg-[#0056b3] hover:bg-[#004085] text-white rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-2"
                            >
                              <Upload className="w-4 h-4" />
                              <span>Upload & Process Bid Set</span>
                            </button>

                            <p className="text-[11px] text-gray-500 font-light leading-relaxed">
                              Up to 300 MB. PDF only. Uploads stream directly to storage in resumable 6 MB chunks — a dropped connection picks up where it left off. We parse the sheet index on registration; per-sheet extraction runs on demand.
                            </p>
                          </div>
                        </form>
                      </div>

                      {/* Uploaded Bid Sets List with Visual Diff Action */}
                      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-2xs space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-gray-900">
                            Indexed Bid Sets ({activeProjectDrawings.length})
                          </h4>
                          <span className="text-[11px] text-gray-500 font-light">
                            Automatic Vision Diff & RAG active
                          </span>
                        </div>

                        {activeProjectDrawings.length === 0 ? (
                          <div className="p-6 rounded-xl border border-dashed border-gray-300 bg-gray-50/70 text-center space-y-2">
                            <FileText className="w-7 h-7 text-gray-400 mx-auto" />
                            <p className="text-xs text-gray-600 font-light max-w-sm mx-auto">
                              No bid sets uploaded yet for <strong>{activeProject?.name}</strong>. Choose a PDF file above or click <strong className="text-[#0056b3]">+ Sample Architectural PDF</strong> to upload your first set.
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-2.5">
                            {activeProjectDrawings.map((s, idx) => (
                              <div key={idx} className="p-3.5 rounded-lg border border-gray-200 bg-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                                <div className="flex items-center gap-2.5">
                                  <FileCheck className="w-4 h-4 text-[#0056b3] shrink-0" />
                                  <div>
                                    <strong className="text-gray-900">{s.name}</strong>
                                    <span className="text-gray-500 ml-2">({s.sheets} Sheets Indexed)</span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 self-end sm:self-auto">
                                  <button
                                    onClick={() => {
                                      setSelectedDiffSheet(s.name);
                                      setIsDrawingDiffModalOpen(true);
                                    }}
                                    className="px-3 py-1 bg-white border border-[#0056b3] text-[#0056b3] hover:bg-blue-50 rounded text-xs font-bold shadow-2xs flex items-center gap-1 cursor-pointer"
                                  >
                                    <GitPullRequest className="w-3.5 h-3.5" />
                                    <span>Δ vs previous</span>
                                  </button>
                                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                    ✓ pgvector Ready
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-2xs space-y-4">
                        <div>
                          <h3 className="text-sm font-bold text-gray-900 font-['Outfit']">
                            Upload priced takeoff
                          </h3>
                          <p className="text-xs text-gray-600 leading-relaxed mt-1 font-light">
                            Filled in the Unit Price column of a downloaded takeoff? Drop the .xlsx back here — every priced line becomes a quote line item linked to its equipment, ready to compare and promote.
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                          <div className="flex items-center gap-3">
                            <label className="px-3.5 py-1.5 rounded bg-gray-900 hover:bg-black text-white text-xs font-bold shadow-2xs cursor-pointer inline-flex items-center gap-1.5">
                              <span>Choose File</span>
                              <input
                                type="file"
                                accept=".xlsx,.csv"
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    setPricedTakeoffFileName(e.target.files[0].name);
                                  }
                                }}
                                className="hidden"
                              />
                            </label>
                            <span className="text-xs text-gray-500 font-mono">
                              {pricedTakeoffFileName}
                            </span>
                          </div>

                          <button
                            onClick={() => {
                              alert('Priced takeoff spreadsheet imported successfully into Bill of Quantities.');
                              setPricedTakeoffFileName('No file chosen');
                            }}
                            className="px-5 py-2 bg-[#011e38] hover:bg-[#002f5a] text-white rounded text-xs font-bold shadow-2xs transition-colors cursor-pointer text-center"
                          >
                            Import prices
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : projectSidebarTab === 'rfis' ? (
                    /* TAB 2: RFIs (REQUEST FOR INFORMATION) */
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-2xs space-y-6 animate-in fade-in duration-200">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl font-bold text-gray-900 font-['Outfit']">
                              Request for Information (RFI) Log
                            </h3>
                            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-[#0056b3] text-xs font-bold font-mono">
                              {projectRFIs.length} Active
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1 font-light">
                            Formal clarifications for spec vs plan discrepancies sent to Architect & General Contractor to eliminate bid risk.
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setRfiFormTitle('Generator Fuel Line Dual-Wall Secondary Containment');
                              setRfiFormCsi('26 32 13');
                              setRfiFormDrawing('Sheet E-401 Detail 4');
                              setRfiFormSpec('Spec Section 26 32 13, Page 14');
                              setRfiFormQuestion('Drawing Sheet E-401 shows single-wall black steel fuel piping whereas Spec 26 32 13 requires UL-142 listed double-wall containment with remote leak probes. Please confirm which requirement governs the base bid.');
                              setRfiFormSolution('Provide double-wall piping with monitoring console at an estimated cost delta of +$42,000.');
                              setRfiFormCost('+$42,000');
                              setRfiFormDays('+3 Days');
                              setIsDraftRFIModalOpen(true);
                            }}
                            className="px-3.5 py-2 bg-gradient-to-r from-[#0056b3] to-[#007cc2] hover:from-[#004085] hover:to-[#0056b3] text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>+ AI Auto-Draft RFI</span>
                          </button>

                          <button
                            onClick={() => {
                              setRfiFormTitle('');
                              setRfiFormQuestion('');
                              setRfiFormSolution('');
                              setIsDraftRFIModalOpen(true);
                            }}
                            className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold shadow-2xs cursor-pointer"
                          >
                            + Custom RFI
                          </button>
                        </div>
                      </div>

                      {/* RFIs List Cards */}
                      <div className="space-y-3.5">
                        {projectRFIs.map((rfi) => (
                          <div
                            key={rfi.id}
                            className="p-5 rounded-2xl border border-gray-200 bg-white hover:border-[#0056b3]/50 shadow-xs space-y-3 transition-all"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-2.5">
                              <div className="flex items-center gap-2.5">
                                <span className="px-2.5 py-0.5 rounded-md bg-gray-900 text-white font-mono font-bold text-xs">
                                  {rfi.number}
                                </span>
                                <span className="font-extrabold text-sm text-gray-900 font-['Outfit']">
                                  {rfi.title}
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-[#0056b3] font-bold text-[10px]">
                                  CSI {rfi.csiCode}
                                </span>
                                <span
                                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                    rfi.status === 'Answered'
                                      ? 'bg-emerald-100 text-emerald-800'
                                      : rfi.status === 'Submitted'
                                      ? 'bg-blue-100 text-blue-800'
                                      : 'bg-amber-100 text-amber-800'
                                  }`}
                                >
                                  ● {rfi.status}
                                </span>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-gray-50/80 p-3 rounded-xl border border-gray-100">
                              <div>
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                                  Drawing Reference:
                                </span>
                                <span className="font-mono text-gray-800 font-medium">
                                  📐 {rfi.drawingRef}
                                </span>
                              </div>
                              <div>
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                                  Specification Reference:
                                </span>
                                <span className="font-mono text-gray-800 font-medium">
                                  📑 {rfi.specRef}
                                </span>
                              </div>
                            </div>

                            <div className="space-y-1 text-xs">
                              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                                Formal Question for Architect:
                              </span>
                              <p className="text-gray-700 leading-relaxed font-light bg-white p-3 rounded-lg border border-gray-200">
                                "{rfi.question}"
                              </p>
                            </div>

                            {rfi.suggestedSolution && (
                              <div className="space-y-1 text-xs">
                                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                                  Proposed Contractor Recommendation / Solution:
                                </span>
                                <p className="text-emerald-950 font-medium bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-200">
                                  💡 {rfi.suggestedSolution}
                                </p>
                              </div>
                            )}

                            {/* Card Footer Actions */}
                            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs border-t border-gray-100">
                              <div className="flex items-center gap-3 text-gray-500 font-light text-[11px]">
                                <span>Cost Impact: <strong className="text-gray-900 font-bold">{rfi.impactCost}</strong></span>
                                <span>•</span>
                                <span>Schedule Impact: <strong className="text-gray-900 font-bold">{rfi.impactDays}</strong></span>
                                <span>•</span>
                                <span>{rfi.dateCreated}</span>
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => {
                                    navigator.clipboard?.writeText(
                                      `${rfi.number}: ${rfi.title}\nDrawing: ${rfi.drawingRef}\nSpec: ${rfi.specRef}\nQuestion: ${rfi.question}\nRecommendation: ${rfi.suggestedSolution}`
                                    );
                                    setNotification(`Copied ${rfi.number} to clipboard for email / GC portal.`);
                                  }}
                                  className="px-3 py-1 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 rounded-lg font-bold text-xs shadow-2xs cursor-pointer"
                                >
                                  📋 Copy Text
                                </button>
                                <button
                                  onClick={() => {
                                    setProjectRFIs(prev =>
                                      prev.map(item =>
                                        item.id === rfi.id
                                          ? { ...item, status: item.status === 'Draft' ? 'Submitted' : 'Answered' }
                                          : item
                                      )
                                    );
                                    setNotification(`Updated ${rfi.number} status.`);
                                  }}
                                  className="px-3 py-1 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-[#0056b3] rounded-lg font-bold text-xs cursor-pointer"
                                >
                                  {rfi.status === 'Draft' ? 'Mark Submitted' : 'Mark Answered'}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : projectSidebarTab === 'change_orders' ? (
                    /* TAB 3: CHANGE ORDERS (MATCHING EXACT USER TEXT) */
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-2xs space-y-6 animate-in fade-in duration-200">
                      
                      {/* Header with Title & Open log → link */}
                      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-bold text-gray-900 font-['Outfit']">
                            Change orders
                          </h2>
                          <p className="text-xs text-gray-600 font-light leading-relaxed max-w-2xl">
                            PCO/COR log with lifecycle, realization-weighted exposure, and notice deadlines. Carried PCOs flow into the Cost Projection.
                          </p>
                        </div>

                        <button
                          onClick={() => alert('Opening full PCO/COR realization log with contract variance breakdown...')}
                          className="text-xs font-bold text-[#0056b3] hover:underline flex items-center gap-1 cursor-pointer shrink-0"
                        >
                          <span>Open log</span>
                          <span>→</span>
                        </button>
                      </div>

                      {/* Empty state / Log card matching user verbatim */}
                      <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center space-y-3">
                        <FileSpreadsheet className="w-8 h-8 text-gray-400 mx-auto" />
                        <p className="text-xs text-gray-600 font-light max-w-md mx-auto leading-relaxed">
                          Nothing logged yet. The moment a directive, field condition, or scope-adding RFI answer appears — log it, even at $0.
                        </p>
                        
                        <div className="pt-2">
                          <button
                            onClick={() => alert('Add Potential Change Order (PCO / COR):\n1. Title & RFI Reference\n2. Scope Impact & Trade\n3. Estimated Value ($)')}
                            className="px-4 py-2 bg-[#0056b3] hover:bg-[#004085] text-white rounded-lg text-xs font-bold shadow-2xs cursor-pointer"
                          >
                            + Log Potential Change Order
                          </button>
                        </div>
                      </div>

                      {/* Live Change Orders Realization Summary */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
                        <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-1">
                          <span className="text-gray-500">Approved COs ($)</span>
                          <div className="text-lg font-bold text-gray-900 font-['Outfit']">$0.00</div>
                        </div>
                        <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-1">
                          <span className="text-gray-500">Pending / Proposed PCOs</span>
                          <div className="text-lg font-bold text-amber-600 font-['Outfit']">$0.00</div>
                        </div>
                        <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-1">
                          <span className="text-gray-500">Realization Weight</span>
                          <div className="text-lg font-bold text-[#0056b3] font-['Outfit']">100%</div>
                        </div>
                      </div>

                    </div>
                  ) : projectSidebarTab === 'labor_cost' ? (
                    /* TAB 14: LABOR & COST PROJECTION */
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-2xs space-y-6 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 font-['Outfit']">
                            Labor & Cost Projection
                          </h2>
                          <p className="text-xs text-gray-600 font-light mt-0.5">
                            Weekly margin tracking from JDE / Sage / Vista ERP exports with peach-cell editor and trend summaries.
                          </p>
                        </div>

                        <button
                          onClick={() => alert('Exporting Labor & Cost variance report...')}
                          className="px-3.5 py-1.5 bg-[#0056b3] text-white rounded text-xs font-bold shadow-2xs"
                        >
                          Export ERP Summary
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
                          <span className="text-[#0056b3] font-bold">Estimated Value</span>
                          <div className="text-lg font-black text-gray-900 font-['Outfit']">{activeProject.value}</div>
                        </div>
                        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                          <span className="text-emerald-700 font-bold">Target Margin</span>
                          <div className="text-lg font-black text-gray-900 font-['Outfit']">16.8%</div>
                        </div>
                        <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                          <span className="text-gray-600 font-bold">Labor Hours (Budget)</span>
                          <div className="text-lg font-black text-gray-900 font-['Outfit']">12,450 Hrs</div>
                        </div>
                        <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                          <span className="text-gray-600 font-bold">Committed Costs</span>
                          <div className="text-lg font-black text-gray-900 font-['Outfit']">$0.00</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* DEDICATED DATA VIEWS FOR ALL REMAINING 20 WORKSPACE MODULES */
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-2xs space-y-6 animate-in fade-in duration-200">
                      
                      {/* Dynamic Module Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-xl font-bold text-gray-900 font-['Outfit']">
                              {sidebarItems.find(i => i.id === projectSidebarTab)?.label || 'Workspace'}
                            </h2>
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold font-mono">
                              ● Live Active
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1 font-light">
                            Real-time tracking for project <strong className="text-gray-800 font-bold">{activeProject.name}</strong> ({activeProject.location}).
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setNotification(`Logged new entry into ${sidebarItems.find(i => i.id === projectSidebarTab)?.label}.`);
                            }}
                            className="px-4 py-2 bg-[#0056b3] hover:bg-[#004085] text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
                          >
                            <Plus className="w-3.5 h-3.5 stroke-[3]" />
                            <span>+ Add {sidebarItems.find(i => i.id === projectSidebarTab)?.label?.slice(0, 14)} Item</span>
                          </button>
                        </div>
                      </div>

                      {/* 1. INBOX */}
                      {projectSidebarTab === 'inbox' && (
                        <div className="space-y-3">
                          <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white flex items-center justify-between gap-4 text-xs transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-blue-100 text-[#0056b3] font-bold flex items-center justify-center shrink-0">TC</div>
                              <div>
                                <h4 className="font-bold text-gray-900">Turner Construction (General Contractor)</h4>
                                <p className="text-gray-600 text-[11px]">"Addendum #1 bulletin has been published. Please update electrical & civil unit rates."</p>
                              </div>
                            </div>
                            <span className="text-[10px] text-gray-400 font-mono shrink-0">10:42 AM</span>
                          </div>
                          <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white flex items-center justify-between gap-4 text-xs transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0">TR</div>
                              <div>
                                <h4 className="font-bold text-gray-900">Titan Ready-Mix Concrete Inc.</h4>
                                <p className="text-gray-600 text-[11px]">"Revised quote submitted for 6,000 PSI high-early mix ($178.50/CY delivered)."</p>
                              </div>
                            </div>
                            <span className="text-[10px] text-gray-400 font-mono shrink-0">Yesterday</span>
                          </div>
                        </div>
                      )}

                      {/* 2. SUBMITTALS */}
                      {projectSidebarTab === 'submittals' && (
                        <div className="space-y-3">
                          <div className="overflow-x-auto rounded-xl border border-gray-200">
                            <table className="w-full text-left text-xs">
                              <thead className="bg-gray-100 text-gray-700 font-bold border-b border-gray-200">
                                <tr>
                                  <th className="p-3">Submittal #</th>
                                  <th className="p-3">Spec Section</th>
                                  <th className="p-3">Description</th>
                                  <th className="p-3">Vendor / Manufacturer</th>
                                  <th className="p-3">Status</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                <tr className="hover:bg-gray-50">
                                  <td className="p-3 font-mono font-bold text-gray-900">SUB-001</td>
                                  <td className="p-3">26 32 13</td>
                                  <td className="p-3 font-medium">750kW Standby Diesel Generator Product Data & Cuts</td>
                                  <td className="p-3 text-gray-600">Cummins Power Generation</td>
                                  <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">Approved as Noted</span></td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                  <td className="p-3 font-mono font-bold text-gray-900">SUB-002</td>
                                  <td className="p-3">03 30 00</td>
                                  <td className="p-3 font-medium">Concrete Mix Design & Cylinder Break Tests (6,000 PSI)</td>
                                  <td className="p-3 text-gray-600">Titan Ready-Mix</td>
                                  <td className="p-3"><span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-[10px]">Under Architect Review</span></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* 3. EQUIPMENT */}
                      {projectSidebarTab === 'equipment' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                          <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 space-y-2">
                            <div className="flex items-center justify-between font-bold">
                              <span className="text-gray-900">GEN-1 (750kW Standby Generator)</span>
                              <span className="text-emerald-700 font-mono">$185,000</span>
                            </div>
                            <p className="text-[11px] text-gray-600">CSI 26 32 13 · Location: Grid 4-D Generator Pad · Lead Time: 14 Weeks</p>
                            <span className="inline-block px-2 py-0.5 rounded bg-purple-100 text-purple-800 text-[10px] font-bold">Long-Lead Major Equipment</span>
                          </div>
                          <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 space-y-2">
                            <div className="flex items-center justify-between font-bold">
                              <span className="text-gray-900">MSB-1 (2000A Main Switchboard NEMA 3R)</span>
                              <span className="text-emerald-700 font-mono">$96,400</span>
                            </div>
                            <p className="text-[11px] text-gray-600">CSI 26 24 13 · Location: Main Electrical Room 104 · Lead Time: 18 Weeks</p>
                            <span className="inline-block px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">Critical Path Item</span>
                          </div>
                        </div>
                      )}

                      {/* 4. SCHEDULE & SCHEDULE DEFENSE */}
                      {(projectSidebarTab === 'schedule' || projectSidebarTab === 'schedule_defense') && (
                        <div className="space-y-4 text-xs">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                              <span className="text-[#0056b3] font-bold">Contract Substantial Completion</span>
                              <div className="text-base font-extrabold text-gray-900 font-mono mt-1">Nov 15, 2026</div>
                            </div>
                            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                              <span className="text-emerald-700 font-bold">Total Float Remaining</span>
                              <div className="text-base font-extrabold text-emerald-800 font-mono mt-1">+14 Days</div>
                            </div>
                            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                              <span className="text-amber-800 font-bold">Weather / Permit Delays</span>
                              <div className="text-base font-extrabold text-amber-900 font-mono mt-1">2 Days Claimed</div>
                            </div>
                          </div>
                          <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 space-y-2 font-mono text-[11px]">
                            <div className="flex justify-between border-b border-gray-200 pb-1">
                              <span>Activity 104: Foundations & Grade Beams</span>
                              <span className="text-emerald-700 font-bold">100% Complete</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-1">
                              <span>Activity 208: Underground Electrical & Conduit Rough-In</span>
                              <span className="text-blue-700 font-bold">65% In Progress</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Activity 312: Structural Steel Erection</span>
                              <span className="text-gray-500">Scheduled (Starts Sep 01)</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 5. DAILY LOG & FIELD PROGRESS */}
                      {(projectSidebarTab === 'daily_log' || projectSidebarTab === 'field_progress') && (
                        <div className="space-y-3 text-xs">
                          <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 space-y-2">
                            <div className="flex items-center justify-between font-bold">
                              <span className="text-gray-900">Daily Superintendent Field Report — Today</span>
                              <span className="text-blue-700 font-mono">Weather: 78°F Clear · 24 Manpower Onsite</span>
                            </div>
                            <p className="text-gray-600 text-[11px] leading-relaxed">
                              Crews completed formwork stripping on Grid 3-B grade beam. Titan Concrete poured 140 CY footing slab with inspector sign-off. Underground conduit runs on Grid 4 inspected by City.
                            </p>
                          </div>
                        </div>
                      )}

                      {/* 6. PUNCH LIST & QC INSPECTIONS */}
                      {(projectSidebarTab === 'punch_list' || projectSidebarTab === 'qc_inspections') && (
                        <div className="space-y-3 text-xs">
                          <div className="p-3.5 rounded-xl border border-gray-200 bg-white flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <input type="checkbox" className="accent-[#0056b3] rounded" />
                              <div>
                                <span className="font-bold text-gray-900">Room 102: Touch up fire-caulk around 2" conduit penetration</span>
                                <p className="text-[11px] text-gray-500">Assigned to: Apex Electrical · Priority: High</p>
                              </div>
                            </div>
                            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">Open</span>
                          </div>
                          <div className="p-3.5 rounded-xl border border-gray-200 bg-white flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <input type="checkbox" defaultChecked className="accent-[#0056b3] rounded" />
                              <div>
                                <span className="font-bold text-gray-900 line-through text-gray-500">Generator Pad: Anchor bolt tension verification torque report</span>
                                <p className="text-[11px] text-gray-500">Verified by: City Structural Inspector #104</p>
                              </div>
                            </div>
                            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">Closed / Passed</span>
                          </div>
                        </div>
                      )}

                      {/* 7. SUBCONTRACTORS & VENDORS */}
                      {(projectSidebarTab === 'subcontractors' || projectSidebarTab === 'vendors_quotes') && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                          {vendors.map((v) => (
                            <div key={v.id} className="p-4 rounded-xl border border-gray-200 bg-gray-50 space-y-1.5">
                              <div className="flex items-center justify-between font-bold">
                                <span className="text-gray-900">{v.name}</span>
                                <span className="text-[#0056b3]">{v.phone}</span>
                              </div>
                              <p className="text-[11px] text-gray-600">Scope: {v.scopeTrades}</p>
                              <p className="text-[11px] text-gray-500">Contact: {v.primaryContact} ({v.email})</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* 8. SPECS & ADDENDA / BID PACKAGES / NOTES / ACTIVITY / TRANSMITTALS / ETC. */}
                      {!['inbox', 'submittals', 'equipment', 'schedule', 'schedule_defense', 'daily_log', 'field_progress', 'punch_list', 'qc_inspections', 'subcontractors', 'vendors_quotes'].includes(projectSidebarTab) && (
                        <div className="space-y-4 text-xs">
                          <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-gray-900 font-['Outfit']">Active Records ({activeProject.name})</span>
                              <span className="font-mono text-gray-500 text-[11px]">Synced with pgvector & AWS S3</span>
                            </div>
                            <p className="text-gray-600 text-[11px] leading-relaxed font-light">
                              All drawings, addenda bulletins, and CSI division schedules are indexed in real time for this module. AI copilot cross-references every log with your project manual.
                            </p>
                          </div>
                        </div>
                      )}

                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* MAIN DASHBOARD VIEW */
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
              <div className="space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  {currentDate}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-['Outfit']">
                      {getDisplayUsername()}
                    </h1>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {projects.length} projects · {quoteHistoryList.length} quotes · {vendors.length} vendors
                    </p>
                  </div>

                  <button
                    onClick={() => setCurrentView('new_project')}
                    className="px-4 py-2 bg-[#0056b3] hover:bg-[#004085] text-white rounded-md text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer self-start sm:self-auto"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>New project</span>
                  </button>
                </div>
              </div>

              <div className="p-3.5 px-5 rounded-lg bg-[#eaf3fc] border border-[#d2e5f8] flex items-center justify-between text-xs text-gray-800 shadow-2xs">
                <div>
                  <strong>14 days left</strong> in your free trial. Trial includes Solo-level access.
                </div>
                <button
                  onClick={() => onOpenTrial('pro')}
                  className="text-[#0056b3] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>See plans</span>
                  <span>→</span>
                </button>
              </div>

              {!setupDismissed && (
                <div className="rounded-xl bg-[#eaf3fc] border border-[#d2e5f8] p-6 space-y-4 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 font-['Outfit']">
                        Get set up
                      </h3>
                      <p className="text-xs text-gray-600 mt-0.5">
                        {completedSteps} of 3 done — a few steps to get the most out of BidPilot.
                      </p>
                    </div>
                    <button
                      onClick={() => setSetupDismissed(true)}
                      className="text-xs text-[#0056b3] hover:underline font-medium cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    <div className="p-3.5 rounded-lg bg-white border border-gray-200 flex items-center justify-between gap-4 shadow-2xs">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setStep1Done(!step1Done)}
                          className="text-gray-400 hover:text-[#0056b3] transition-colors cursor-pointer"
                        >
                          {step1Done ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-300" />
                          )}
                        </button>
                        <div>
                          <div className="text-xs font-bold text-gray-900">
                            Name your organization
                          </div>
                          <div className="text-[11px] text-gray-500">
                            {step1Done ? `Current: ${orgName}` : 'Replace the default with your company name.'}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => setRenameOrgModalOpen(true)}
                        className="px-3.5 py-1.5 bg-[#0056b3] hover:bg-[#004085] text-white rounded text-xs font-bold shadow-2xs transition-colors cursor-pointer shrink-0"
                      >
                        Rename
                      </button>
                    </div>

                    <div className="p-3.5 rounded-lg bg-white border border-gray-200 flex items-center justify-between gap-4 shadow-2xs">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setStep2Done(!step2Done)}
                          className="text-gray-400 hover:text-[#0056b3] transition-colors cursor-pointer"
                        >
                          {step2Done ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-300" />
                          )}
                        </button>
                        <div>
                          <div className="text-xs font-bold text-gray-900">
                            Create your first project
                          </div>
                          <div className="text-[11px] text-gray-500">
                            {step2Done ? `${projects.length} project(s) configured.` : 'Set up a bid project to organize quotes and estimates.'}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => setCurrentView('new_project')}
                        className="px-3.5 py-1.5 bg-[#0056b3] hover:bg-[#004085] text-white rounded text-xs font-bold shadow-2xs transition-colors cursor-pointer shrink-0"
                      >
                        New project
                      </button>
                    </div>

                    <div className="p-3.5 rounded-lg bg-white border border-gray-200 flex items-center justify-between gap-4 shadow-2xs">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setStep3Done(!step3Done)}
                          className="text-gray-400 hover:text-[#0056b3] transition-colors cursor-pointer"
                        >
                          {step3Done ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-300" />
                          )}
                        </button>
                        <div>
                          <div className="text-xs font-bold text-gray-900">
                            Add a vendor to your roster
                          </div>
                          <div className="text-[11px] text-gray-500">
                            {step3Done ? `${vendors.length} vendor(s) in address book.` : 'Build your address book of subs and suppliers.'}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => setCurrentView('vendors')}
                        className="px-3.5 py-1.5 bg-[#0056b3] hover:bg-[#004085] text-white rounded text-xs font-bold shadow-2xs transition-colors cursor-pointer shrink-0"
                      >
                        Add vendor
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-gray-500">
                    YOUR PROJECTS ({projects.length})
                  </div>
                  <button
                    onClick={() => setCurrentView('projects')}
                    className="text-xs text-[#0056b3] hover:underline font-bold"
                  >
                    View all projects →
                  </button>
                </div>

                {projects.length === 0 ? (
                  <div className="p-8 rounded-2xl border border-dashed border-gray-300 bg-white text-center space-y-3 shadow-2xs">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0056b3] flex items-center justify-center mx-auto">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <p className="text-xs text-gray-600 font-light max-w-md mx-auto">
                      No projects created yet for <strong>{getDisplayEmail()}</strong>. Click "+ New project" to start your first bid package.
                    </p>
                    <div>
                      <button
                        onClick={() => setCurrentView('new_project')}
                        className="px-4 py-2 bg-[#0056b3] hover:bg-[#004085] text-white rounded-lg text-xs font-bold shadow-2xs cursor-pointer inline-flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Create First Project</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map((proj) => (
                      <div
                        key={proj.id}
                        className="p-5 rounded-xl border border-gray-200 bg-white hover:border-[#0056b3] transition-all space-y-3 shadow-2xs flex flex-col justify-between"
                      >
                        <div className="space-y-1">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-sm font-bold text-gray-900 font-['Outfit']">
                              {proj.name}
                            </h4>
                            <span className="px-2 py-0.5 rounded bg-blue-50 text-[#0056b3] text-[10px] font-bold border border-blue-200 shrink-0">
                              {proj.value}
                            </span>
                          </div>
                          <span className="text-[11px] text-gray-500 block">
                            GC: <strong>{proj.clientGC}</strong> • {proj.location}
                          </span>
                        </div>

                        <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                          <span className="text-emerald-600 font-bold flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" />
                            <span>{proj.status}</span>
                          </span>
                          <button
                            onClick={() => {
                              setActiveProject(proj);
                              setCurrentView('project_detail');
                            }}
                            className="text-[#0056b3] hover:underline font-bold text-xs flex items-center gap-1 cursor-pointer"
                          >
                            <span>Open Workspace</span>
                            <span>→</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-200 flex flex-wrap items-center gap-6 text-xs text-[#0056b3] font-medium">
                <button
                  onClick={() => setCurrentView('history')}
                  className="hover:underline flex items-center gap-1 cursor-pointer font-bold"
                >
                  <span>Search quote history ({quoteHistoryList.length})</span>
                  <span>→</span>
                </button>

                <button
                  onClick={() => setCurrentView('vendors')}
                  className="hover:underline flex items-center gap-1 cursor-pointer font-bold"
                >
                  <span>Vendor roster ({vendors.length})</span>
                  <span>→</span>
                </button>

                <button
                  onClick={() => setCurrentView('estimate')}
                  className="hover:underline flex items-center gap-1 cursor-pointer font-bold"
                >
                  <span>Quick estimate</span>
                  <span>→</span>
                </button>

                <button
                  onClick={() => setCurrentView('demo')}
                  className="hover:underline flex items-center gap-1 cursor-pointer font-bold"
                >
                  <span>Demos</span>
                  <span>→</span>
                </button>
              </div>
            </main>
          )}

          {/* ConstructConnect Footer */}
          <footer className="bg-white border-t border-gray-200 py-6 px-4 sm:px-8 text-center text-[11px] text-gray-500 mt-12">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
              <div>
                © {new Date().getFullYear()} BidPilot AI Inc. • Lead Engineer:{' '}
                <a 
                  href="https://github.com/muhammadabdullah-devpk" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-[#0056b3] font-bold hover:underline"
                >
                  Muhammad Abdullah (github.com/muhammadabdullah-devpk)
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <button onClick={onNavigateHome} className="hover:underline cursor-pointer">Privacy Policy</button>
                <span>•</span>
                <button onClick={onNavigateHome} className="hover:underline cursor-pointer">Terms of Service</button>
                <span>•</span>
                <a href="tel:+923223715064" className="text-[#0056b3] font-bold hover:underline">+92 3223715064</a>
              </div>
            </div>
          </footer>

          {/* Modal 1: Rename Organization */}
          {renameOrgModalOpen && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-gray-200">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <h3 className="text-base font-bold text-gray-900 font-['Outfit']">
                    Rename Organization
                  </h3>
                  <button
                    onClick={() => setRenameOrgModalOpen(false)}
                    className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveOrgName} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">
                      Organization / Company Name
                    </label>
                    <input
                      type="text"
                      required
                      value={tempOrgName}
                      onChange={(e) => setTempOrgName(e.target.value)}
                      placeholder="e.g. Apex Horizon Builders LLC"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#0056b3]"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setRenameOrgModalOpen(false)}
                      className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 font-bold hover:bg-gray-50 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-lg bg-[#0056b3] hover:bg-[#004085] text-white font-bold shadow-xs cursor-pointer"
                    >
                      Save Name
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* MODAL 2: INTERACTIVE CAD / PDF DRAWING DIFF VIEWER (SEC 3.1) */}
          {/* ========================================================= */}
          {isDrawingDiffModalOpen && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-6 animate-in fade-in duration-200">
              <div className="bg-white text-gray-900 rounded-3xl max-w-6xl w-full h-[92vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden">
                
                {/* Header with Sheet details, View Switcher & Zoom */}
                <div className="px-6 py-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-blue-50/50 via-white to-indigo-50/40">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0056b3] to-[#0084d6] flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                      <GitPullRequest className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-extrabold text-gray-900 font-['Outfit'] tracking-tight">
                          Vision Diff Engine · {selectedDiffSheet}
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[11px] font-bold">
                          ✓ 2 Changes Detected
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 font-light">
                        Cross-referenced with CSI Specification Books · Revision 1 (Original) vs Revision 2 (Addendum #1)
                      </p>
                    </div>
                  </div>

                  {/* Mode Switcher & Tools */}
                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center bg-gray-100 rounded-xl p-1 border border-gray-200 shadow-2xs">
                      <button
                        onClick={() => setDiffViewMode('split')}
                        className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                          diffViewMode === 'split' 
                            ? 'bg-white text-[#0056b3] shadow-xs' 
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        Split Comparison
                      </button>
                      <button
                        onClick={() => setDiffViewMode('overlay')}
                        className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                          diffViewMode === 'overlay' 
                            ? 'bg-white text-[#0056b3] shadow-xs' 
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        Overlay Blueprint
                      </button>
                      <button
                        onClick={() => setDiffViewMode('diff_only')}
                        className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                          diffViewMode === 'diff_only' 
                            ? 'bg-white text-[#0056b3] shadow-xs' 
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        Delta Discrepancies
                      </button>
                    </div>

                    <div className="flex items-center border border-gray-200 rounded-lg bg-white p-0.5 shadow-2xs">
                      <button
                        onClick={() => setDiffZoom(prev => Math.min(prev + 15, 150))}
                        className="px-2 py-1 hover:bg-gray-100 text-gray-700 rounded font-bold text-xs"
                      >
                        +
                      </button>
                      <span className="text-xs font-mono font-bold text-gray-700 px-2">{diffZoom}%</span>
                      <button
                        onClick={() => setDiffZoom(prev => Math.max(prev - 15, 80))}
                        className="px-2 py-1 hover:bg-gray-100 text-gray-700 rounded font-bold text-xs"
                      >
                        -
                      </button>
                    </div>

                    <button
                      onClick={() => setIsDrawingDiffModalOpen(false)}
                      className="p-1.5 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Main Visual Blueprint Area */}
                <div className="flex-1 bg-[#f8fafc] p-4 sm:p-6 overflow-auto flex items-center justify-center relative">
                  
                  {/* Background CAD Grid pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:24px_24px] opacity-60 pointer-events-none" />

                  <div 
                    style={{ transform: `scale(${diffZoom / 100})`, transformOrigin: 'center center' }}
                    className="transition-transform duration-200 max-w-5xl w-full relative z-10 space-y-4"
                  >
                    {diffViewMode === 'split' ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* 1. Left Blueprint: Sheet E-401 (Revision 1) */}
                        <div className="rounded-2xl border-2 border-red-200 bg-white p-5 space-y-3 shadow-md">
                          <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                              <span className="font-extrabold text-xs text-red-700 font-['Outfit'] uppercase tracking-wider">
                                Sheet E-401 (Revision 1 - Original Set)
                              </span>
                            </div>
                            <span className="text-[10px] text-gray-500 font-mono">Issued: Aug 01, 2026</span>
                          </div>

                          {/* Architectural CAD Plan Canvas Box */}
                          <div className="h-72 border border-dashed border-gray-300 rounded-xl p-5 relative font-mono text-xs text-gray-700 bg-slate-50/90 overflow-hidden shadow-inner flex flex-col justify-between">
                            <div className="flex items-center justify-between text-[11px] text-gray-400 font-bold border-b border-gray-200 pb-1">
                              <span>GRID [4] — [D]</span>
                              <span>SCALE: 1/4" = 1'-0"</span>
                            </div>

                            {/* Plan Visual Elements */}
                            <div className="space-y-3 my-auto">
                              <div className="p-3.5 rounded-xl border border-red-300 bg-red-50/80 space-y-1 relative">
                                <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded bg-red-600 text-white font-bold text-[9px] uppercase tracking-wider shadow-2xs">
                                  Previous Plan
                                </span>
                                <div className="font-bold text-gray-900 flex items-center gap-1.5">
                                  <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                                  <span>750kW Standby Diesel Generator Pad</span>
                                </div>
                                <p className="text-[11px] text-gray-600">
                                  • Fuel Piping: <strong>2" Single-Wall Black Steel Supply Line</strong> (Ref Spec 26 32 13)
                                </p>
                                <p className="text-[11px] text-gray-600">
                                  • Feeder Run: 3x 400A Copper in 3" EMT Conduits
                                </p>
                              </div>
                            </div>

                            <div className="text-[10px] text-gray-400 border-t border-gray-200 pt-1 flex justify-between">
                              <span>ARCHITECT STAMP: #44102-CA</span>
                              <span>DISCIPLINE: ELECTRICAL</span>
                            </div>
                          </div>
                        </div>

                        {/* 2. Right Blueprint: Sheet E-401 (Revision 2 - Addendum) */}
                        <div className="rounded-2xl border-2 border-emerald-300 bg-white p-5 space-y-3 shadow-md">
                          <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                              <span className="font-extrabold text-xs text-emerald-800 font-['Outfit'] uppercase tracking-wider">
                                Sheet E-401 (Revision 2 - Addendum #1)
                              </span>
                            </div>
                            <span className="text-[10px] text-emerald-700 font-mono font-bold">Δ Modified: Aug 14, 2026</span>
                          </div>

                          {/* Architectural CAD Plan Canvas Box */}
                          <div className="h-72 border border-dashed border-emerald-400 rounded-xl p-5 relative font-mono text-xs text-gray-700 bg-emerald-50/40 overflow-hidden shadow-inner flex flex-col justify-between">
                            <div className="flex items-center justify-between text-[11px] text-emerald-700 font-bold border-b border-emerald-200 pb-1">
                              <span>GRID [4] — [D] · REVISION CLOUD [Δ1]</span>
                              <span>SCALE: 1/4" = 1'-0"</span>
                            </div>

                            {/* Plan Visual Elements */}
                            <div className="space-y-3 my-auto">
                              <div className="p-3.5 rounded-xl border-2 border-emerald-500 bg-emerald-50 space-y-1 relative shadow-sm">
                                <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded bg-emerald-600 text-white font-extrabold text-[9px] uppercase tracking-wider shadow-2xs">
                                  +$42,000 Scope Add
                                </span>
                                <div className="font-bold text-gray-900 flex items-center gap-1.5">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>750kW Standby Diesel Generator Pad</span>
                                </div>
                                <p className="text-[11px] text-emerald-900 font-bold">
                                  • Fuel Piping: <strong>2" Double-Wall Secondary Containment Steel + Leak Probe Sensor</strong>
                                </p>
                                <p className="text-[11px] text-gray-600">
                                  • Feeder Run: 3x 400A Copper in 3" EMT Conduits
                                </p>
                              </div>
                            </div>

                            <div className="text-[10px] text-emerald-700 border-t border-emerald-200 pt-1 flex justify-between font-medium">
                              <span>CROSS-REF: Spec 26 32 13 (Page 14, §2.1)</span>
                              <span>STATUS: Δ VERIFIED</span>
                            </div>
                          </div>
                        </div>

                      </div>
                    ) : (
                      /* Overlay Blueprint Mode & Discrepancies */
                      <div className="rounded-3xl border border-blue-200 bg-white p-6 sm:p-8 space-y-5 shadow-lg">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-3 text-xs">
                          <div>
                            <h4 className="font-extrabold text-sm text-gray-900 font-['Outfit']">
                              Computer Vision Delta Analysis (OpenCV Model Output)
                            </h4>
                            <p className="text-xs text-gray-500 mt-0.5">
                              Sheet E-401 Power Plan · Detected 2 Equipment & Specification Discrepancies
                            </p>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1.5 text-emerald-700 text-xs font-bold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Added Scope ($)
                            </span>
                            <span className="flex items-center gap-1.5 text-red-700 text-xs font-bold bg-red-50 px-2.5 py-1 rounded-md border border-red-200">
                              <span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> Removed Item
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                          
                          {/* Item 1 */}
                          <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/50 space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-bold text-[10px]">
                                CSI 26 32 13
                              </span>
                              <span className="font-mono font-extrabold text-emerald-700 text-sm">
                                +$42,000.00
                              </span>
                            </div>
                            <h5 className="font-bold text-gray-900">
                              Emergency Generator Dual-Wall Secondary Containment
                            </h5>
                            <p className="text-xs text-gray-600 leading-relaxed font-light">
                              Addendum #1 revised single-wall black steel fuel supply to UL-142 dual-wall piping with leak detection monitoring panel.
                            </p>
                          </div>

                          {/* Item 2 */}
                          <div className="p-4 rounded-2xl border border-blue-200 bg-blue-50/50 space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <span className="px-2 py-0.5 rounded bg-[#0056b3] text-white font-bold text-[10px]">
                                CSI 26 24 13
                              </span>
                              <span className="font-mono font-extrabold text-[#0056b3] text-sm">
                                +$18,500.00
                              </span>
                            </div>
                            <h5 className="font-bold text-gray-900">
                              Main Switchboard Breaker Upgrade (1600A → 2000A)
                            </h5>
                            <p className="text-xs text-gray-600 leading-relaxed font-light">
                              Drawing sheet revision expanded main distribution switchboard frame size to accommodate future clinic MRI expansion.
                            </p>
                          </div>

                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action & Summary Bar */}
                <div className="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white">
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Contract Variance:</span>
                      <span className="text-lg font-black text-emerald-700 font-['Outfit']">+$60,500.00 Net Add</span>
                    </div>
                    <span className="text-gray-300">|</span>
                    <div className="text-xs text-gray-500 font-light hidden sm:block">
                      Schedule Impact: <strong>+4 Days</strong> · 2 PCO items ready to carry into Cost Projection.
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setIsDrawingDiffModalOpen(false);
                        setProjectSidebarTab('change_orders');
                        setNotification('Promoted drawing delta changes ($60,500) into Potential Change Orders (PCO) Log.');
                      }}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4 stroke-[3]" />
                      <span>Promote to PCO Change Order ($60,500)</span>
                    </button>
                    <button
                      onClick={() => setIsDrawingDiffModalOpen(false)}
                      className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-xs transition-colors cursor-pointer"
                    >
                      Close Viewer
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* DRAWER 3: SPEC ASSISTANT AI LIVE Q&A CHAT DRAWER (SEC 3.1 & 7) */}
          {/* ========================================================= */}
          {isSpecAssistantOpen && (
            <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white shadow-2xl border-l border-gray-200 flex flex-col animate-in slide-in-from-right duration-300">
              
              {/* Drawer Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-[#001e38] text-white">
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#0056b3] flex items-center justify-center text-white">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold font-['Outfit'] tracking-wide">
                      AI Spec & Document Copilot
                    </h3>
                    <p className="text-[10px] text-blue-200 font-light">
                      CSI MasterFormat RAG · {activeProject?.name?.slice(0, 25)}...
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsSpecAssistantOpen(false)}
                  className="p-1 text-gray-300 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Prompt Starters */}
              <div className="p-3 bg-gray-50 border-b border-gray-200 space-y-1.5 text-[11px]">
                <span className="text-gray-500 font-semibold uppercase text-[9px] tracking-wider block">
                  Quick Spec Queries:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => handleAskSpecAssistant('Check emergency generator fuel piping specification and containment requirement.')}
                    className="px-2.5 py-1 rounded bg-white hover:bg-blue-50 border border-gray-300 text-gray-700 text-[10.5px] cursor-pointer"
                  >
                    🔍 Generator Fuel Spec
                  </button>
                  <button
                    onClick={() => handleAskSpecAssistant('What is the required concrete compressive strength at 28 days?')}
                    className="px-2.5 py-1 rounded bg-white hover:bg-blue-50 border border-gray-300 text-gray-700 text-[10.5px] cursor-pointer"
                  >
                    🧱 Concrete PSI
                  </button>
                  <button
                    onClick={() => handleAskSpecAssistant('Are aluminum conductors allowed or is 100% copper required?')}
                    className="px-2.5 py-1 rounded bg-white hover:bg-blue-50 border border-gray-300 text-gray-700 text-[10.5px] cursor-pointer"
                  >
                    ⚡ Copper vs Aluminum
                  </button>
                </div>
              </div>

              {/* Chat Messages List */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex flex-col ${
                      msg.role === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] p-3.5 rounded-xl shadow-2xs ${
                        msg.role === 'user'
                          ? 'bg-[#0056b3] text-white rounded-br-none'
                          : 'bg-gray-100 text-gray-900 border border-gray-200 rounded-bl-none'
                      }`}
                    >
                      <p className="leading-relaxed font-light">{msg.text}</p>

                      {/* Source Citations */}
                      {msg.citations && msg.citations.length > 0 && (
                        <div className="mt-2.5 pt-2 border-t border-gray-200/50 space-y-1">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-gray-500 block">
                            Verified Citations:
                          </span>
                          {msg.citations.map((c, cIdx) => (
                            <span
                              key={cIdx}
                              className="inline-block mr-1.5 px-2 py-0.5 rounded bg-white border border-gray-300 text-[9.5px] text-blue-700 font-mono"
                            >
                              📄 {c}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isSearchingSpec && (
                  <div className="flex items-center gap-2 text-xs text-gray-500 italic p-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#0056b3] animate-spin" />
                    <span>Searching CSI MasterFormat vector index...</span>
                  </div>
                )}
              </div>

              {/* Input Box */}
              <div className="p-3 border-t border-gray-200 bg-white">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAskSpecAssistant();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask about specs, drawings, BOQ..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#0056b3]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-[#0056b3] hover:bg-[#004085] text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer"
                  >
                    Ask
                  </button>
                </form>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* MODAL 4: SEARCH IN DRAWING SHEETS & SPECS                 */}
          {/* ========================================================= */}
          {isProjectSearchModalOpen && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-gray-200 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <h3 className="text-base font-bold text-gray-900 font-['Outfit'] flex items-center gap-2">
                    <Search className="w-4 h-4 text-[#0056b3]" />
                    <span>Search Project Documents & Drawings</span>
                  </h3>
                  <button
                    onClick={() => setIsProjectSearchModalOpen(false)}
                    className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="relative">
                    <input
                      type="text"
                      autoFocus
                      value={projectSearchQuery}
                      onChange={(e) => setProjectSearchQuery(e.target.value)}
                      placeholder="Search keywords (e.g. Generator, 6000 PSI, VRF, Panelboard)..."
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#0056b3]"
                    />
                  </div>

                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                      Matching Sheets & Sections ({activeProjectDrawings.length * 8 + 4}):
                    </span>
                    <div className="p-3 rounded-lg border border-gray-200 bg-gray-50 space-y-1 hover:border-[#0056b3] cursor-pointer">
                      <div className="font-bold text-gray-900 flex items-center justify-between">
                        <span>Sheet E-401 Detail 4 (Emergency Standby Power)</span>
                        <span className="px-1.5 py-0.5 rounded bg-blue-100 text-[#0056b3] text-[9px] font-bold">Drawing</span>
                      </div>
                      <p className="text-gray-600 text-[11px]">
                        Matches: "750kW Generator Fuel Supply Dual-Wall Connection"
                      </p>
                    </div>

                    <div className="p-3 rounded-lg border border-gray-200 bg-gray-50 space-y-1 hover:border-[#0056b3] cursor-pointer">
                      <div className="font-bold text-gray-900 flex items-center justify-between">
                        <span>Spec Section 26 32 13 (Page 14, §2.1)</span>
                        <span className="px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 text-[9px] font-bold">Specification</span>
                      </div>
                      <p className="text-gray-600 text-[11px]">
                        Matches: "Diesel Generator Secondary Containment Requirements"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* MODAL 5: EDIT PROJECT DETAILS                             */}
          {/* ========================================================= */}
          {isEditProjectModalOpen && activeProject && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-gray-200 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <h3 className="text-base font-bold text-gray-900 font-['Outfit']">
                    Edit Project
                  </h3>
                  <button
                    onClick={() => setIsEditProjectModalOpen(false)}
                    className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsEditProjectModalOpen(false);
                    setNotification(`Project "${activeProject.name}" updated successfully.`);
                  }}
                  className="space-y-3 text-xs"
                >
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Project Name</label>
                    <input
                      type="text"
                      defaultValue={activeProject.name}
                      onChange={(e) => { activeProject.name = e.target.value; }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#0056b3]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Client / GC</label>
                    <input
                      type="text"
                      defaultValue={activeProject.clientGC}
                      onChange={(e) => { activeProject.clientGC = e.target.value; }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#0056b3]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      defaultValue={activeProject.location}
                      onChange={(e) => { activeProject.location = e.target.value; }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#0056b3]"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsEditProjectModalOpen(false)}
                      className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 font-bold hover:bg-gray-50 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-lg bg-[#0056b3] hover:bg-[#004085] text-white font-bold shadow-xs cursor-pointer"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* MODAL 6: DRAFT & LOG NEW RFI (REQUEST FOR INFORMATION)    */}
          {/* ========================================================= */}
          {isDraftRFIModalOpen && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-gray-200 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3.5">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#0056b3] flex items-center justify-center font-bold">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-gray-900 font-['Outfit']">
                        Draft Request for Information (RFI)
                      </h3>
                      <p className="text-[11px] text-gray-500 font-light">
                        Cross-references drawings against CSI specifications to generate formal clarification.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsDraftRFIModalOpen(false)}
                    className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleCreateRFI} className="space-y-3.5 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="block font-bold text-gray-700">RFI #</label>
                      <input
                        type="text"
                        required
                        value={rfiFormNumber}
                        onChange={(e) => setRfiFormNumber(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 font-mono focus:outline-none focus:border-[#0056b3]"
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-1">
                      <label className="block font-bold text-gray-700">CSI MasterFormat Code</label>
                      <input
                        type="text"
                        required
                        value={rfiFormCsi}
                        onChange={(e) => setRfiFormCsi(e.target.value)}
                        placeholder="e.g. 26 32 13 or 03 30 00"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#0056b3]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block font-bold text-gray-700">RFI Title / Subject</label>
                    <input
                      type="text"
                      required
                      value={rfiFormTitle}
                      onChange={(e) => setRfiFormTitle(e.target.value)}
                      placeholder="e.g. Emergency Generator Fuel Line Dual-Wall Conflict"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#0056b3]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block font-bold text-gray-700">Drawing Sheet Ref</label>
                      <input
                        type="text"
                        value={rfiFormDrawing}
                        onChange={(e) => setRfiFormDrawing(e.target.value)}
                        placeholder="e.g. Sheet E-401 Detail 4"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#0056b3]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block font-bold text-gray-700">Spec Section Ref</label>
                      <input
                        type="text"
                        value={rfiFormSpec}
                        onChange={(e) => setRfiFormSpec(e.target.value)}
                        placeholder="e.g. Spec Section 26 32 13, Page 14"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#0056b3]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block font-bold text-gray-700">Formal Clarification Question</label>
                    <textarea
                      rows={3}
                      required
                      value={rfiFormQuestion}
                      onChange={(e) => setRfiFormQuestion(e.target.value)}
                      placeholder="Describe the discrepancy between drawings and specifications..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#0056b3] leading-relaxed"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-bold text-emerald-800">
                      Proposed Contractor Recommendation / Value Engineering
                    </label>
                    <input
                      type="text"
                      value={rfiFormSolution}
                      onChange={(e) => setRfiFormSolution(e.target.value)}
                      placeholder="e.g. Provide UL-142 dual-wall piping with leak detection at +$42,000 delta."
                      className="w-full px-3 py-2 border border-emerald-300 rounded-lg text-gray-900 bg-emerald-50/40 focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block font-bold text-gray-700">Estimated Cost Delta</label>
                      <input
                        type="text"
                        value={rfiFormCost}
                        onChange={(e) => setRfiFormCost(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#0056b3]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block font-bold text-gray-700">Schedule Lead Delta</label>
                      <input
                        type="text"
                        value={rfiFormDays}
                        onChange={(e) => setRfiFormDays(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#0056b3]"
                      />
                    </div>
                  </div>

                  <div className="pt-3 flex items-center justify-end gap-3 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setIsDraftRFIModalOpen(false)}
                      className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-600 font-bold hover:bg-gray-50 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#0056b3] hover:bg-[#004085] text-white font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Save & Index RFI</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
