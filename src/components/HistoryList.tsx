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
    const saved = localStorage.getItem('assignify_submissions');
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
    localStorage.setItem('assignify_submissions', JSON.stringify(filtered));
    setSubmissions(filtered);
    onSubmissionsUpdated();
  };

  const clearAllHistory = () => {
    if (window.confirm("Are you sure you want to clear your local calculations history?")) {
      localStorage.removeItem('assignify_submissions');
      setSubmissions([]);
      onSubmissionsUpdated();
    }
  };

  const getSubWhatsAppURL = (sub: AssignmentSubmission) => {
    const sym = sub.currency === 'USD' ? '$' : sub.currency === 'EUR' ? '€' : sub.currency === 'GBP' ? '£' : '';
    const fileListForWhatsapp = sub.files && sub.files.length > 0
      ? `\n\n📎 Attached Document Files (${sub.files.length}):\n` + sub.files.map((f, i) => `   ${i + 1}. ${f.name} (${(f.size / 1024).toFixed(1)} KB)`).join('\n') + `\n*(⚠️ I am attaching these files manually to this chat now)*`
      : '';

    const message = `Hello Assignify! 🌟 I would like to confirm my saved academic support draft:

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
    return null; // Don't show anything if history is empty, maintaining a minimal clean interface
  }

  return (
    <section className="py-16 bg-transparent border-t border-slate-200/50 dark:border-slate-800/50 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h3 className="text-xl font-bold font-display text-gray-950 dark:text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-500" />
              Your Cost Calculation History
            </h3>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Draft estimates stored temporarily in your local browser storage.
            </p>
          </div>
          <button 
            onClick={clearAllHistory}
            className="text-xs font-semibold text-red-500 hover:text-red-600 hover:underline flex items-center gap-1 shrink-0 p-1 cursor-pointer"
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
                className="bento-card overflow-hidden transition-all duration-300"
              >
                {/* Header view */}
                <div 
                  onClick={() => toggleExpand(sub.id)}
                  className="p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-100/50 dark:hover:bg-gray-850/40"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-450 rounded-xl flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate">
                          {sub.assignmentType} ({sub.course})
                        </h4>
                        <span className="text-[9px] uppercase tracking-wider font-mono bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded">
                          {sub.id.substring(0, 8)}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400 font-medium">Logged: {dateStr}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-100 font-mono">
                        {sub.currency === 'USD' ? '$' : sub.currency === 'EUR' ? '€' : sub.currency === 'GBP' ? '£' : ''}
                        {sub.estimatedPrice} {sub.currency}
                      </span>
                      <p className="text-[10px] text-gray-400 font-medium">{sub.urgency}</p>
                    </div>

                    <div className="text-gray-400">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Collapsible Details */}
                {isExpanded && (
                  <div className="p-5 border-t border-gray-150 dark:border-gray-850 bg-white dark:bg-gray-900/60 text-xs text-gray-600 dark:text-gray-400 space-y-4">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 dark:bg-gray-950 p-4 rounded-xl">
                      <div>
                        <p className="text-[10px] uppercase font-bold text-gray-400">University</p>
                        <p className="font-semibold text-gray-900 dark:text-white truncate">{sub.university}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-gray-400">Academic Target</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{sub.academicLevel} ({sub.difficulty})</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-gray-400">Volume</p>
                        <p className="font-semibold text-gray-900 dark:text-white font-mono">{sub.pages} Page(s) / Unit(s)</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-gray-400">Deadline date</p>
                        <p className="font-semibold text-gray-900 dark:text-white font-mono">{sub.deadline}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Your instructions text</p>
                      <p className="bg-gray-50 dark:bg-gray-950 p-3 rounded-lg text-gray-700 dark:text-gray-300 font-sans leading-relaxed whitespace-pre-wrap">
                        {sub.instructions}
                      </p>
                    </div>

                    {sub.files.length > 0 && (
                      <div>
                        <p className="text-[10px] uppercase font-bold text-gray-400 mb-1.5">Syllabus Files ({sub.files.length})</p>
                        <div className="flex flex-wrap gap-2">
                          {sub.files.map((f, i) => (
                            <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-gray-100 dark:bg-gray-950 text-[11px] font-medium border border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-300">
                              <FileText className="w-3 h-3 text-purple-500" />
                              {f.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-4 border-t border-gray-150 dark:border-gray-850 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-350 px-2 py-0.5 rounded-full text-[10px] font-bold">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Estimates saved securely
                      </div>

                      <div className="flex gap-2.5 w-full sm:w-auto">
                        <button
                          onClick={(e) => deleteRecord(e, sub.id)}
                          className="px-3.5 py-2 text-xs font-semibold text-red-500 bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-950/60 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete Log
                        </button>
                        
                        <a
                          href={getSubWhatsAppURL(sub)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 sm:flex-none px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-sm"
                        >
                          <MessageSquare className="w-3.5 h-3.5 fill-current" />
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
