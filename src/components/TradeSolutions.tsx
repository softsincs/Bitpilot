import React from 'react';
import { Download, ChevronRight, Check } from 'lucide-react';

interface TradeSolutionsProps {
  selectedTrade: string;
  onSelectTrade: (trade: string) => void;
  onOpenTrial: () => void;
}

export const TradeSolutions: React.FC<TradeSolutionsProps> = ({
  selectedTrade,
  onSelectTrade,
  onOpenTrial,
}) => {
  const tradeList = [
    'General Contractor',
    'Concrete',
    'Drywall',
    'Electrical',
    'Flooring',
    'Framing',
    'Decking Contractors',
    'HVAC',
    'Insulation',
    'Landscape',
    'Masonry',
    'Painting',
    'Plumbing',
    'Estimating Software',
  ];

  const tradeData: Record<string, {
    title: string;
    points: string[];
    features: string[];
    diagramLabel: string;
    colorCode: string;
  }> = {
    'General Contractor': {
      title: 'General Contractor',
      points: [
        'Takeoff in a fraction of the time with BidPilot AI software click, drop, and estimate functionality.',
        'Single click takeoff for linear measurements, square footage, volumes, and material counts.',
        'Bid more jobs, manage more efficiently and grow your business with BidPilot AI takeoff and estimating software.',
      ],
      features: [
        'CSI 50-Division Assemblies',
        'Automatic Scale & Unit Calibration',
        '1-Click Export to Excel & Accounting',
        'Subcontractor Scope Gap Detection',
      ],
      diagramLabel: 'Multi-Division Commercial Slab & Core Area',
      colorCode: '#0073b6',
    },
    'Concrete': {
      title: 'Concrete',
      points: [
        'Instantly calculate square footage of slabs, footings, foundation walls, and piers in cubic yards.',
        'Pre-built concrete assemblies automatically compute rebar lengths, wire mesh rolls, and formwork square footage.',
        'Eliminate over-ordering concrete ready-mix trucks and costly waste with precision volume deductions.',
      ],
      features: [
        '3D Footing & Slab Volume Calculators',
        'Rebar & Wire Mesh Roll Estimation',
        'Formwork Material & Lumber Takeoff',
        'Ready-Mix Truckload Scheduling',
      ],
      diagramLabel: 'Ready-Mix Footing & Rebar Schedule Takeoff',
      colorCode: '#e67e22',
    },
    'Drywall': {
      title: 'Drywall',
      points: [
        'Measure walls and ceilings with point-and-click ease and automatically deduct window & door openings.',
        'Assemblies instantly calculate stud centers (16" or 24" O.C.), tracks, insulation batts, and drywall sheet counts.',
        'Export exact drywall sheet quantities (4x8, 4x10, 4x12) and joint compound buckets directly to Excel.',
      ],
      features: [
        'Square Footage of Walls & Partitions',
        'Stud & Track Linear Foot Count',
        'Drywall Board (4x8, 4x10, 4x12) Calculation',
        'Joint Compound, Screws & Tape Estimator',
      ],
      diagramLabel: 'Interior Partition & Drywall Board Layout',
      colorCode: '#9b59b6',
    },
    'Electrical': {
      title: 'Electrical',
      points: [
        'Point-and-click symbol counter auto-tallies receptacles, lighting fixtures, panels, and disconnect switches.',
        'Measure linear conduit and branch circuitry runs with automated branch wire pulling lengths.',
        'Generate complete material takeoff reports for wire, fittings, boxes, and breaker panels in seconds.',
      ],
      features: [
        'Automated Lighting & Receptacle Count',
        'Conduit Length & Wire Pull Calculator',
        'Switchgear & Panel Schedule Estimating',
        'CSI Division 26 Compliance Reports',
      ],
      diagramLabel: 'Electrical Circuitry & Panel Run Map',
      colorCode: '#f1c40f',
    },
    'Flooring': {
      title: 'Flooring',
      points: [
        'Measure square yardage for carpet, hardwood, LVT, and ceramic tile in complex commercial spaces.',
        'Built-in formulas automatically calculate roll waste, pattern repeats, seam layout, and transition baseboards.',
        'Generate room-by-room material schedules and adhesive quantities ready for supply ordering.',
      ],
      features: [
        'Square Yard & Square Foot Converters',
        'Pattern Repeat & Roll Seam Optimizer',
        'Baseboard & Transition Linear Feet',
        'Adhesive & Underlayment Bucket Count',
      ],
      diagramLabel: 'Tile & Carpet Pattern Square Yard Layout',
      colorCode: '#1abc9c',
    },
    'Framing': {
      title: 'Framing',
      points: [
        'Calculate linear feet of top/bottom plates, stud counts by center spacing, and header lumber requirements.',
        'Measure roof pitch, rafters, ceiling joists, and subfloor sheathing panels with point-and-click tools.',
        'Export complete lumber packages sorted by dimension and board length ready for supply yard bidding.',
      ],
      features: [
        'Wall Stud & Plate Linear Calculator',
        'Rafter, Truss & Joist Takeoff',
        'Subfloor & Roof Sheathing Counts',
        'Fastener & Hardware Bracket Packages',
      ],
      diagramLabel: 'Timber Framing Stud & Plate Layout',
      colorCode: '#d35400',
    },
    'Decking Contractors': {
      title: 'Decking Contractors',
      points: [
        'Measure square footage for composite planks, wood deck boards, joists, and concrete post footings.',
        'Assemblies compute fastener clips, hidden screws, joist tape, and railing balusters automatically.',
        'Generate cut lists and supplier pricing sheets in minutes to quote outdoor living projects accurately.',
      ],
      features: [
        'Deck Board & Plank Count Takeoff',
        'Post Footing & Joist Frame Calculators',
        'Railing, Post & Baluster Linear Feet',
        'Hidden Fastener & Hardware Estimator',
      ],
      diagramLabel: 'Decking Substructure & Plank Layout',
      colorCode: '#27ae60',
    },
    'HVAC': {
      title: 'HVAC',
      points: [
        'Measure linear duct runs and let BidPilot AI calculate sheet metal poundage and gauge requirements.',
        'Count grilles, registers, diffusers, dampers, and air handling equipment across all mechanical sheets.',
        'Generate itemized mechanical bid proposals with material and labor rate breakdowns.',
      ],
      features: [
        'Ductwork Square Footage & Poundage',
        'Diffuser, Grille & Damper Counter',
        'Acoustic Duct Liner & Insulation Takeoff',
        'SMACNA Sheet Metal Standards Support',
      ],
      diagramLabel: 'Mechanical Ductwork & Diffuser Run',
      colorCode: '#2980b9',
    },
    'Insulation': {
      title: 'Insulation',
      points: [
        'Calculate square footage of fiberglass batts, blown-in attic cellulose, and spray foam board footage.',
        'Built-in formulas account for wall cavity depth and R-value material thickness requirements.',
        'Export exact bag counts, roll quantities, and vapor barrier square footage directly to Excel.',
      ],
      features: [
        'Wall & Attic Cavity Square Footage',
        'Spray Foam Board-Foot Formulas',
        'Vapor Barrier & Fastener Counts',
        'R-Value Material Specification Lists',
      ],
      diagramLabel: 'Cavity Insulation & Attic R-Value Map',
      colorCode: '#8e44ad',
    },
    'Landscape': {
      title: 'Landscape',
      points: [
        'Measure turf square footage, mulch bed areas, hydroseeding, and paver hardscapes with polygon tools.',
        'Calculate cubic yards for topsoil grading, gravel fill, and excavation backfill automatically.',
        'Count tree, shrub, and irrigation head symbols across landscape architectural plan sheets.',
      ],
      features: [
        'Sod & Mulch Bed Area Calculations',
        'Grading & Topsoil Volume Estimator',
        'Irrigation Pipe Linear Footage',
        'Plant & Shrub Symbol Count Takeoff',
      ],
      diagramLabel: 'Landscape Hardscape & Turf Area Map',
      colorCode: '#2ecc71',
    },
    'Masonry': {
      title: 'Masonry',
      points: [
        'Measure linear wall lengths and heights to calculate exact CMU block counts (4", 6", 8", 12") and brick units.',
        'Automatically deduct window and door openings while calculating mortar bags and core grout cubic yards.',
        'Compute bond beam rebar, lintels, and wall reinforcement ties with pre-built masonry assemblies.',
      ],
      features: [
        'CMU Block & Brick Unit Count',
        'Mortar Bag & Grout Volume Estimator',
        'Bond Beam & Lintel Reinforcement',
        'Automated Window/Door Deductions',
      ],
      diagramLabel: 'CMU Block Wall & Lintel Reinforcement',
      colorCode: '#c0392b',
    },
    'Painting': {
      title: 'Painting',
      points: [
        'Calculate net wall and ceiling square footage with automatic deductions for windows, doors, and unpainted trim.',
        'Estimate paint and primer gallonage based on custom square-foot spread rates (e.g. 350-400 sq ft/gal).',
        'Measure linear feet of baseboards, crown moldings, and door frames with point-and-click ease.',
      ],
      features: [
        'Net Surface Area Takeoff with Deductions',
        'Primer & Finish Paint Gallon Calculator',
        'Baseboard & Crown Molding Linear Feet',
        'Multi-Coat Labor & Material Assemblies',
      ],
      diagramLabel: 'Interior Wall & Trim Net Surface Area',
      colorCode: '#e84393',
    },
    'Plumbing': {
      title: 'Plumbing',
      points: [
        'Measure linear pipe runs by diameter and pipe material (copper, PEX, PVC, cast iron) in seconds.',
        'Count fixtures (sinks, water closets, urinals, floor drains, cleanouts) across all plumbing plan sheets.',
        'Compute trenching cubic yards, bedding gravel, and pipe insulation requirements with integrated formulas.',
      ],
      features: [
        'Linear Pipe Takeoff by Size & Material',
        'Point-and-Click Fixture & Valve Counter',
        'Underground Trenching & Bedding Volumes',
        'Pipe Hanger & Fitting Assemblies',
      ],
      diagramLabel: 'Plumbing Supply & Sanitary Drainage Run',
      colorCode: '#0984e3',
    },
    'Estimating Software': {
      title: 'Estimating Software',
      points: [
        'Universal point-and-click takeoff suite built for commercial general contractors and subcontractors.',
        'Drag-and-drop assemblies calculate materials, waste, equipment, and labor rates in a single click.',
        'Integrate seamlessly with BidPilot AI to win more profitable jobs.',
      ],
      features: [
        'Universal 2D/3D Blueprint Takeoff Engine',
        'Drag-and-Drop CSI MasterFormat Assemblies',
        '1-Click Microsoft Excel & Accounting Sync',
        'Cloud Spec RAG & Vision Diff Addenda',
      ],
      diagramLabel: 'Universal Construction Takeoff & BOQ Suite',
      colorCode: '#0073b6',
    },
  };

  const currentTrade = tradeData[selectedTrade] || tradeData['General Contractor'];

  return (
    <section id="trades" className="py-16 bg-white border-t border-gray-200 scroll-mt-20 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching exact PlanSwift screenshot */}
        <div className="max-w-4xl mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#011825] font-['Outfit']">
            BidPilot AI for Trades
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-700 leading-relaxed">
            <strong>BidPilot AI is easily customized for you and your specific trade.</strong> Simply create assemblies of commonly used materials, waste and even labor. Then drag those assemblies onto the takeoff items for instant and accurate estimates of all your costs!
          </p>
        </div>

        {/* Main Trades Card Frame matching exact screenshot */}
        <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-xs">
          
          <div className="grid grid-cols-1 md:grid-cols-12">
            
            {/* Left Sidebar Menu (3 Cols) */}
            <div className="md:col-span-3 bg-gray-50 border-r border-gray-200 py-2">
              {tradeList.map((trade) => {
                const isSelected = selectedTrade === trade;
                return (
                  <button
                    key={trade}
                    onClick={() => onSelectTrade(trade)}
                    className={`w-full text-left px-5 py-2.5 text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#cc0000] text-white shadow-xs'
                        : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                    }`}
                  >
                    <span>{trade}</span>
                    {isSelected && <ChevronRight className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>

            {/* Right Content Area (9 Cols) */}
            <div className="md:col-span-9 p-6 sm:p-8 space-y-6">
              
              <div className="border-b border-gray-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#011825] font-['Outfit']">
                    {currentTrade.title}
                  </h3>
                  <span className="text-xs text-gray-500 font-medium">
                    BidPilot AI Takeoff & Estimating Suite
                  </span>
                </div>

                <a
                  href={`#trade-${selectedTrade.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-xs text-[#0073b6] hover:underline font-bold flex items-center gap-1"
                >
                  <span>Open Dedicated Page</span>
                  <span>»»</span>
                </a>
              </div>

              {/* 3 Value Points matching PlanSwift copy */}
              <div className="space-y-3">
                {currentTrade.points.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 leading-relaxed">
                    <div className="w-4 h-4 rounded-full bg-blue-100 text-[#0073b6] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>

              {/* Graphical Blueprint Visual Container */}
              <div className="mt-6 rounded-lg border border-gray-200 bg-gray-900 p-5 text-white relative overflow-hidden shadow-inner">
                <div className="absolute inset-0 bg-blueprint-grid opacity-25 pointer-events-none" />
                
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                      Live CAD / PDF Blueprint Takeoff
                    </div>
                    <div className="text-sm font-bold font-['Outfit'] text-white">
                      {currentTrade.diagramLabel}
                    </div>
                  </div>

                  <a
                    href={`#trade-${selectedTrade.toLowerCase().replace(/\s+/g, '-')}`}
                    className="px-3.5 py-1.5 rounded bg-white text-gray-900 text-xs font-bold hover:bg-gray-100 transition-colors shrink-0 shadow text-center"
                  >
                    View Assemblies
                  </a>
                </div>

              </div>

              {/* Bottom Centered Button matching exact PlanSwift screenshot */}
              <div className="mt-8 pt-6 border-t border-gray-100 text-center space-y-3">
                <button
                  onClick={onOpenTrial}
                  className="px-8 py-3 rounded-md bg-[#0073b6] hover:bg-[#005f96] text-white font-extrabold text-xs uppercase tracking-wider shadow-md inline-flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>TRY BIDPILOT AI FOR FREE</span>
                </button>

                <div>
                  <a
                    href="#pricing"
                    onClick={onOpenTrial}
                    className="text-xs text-gray-600 hover:underline"
                  >
                    Want more information about BidPilot AI Takeoff Software for <span className="text-[#0073b6] font-bold">{currentTrade.title}</span>?
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
