import React from 'react';
import { ShieldCheck, X, FileText, Compass, AlertCircle, CheckCircle2 } from 'lucide-react';

interface IntegrityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function IntegrityModal({ isOpen, onClose }: IntegrityModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 max-w-xl w-full rounded-3xl overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-emerald-500 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 shrink-0" />
            <div>
              <h3 className="font-display font-bold text-sm tracking-wide uppercase">Academic Honor Code</h3>
              <p className="text-[11px] text-blue-100">Assignly Ethical Guidance Standards</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          <div className="text-xs text-gray-600 space-y-2">
            <p className="font-bold text-gray-800 leading-relaxed text-sm">
              We empower students globally to learn faster, study deeper, and navigate complex syllabus requirements with absolute integrity.
            </p>
            <p className="leading-relaxed font-semibold">
              Assignly is designed as a custom tutoring, revision formatting, and project coaching platform. We help you understand technical standards so you can author pristine assignments yourself.
            </p>
          </div>

          {/* Do's and Dont's columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Allowed Support */}
            <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-950/60">
              <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-400 mb-2 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                Ethical Coaching Aids
              </h4>
              <ul className="space-y-1.5 text-[11px] text-emerald-700 dark:text-emerald-300 list-disc list-inside">
                <li>Referencing & bibliography style formatting (APA, Harvard, IEEE, OSCOLA)</li>
                <li>Complex data analysis templates & regression coding guides</li>
                <li>Dissertation milestone tutoring</li>
                <li>Step-by-step mathematical proofing guides</li>
              </ul>
            </div>

            {/* Forbidden Activities */}
            <div className="bg-red-50/50 dark:bg-red-950/20 p-4 rounded-2xl border border-red-100 dark:border-red-950/60">
              <h4 className="text-xs font-bold text-red-800 dark:text-red-400 mb-2 flex items-center gap-1">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                Honor Violation Rules
              </h4>
              <ul className="space-y-1.5 text-[11px] text-red-700 dark:text-red-300 list-disc list-inside">
                <li>Plagiarism or direct submission of generated files as your own original work</li>
                <li>Online live exam-taking collaboration or cheating aid</li>
                <li>Direct test portal answering bypasses</li>
                <li>Ghostwriting without instructional learning goals</li>
              </ul>
            </div>

          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-950 rounded-2xl border border-gray-150 dark:border-gray-850">
            <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Students Commitment Notice</span>
            <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">
              By utilizing our coaches and calculation engine, you agree to treat reference models as study guides and tutorials. Our primary directive is to support the global learning cycle. Let's keep academic growth authentic!
            </p>
          </div>

        </div>

        {/* Action Bottom */}
        <div className="p-4 bg-gray-50 dark:bg-gray-950 border-t border-gray-150 dark:border-gray-850 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer shadow transition-colors text-center"
          >
            I Accept the Assignly Honor Code
          </button>
        </div>

      </div>
    </div>
  );
}
