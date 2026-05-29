import React from 'react';
import { GraduationCap, MessageSquare, Mail, ShieldAlert, CheckCircle } from 'lucide-react';

interface FooterProps {
  openIntegrityModal: () => void;
}

export default function Footer({ openIntegrityModal }: FooterProps) {
  
  const handleWhatsAppChat = () => {
    const url = `https://wa.me/254710974670?text=${encodeURIComponent(
      "Hello Assignify, I would like to get custom academic support for my coursework. Can you guide me?"
    )}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-white text-gray-655 border-t border-gray-200 transition-colors duration-300">
      
      {/* Upper Content and grids */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Col 1: Brand pitch */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-tr from-blue-600 to-emerald-500 p-1.5 rounded-lg text-white">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="font-display font-bold text-lg tracking-tight text-gray-900">
                Assign<span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">ify</span>
              </span>
            </div>
            
            <p className="text-xs text-gray-500 max-w-sm leading-relaxed font-semibold">
              Accelerating academic excellence through global expert mentorship. We deliver conceptual guides, mathematical proofs, R-script parameters, reference bibliographies, and tutoring support safely and privately.
            </p>

            <div className="flex items-center gap-1 bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg border border-emerald-500/10 text-[10px] font-bold w-fit">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Fully Encrypted & Confidential Data
            </div>
          </div>

          {/* Col 2: High Level Links */}
          <div className="md:col-span-3 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">Academic Coaching</h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <a href="#how-it-works" className="hover:text-blue-600 hover:underline">Support Process</a>
              </li>
              <li>
                <a href="#estimator-form" className="hover:text-blue-600 hover:underline">Syllabus Cost Calculator</a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-blue-600 hover:underline">Success reviews</a>
              </li>
              <li>
                <button 
                  onClick={openIntegrityModal}
                  className="text-left font-bold text-emerald-600 hover:underline cursor-pointer flex items-center gap-1"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-emerald-500" /> Academic Integrity Notice
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Support Contact info */}
          <div className="md:col-span-4 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 font-display">Connect With Advisors</h4>
            <div className="space-y-3 text-xs leading-relaxed text-gray-500 font-semibold">
              
              <button 
                onClick={handleWhatsAppChat}
                className="flex items-center gap-2 text-left hover:text-emerald-500"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 leading-none">Instant WhatsApp</p>
                  <p className="text-xs font-bold text-gray-800">+254 710 974670</p>
                </div>
              </button>

              <a 
                href="mailto:assignly1@gmail.com"
                className="flex items-center gap-2 text-left hover:text-blue-500"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 leading-none">Central Email Support</p>
                  <p className="text-xs font-bold text-gray-800 font-sans">assignly1@gmail.com</p>
                </div>
              </a>

            </div>
          </div>

        </div>

        {/* Separator */}
        <hr className="my-8 border-gray-200" />

        {/* Copyright and notices */}
        <div className="flex flex-col sm:flex-row items-center sm:justify-between text-[11px] text-gray-500 gap-4">
          <p className="text-center sm:text-left font-semibold">
            &copy; {new Date().getFullYear()} Assignify — Personalized Academic Support. All rights reserved globally.
          </p>
          <div className="flex gap-4 font-bold">
            <a href="#" className="hover:underline hover:text-gray-600">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#" className="hover:underline hover:text-gray-600">Terms of Use</a>
            <span>&bull;</span>
            <button onClick={openIntegrityModal} className="font-bold text-blue-500 hover:underline cursor-pointer">
              Honor Standards
            </button>
          </div>
        </div>

      </div>

    </footer>
  );
}
