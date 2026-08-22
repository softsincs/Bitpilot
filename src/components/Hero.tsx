import React, { useState, useRef, useEffect } from 'react';
import { Play, Check, ChevronDown, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenTrial: (planId?: string) => void;
  onOpenArch: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTrial }) => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    companyName: '',
    phone: '',
    country: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // 6 Video Clips List (1.mp4 to 6.mp4)
  const videoClips = [
    '/videos/1.mp4',
    '/videos/2.mp4',
    '/videos/3.mp4',
    '/videos/4.mp4',
    '/videos/5.mp4',
    '/videos/6.mp4',
  ];

  // Preview Card Video Auto-Sequence State
  const [previewClipIndex, setPreviewClipIndex] = useState(0);
  const previewVideoRef = useRef<HTMLVideoElement>(null);

  // Modal Video Auto-Sequence State
  const [modalClipIndex, setModalClipIndex] = useState(0);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  // Auto advance preview clip when ended (1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 1)
  const handlePreviewClipEnded = () => {
    setPreviewClipIndex((prev) => (prev + 1) % videoClips.length);
  };

  // Auto advance modal clip when ended
  const handleModalClipEnded = () => {
    setModalClipIndex((prev) => (prev + 1) % videoClips.length);
  };

  // Whenever clip changes, reload and play
  useEffect(() => {
    if (previewVideoRef.current) {
      previewVideoRef.current.load();
      const playPromise = previewVideoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, [previewClipIndex]);

  useEffect(() => {
    if (modalVideoRef.current && videoModalOpen) {
      modalVideoRef.current.load();
      const playPromise = modalVideoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, [modalClipIndex, videoModalOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-[#0c72b8] via-[#005a96] to-[#011825] text-white font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Decorative Blueprint Background Grid & Glows */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-15 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLUMN: Hero Headline & Clean Pure Video Player (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-blue-100 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
              <span>Commercial Takeoff & Estimating Suite</span>
            </div>

            {/* Main Title matching PlanSwift Typography */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-['Outfit'] leading-[1.1] text-white drop-shadow-sm">
              Takeoff & Estimating <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-cyan-300">
                Software for Construction
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-blue-100 leading-relaxed max-w-xl font-light">
              BidPilot AI by ConstructConnect is the fastest, easiest, and most accurate takeoff software for general and specialty contractors.
            </p>

            {/* Pure, Clean Video Player (Continuous Auto-Play 1 -> 6 Loop) */}
            <div className="pt-2">
              <div 
                onClick={() => setVideoModalOpen(true)}
                className="group relative cursor-pointer rounded-2xl overflow-hidden border-2 border-white/30 shadow-2xl bg-black aspect-video flex items-center justify-center transition-all hover:scale-[1.01]"
              >
                {/* Continuous 1 to 6 Autoplay Video */}
                <video
                  ref={previewVideoRef}
                  key={videoClips[previewClipIndex]}
                  src={videoClips[previewClipIndex]}
                  autoPlay
                  muted
                  playsInline
                  onEnded={handlePreviewClipEnded}
                  className="w-full h-full object-contain bg-black"
                />

                {/* Center Play Icon Overlay */}
                <div className="absolute w-14 h-14 rounded-full bg-[#0073b6]/90 group-hover:bg-[#008de0] text-white flex items-center justify-center shadow-2xl transition-all group-hover:scale-110 z-20 backdrop-blur-xs">
                  <Play className="w-7 h-7 fill-current ml-0.5" />
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: White "Request a Free Trial" Form Box (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white text-gray-900 rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-100">
              
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#011825] font-['Outfit']">
                  Request a Free Trial
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Full access to every feature. No credit card required.
                </p>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  
                  {/* Business Email */}
                  <div>
                    <label className="block text-gray-700 font-bold mb-1">
                      Business Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@contracting.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0073b6] text-gray-900"
                    />
                  </div>

                  {/* First Name & Last Name */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-700 font-bold mb-1">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        placeholder="John"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0073b6] text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold mb-1">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        placeholder="Doe"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0073b6] text-gray-900"
                      />
                    </div>
                  </div>

                  {/* Company Name */}
                  <div>
                    <label className="block text-gray-700 font-bold mb-1">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="Apex Construction LLC"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0073b6] text-gray-900"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-gray-700 font-bold mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(555) 000-0000"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0073b6] text-gray-900"
                    />
                  </div>

                  {/* Country Dropdown */}
                  <div>
                    <label className="block text-gray-700 font-bold mb-1">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        required
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0073b6] text-gray-900 appearance-none bg-white"
                      >
                        <option value="">Please Select</option>
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                        <option value="Other">Other</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-3 pointer-events-none" />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-lg bg-[#0073b6] hover:bg-[#005f96] text-white font-extrabold text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-xl cursor-pointer"
                    >
                      REQUEST A FREE TRIAL
                    </button>
                  </div>

                  <div className="text-[11px] text-gray-400 text-center">
                    By submitting, you agree to our Terms of Service & Privacy Policy.
                  </div>
                </form>
              ) : (
                <div className="text-center py-10 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 font-['Outfit']">
                    Trial Access Granted!
                  </h3>
                  <p className="text-xs text-gray-600 max-w-xs mx-auto leading-relaxed">
                    Thank you, <strong>{formData.firstName || 'Contractor'}</strong>. Your 14-day full commercial license has been provisioned.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs text-[#0073b6] font-bold hover:underline"
                  >
                    Submit another request
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>

      {/* Video Modal with 1 to 6 Continuous Autoplay */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-gray-950 rounded-2xl max-w-4xl w-full p-4 sm:p-6 relative border border-gray-800 shadow-2xl space-y-4">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between text-white border-b border-gray-800 pb-3">
              <h3 className="text-base sm:text-lg font-bold font-['Outfit'] text-white">
                BidPilot AI Takeoff Software Demo
              </h3>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-bold transition-colors cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            {/* Video Player */}
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-black border border-gray-800 shadow-inner">
              <video
                ref={modalVideoRef}
                key={videoClips[modalClipIndex]}
                src={videoClips[modalClipIndex]}
                autoPlay
                controls
                playsInline
                onEnded={handleModalClipEnded}
                className="w-full h-full object-contain"
              />
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
