import React, { useState } from 'react';
import { Calculator, DollarSign, Clock, Users, FileCheck, ArrowRight, TrendingUp } from 'lucide-react';

interface RoiCalculatorProps {
  onOpenTrial: () => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenTrial }) => {
  const [estimators, setEstimators] = useState<number>(3);
  const [bidsPerMonth, setBidsPerMonth] = useState<number>(8);
  const [hoursPerTakeoff, setHoursPerTakeoff] = useState<number>(24);
  const [hourlyRate, setHourlyRate] = useState<number>(65);

  // Takeoff hours saved: ~70% reduction with AI pgvector + Vision Diff
  const totalBidsAnnual = estimators * bidsPerMonth * 12;
  const currentAnnualHours = totalBidsAnnual * hoursPerTakeoff;
  const currentAnnualCost = currentAnnualHours * hourlyRate;

  const hoursSavedAnnual = Math.round(currentAnnualHours * 0.70);
  const dollarSavingsAnnual = Math.round(currentAnnualCost * 0.70);
  const extraBidsCapacityAnnual = Math.round(totalBidsAnnual * 2.3);

  return (
    <section id="roi-calculator" className="py-20 bg-[#f8fafc] border-t border-gray-200 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#0073b6] text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>BidPilot AI Savings Calculator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#011825] font-['Outfit'] tracking-tight">
            Calculate Your Estimating Time & Dollar Savings
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
            See how fast BidPilot AI pays for itself by automating point-and-click measurements and spec lookups.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Sliders Input Card (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-[#011825] font-['Outfit'] border-b border-gray-100 pb-3">
                Department Parameters
              </h3>

              {/* Slider 1: Estimators */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-gray-700">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#0073b6]" />
                    <span>Number of Estimators</span>
                  </span>
                  <span className="text-[#0073b6] font-mono text-sm">{estimators} Estimators</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={estimators}
                  onChange={(e) => setEstimators(parseInt(e.target.value))}
                  className="w-full accent-[#0073b6] cursor-pointer"
                />
              </div>

              {/* Slider 2: Bids per Month */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-gray-700">
                  <span className="flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 text-[#0073b6]" />
                    <span>Bids Submitted / Month</span>
                  </span>
                  <span className="text-[#0073b6] font-mono text-sm">{bidsPerMonth} Bids</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={bidsPerMonth}
                  onChange={(e) => setBidsPerMonth(parseInt(e.target.value))}
                  className="w-full accent-[#0073b6] cursor-pointer"
                />
              </div>

              {/* Slider 3: Hours per Takeoff */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-gray-700">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#0073b6]" />
                    <span>Average Hours Spent Per Takeoff</span>
                  </span>
                  <span className="text-[#0073b6] font-mono text-sm">{hoursPerTakeoff} Hours</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="80"
                  step="2"
                  value={hoursPerTakeoff}
                  onChange={(e) => setHoursPerTakeoff(parseInt(e.target.value))}
                  className="w-full accent-[#0073b6] cursor-pointer"
                />
              </div>

              {/* Slider 4: Hourly Rate */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-gray-700">
                  <span className="flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-[#0073b6]" />
                    <span>Estimator Hourly Cost</span>
                  </span>
                  <span className="text-[#0073b6] font-mono text-sm">${hourlyRate}/hr</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="150"
                  step="5"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(parseInt(e.target.value))}
                  className="w-full accent-[#0073b6] cursor-pointer"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 text-xs text-gray-500">
              *Calculated based on average 70% takeoff time savings reported by commercial estimators using BidPilot AI.
            </div>
          </div>

          {/* Right Column: Net Annual Savings Card (5 Cols) */}
          <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-[#0c72b8] via-[#005a96] to-[#011825] p-8 text-white shadow-xl flex flex-col justify-between space-y-6 border border-blue-400/30">
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-1.5 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                <TrendingUp className="w-4 h-4" />
                <span>Estimated Net Annual Savings</span>
              </div>

              <div className="space-y-1">
                <div className="text-4xl sm:text-5xl font-extrabold text-white font-['Outfit']">
                  ${dollarSavingsAnnual.toLocaleString()}
                </div>
                <p className="text-xs text-blue-200">
                  Estimated labor hours saved per year: <strong>{hoursSavedAnnual.toLocaleString()} hrs</strong>
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-blue-400/30 text-xs text-blue-100">
                <div className="flex justify-between items-center">
                  <span>Additional Bidding Capacity:</span>
                  <strong className="text-white text-sm">+{extraBidsCapacityAnnual} bids/yr</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span>Estimated Payback Time:</span>
                  <strong className="text-emerald-400 text-sm">Less than 14 Days</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span>Missed Scope Gap Risk:</span>
                  <strong className="text-cyan-300 text-sm">Reduced by 94%</strong>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenTrial}
                className="w-full py-3.5 px-6 rounded-xl bg-white hover:bg-blue-50 text-[#0073b6] font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>START 14-DAY FREE TRIAL</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
