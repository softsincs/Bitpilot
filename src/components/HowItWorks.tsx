import React, { useState, useRef, useEffect } from 'react';
import { MousePointerClick, Layers, TrendingUp, ArrowRight, Zap, Target, FileSearch, ShieldCheck, Star } from 'lucide-react';

interface HowItWorksProps {
  onOpenTrial: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenTrial }) => {
  // All 6 Video Clips (1.mp4 to 6.mp4)
  const showcaseClips = [
    '/videos/1.mp4',
    '/videos/2.mp4',
    '/videos/3.mp4',
    '/videos/4.mp4',
    '/videos/5.mp4',
    '/videos/6.mp4',
  ];

  const clipTitles = [
    'Point-and-Click Takeoffs',
    'Drag-and-Drop Assemblies',
    'Print or Export to Excel',
    'Addenda Vision Diff Engine',
    'CSI MasterFormat Spec RAG',
    'Automated BOQ Estimation',
  ];

  const [currentClipIdx, setCurrentClipIdx] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto advance to next video when current clip ends
  const handleVideoEnded = () => {
    setCurrentClipIdx((prev) => (prev + 1) % showcaseClips.length);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, [currentClipIdx]);

  return (
    <section className="py-20 bg-white border-b border-gray-200 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Section Header matching PlanSwift et_pb_section_1 */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#011825] font-['Outfit'] tracking-tight">
            Takeoff Software Built for Speed and Accuracy
          </h2>
          <p className="mt-3 text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
            BidPilot AI is the fastest and easiest way to complete digital takeoffs, generate precise material estimates, and submit winning commercial bids.
          </p>
        </div>

        {/* 3 Core Feature Cards with PlanSwift Signature Blue Top Border */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Card 1 */}
          <div 
            className="p-8 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            style={{ borderTop: '4px solid #0F5FA0' }}
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-[#0F5FA0]">
                <MousePointerClick className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#011825] font-['Outfit']">
                Point and Click Takeoffs
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Measure linear lengths, square footage, volumes, and pitch with point-and-click ease. Color-coded measurements make your plans crystal clear and simple to audit.
              </p>
            </div>
            
            <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#0F5FA0]">
              <span>CSI MasterFormat Snapping</span>
              <span>»»</span>
            </div>
          </div>

          {/* Card 2 */}
          <div 
            className="p-8 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            style={{ borderTop: '4px solid #0F5FA0' }}
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-[#0F5FA0]">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#011825] font-['Outfit']">
                Drag and Drop Assemblies
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pre-built material and labor assemblies automatically calculate every screw, stud, gallon of paint, and labor hour directly from your takeoff measurements.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#0F5FA0]">
              <span>Real-Time Waste Formulas</span>
              <span>»»</span>
            </div>
          </div>

          {/* Card 3 */}
          <div 
            className="p-8 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            style={{ borderTop: '4px solid #0F5FA0' }}
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-[#0F5FA0]">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#011825] font-['Outfit']">
                Print or Export to Excel
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Export complete, fully-formatted Bill of Quantities (BOQ) with itemized material lists, labor costs, and profit margins into Microsoft Excel with a single click.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#0F5FA0]">
              <span>1-Click Excel Sync</span>
              <span>»»</span>
            </div>
          </div>

        </div>

        {/* Video Feature Demonstration Box with Continuous 1-6 Autoplay */}
        <div className="mt-16 rounded-2xl bg-gradient-to-br from-[#0c72b8] via-[#005a96] to-[#011825] p-8 sm:p-10 text-white shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-blue-400/30">
          
          {/* Left Column: Testimonial & Value Points */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="space-y-2">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="text-xs font-bold text-blue-200 ml-2">5.0 Contractor Rating</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
                Bid 3X More Jobs with 100% Accuracy
              </h3>
            </div>

            <p className="text-sm text-blue-100 leading-relaxed font-light">
              “BidPilot AI has transformed the way our estimating department works. Point-and-click takeoff cuts our bid preparation time by over 60%, allowing us to submit more proposals and win higher margin contracts.”
            </p>

            {/* Author Credit */}
            <div className="pt-3 border-t border-blue-900/60 flex items-center justify-between text-xs text-blue-200">
              <div>
                <div className="font-bold text-white text-sm">Marcus Vance</div>
                <div className="text-[11px] text-blue-300">Chief Estimator • Commercial Contracting</div>
              </div>
              <button 
                onClick={onOpenTrial}
                className="px-4 py-2 rounded bg-white text-[#0073b6] hover:bg-blue-50 font-bold text-xs uppercase tracking-wider transition-colors shadow"
              >
                Free Trial
              </button>
            </div>

          </div>

          {/* Right Column: Pure Clean Auto-Sequencing Video Screen (1 to 6) */}
          <div className="lg:col-span-7">
            {/* Video Container */}
            <div className="rounded-2xl overflow-hidden border border-blue-400/30 shadow-2xl bg-black aspect-video relative flex items-center justify-center">
              <video
                ref={videoRef}
                key={showcaseClips[currentClipIdx]}
                src={showcaseClips[currentClipIdx]}
                autoPlay
                muted
                playsInline
                onEnded={handleVideoEnded}
                controls
                className="w-full h-full object-contain bg-black"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
