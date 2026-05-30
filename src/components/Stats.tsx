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
      color: 'text-[#022c22]',
      bg: 'bg-[#022c22]/10 border border-[#022c22]/20'
    },
    {
      label: 'Average Response Time',
      value: '⚡ < 15 Mins',
      sub: 'Around-the-clock analyst crew',
      icon: Zap,
      color: 'text-[#d97706]',
      bg: 'bg-[#d97706]/10 border border-[#d97706]/20'
    },
    {
      label: 'Disciplines Supported',
      value: '35+ Fields',
      sub: 'From Computer Science to Nursing',
      icon: BookOpen,
      color: 'text-[#022c22]',
      bg: 'bg-[#022c22]/10 border border-[#022c22]/20'
    },
    {
      label: 'Global Student Network',
      value: '120+ colleges',
      sub: 'UK, US, Canada, UAE, East Africa & India',
      icon: Globe,
      color: 'text-[#d97706]',
      bg: 'bg-[#d97706]/10 border border-[#d97706]/20'
    }
  ];

  return (
    <section className="py-16 bg-transparent border-t border-b border-[#e7e5e4] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="bg-[#FDFBF7] border-2 border-[#e7e5e4] hover:border-[#d97706]/40 p-6 flex flex-col justify-between rounded-3xl shadow-sm duration-300 transition-colors"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mb-4 ${item.bg}`}>
                  <Icon className={`w-5 h-5 ${item.color}`} />
                </div>
                
                <h3 className="text-3xl font-black font-display text-[#022c22] tracking-tight">
                  {item.value}
                </h3>
                
                <h4 className="text-sm font-black text-[#022c22]/90 mt-1 uppercase tracking-wider">
                  {item.label}
                </h4>
                
                <p className="text-[11px] font-bold text-[#022c22]/70 mt-1">
                  {item.sub}
                </p>
              </div>
            );
          })}
        </div>

        {/* Ethical Framework Banner integrated directly below the numbers */}
        <div className="mt-12 p-6 bg-[#f4f4f0] rounded-3xl flex flex-col sm:flex-row items-center gap-4 max-w-4xl mx-auto shadow border border-[#e7e5e4]">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-[#d97706] border border-amber-500/20 shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="text-center sm:text-left">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#d97706]">Strict Academic Guidance Framework</h4>
            <p className="text-[11px] text-[#022c22]/90 mt-1 leading-snug font-bold">
              Assignly acts strictly as an educational learning guide. We deliver conceptual models, tutoring support, structural reference papers, and comprehensive dissertation milestones. We strictly prohibit direct coursework submission or academic dishonesty.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
