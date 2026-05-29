import React, { useState, useEffect } from 'react';
import { Award, Zap, BookOpen, Globe, ShieldAlert } from 'lucide-react';

export default function Stats() {
  // Let's create mock counters with a simple simulated tick upwards for interactive fidelity
  const [completedCount, setCompletedCount] = useState(1280);

  useEffect(() => {
    const timer = setInterval(() => {
      setCompletedCount(prev => prev + (Math.random() > 0.7 ? 1 : 0));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const items = [
    {
      label: 'Assignments Guided',
      value: `${completedCount.toLocaleString()}+`,
      sub: 'Verified expert assistance completed',
      icon: Award,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-950/40'
    },
    {
      label: 'Average Response Time',
      value: '< 15 Mins',
      sub: 'Around-the-clock analysts team',
      icon: Zap,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-950/40'
    },
    {
      label: 'Disciplines Supported',
      value: '35+ Fields',
      sub: 'From Computer Science to Nursing',
      icon: BookOpen,
      color: 'text-pink-600 dark:text-pink-400',
      bg: 'bg-pink-50 dark:bg-pink-950/40'
    },
    {
      label: 'Global Student Network',
      value: '120+ colleges',
      sub: 'UK, US, Canada, UAE, East Africa & India',
      icon: Globe,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40'
    }
  ];

  return (
    <section className="py-16 bg-transparent border-t border-b border-slate-200/50 dark:border-slate-800/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="bento-card p-6 flex flex-col justify-between"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mb-4 ${item.bg}`}>
                  <Icon className={`w-5 h-5 ${item.color}`} />
                </div>
                
                <h3 className="text-3xl font-extrabold font-display text-gray-900 dark:text-white font-mono tracking-tight">
                  {item.value}
                </h3>
                
                <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-250 mt-1">
                  {item.label}
                </h4>
                
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {item.sub}
                </p>
              </div>
            );
          })}
        </div>

        {/* Ethical Framework Banner integrated directly below the numbers */}
        <div className="mt-12 p-6 bento-card bg-gradient-to-r from-blue-500/5 to-emerald-500/5 flex flex-col sm:flex-row items-center gap-4 max-w-4xl mx-auto shadow-sm">
          <div className="p-2.5 rounded-xl bg-orange-100 text-orange-600 shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="text-center sm:text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">Strict Academic Guidance Framework</h4>
            <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">
              Assignify acts strictly as an educational learning guide. We deliver conceptual models, tutoring support, structural reference papers, and comprehensive dissertation milestones. We strictly prohibit direct coursework submission or cheating.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
