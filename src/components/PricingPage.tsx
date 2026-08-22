import React, { useState } from 'react';
import { Download, Check, Phone, ShieldCheck, ChevronDown, ChevronUp, ChevronRight, ShoppingCart } from 'lucide-react';
import atriumBannerImg from '../assets/pricing_atrium.jpg';

interface PricingPageProps {
  onOpenTrial: (planId?: string) => void;
  onOpenArch: () => void;
  onNavigateHome: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onOpenTrial, onOpenArch, onNavigateHome }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const pricePerUnit = 2000;
  const totalPrice = pricePerUnit * Math.max(1, quantity);

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleCheckout = () => {
    setCheckoutModalOpen(true);
  };

  const faqs = [
    {
      q: 'What is included with BidPilot AI Professional?',
      a: 'Each license includes the full digital takeoff engine, point-and-click measurement tools, automated formulas, continuous software updates, 1 full year of technical support, and 2 hours of personalized 1-on-1 estimator training.',
    },
    {
      q: 'How does the free 1-on-1 training work?',
      a: 'A dedicated commercial estimating coach will walk you through setting up your trade assemblies, importing your blueprint files, and completing your first live takeoff tender.',
    },
    {
      q: 'Can I add multiple user seats for my estimating team?',
      a: 'Yes! Simply increase the quantity in the cart above. We also offer multi-seat network floating license configurations for larger contracting departments.',
    },
    {
      q: 'Do I get support and software updates after the first year?',
      a: 'Yes, ongoing maintenance and support can be renewed annually to continue receiving feature updates, newly released AI models, and unlimited live customer support.',
    },
  ];

  return (
    <div className="pt-20 pb-20 bg-white min-h-screen font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* 1. Glass Atrium Architectural Header Banner matching EXACT screenshot */}
      <div className="relative w-full h-64 sm:h-72 md:h-80 overflow-hidden bg-[#0a2540]">
        <img
          src={atriumBannerImg}
          alt="BidPilot AI Glass Atrium Canopy"
          className="w-full h-full object-cover object-center filter brightness-95 contrast-110"
        />
        
        {/* Subtle Dark Gradient Overlay for Crisp Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

        {/* Banner Text & Red Button matching exact screenshot */}
        <div className="absolute inset-0 max-w-7xl mx-auto px-6 sm:px-12 flex flex-col justify-center items-start">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white font-['Outfit'] tracking-tight drop-shadow-md">
            BidPilot® AI Professional Pricing & Training
          </h1>

          <div className="mt-5">
            <button
              onClick={() => onOpenTrial('pro')}
              className="px-6 py-3 rounded-sm bg-[#cc0000] hover:bg-[#b30000] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg inline-flex items-center gap-2 transition-all"
            >
              <Download className="w-4 h-4 stroke-[3]" />
              <span>START YOUR FREE TRIAL</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Pricing & Cart Area matching EXACT screenshot */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: BidPilot AI Professional Product Card (8 Cols) */}
          <div className="lg:col-span-8 border border-gray-300 rounded-lg p-6 sm:p-8 bg-[#f9fafb] shadow-xs">
            
            <h2 className="text-xl sm:text-2xl font-bold text-[#1f2937] font-['Outfit']">
              BidPilot AI Professional
            </h2>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              
              {/* Big Price Display matching screenshot */}
              <div className="flex items-baseline text-[#1f2937]">
                <span className="text-xs sm:text-sm font-bold text-gray-500 mr-1">US$</span>
                <span className="text-4xl sm:text-5xl font-light tracking-tight font-sans">
                  2000
                </span>
                <span className="text-sm font-bold text-gray-700 align-super ml-0.5">00</span>
              </div>

              {/* Quantity Spinner */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-600 font-semibold">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded bg-white overflow-hidden shadow-2xs">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="px-3 py-1.5 hover:bg-gray-100 text-gray-700 font-bold text-sm transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 text-center text-sm font-bold text-gray-900 border-x border-gray-200 py-1 focus:outline-none"
                  />
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="px-3 py-1.5 hover:bg-gray-100 text-gray-700 font-bold text-sm transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Description & Inclusions */}
            <div className="mt-6 space-y-3 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-200 pt-6">
              <p>
                <strong className="text-gray-900">BidPilot AI Professional</strong> is the complete commercial takeoff and estimating software solution. Calculate square footage, linear footage, volumes, and fixture counts with single-click ease.
              </p>
              <ul className="space-y-2 pt-2 text-xs text-gray-700">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Includes <strong>1 Year Software Updates & Technical Support</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Includes <strong>2 Hours Live 1-on-1 Personalized Coaching</strong> with a Master Estimator</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>CSI MasterFormat 50-Division Assemblies & 1-Click Excel Bid Export</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Right Column: Cart – In U.S. Dollars (4 Cols) */}
          <div className="lg:col-span-4 border border-gray-300 rounded-lg p-6 bg-white shadow-xs sticky top-28 space-y-5">
            
            <h3 className="text-lg font-bold text-[#1f2937] font-['Outfit'] border-b border-gray-200 pb-3">
              Cart – In U.S. Dollars
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-start text-gray-800">
                <div>
                  <div className="font-bold">Software (x{quantity})</div>
                  <div className="text-gray-500 text-[11px]">Inc. Updates & Support for 1yr</div>
                </div>
                <div className="font-bold font-mono text-gray-900">
                  ${totalPrice.toLocaleString()}.00
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200 flex justify-between items-center text-base font-extrabold text-gray-900">
                <span>Total:</span>
                <span className="text-xl text-[#0073b6] font-mono">
                  ${totalPrice.toLocaleString()}.00
                </span>
              </div>
            </div>

            {/* Blue Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full py-3 rounded bg-[#0073b6] hover:bg-[#005f96] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>CHECKOUT</span>
            </button>

            <div className="text-[11px] text-gray-500 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Secure SSL Encrypted Checkout</span>
            </div>

          </div>

        </div>

        {/* 3. Frequently Asked Questions matching exact layout */}
        <div className="mt-16 border-t border-gray-200 pt-12 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-[#011825] font-['Outfit'] text-center mb-8">
            Frequently Asked Questions
          </h3>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-left font-bold text-sm text-gray-800 flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
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

      {/* Checkout Simulator Modal */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-gray-300">
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <h3 className="text-lg font-bold text-gray-900 font-['Outfit']">
                Complete Your Order
              </h3>
              <button
                onClick={() => setCheckoutModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2 text-xs">
              <div className="flex justify-between font-bold text-gray-800">
                <span>BidPilot AI Professional ({quantity} License{quantity > 1 ? 's' : ''})</span>
                <span>${totalPrice.toLocaleString()}</span>
              </div>
              <div className="text-gray-500 text-[11px]">
                Includes 2 Hours 1-on-1 Training & 1 Year Support
              </div>
              <div className="pt-2 border-t border-gray-200 flex justify-between font-extrabold text-sm text-[#0073b6]">
                <span>Total Due:</span>
                <span>${totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => {
                alert(`Order confirmed for ${quantity} BidPilot AI license(s)! A license key and onboarding link has been dispatched.`);
                setCheckoutModalOpen(false);
              }}
              className="w-full py-3 rounded-md bg-[#0073b6] hover:bg-[#005f96] text-white font-extrabold text-xs uppercase tracking-wider shadow-md"
            >
              PROCEED TO SECURE PAYMENT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
