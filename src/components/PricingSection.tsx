import React, { useState } from 'react';
import { Check, ShieldCheck, Download, ChevronDown, ChevronUp, Sparkles, Phone } from 'lucide-react';

interface PricingSectionProps {
  onOpenTrial: (planId?: string) => void;
  onOpenArch: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onOpenTrial,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [trialForm, setTrialForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleTrialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const faqs = [
    {
      q: 'How does the 14-day free trial work?',
      a: 'You get full unlimited access to BidPilot AI for 14 days with no credit card required. Import your own PDF/CAD drawings and test real-time takeoffs and pgvector spec RAG instantly.',
    },
    {
      q: 'What is included with the BidPilot AI license?',
      a: 'Every license includes the complete digital takeoff suite, CSI MasterFormat assemblies, AI Spec Assistant (RAG), Vision Diff addenda comparison, Excel export, and 1 full year of technical support and updates.',
    },
    {
      q: 'Does BidPilot AI integrate with Microsoft Excel and Procore?',
      a: 'Yes! You can export itemized bills of quantities directly into Microsoft Excel with 1-click, and sync projects with Procore and Autodesk Construction Cloud.',
    },
    {
      q: 'Do you offer multi-user team licensing?',
      a: 'Yes. For teams with 3 or more estimators, we provide centralized cloud collaboration, shared assembly databases, and enterprise licensing discounts.',
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-white border-t border-gray-200 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#011825] font-['Outfit'] tracking-tight">
            BidPilot AI Takeoff & Estimating Software Cost
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
            Purchase BidPilot AI Edition and start saving time and money today! Win more bids, calculate precise digital takeoffs in minutes, and eliminate costly missed scope gaps with pgvector RAG.
          </p>
        </div>

        {/* 2-Column Pricing & Trial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Pricing Card (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Plan Box */}
            <div className="rounded-xl border border-gray-300 bg-[#f9fafb] p-6 sm:p-8 shadow-xs">
              
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-gray-200 pb-5">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0073b6]">
                    Commercial Annual License
                  </span>
                  <h3 className="text-2xl font-bold text-[#011825] font-['Outfit']">
                    BidPilot AI Complete Edition
                  </h3>
                </div>

                <div className="text-right">
                  <div className="text-xs text-gray-500 font-medium">Starting at</div>
                  <div className="text-3xl font-extrabold text-[#011825]">
                    $2,000 <span className="text-xs text-gray-500 font-normal">/ year</span>
                  </div>
                </div>
              </div>

              {/* Inclusions Feature List */}
              <div className="py-5 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Included in Every License:
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-700">
                  <div className="flex items-center gap-2 font-medium">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Point & Click Takeoffs</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Drag & Drop Assemblies</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>CSI Spec Assistant (RAG)</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Vision Diff Addenda Engine</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>1-Click Excel Bid Export</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>1 Year Updates & Support</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onOpenTrial('pro')}
                  className="flex-1 py-3 px-6 rounded-md bg-[#0073b6] hover:bg-[#005f96] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md text-center cursor-pointer"
                >
                  START 14-DAY FREE TRIAL
                </button>
                <a
                  href="tel:+923223715064"
                  className="py-3 px-5 rounded-md border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-bold text-xs uppercase tracking-wider transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Sales (+92 3223715064)</span>
                </a>
              </div>

            </div>

            {/* Inclusions Detail Box */}
            <div className="p-5 rounded-xl border border-blue-100 bg-blue-50/60 space-y-2">
              <h4 className="text-xs font-bold text-[#0073b6] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>What's Included With Every License:</span>
              </h4>
              <p className="text-xs text-gray-700 leading-relaxed">
                Full digital takeoff suite, point-and-click linear & area calculations, custom MasterFormat assemblies, Excel integration, continuous feature updates, and unlimited technical support.
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: Trial Box (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="ps-trial-wrapper shadow-xl">
              
              {/* Header (#2a506f) */}
              <div className="ps-trial-header">
                <h3 className="text-lg font-bold text-white uppercase tracking-wide font-['Outfit']">
                  DOWNLOAD YOUR FREE 14-DAY TRIAL
                </h3>
                <p className="text-xs text-blue-100 mt-1">
                  Experience BidPilot AI Free • No Credit Card Needed
                </p>
              </div>

              {/* Yellow Body (#ffc165) */}
              <div className="ps-trial-body text-gray-900">
                {!submitted ? (
                  <form onSubmit={handleTrialSubmit} className="space-y-3 text-xs text-black">
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

                    {/* Submit Button in Red (#e61111) */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-3 px-4 ps-btn-red text-center text-xs font-extrabold uppercase shadow-md cursor-pointer"
                      >
                        START MY FREE TRIAL NOW
                      </button>
                    </div>

                    <div className="text-[11px] text-gray-800 text-center font-medium pt-1">
                      🔒 Instant Download • 100% Free • No Credit Card
                    </div>
                  </form>
                ) : (
                  <div className="text-center py-8 space-y-3 text-gray-900">
                    <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                      <Check className="w-7 h-7" />
                    </div>
                    <h4 className="text-lg font-bold">Trial Download Ready!</h4>
                    <p className="text-xs">
                      Welcome, <strong>{trialForm.name || 'Contractor'}</strong>. Your BidPilot AI download link and trial license key have been dispatched.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-4 py-2 ps-btn-red text-xs font-bold rounded"
                    >
                      Reset Form
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>

        {/* Orange Alert Banner (#ff8900) */}
        <div className="mt-14 py-5 px-6 rounded-lg bg-[#ff8900] text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="space-y-0.5 text-center md:text-left">
            <h3 className="text-base sm:text-lg font-bold font-['Outfit']">
              Have Questions About BidPilot AI Pricing? Talk to an Estimating Specialist
            </h3>
            <p className="text-xs text-amber-100">
              Our team can provide personalized multi-user quotes, custom assembly setups, and live demos.
            </p>
          </div>

          <a
            href="tel:+923223715064"
            className="px-5 py-2.5 bg-white text-[#ff8900] hover:bg-amber-50 font-extrabold text-xs rounded shadow flex items-center gap-1.5 shrink-0 transition-all"
          >
            <Phone className="w-3.5 h-3.5 fill-current" />
            <span>Call +92 3223715064</span>
          </a>
        </div>

        {/* Frequently Asked Questions */}
        <div className="mt-14 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-[#011825] font-['Outfit']">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Common questions about licensing, updates, and setup.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-xs"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-left flex justify-between items-center text-xs sm:text-sm font-bold text-[#011825] hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-[#0073b6] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                  )}
                </button>

                {openFaq === idx && (
                  <div className="p-4 pt-0 text-xs text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
