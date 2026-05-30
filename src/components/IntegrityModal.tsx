import React from 'react';
import { ShieldCheck, X, FileText, Compass, AlertCircle, CheckCircle2 } from 'lucide-react';

interface IntegrityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function IntegrityModal({ isOpen, onClose }: IntegrityModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#022c22]/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#FDFBF7] border-2 border-[#022c22] max-w-xl w-full rounded-3xl overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200">
        
        {/* Banner */}
        <div className="bg-[#022c22] p-5 text-[#FDFBF7] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-[#d97706] shrink-0" />
            <div>
              <h3 className="font-display font-black text-sm tracking-wide uppercase">Academic Honor Code</h3>
              <p className="text-[11px] text-[#e7e5e4] font-semibold">Assignly Ethical Guidance Standards</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-[#FDFBF7]/80 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-[#022c22]">
          
          <div className="text-xs space-y-2">
            <p className="font-black text-[#022c22] leading-relaxed text-sm">
              We empower students globally to learn faster, study deeper, and navigate complex syllabus requirements with absolute integrity.
            </p>
            <p className="leading-relaxed font-bold text-[#022c22]/80">
              Assignly is designed as a custom tutoring, revision formatting, and project coaching platform. We help you understand technical standards so you can author pristine assignments yourself.
            </p>
          </div>

          {/* Do's and Dont's columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Allowed Support */}
            <div className="bg-[#f4f4f0] p-4 rounded-2xl border border-[#e7e5e4]">
              <h4 className="text-xs font-black text-[#022c22] mb-2 flex items-center gap-1 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-[#d97706] shrink-0" />
                Ethical Coaching Aids
              </h4>
              <ul className="space-y-1.5 text-[11px] text-[#022c22]/90 list-disc list-inside font-semibold">
                <li>Referencing & bibliography style formatting (APA, Harvard, IEEE, OSCOLA)</li>
                <li>Complex data analysis templates & regression coding guides</li>
                <li>Dissertation milestone tutoring</li>
                <li>Step-by-step mathematical proofing guides</li>
              </ul>
            </div>

            {/* Forbidden Activities */}
            <div className="bg-red-50 p-4 rounded-2xl border border-red-200">
              <h4 className="text-xs font-black text-red-900 mb-2 flex items-center gap-1 uppercase tracking-wider">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                Honor Violation Rules
              </h4>
              <ul className="space-y-1.5 text-[11px] text-red-800 list-disc list-inside font-semibold">
                <li>Plagiarism or direct submission of generated files as your own original work</li>
                <li>Online live exam-taking collaboration or cheating aid</li>
                <li>Direct test portal answering bypasses</li>
                <li>Ghostwriting without instructional learning goals</li>
              </ul>
            </div>

          </div>

          <div className="p-4 bg-[#f4f4f0] rounded-2xl border border-[#e7e5e4]">
            <span className="text-[10px] uppercase font-black text-[#78350f] block mb-1">Students Commitment Notice</span>
            <p className="text-[11px] text-[#022c22] leading-relaxed font-bold">
              By utilizing our coaches and calculation engine, you agree to treat reference models as study guides and tutorials. Our primary directive is to support the global learning cycle. Let's keep academic growth authentic!
            </p>
          </div>

        </div>

        {/* Action Bottom */}
        <div className="p-4 bg-[#f4f4f0] border-t border-[#e7e5e4] flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#022c22] hover:bg-[#023126] text-[#FDFBF7] font-black text-xs rounded-xl cursor-pointer shadow border border-[#d97706] transition-all text-center uppercase tracking-wider"
          >
            I Accept the Assignly Honor Code
          </button>
        </div>

      </div>
    </div>
  );
}
