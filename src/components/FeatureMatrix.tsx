import React from 'react';
import { COMPARISON_MATRIX } from '../data/mockBidData';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

interface FeatureMatrixProps {
  onOpenTrial: (planId?: string) => void;
}

export const FeatureMatrix: React.FC<FeatureMatrixProps> = ({ onOpenTrial }) => {
  return (
    <section id="matrix" className="py-16 bg-[#f8fafc] border-t border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#0c72b8]">
            Feature by Feature Evaluation
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#011825] font-['Outfit'] mt-1">
            BidPilot AI vs Legacy Estimating Desktop
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            See how BidPilot AI upgrades your workflow with pgvector RAG, Vision Diff, and cloud collaboration.
          </p>
        </div>

        {/* PlanSwift Signature Matrix Container */}
        <div className="border border-[#eaecf0] rounded-xl bg-white shadow-sm overflow-hidden">
          
          {/* Header Row (#011825 Solid Blueprint Navy) */}
          <div className="grid grid-cols-12 bg-[#011825] text-white p-4 sm:p-5 text-xs font-bold uppercase tracking-wider items-center">
            <div className="col-span-6 sm:col-span-6">
              <span>Estimating & Takeoff Capability</span>
            </div>
            <div className="col-span-3 sm:col-span-3 text-center text-gray-300">
              <span>Legacy Estimating</span>
            </div>
            <div className="col-span-3 sm:col-span-3 text-center text-cyan-300">
              <span className="flex items-center justify-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>BidPilot AI Edition</span>
              </span>
            </div>
          </div>

          {/* Matrix Body with Zebra Striping */}
          <div className="divide-y divide-[#eaecf0]">
            {COMPARISON_MATRIX.map((group, groupIdx) => (
              <div key={groupIdx}>
                {/* Category Header Row */}
                <div className="bg-[#f1f5f9] px-4 py-2.5 sm:px-6 border-t border-b border-[#eaecf0]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#011825]">
                    {group.category}
                  </span>
                </div>

                {/* Individual Rows */}
                <div className="divide-y divide-[#eaecf0]">
                  {group.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className={`grid grid-cols-12 p-3.5 sm:p-4 items-center text-xs transition-colors ${
                        itemIdx % 2 === 1 ? 'bg-[#f8fafc]' : 'bg-white'
                      } hover:bg-blue-50/50`}
                    >
                      {/* Feature Name */}
                      <div className="col-span-6 sm:col-span-6 pr-2 font-semibold text-[#1a2433]">
                        {item.feature}
                      </div>

                      {/* Competitor / Legacy Tag */}
                      <div className="col-span-3 sm:col-span-3 text-center px-1">
                        <span className="ps-tag-secondary px-2.5 py-1 rounded-full text-[11px] inline-block max-w-full truncate">
                          {item.planswift}
                        </span>
                      </div>

                      {/* PlanSwift AI Tag */}
                      <div className="col-span-3 sm:col-span-3 text-center px-1">
                        <span className="ps-tag-primary px-2.5 py-1 rounded-full text-[11px] inline-block max-w-full font-bold">
                          {item.bidpilot}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Matrix Bottom Action */}
          <div className="p-4 sm:p-6 bg-gray-50 border-t border-[#eaecf0] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-gray-600 text-center sm:text-left">
              <strong>Need a live walkthrough?</strong> Join our weekly live takeoff demonstration.
            </div>
            <button
              onClick={() => onOpenTrial('pro')}
              className="px-6 py-2.5 ps-btn-red text-xs font-bold shadow-sm"
            >
              TRY 14-DAY FREE TRIAL
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
