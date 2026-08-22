import React from 'react';
import { Star, Building2, Quote, CheckCircle2 } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      quote: "BidPilot AI cut our blueprint takeoff time from 4 full days to just 6 hours on our $18.4M hospital tender. The pgvector spec search caught a $42,500 fuel piping control discrepancy before bid day.",
      author: "Marcus Vance",
      role: "Chief Commercial Estimator",
      company: "Apex Horizon Builders (Austin, TX)",
      rating: 5,
      metrics: "70% Time Saved • 0 Missed Gaps",
    },
    {
      quote: "The Vision Diff addenda comparator alone paid for our annual license on the very first project. When Addendum 03 dropped 12 hours before bid close, it flagged 4 conduit runs that our competitors missed.",
      author: "Sarah Jenkins",
      role: "Lead MEP Estimator",
      company: "Pacific Mechanical & Electric (Bellevue, WA)",
      rating: 5,
      metrics: "Caught $34k Scope Additions",
    },
    {
      quote: "BidPilot AI digital takeoffs combined with automated RFI drafting is a game changer for commercial subcontractors. We submit 3x more bids per month with zero increase in department overhead.",
      author: "David Morales",
      role: "Preconstruction Director",
      company: "Morales Structural Concrete (Miami, FL)",
      rating: 5,
      metrics: "3x More Bids Submitted Monthly",
    },
  ];

  return (
    <section className="py-16 bg-[#f8fafc] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#0c72b8]">
            Customer Testimonials
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#011825] font-['Outfit'] mt-1">
            Trusted by Commercial Estimators Nationwide
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-2">
            Over $2.4 Billion in commercial takeoffs and tenders processed with BidPilot AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Rating Stars */}
                <div className="flex gap-1 text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 space-y-1">
                <div className="font-bold text-[#011825] text-xs sm:text-sm">
                  {rev.author}
                </div>
                <div className="text-[11px] text-gray-500 font-medium">
                  {rev.role} • <strong className="text-[#006db8]">{rev.company}</strong>
                </div>
                <div className="inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold mt-1">
                  ✓ {rev.metrics}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
