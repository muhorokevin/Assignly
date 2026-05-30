import React from 'react';
import { X, ShieldCheck, Scale, FileText, Lock, Globe, Check } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TermsOfUseModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#022c22]/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#FDFBF7] border-2 border-[#022c22] max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#022c22] p-5 text-[#FDFBF7] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Scale className="w-6 h-6 text-[#d97706] shrink-0" />
            <div>
              <h3 className="font-display font-black text-sm tracking-wide uppercase">Terms of Use</h3>
              <p className="text-[11px] text-[#e7e5e4] font-semibold">Assignly Academic Support Guidelines</p>
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
        <div className="p-6 space-y-5 max-h-[65vh] overflow-y-auto text-[#022c22]">
          <div className="space-y-3">
            <h4 className="text-sm font-black font-display uppercase tracking-wide text-[#d97706]">1. Acceptance of Terms</h4>
            <p className="text-xs font-bold leading-relaxed">
              By accessing, calculating assignment estimates, or matching with coursework advisors on Assignly, you agree to comply with and be bound by these Terms of Use and our Academic Integrity Standard.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-black font-display uppercase tracking-wide text-[#d97706]">2. Permitted Use of Study Aids</h4>
            <p className="text-xs font-bold leading-relaxed">
              Our service provides reference papers, customized mathematical derivations, bibliographic directories, and 1-on-1 coaching guides. All materials delivered are designated strictly for study, private revision, and tutorial guidance. 
            </p>
            <div className="bg-[#f4f4f0] border border-[#e7e5e4] p-3.5 rounded-xl text-[11px] font-bold text-[#78350f] leading-relaxed">
              ⚠️ <strong>Strict Honor Rule:</strong> You are explicitly forbidden from submitting advisor-drafted reference guides as your own original work in college portal platforms. Direct copying is strict plagiarism. Refer to our Honor Standards.
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-black font-display uppercase tracking-wide text-[#d97706]">3. Budget Protection & Services</h4>
            <p className="text-xs font-bold leading-relaxed">
              Base quotes are compiled based on depth parameters, pages, academic levels, and urgency. Adjustments may slightly occur following direct file verification by subject experts. Assignly reserves the right to decline tasks that violate ethical examinations or contain unworkable delivery windows.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-black font-display uppercase tracking-wide text-[#d97706]">4. Safety Guarantee & Refund Policy</h4>
            <p className="text-xs font-bold leading-relaxed">
              We pledge to deliver precise guidance strictly corresponding to your uploaded task sheets. Where matches are found to deviate from instructions, students are guaranteed infinite revisions or a full refund.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#f4f4f0] border-t border-[#e7e5e4] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] text-[#78350f] font-bold">Last updated: May 2026</p>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#022c22] hover:bg-[#022c22]/90 text-[#FDFBF7] font-black text-xs rounded-xl cursor-pointer shadow transition-all text-center"
          >
            I Agree & Close
          </button>
        </div>

      </div>
    </div>
  );
}

export function PrivacyPolicyModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#022c22]/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#FDFBF7] border-2 border-[#022c22] max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#022c22] p-5 text-[#FDFBF7] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Lock className="w-6 h-6 text-[#d97706] shrink-0" />
            <div>
              <h3 className="font-display font-black text-sm tracking-wide uppercase">Privacy Policy</h3>
              <p className="text-[11px] text-[#e7e5e4] font-semibold">Assignly Encrypted Data Shield</p>
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
        <div className="p-6 space-y-5 max-h-[65vh] overflow-y-auto text-[#022c22]">
          <div className="space-y-3">
            <h4 className="text-sm font-black font-display uppercase tracking-wide text-[#d97706]">1. Data Minimization Promise</h4>
            <p className="text-xs font-bold leading-relaxed">
              We collect strictly only the essential information needed to match you with top regional subject experts: your name, email, WhatsApp contact number (for support delivery), country selection (to assign student-friendly currencies), and upload specifications.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-black font-display uppercase tracking-wide text-[#d97706]">2. Zero Turnitin Directory Uploads</h4>
            <p className="text-xs font-bold leading-relaxed">
              We understand the sensitive nature of syllabus tasks. Assignly guarantees that your draft outlines, files, and finished guides are never cataloged, indexed, uploaded, or exposed to institutional detectors such as Turnitin or Copyleaks.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-black font-display uppercase tracking-wide text-[#d97706]">3. Military-Grade Confidentiality</h4>
            <p className="text-xs font-bold leading-relaxed">
              Your name, university coordinates, and assignments details are stored safely in an encrypted client environment. We absolutely never sell, lease, or distribute information to any third parties, advertising partners, or institutional channels.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-black font-display uppercase tracking-wide text-[#d97706]">4. Cookies & Browser Sandbox</h4>
            <p className="text-xs font-bold leading-relaxed">
              Your previous cost calculation logs are saved inside your device's browser database (local storage) for your personal reference convenience only. You can click "Clear Local Logs" at any time to instantly shred this history.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#f4f4f0] border-t border-[#e7e5e4] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] text-[#78350f] font-bold">Last updated: May 2026</p>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#022c22] hover:bg-[#022c22]/90 text-[#FDFBF7] font-black text-xs rounded-xl cursor-pointer shadow transition-all text-center"
          >
            I Understand & Accept
          </button>
        </div>

      </div>
    </div>
  );
}
