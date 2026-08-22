import React, { useState } from 'react';
import { X, Check, Phone, Mail, Building, User } from 'lucide-react';

interface TrialQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlanId?: string;
}

export const TrialQuoteModal: React.FC<TrialQuoteModalProps> = ({ isOpen, onClose, selectedPlanId = 'pro' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    trade: 'General Contractor',
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="ps-trial-wrapper max-w-lg w-full relative">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-white text-gray-800 rounded-full p-1.5 shadow-lg hover:bg-gray-100 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* PlanSwift Header (#2a506f) */}
        <div className="ps-trial-header">
          <h3 className="text-xl font-extrabold text-white uppercase font-['Outfit']">
            DOWNLOAD YOUR FREE 14-DAY TRIAL
          </h3>
          <p className="text-xs text-blue-100 mt-1">
            Experience Full BidPilot AI Features • No Credit Card Needed
          </p>
        </div>

        {/* PlanSwift Yellow Body (#ffc165) */}
        <div className="ps-trial-body text-gray-900">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-900 mb-1">
                  Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full bg-white border border-gray-400 rounded p-2 text-gray-900 focus:outline-none focus:border-blue-700"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-900 mb-1">
                  Work Email <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@contractor.com"
                  className="w-full bg-white border border-gray-400 rounded p-2 text-gray-900 focus:outline-none focus:border-blue-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-gray-900 mb-1">
                    Phone <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(555) 000-0000"
                    className="w-full bg-white border border-gray-400 rounded p-2 text-gray-900 focus:outline-none focus:border-blue-700"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-900 mb-1">
                    Company <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Apex Construction"
                    className="w-full bg-white border border-gray-400 rounded p-2 text-gray-900 focus:outline-none focus:border-blue-700"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-900 mb-1">Primary Trade</label>
                <select
                  value={formData.trade}
                  onChange={(e) => setFormData({ ...formData, trade: e.target.value })}
                  className="w-full bg-white border border-gray-400 rounded p-2 text-gray-900 font-medium focus:outline-none focus:border-blue-700"
                >
                  <option value="General Contractor">General Contractor</option>
                  <option value="Electrical Contractor">Electrical (Div 26-28)</option>
                  <option value="HVAC / Mechanical">HVAC & Mechanical (Div 22-23)</option>
                  <option value="Concrete / Masonry">Concrete & Masonry (Div 03-04)</option>
                  <option value="Drywall / Framing">Drywall & Framing (Div 09)</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 ps-btn-red text-center text-sm font-extrabold uppercase shadow-md"
                >
                  START MY FREE TRIAL NOW
                </button>
              </div>

              <p className="text-[11px] text-center font-semibold text-gray-800 pt-1">
                Instant Download & Sandbox • No Credit Card Required
              </p>
            </form>
          ) : (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                <Check className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold">14-Day Free License Ready!</h4>
              <p className="text-xs">
                Welcome, <strong>{formData.name || 'Estimator'}</strong>. Your trial account for <strong>{formData.company || 'your team'}</strong> is active.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 ps-btn-red text-xs font-bold"
              >
                Launch Live Studio
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
