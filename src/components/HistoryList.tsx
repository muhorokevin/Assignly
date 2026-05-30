import React, { useState, useEffect } from 'react';
import { 
  FileText, ArrowDownRight, Clock, MessageSquare, Trash2, 
  ChevronDown, ChevronUp, CheckCircle, ExternalLink, RefreshCw 
} from 'lucide-react';
import { AssignmentSubmission } from '../types';

interface HistoryListProps {
  refreshTrigger: number;
  onSubmissionsUpdated: () => void;
}

export default function HistoryList({ refreshTrigger, onSubmissionsUpdated }: HistoryListProps) {
  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('assignly_submissions') || localStorage.getItem('assignify_submissions');
    if (saved) {
      try {
        setSubmissions(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse localStorage submissions', e);
      }
    } else {
      setSubmissions([]);
    }
  }, [refreshTrigger]);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const deleteRecord = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const filtered = submissions.filter(s => s.id !== id);
    localStorage.setItem('assignly_submissions', JSON.stringify(filtered));
    setSubmissions(filtered);
    onSubmissionsUpdated();
  };

  const clearAllHistory = () => {
    if (window.confirm("Are you sure you want to clear your local calculations history?")) {
      localStorage.removeItem('assignly_submissions');
      localStorage.removeItem('assignify_submissions');
      setSubmissions([]);
      onSubmissionsUpdated();
    }
  };

  const getSubWhatsAppURL = (sub: AssignmentSubmission) => {
    const sym = sub.currency === 'USD' ? '$' : sub.currency === 'EUR' ? '€' : sub.currency === 'GBP' ? '£' : '';
    const fileListForWhatsapp = `\n\n📎 *ATTACHED FILES DISCLOSURE*:\n*(⚠️ Hint: Please manually press attach file button inside WhatsApp to share coursework guidelines, worksheet sheets or screenshots with our verified matched assistants)*`;

    const message = `Hello Assignly! 🌟 I would like to confirm my saved academic support draft:

📚 Subject: ${sub.course}
📝 Task Type: ${sub.assignmentType}
🏛️ College: ${sub.university}
📆 Urgency Limit: ${sub.deadline} (${sub.urgency})
💰 Draft Guide Price: ${sym || ''}${sub.estimatedPrice} ${sub.currency}

Instructions: "${sub.instructions.substring(0, 150)}"${fileListForWhatsapp}

Can you connect me with a matching specialist? Thank you!`;

    return `https://wa.me/254710974670?text=${encodeURIComponent(message)}`;
  };

  if (submissions.length === 0) {
    return null; // Don't show anything if history is empty
  }

  return (
    <section className="py-16 bg-transparent border-t border-[#e7e5e4] transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
        
        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h3 className="text-xl font-black font-display text-[#022c22] flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#d97706]" />
              Your Cost Calculation History
            </h3>
            <p className="text-xs text-[#022c22]/80 font-bold mt-1">
              Draft estimates stored temporarily in your local browser storage.
            </p>
          </div>
          <button 
            onClick={clearAllHistory}
            className="text-xs font-black text-red-750 text-red-600 hover:text-red-700 hover:underline flex items-center gap-1 shrink-0 p-1 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear Local Logs
          </button>
        </div>

        {/* List Stack */}
        <div className="space-y-4">
          {submissions.map((sub) => {
            const isExpanded = expandedId === sub.id;
            const dateStr = new Date(sub.createdAt).toLocaleDateString('en-US', {
               month: 'short',
               day: 'numeric',
               hour: '2-digit',
               minute: '2-digit'
            });

            return (
              <div 
                key={sub.id}
                className="bg-[#FDFBF7] border-2 border-[#e7e5e4] rounded-2xl overflow-hidden transition-all duration-300 shadow-sm"
              >
                {/* Header view */}
                <div 
                  onClick={() => toggleExpand(sub.id)}
                  className="p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#f4f4f0]/50"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 bg-[#022c22]/10 border border-[#022c22]/20 text-[#022c22] rounded-xl flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-[#d97706]" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-black text-[#022c22] truncate max-w-[280px]">
                          {sub.assignmentType} ({sub.course})
                        </h4>
                        <span className="text-[9px] uppercase tracking-wider font-mono font-black bg-[#022c22]/10 border border-[#022c22]/20 text-[#022c22] px-1.5 py-0.5 rounded">
                          {sub.id.substring(0, 8)}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#022c22]/60 font-medium mt-0.5">Logged: {dateStr}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <span className="text-sm font-black text-[#022c22] font-mono">
                        {sub.currency === 'USD' ? '$' : sub.currency === 'EUR' ? '€' : sub.currency === 'GBP' ? '£' : ''}
                        {sub.estimatedPrice} {sub.currency}
                      </span>
                      <p className="text-[10px] text-[#022c22]/65 font-bold mt-0.5">{sub.urgency}</p>
                    </div>

                    <div className="text-[#022c22]/60">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Collapsible Details */}
                {isExpanded && (
                  <div className="p-5 border-t border-[#e7e5e4] bg-[#f4f4f0]/30 text-xs text-[#022c22]/90 space-y-4">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-white border border-[#e7e5e4] p-4 rounded-xl">
                      <div>
                        <p className="text-[10px] uppercase font-black text-[#022c22]/60">University</p>
                        <p className="font-extrabold text-[#022c22] truncate">{sub.university}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-black text-[#022c22]/60">Academic Target</p>
                        <p className="font-extrabold text-[#022c22]">{sub.academicLevel} ({sub.difficulty})</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-black text-[#022c22]/60">Volume</p>
                        <p className="font-extrabold text-[#022c22] font-mono">{sub.pages} Page(s) / Unit(s)</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-black text-[#022c22]/60">Deadline date</p>
                        <p className="font-extrabold text-[#022c22] font-mono">{sub.deadline}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase font-black text-[#022c22]/60 mb-1">Your instructions text</p>
                      <p className="bg-white border border-[#e7e5e4] p-3 rounded-lg text-[#022c22] font-sans font-semibold leading-relaxed whitespace-pre-wrap">
                        {sub.instructions}
                      </p>
                    </div>

                    {sub.files.length > 0 && (
                      <div>
                        <p className="text-[10px] uppercase font-black text-[#022c22]/60 mb-1.5">Syllabus Files ({sub.files.length})</p>
                        <div className="flex flex-wrap gap-2">
                          {sub.files.map((f, i) => (
                            <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white text-[11px] font-bold border border-[#e7e5e4] text-[#022c22]">
                              <FileText className="w-3 h-3 text-[#d97706]" />
                              {f.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-4 border-t border-[#e7e5e4] flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-1 bg-[#022c22]/10 text-[#022c22] px-2.5 py-1 rounded-full text-[10px] font-black border border-[#022c22]/20">
                        <CheckCircle className="w-3.5 h-3.5 text-[#022c22]/80" /> Estimates saved securely
                      </div>

                      <div className="flex gap-2.5 w-full sm:w-auto font-sans">
                        <button
                          onClick={(e) => deleteRecord(e, sub.id)}
                          className="px-3.5 py-2 text-xs font-black text-red-700 bg-red-50 border border-red-200 hover:bg-red-100 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete Log
                        </button>
                        
                        <a
                          href={getSubWhatsAppURL(sub)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 sm:flex-none px-4 py-2 bg-[#022c22] hover:bg-[#023126] text-[#FDFBF7] font-black text-xs rounded-xl border border-[#d97706] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                        >
                          <MessageSquare className="w-3.5 h-3.5 fill-current text-[#d97706]" />
                          Re-open WhatsApp
                        </a>
                      </div>
                    </div>

                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
