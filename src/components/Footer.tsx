import React from 'react';
import { Phone, Mail, ArrowUpRight } from 'lucide-react';
import logoImg from '../assets/bidpilot_logo.jpg';

interface FooterProps {
  onOpenTrial: () => void;
  onOpenArch: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTrial, onOpenArch }) => {
  return (
    <footer className="bg-[#333333] text-gray-300 text-xs pt-12 pb-10 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-gray-600">
          
          {/* Col 1: BidPilot AI Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <img
                src={logoImg}
                alt="BidPilot AI Logo"
                className="h-8 w-8 object-contain rounded bg-white p-0.5"
              />
              <span className="font-extrabold text-lg text-white font-['Outfit']">
                BidPilot<span className="text-[#0073b6] ml-1">AI</span>
                <span className="text-xs font-bold text-gray-400 align-super ml-0.5">®</span>
              </span>
            </div>

            <p className="text-gray-300 leading-relaxed text-xs">
              The next-generation AI construction estimator copilot for commercial contractors. Powered by CSI MasterFormat pgvector RAG, Vision Diff addenda comparison, and automated RFI drafting.
            </p>

            <div className="pt-2 text-gray-400 space-y-1">
              <div className="flex items-center gap-2 text-white font-bold">
                <Phone className="w-3.5 h-3.5 text-[#6898cc]" />
                <a href="tel:+923223715064" className="hover:underline">Sales: +92 3223715064</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#6898cc]" />
                <span>Support: support@bidpilot.ai</span>
              </div>
            </div>
          </div>

          {/* Col 2: Products */}
          <div className="space-y-2">
            <h4 className="text-[#6898cc] font-extrabold text-sm uppercase tracking-wider font-['Outfit']">
              Takeoff & AI Products
            </h4>
            <ul className="space-y-1.5">
              <li><a href="#pricing" className="hover:text-white transition-colors">BidPilot AI Complete Edition</a></li>
              <li><a href="#studio" className="hover:text-white transition-colors">AI Spec Assistant (pgvector RAG)</a></li>
              <li><a href="#studio" className="hover:text-white transition-colors">Vision Diff Addenda Scanner</a></li>
              <li><a href="#studio" className="hover:text-white transition-colors">Automated RFI Generator</a></li>
              <li><a href="#trades" className="hover:text-white transition-colors">CSI MasterFormat Assemblies</a></li>
            </ul>
          </div>

          {/* Col 3: Resources & Training */}
          <div className="space-y-2">
            <h4 className="text-[#6898cc] font-extrabold text-sm uppercase tracking-wider font-['Outfit']">
              Resources & Training
            </h4>
            <ul className="space-y-1.5">
              <li><a href="#pricing" onClick={onOpenTrial} className="hover:text-white transition-colors">Download 14-Day Trial</a></li>
              <li><a href="#trades" className="hover:text-white transition-colors">BidPilot AI for Trades Guide</a></li>
              <li>
                <button onClick={onOpenArch} className="text-[#6898cc] hover:text-white flex items-center gap-1 font-bold">
                  <span>FastAPI & pgvector Specs</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
              <li><a href="#pricing" className="hover:text-white transition-colors">1-on-1 Estimator Coaching</a></li>
            </ul>
          </div>

          {/* Col 4: Corporate & Compliance */}
          <div className="space-y-2">
            <h4 className="text-[#6898cc] font-extrabold text-sm uppercase tracking-wider font-['Outfit']">
              Enterprise Security
            </h4>
            <ul className="space-y-1.5">
              <li className="text-gray-300">SOC-2 Type II Certified</li>
              <li className="text-gray-300">ITAR & HIPAA Compliance Ready</li>
              <li className="text-gray-300">Multi-Tenant Database Isolation</li>
              <li className="text-gray-300">Procore & Autodesk Construction Cloud Sync</li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal Copyright & Developer Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-400">
          <p>© {new Date().getFullYear()} BidPilot AI Inc. All Rights Reserved. Built for U.S. Commercial Construction Estimators.</p>
          <div className="flex items-center gap-3">
            <span>Developed by{' '}
              <a 
                href="https://github.com/muhammadabdullah-devpk" 
                target="_blank" 
                rel="noreferrer" 
                className="text-[#6898cc] hover:text-white font-bold inline-flex items-center gap-1 transition-colors"
              >
                <span>Muhammad Abdullah</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </span>
            <span>•</span>
            <p>Privacy Policy | Terms of Service</p>
          </div>
        </div>

      </div>
    </footer>
  );
};
