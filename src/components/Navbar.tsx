import React, { useState } from 'react';
import { Phone, Mail, ExternalLink, ChevronDown, Menu, X } from 'lucide-react';
import logoImg from '../assets/bidpilot_logo.jpg';

interface NavbarProps {
  onOpenTrial: (planId?: string) => void;
  onOpenArch: () => void;
  onNavigatePricing: () => void;
  onNavigateHome: () => void;
  onNavigateTrade: (tradeId: string) => void;
  onNavigateAccount: () => void;
  currentPage: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenTrial,
  onOpenArch,
  onNavigatePricing,
  onNavigateHome,
  onNavigateTrade,
  onNavigateAccount,
  currentPage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tradesOpen, setTradesOpen] = useState(false);

  // Exact 14 Trades from Screenshot 1
  const tradeList = [
    { label: 'General Contractors', id: 'general-contractor' },
    { label: 'Concrete', id: 'concrete' },
    { label: 'Drywall', id: 'drywall' },
    { label: 'Electrical', id: 'electrical' },
    { label: 'Flooring', id: 'flooring' },
    { label: 'Framing', id: 'framing' },
    { label: 'Decking Contractors', id: 'decking' },
    { label: 'HVAC', id: 'hvac' },
    { label: 'Insulation', id: 'insulation' },
    { label: 'Landscape', id: 'landscape' },
    { label: 'Masonry', id: 'masonry' },
    { label: 'Painting', id: 'painting' },
    { label: 'Plumbing', id: 'plumbing' },
    { label: 'Estimating Software', id: 'estimating' },
  ];

  const handleTradeItemClick = (tradeId: string) => {
    setTradesOpen(false);
    setMobileMenuOpen(false);
    onNavigateTrade(tradeId);
  };

  const handleHowItWorksClick = () => {
    onNavigateHome();
    setTimeout(() => {
      const el = document.getElementById('how-it-works');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleAccountClick = () => {
    setMobileMenuOpen(false);
    onNavigateAccount();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-sm bg-white font-['Plus_Jakarta_Sans',sans-serif]">
      {/* 1. Top Blue Bar (#0073b6 / #0c72b8) matching exact screenshot */}
      <div className="bg-[#0073b6] text-white text-[12px] font-semibold py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-end gap-6">
          <a href="tel:+923223715064" className="flex items-center gap-1.5 hover:text-blue-100 transition-colors">
            <Phone className="w-3.5 h-3.5 fill-current" />
            <span>+92 3223715064</span>
          </a>
          <a href="mailto:sales@bidpilot.ai" className="flex items-center gap-1.5 hover:text-blue-100 transition-colors">
            <Mail className="w-3.5 h-3.5" />
            <span>Email Sales</span>
          </a>
          
          {/* My Account Button in Top Bar - Navigates directly to #account */}
          <button 
            onClick={handleAccountClick}
            className="flex items-center gap-1 hover:text-blue-100 transition-colors cursor-pointer"
          >
            <span>My Account</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 2. Main White Navbar matching exact screenshot */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          
          {/* Logo - Navigates back to Home Page */}
          <button onClick={onNavigateHome} className="flex items-center gap-2.5 text-left group cursor-pointer">
            <img
              src={logoImg}
              alt="BidPilot Logo"
              className="h-10 w-10 object-contain rounded-md group-hover:scale-105 transition-transform"
            />
            <div>
              <div className="flex items-center leading-none">
                <span className="font-extrabold text-2xl tracking-tight text-[#0073b6] font-['Outfit']">
                  Bid<span className="text-[#01213c]">Pilot</span>
                </span>
                <span className="text-xs font-bold text-[#e61111] font-mono ml-1">AI</span>
                <span className="text-xs font-bold text-gray-500 align-super ml-0.5">®</span>
              </div>
              <span className="text-[10px] text-gray-500 font-medium tracking-tight block">
                by ConstructConnect
              </span>
            </div>
          </button>

          {/* Nav Links: Pricing, Trades v, How It Works, My Account, FREE TRIAL */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-gray-700">
            
            {/* PRICING LINK */}
            <button
              onClick={onNavigatePricing}
              className={`transition-colors font-bold cursor-pointer ${
                currentPage === 'pricing' ? 'text-[#0073b6] border-b-2 border-[#0073b6] pb-0.5' : 'hover:text-[#0073b6]'
              }`}
            >
              Pricing
            </button>

            {/* Trades Dropdown with all 14 Trades */}
            <div 
              className="relative py-2"
              onMouseEnter={() => setTradesOpen(true)}
              onMouseLeave={() => setTradesOpen(false)}
            >
              <button 
                className={`flex items-center gap-1 transition-colors cursor-pointer ${
                  currentPage.startsWith('trade-') ? 'text-[#0073b6] font-bold' : 'hover:text-[#0073b6]'
                }`}
              >
                <span>Trades</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {tradesOpen && (
                <div className="absolute top-full left-0 w-60 bg-white rounded-lg shadow-2xl border border-gray-200 py-2 z-50 text-xs font-semibold text-gray-800">
                  {tradeList.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => handleTradeItemClick(t.id)}
                      className="w-full text-left px-5 py-2 hover:bg-blue-50 hover:text-[#0073b6] transition-colors cursor-pointer"
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleHowItWorksClick}
              className="hover:text-[#0073b6] transition-colors cursor-pointer"
            >
              How It Works
            </button>

            {/* MY ACCOUNT LINK - Navigates directly to #account */}
            <button 
              onClick={handleAccountClick} 
              className={`transition-colors cursor-pointer font-bold ${
                currentPage === 'account' ? 'text-[#0073b6] border-b-2 border-[#0073b6] pb-0.5' : 'hover:text-[#0073b6]'
              }`}
            >
              My Account
            </button>

            {/* Exact Blue FREE TRIAL Button */}
            <button
              onClick={() => onOpenTrial('pro')}
              className="px-5 py-2 rounded-md bg-[#0073b6] hover:bg-[#005f96] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
            >
              FREE TRIAL
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pb-4 pt-2 border-t border-gray-200 bg-white space-y-2 text-sm font-semibold max-h-[80vh] overflow-y-auto">
            <button 
              onClick={() => { setMobileMenuOpen(false); onNavigatePricing(); }} 
              className="block w-full text-left py-2 text-[#0073b6] font-bold"
            >
              Pricing Page
            </button>
            
            <div className="py-2 border-t border-b border-gray-100">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Trades & Estimating Software</span>
              <div className="grid grid-cols-2 gap-1 text-xs">
                {tradeList.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleTradeItemClick(t.id)}
                    className="text-left py-1.5 px-2 rounded hover:bg-blue-50 text-gray-700 font-medium"
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => { setMobileMenuOpen(false); handleHowItWorksClick(); }} 
              className="block w-full text-left py-2 text-gray-800"
            >
              How It Works
            </button>
            <button 
              onClick={handleAccountClick} 
              className="w-full text-left py-2 text-[#0073b6] font-bold"
            >
              My Account
            </button>
            <div className="pt-2">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenTrial('pro'); }}
                className="w-full py-2.5 rounded-md bg-[#0073b6] text-white font-bold text-xs uppercase tracking-wider"
              >
                FREE TRIAL
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
