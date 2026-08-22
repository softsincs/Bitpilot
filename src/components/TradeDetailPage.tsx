import React, { useState } from 'react';
import { Download, Check, Phone, ShieldCheck, ArrowRight, Star, ChevronRight, CheckSquare, Layers, FileSpreadsheet, Sparkles, Building2 } from 'lucide-react';
import drywallImg from '../assets/trades/drywall.jpg';
import concreteImg from '../assets/trades/concrete.jpg';
import gcImg from '../assets/trades/general_contractor.jpg';
import electricalImg from '../assets/trades/electrical.jpg';
import flooringImg from '../assets/trades/flooring.jpg';
import framingImg from '../assets/trades/framing.jpg';
import hvacImg from '../assets/trades/hvac.jpg';
import plumbingImg from '../assets/trades/plumbing.jpg';
import paintingImg from '../assets/trades/painting.jpg';

interface TradeDetailPageProps {
  tradeId: string;
  onOpenTrial: (planId?: string) => void;
  onNavigateHome: () => void;
  onNavigatePricing: () => void;
}

export const TradeDetailPage: React.FC<TradeDetailPageProps> = ({
  tradeId,
  onOpenTrial,
  onNavigateHome,
  onNavigatePricing,
}) => {
  const [trialForm, setTrialForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const tradeConfigs: Record<string, {
    title: string;
    subtitle: string;
    image: string;
    bullets: string[];
    quote: string;
    quoteAuthor: string;
    overview: string;
    keyPoints: { title: string; desc: string }[];
  }> = {
    'drywall': {
      title: 'Drywall Estimating Software',
      subtitle: 'Increase Your Bottom Line With Faster, More Accurate Estimates!',
      image: drywallImg,
      bullets: [
        'Single Click Takeoff',
        'Automatical Materials Calculation',
        'Win More, Profitable Jobs!',
      ],
      quote: 'BidPilot AI is a very simple to use program that will save us hours of time per takeoff. You can’t beat the price and customer service that comes with it. Thanks!',
      quoteAuthor: 'Commercial Drywall & Acoustical Contractor',
      overview: 'Drywall estimating has never been easier. BidPilot AI drywall takeoff software allows drywall contractors to calculate square footage of walls and ceilings, linear feet of curved and straight walls, stud and track counts, drywall sheet quantities (4x8, 4x10, 4x12), screws, and joint compound bucket requirements in seconds.',
      keyPoints: [
        {
          title: 'Point-and-Click Area & Linear Takeoff',
          desc: 'Measure wall areas, partitions, curved soffits, and ceiling grid layouts directly from your PDF and CAD drawings with zero manual calculations.',
        },
        {
          title: 'Pre-Built Drywall Assemblies',
          desc: 'Simply drag and drop pre-built assemblies onto your takeoff items. BidPilot AI instantly calculates stud centers, track footage, insulation batts, and drywall sheet counts.',
        },
        {
          title: 'Instant Material & Labor Reports',
          desc: 'Export detailed, ready-to-order material lists directly to Excel or your accounting software to order supplies without shortages or waste.',
        },
      ],
    },
    'concrete': {
      title: 'Concrete Estimating Software',
      subtitle: 'Calculate Cubic Yards, Rebar, and Formwork in Seconds!',
      image: concreteImg,
      bullets: [
        'Instant Cubic Yardage Calculation',
        'Automated Rebar & Formwork Estimates',
        'Eliminate Underbidding & Over-Ordering',
      ],
      quote: 'BidPilot AI takes the pain out of concrete takeoff. What used to take half a day is now done in under an hour with 100% precision.',
      quoteAuthor: 'Commercial Concrete & Foundation Subcontractor',
      overview: 'BidPilot AI concrete takeoff software allows concrete contractors and masonry estimators to calculate volume in cubic yards for footings, slabs, walls, and piers. Built-in formulas automatically calculate rebar lengths, wire mesh rolls, gravel fill, and formwork square footage.',
      keyPoints: [
        {
          title: '3D Slab & Footing Volume Calculators',
          desc: 'Click the perimeter of slabs, footings, or foundations to instantly get cubic yards of ready-mix concrete with custom waste factor multipliers.',
        },
        {
          title: 'Rebar, Mesh & Formwork Assemblies',
          desc: 'Automatically calculate linear feet of rebar, tie-wire counts, vapor barrier rolls, and form board square footage as you measure.',
        },
        {
          title: 'Pour Schedules & Supplier Exports',
          desc: 'Generate truckload schedules and supplier order sheets with a single click to ensure seamless on-site operations.',
        },
      ],
    },
    'general-contractor': {
      title: 'General Contractors Estimating Software',
      subtitle: 'Manage Complex Multi-Trade Bids with Complete Speed and Accuracy!',
      image: gcImg,
      bullets: [
        'Multi-Trade Digital Takeoff Suite',
        'Subcontractor Scope Gap Detection',
        'Win More Bids in Less Time',
      ],
      quote: 'BidPilot AI has allowed our estimating department to bid 3x more projects each month while keeping our cost projections rock-solid.',
      quoteAuthor: 'Senior Commercial Estimator, Top 100 GC',
      overview: 'BidPilot AI is the industry-leading takeoff and estimating software for General Contractors. Estimate all CSI MasterFormat 50 divisions from civil site work and concrete to MEP and interior finishes in a single unified platform.',
      keyPoints: [
        {
          title: 'Complete Commercial Takeoff Engine',
          desc: 'Handle large multi-sheet tender packages (up to 500+ sheets) with rapid pan, zoom, and automated area snapping.',
        },
        {
          title: 'Custom Multi-Trade Assemblies',
          desc: 'Create comprehensive assemblies that calculate material, equipment, labor, and subcontractor allowances simultaneously.',
        },
        {
          title: '1-Click Excel & Procore Integration',
          desc: 'Export itemized bid packages and schedule-of-values directly into Microsoft Excel or sync with Procore project management.',
        },
      ],
    },
    'electrical': {
      title: 'Electrical Estimating Software',
      subtitle: 'Auto-Count Fixtures and Measure Conduit Runs Faster Than Ever!',
      image: electricalImg,
      bullets: [
        'Automated Symbol & Fixture Count',
        'Linear Conduit & Circuitry Takeoff',
        'Accurate Wire & Feeder Lengths',
      ],
      quote: 'Counting fixtures and scaling conduit runs used to take days. With BidPilot AI, it takes minutes and nothing gets missed.',
      quoteAuthor: 'Electrical Contracting Estimator',
      overview: 'BidPilot AI electrical takeoff software allows commercial electrical estimators to auto-count receptacles, panels, lights, and switches across dozens of drawing sheets. Measure linear conduit and branch circuitry runs with automated branch wire pulling lengths.',
      keyPoints: [
        {
          title: 'Rapid Symbol & Lighting Counter',
          desc: 'Point and click on fixtures, panels, and equipment to generate accurate counts across all electrical sheets.',
        },
        {
          title: 'Conduit & Wire Pulling Assemblies',
          desc: 'Measure linear conduit runs and let BidPilot AI calculate conduit lengths, wire counts, fittings, and trenching requirements.',
        },
        {
          title: 'CSI Division 26 Compliance',
          desc: 'Ensure all switchgear, feeders, and distribution panels are itemized according to project specifications.',
        },
      ],
    },
    'flooring': {
      title: 'Flooring Estimating Software',
      subtitle: 'Calculate Tile, Carpet, LVT, and Underlayment with Precision!',
      image: flooringImg,
      bullets: [
        'Square Yard & Tile Count Formulas',
        'Automatic Pattern Repeat & Waste Factors',
        'Room-by-Room Finish Schedules',
      ],
      quote: 'BidPilot AI flooring takeoff gives our team the exact square footage and seam calculations we need to quote competitively and win.',
      quoteAuthor: 'Commercial Flooring Contractor',
      overview: 'BidPilot AI flooring estimating software makes measuring square yardage for carpet, LVT, ceramic tile, and hardwood simple. Account for pattern repeats, perimeter base transitions, and custom waste percentages.',
      keyPoints: [
        {
          title: 'Point & Click Area Measurement',
          desc: 'Measure complex rooms and corridors with rapid polygon snapping and automatic doorway deductions.',
        },
        {
          title: 'Seam & Waste Optimization',
          desc: 'Calculate roll cuts, pattern repeat waste, and adhesive bucket requirements automatically.',
        },
        {
          title: 'Finish Schedules',
          desc: 'Generate itemized room-by-room material and labor schedules ready for installation crews.',
        },
      ],
    },
    'framing': {
      title: 'Framing Estimating Software',
      subtitle: 'Calculate Studs, Headers, Joists, and Sheathing in Minutes!',
      image: framingImg,
      bullets: [
        'Linear Plate & Stud Calculations',
        'Automated Center Spacing Formulas',
        'Live Lumber Package Pricing',
      ],
      quote: 'We estimate multi-family framing packages in half the time. The lumber formulas are spot on.',
      quoteAuthor: 'Framing & Timber Contractor',
      overview: 'BidPilot AI framing software allows structural and wood framers to calculate linear feet of plates, stud counts by spacing (16" or 24" O.C.), joists, rafters, subfloor sheathing, and hardware brackets in seconds.',
      keyPoints: [
        {
          title: 'Wall Framing Formulas',
          desc: 'Measure linear wall lengths and let BidPilot AI compute top/bottom plates, corner studs, and king/jack studs.',
        },
        {
          title: 'Roof & Floor Sheathing Takeoff',
          desc: 'Measure floor and roof areas to calculate 4x8 plywood sheet counts and fastener requirements.',
        },
        {
          title: 'Lumber Cut Lists',
          desc: 'Generate complete lumber takeoffs sorted by dimension and board length ready for supply yard bidding.',
        },
      ],
    },
    'decking': {
      title: 'Decking Contractors Estimating Software',
      subtitle: 'Fast, Accurate Takeoffs for Composite & Wood Decking Projects!',
      image: framingImg,
      bullets: [
        'Square Footage & Board Count Takeoff',
        'Automated Joist & Post Calculations',
        'Hardware & Fastener Formulas',
      ],
      quote: 'BidPilot AI is the fastest way to estimate deck builds, railings, and substructures.',
      quoteAuthor: 'Decking & Outdoor Living Contractor',
      overview: 'BidPilot AI decking software enables outdoor living and decking contractors to measure square footage, joist spans, post footings, stairs, and railing linear feet with automated fastener and bracket formulas.',
      keyPoints: [
        {
          title: 'Plank & Board Count Takeoffs',
          desc: 'Calculate exact board counts, perimeter picture-framing borders, and custom waste allowances.',
        },
        {
          title: 'Substructure & Post Calculator',
          desc: 'Determine footing concrete, support posts, joist hangers, and beam dimensions instantly.',
        },
        {
          title: 'Railing & Stair Estimating',
          desc: 'Calculate balusters, handrails, posts, and stair stringers with point-and-click ease.',
        },
      ],
    },
    'hvac': {
      title: 'HVAC Estimating Software',
      subtitle: 'Measure Ductwork Runs, Poundage, and Equipment in Seconds!',
      image: hvacImg,
      bullets: [
        'Linear Duct & Fitting Calculations',
        'Sheet Metal Poundage Formulas',
        'Equipment & Diffuser Counts',
      ],
      quote: 'BidPilot AI cut our mechanical takeoff time by 60%. The SMACNA sheet metal poundage formulas are incredible.',
      quoteAuthor: 'Mechanical / HVAC Subcontractor',
      overview: 'BidPilot AI HVAC takeoff software allows mechanical estimators to measure linear duct runs and calculate poundage of galvanized sheet metal automatically. Count diffusers, VAV boxes, dampers, and chillers with one-click symbol detection.',
      keyPoints: [
        {
          title: 'Ductwork Poundage & Gauge Calculator',
          desc: 'Calculate square footage and poundage of rectangular and spiral ductwork based on SMACNA standards.',
        },
        {
          title: 'Insulation & Liner Takeoff',
          desc: 'Measure duct wrap square footage and acoustic liner allowances simultaneously as you measure duct lines.',
        },
        {
          title: 'Equipment & Diffuser Count',
          desc: 'Point-and-click to count grilles, registers, dampers, and air handling units across all mechanical sheets.',
        },
      ],
    },
    'insulation': {
      title: 'Insulation Estimating Software',
      subtitle: 'Calculate Batt, Blow-In, and Spray Foam Insulation with Ease!',
      image: drywallImg,
      bullets: [
        'Wall & Attic Square Footage Takeoff',
        'Spray Foam Board-Foot Formulas',
        'R-Value Material Assemblies',
      ],
      quote: 'BidPilot AI gives us the exact square footage and board-foot spray foam volumes we need to bid accurately.',
      quoteAuthor: 'Commercial Insulation Contractor',
      overview: 'BidPilot AI insulation software allows contractors to calculate square footage for fiberglass batts, blown-in cellulose, and spray foam board footage for walls, attics, and crawlspaces.',
      keyPoints: [
        {
          title: 'Wall & Ceiling Area Measurements',
          desc: 'Measure net wall and ceiling areas with automatic deductions for windows and doors.',
        },
        {
          title: 'Spray Foam Volume Formulas',
          desc: 'Convert surface square footage and depth into board feet and chemical drum requirements.',
        },
        {
          title: 'Material Order Lists',
          desc: 'Export detailed roll counts, bag quantities, and fastener requirements to Excel.',
        },
      ],
    },
    'landscape': {
      title: 'Landscape Estimating Software',
      subtitle: 'Estimate Sod, Irrigation, Grading, and Hardscapes in Minutes!',
      image: gcImg,
      bullets: [
        'Area & Volume Excavation Takeoffs',
        'Point-and-Click Plant & Head Counts',
        'Irrigation Mainline Calculations',
      ],
      quote: 'BidPilot AI makes measuring turf areas, mulch beds, and irrigation zones fast and foolproof.',
      quoteAuthor: 'Landscape & Hardscape Contractor',
      overview: 'BidPilot AI landscape software allows landscape contractors to measure square footage for sod, hydroseeding, mulch, and soil preparation. Calculate cubic yards for topsoil grading and gravel excavation.',
      keyPoints: [
        {
          title: 'Turf & Mulch Bed Areas',
          desc: 'Measure irregular curved garden beds and lawn areas with precision polygon tools.',
        },
        {
          title: 'Plant, Shrub & Tree Counts',
          desc: 'Count plant symbols and irrigation heads across landscape architectural sheets.',
        },
        {
          title: 'Irrigation Pipe Lengths',
          desc: 'Measure mainline and lateral pipe runs by diameter with automated trenching calculations.',
        },
      ],
    },
    'masonry': {
      title: 'Masonry Estimating Software',
      subtitle: 'Calculate Brick, Block, Mortar, and Grout with Unmatched Accuracy!',
      image: concreteImg,
      bullets: [
        'CMU Block & Brick Count Formulas',
        'Mortar & Grout Cubic Yardage',
        'Rebar & Bond Beam Calculations',
      ],
      quote: 'BidPilot AI masonry assemblies calculate our exact block, mortar, and lintel requirements in a single click.',
      quoteAuthor: 'Commercial Masonry Contractor',
      overview: 'BidPilot AI masonry takeoff software allows masonry estimators to calculate square footage of brick and CMU walls, deducting window and door openings automatically. Instantly compute block counts, brick quantities, mortar bags, and grout volume.',
      keyPoints: [
        {
          title: 'CMU & Brick Wall Measurements',
          desc: 'Measure linear wall lengths and wall heights with automated opening deductions.',
        },
        {
          title: 'Mortar & Grout Volumes',
          desc: 'Compute cubic yards of grout and bags of mortar based on block sizes (4", 6", 8", 12").',
        },
        {
          title: 'Rebar & Lintels',
          desc: 'Calculate bond beam rebar, vertical steel, and structural precast lintels.',
        },
      ],
    },
    'painting': {
      title: 'Painting Estimating Software',
      subtitle: 'Calculate Net Wall Areas, Gallons, and Trim Linear Footage in Seconds!',
      image: paintingImg,
      bullets: [
        'Automatic Window & Door Deductions',
        'Gallonage Formulas by Spread Rate',
        'Linear Trim & Baseboard Takeoff',
      ],
      quote: 'BidPilot AI has doubled the speed of our commercial painting takeoffs. The deduction tools are amazing.',
      quoteAuthor: 'Commercial Painting Contractor',
      overview: 'BidPilot AI painting estimating software allows painting contractors to calculate net wall and ceiling square footage with automatic window and door deductions. Estimate primer and finish coat gallonage based on custom paint spread rates.',
      keyPoints: [
        {
          title: 'Net Surface Area Takeoff',
          desc: 'Measure room areas and automatically deduct doors, windows, and unpainted openings.',
        },
        {
          title: 'Paint Gallonage Calculator',
          desc: 'Calculate primer and paint gallons based on square foot spread rates (e.g. 350-400 sq ft/gal).',
        },
        {
          title: 'Trim & Detail Takeoffs',
          desc: 'Measure linear feet of baseboards, crown molding, chair rails, and door frame counts.',
        },
      ],
    },
    'plumbing': {
      title: 'Plumbing Estimating Software',
      subtitle: 'Measure Pipe Runs, Auto-Count Fixtures, and Price Bids in Minutes!',
      image: plumbingImg,
      bullets: [
        'Linear Pipe Takeoff by Size & Material',
        'Point-and-Click Fixture Counts',
        'Trenching & Insulation Formulas',
      ],
      quote: 'BidPilot AI makes pipe runs and fixture counts effortless. It has completely transformed our bidding accuracy.',
      quoteAuthor: 'Commercial Plumbing Estimator',
      overview: 'BidPilot AI plumbing takeoff software enables plumbing estimators to measure water supply, waste, and vent pipe linear footage by pipe diameter and material. Auto-count fixtures (sinks, water closets, urinals, floor drains) across all plan sheets.',
      keyPoints: [
        {
          title: 'Linear Pipe Runs & Diameters',
          desc: 'Measure copper, PEX, PVC, and cast iron pipe lengths with automated fitting calculations.',
        },
        {
          title: 'Fixture & Valve Counts',
          desc: 'Point-and-click to count sinks, toilets, cleanouts, water heaters, and backflow preventers.',
        },
        {
          title: 'Excavation & Bedding Calculations',
          desc: 'Compute trenching cubic yards, bed gravel, and pipe insulation requirements in minutes.',
        },
      ],
    },
    'estimating': {
      title: 'Construction Estimating Software',
      subtitle: 'The #1 Takeoff and Estimating Platform for Commercial Construction!',
      image: gcImg,
      bullets: [
        'Universal Point-and-Click Takeoff',
        'Drag-and-Drop Assemblies & Formulas',
        '1-Click Excel & Accounting Integration',
      ],
      quote: 'BidPilot AI is the gold standard for construction estimating. It pays for itself on your very first job.',
      quoteAuthor: 'General Contracting Estimating Lead',
      overview: 'BidPilot AI is the complete construction estimating and takeoff software solution. Whether you are a general contractor or specialty subcontractor, BidPilot AI empowers you to calculate quantities in minutes, eliminate costly estimating errors, and win more profitable bids.',
      keyPoints: [
        {
          title: 'Fast, Accurate Digital Takeoffs',
          desc: 'Import PDF, CAD, TIFF, and DWG drawings and measure linear, area, volume, and counts instantly.',
        },
        {
          title: 'Customizable Trade Assemblies',
          desc: 'Build assemblies tailored to your specific materials, waste factors, equipment, and crew labor rates.',
        },
        {
          title: 'Seamless Business Integration',
          desc: 'Export itemized bills of quantities directly to Microsoft Excel, QuickBooks, or your project management systems.',
        },
      ],
    },
  };

  const currentTrade = tradeConfigs[tradeId] || tradeConfigs['drywall'];

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* 1. Hero Section with Vivid Real Trade Photo Showcase */}
      <section className="relative overflow-hidden bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 text-white py-16 px-4 sm:px-6 lg:px-8 shadow-inner">
        
        {/* Trade Hero Background Photo */}
        <div className="absolute inset-0 z-0">
          <img
            src={currentTrade.image}
            alt={currentTrade.title}
            className="w-full h-full object-cover object-center opacity-30 filter saturate-150 brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/85" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Heading, Bullets, and Red Button */}
          <div className="lg:col-span-7 space-y-6">
            
            <div>
              <h1 className="text-3xl sm:text-5xl font-bold text-white font-['Outfit'] tracking-tight leading-tight drop-shadow-md">
                {currentTrade.title}
              </h1>
              <p className="mt-2 text-base sm:text-xl font-light text-gray-200 drop-shadow-sm">
                {currentTrade.subtitle}
              </p>
            </div>

            {/* Improve Your Estimates Box */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-300">
                Improve Your Estimates:
              </h3>

              <div className="space-y-2.5">
                {currentTrade.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm sm:text-base font-semibold text-white">
                    <div className="w-5 h-5 rounded bg-white text-gray-900 flex items-center justify-center shrink-0 shadow">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Red Button */}
            <div className="pt-4">
              <button
                onClick={() => onOpenTrial('pro')}
                className="px-8 py-3.5 rounded-sm bg-[#e61111] hover:bg-[#cc0000] text-white font-extrabold text-sm sm:text-base uppercase tracking-wider shadow-xl inline-flex items-center gap-2 transition-all"
              >
                <Download className="w-5 h-5 stroke-[3]" />
                <span>START YOUR FREE TRIAL</span>
              </button>
              <div className="text-[11px] font-bold tracking-wider text-red-400 mt-1 uppercase pl-1">
                NO CREDIT CARD REQUIRED
              </div>
            </div>

          </div>

          {/* Right Column: Pure, Clean Trade Photo Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-white/30 shadow-2xl group bg-gray-950">
              {/* High-Resolution Vivid Trade Photo */}
              <img
                src={currentTrade.image}
                alt={`${currentTrade.title} Showcase`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-110 brightness-100"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 2. Customer Testimonial Quote */}
      <section className="bg-gray-100 border-b border-gray-200 py-6 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-4 text-center">
          <span className="text-3xl text-gray-400 font-serif">“</span>
          <p className="text-xs sm:text-sm text-gray-700 italic font-medium leading-relaxed">
            {currentTrade.quote}
          </p>
          <span className="text-3xl text-gray-400 font-serif">”</span>
        </div>
      </section>

      {/* 3. Trade Deep-Dive Content & Assemblies */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Content (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#011825] font-['Outfit']">
                Why Contractors Choose BidPilot AI for {currentTrade.title}
              </h2>
              <p className="mt-4 text-sm text-gray-700 leading-relaxed">
                {currentTrade.overview}
              </p>
            </div>

            {/* Key Capabilities */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#011825] font-['Outfit']">
                Key Features & Estimating Capabilities:
              </h3>

              <div className="space-y-4">
                {currentTrade.keyPoints.map((kp, idx) => (
                  <div key={idx} className="p-5 rounded-xl border border-gray-200 bg-white hover:border-[#0073b6] hover:shadow-sm transition-all space-y-1">
                    <h4 className="text-sm font-bold text-[#0073b6] flex items-center gap-2">
                      <ChevronRight className="w-4 h-4" />
                      <span>{kp.title}</span>
                    </h4>
                    <p className="text-xs text-gray-600 pl-6 leading-relaxed">
                      {kp.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing CTA Box */}
            <div className="p-6 rounded-xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-base font-bold text-[#011825]">
                  Ready to start saving hours on your {currentTrade.title.toLowerCase()} takeoffs?
                </h4>
                <p className="text-xs text-gray-600 mt-0.5">
                  Get full access free for 14 days or purchase an annual commercial license with 2 hours of coaching.
                </p>
              </div>

              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => onOpenTrial('pro')}
                  className="px-5 py-2.5 rounded ps-btn-red text-xs font-extrabold uppercase shadow"
                >
                  START FREE TRIAL
                </button>
                <button
                  onClick={onNavigatePricing}
                  className="px-4 py-2.5 rounded bg-[#0073b6] text-white text-xs font-bold uppercase shadow"
                >
                  VIEW PRICING
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Quick Download Form Box (4 Cols) */}
          <div className="lg:col-span-4">
            <div className="ps-trial-wrapper shadow-xl sticky top-28">
              <div className="ps-trial-header">
                <h3 className="text-base font-bold text-white uppercase tracking-wide font-['Outfit']">
                  DOWNLOAD YOUR FREE 14-DAY TRIAL
                </h3>
                <p className="text-xs text-blue-100 mt-0.5">
                  Instant Access • No Credit Card Required
                </p>
              </div>

              <div className="ps-trial-body text-gray-900">
                {!submitted ? (
                  <form onSubmit={handleFormSubmit} className="space-y-3 text-xs text-black">
                    <div>
                      <label className="block font-bold text-gray-900 mb-1">
                        First & Last Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={trialForm.name}
                        onChange={(e) => setTrialForm({ ...trialForm, name: e.target.value })}
                        placeholder="John Contractor"
                        className="w-full bg-white border border-gray-400 rounded p-2 text-gray-900 focus:outline-none focus:border-blue-700"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-900 mb-1">
                        Work Email Address <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={trialForm.email}
                        onChange={(e) => setTrialForm({ ...trialForm, email: e.target.value })}
                        placeholder="john@contracting.com"
                        className="w-full bg-white border border-gray-400 rounded p-2 text-gray-900 focus:outline-none focus:border-blue-700"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-900 mb-1">
                        Phone Number <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={trialForm.phone}
                        onChange={(e) => setTrialForm({ ...trialForm, phone: e.target.value })}
                        placeholder="(555) 000-0000"
                        className="w-full bg-white border border-gray-400 rounded p-2 text-gray-900 focus:outline-none focus:border-blue-700"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-900 mb-1">
                        Company Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={trialForm.company}
                        onChange={(e) => setTrialForm({ ...trialForm, company: e.target.value })}
                        placeholder="Apex Construction LLC"
                        className="w-full bg-white border border-gray-400 rounded p-2 text-gray-900 focus:outline-none focus:border-blue-700"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-3 px-4 ps-btn-red text-center text-xs font-extrabold uppercase shadow-md"
                      >
                        START MY FREE TRIAL NOW
                      </button>
                    </div>

                    <div className="text-[11px] text-gray-800 text-center font-medium pt-1">
                      🔒 Instant Download • 100% Free
                    </div>
                  </form>
                ) : (
                  <div className="text-center py-6 space-y-3 text-gray-900">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold">Trial Download Ready!</h4>
                    <p className="text-xs">
                      Welcome, <strong>{trialForm.name || 'Contractor'}</strong>. Your BidPilot AI {currentTrade.title} edition is ready for instant use.
                    </p>
                    <button
                      onClick={onNavigateHome}
                      className="px-4 py-2 ps-btn-red text-xs font-bold rounded"
                    >
                      Return to Home
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
