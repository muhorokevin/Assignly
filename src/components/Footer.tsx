import React from 'react';
import { GraduationCap, MessageSquare, Mail, ShieldAlert, CheckCircle } from 'lucide-react';

interface FooterProps {
  openIntegrityModal: () => void;
  openTermsModal: () => void;
  openPrivacyModal: () => void;
}

export default function Footer({ openIntegrityModal, openTermsModal, openPrivacyModal }: FooterProps) {
  
  const handleWhatsAppChat = () => {
    const url = `https://wa.me/254710974670?text=${encodeURIComponent(
      "Hello Assignly, I would like to get custom academic support for my coursework. Can you guide me?"
    )}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-[#022c22] text-[#e7e5e4] border-t border-[#d97706]/40 transition-colors duration-300">
      
      {/* Upper Content and grids */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Col 1: Brand pitch */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-[#d97706] p-1.5 rounded-lg text-[#FDFBF7]">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="font-display font-black text-lg tracking-tight text-[#FDFBF7]">
                Assign<span className="text-[#d97706] font-black">ly</span>
              </span>
            </div>
            
            <p className="text-[12.5px] text-[#e7e5e4] max-w-sm leading-relaxed font-bold">
              Accelerating academic excellence through global expert mentorship. We deliver conceptual guides, mathematical proofs, reference bibliographies, and tutoring support safely and privately.
            </p>

            <div className="flex items-center gap-1 bg-[#d97706]/10 text-[#d97706] px-2.5 py-1 rounded-lg border border-[#d97706]/20 text-[10.5px] font-bold w-fit">
              <CheckCircle className="w-3.5 h-3.5 text-[#d97706]" /> Fully Encrypted & Confidential Data
            </div>
          </div>

          {/* Col 2: High Level Links */}
          <div className="md:col-span-3 space-y-3.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#FDFBF7]">Academic Coaching</h4>
            <ul className="space-y-2 text-xs font-bold text-[#e7e5e4]/90">
              <li>
                <a href="#how-it-works" className="hover:text-[#d97706] transition-colors">Support Process</a>
              </li>
              <li>
                <a href="#estimator-form" className="hover:text-[#d97706] transition-colors">Syllabus Cost Calculator</a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-[#d97706] transition-colors">Success reviews</a>
              </li>
              <li>
                <button 
                  onClick={openIntegrityModal}
                  className="text-left font-black text-[#d97706] hover:underline cursor-pointer flex items-center gap-1"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-[#d97706]" /> Academic Integrity Notice
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Support Contact info */}
          <div className="md:col-span-4 space-y-3.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#FDFBF7] font-display">Connect With Advisors</h4>
            <div className="space-y-3 text-xs leading-relaxed text-[#e7e5e4] font-semibold">
              
              <button 
                onClick={handleWhatsAppChat}
                className="flex items-center gap-2 text-left hover:text-[#d97706] transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-[#d97706] text-[#FDFBF7] flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-[#e7e5e4]/80 leading-none">Instant WhatsApp</p>
                  <p className="text-xs font-black text-[#FDFBF7]">+254 710 974670</p>
                </div>
              </button>

              <a 
                href="mailto:assignly1@gmail.com"
                className="flex items-center gap-2 text-left hover:text-[#d97706] transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-[#022c22] border border-[#d97706] text-[#FDFBF7] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#d97706]" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-[#e7e5e4]/80 leading-none">Central Email Support</p>
                  <p className="text-xs font-black text-[#FDFBF7] font-sans">assignly1@gmail.com</p>
                </div>
              </a>

            </div>
          </div>

        </div>

        {/* Separator */}
        <hr className="my-8 border-[#d97706]/20" />

        {/* Copyright and notices */}
        <div className="flex flex-col sm:flex-row items-center sm:justify-between text-[11px] text-[#e7e5e4] gap-4">
          <p className="text-center sm:text-left font-semibold text-[#e7e5e4]/80">
            &copy; {new Date().getFullYear()} Assignly — Personalized Academic Support. All rights reserved globally.
          </p>
          <div className="flex gap-4 font-black text-[#e7e5e4]">
            <button 
              onClick={openPrivacyModal} 
              className="hover:underline hover:text-[#d97706] cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>&bull;</span>
            <button 
              onClick={openTermsModal} 
              className="hover:underline hover:text-[#d97706] cursor-pointer"
            >
              Terms of Use
            </button>
            <span>&bull;</span>
            <button 
              onClick={openIntegrityModal} 
              className="font-black text-[#d97706] hover:underline cursor-pointer"
            >
              Honor Standards
            </button>
          </div>
        </div>

      </div>

    </footer>
  );
}
