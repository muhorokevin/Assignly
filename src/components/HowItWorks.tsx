import React from 'react';
import { FileText, Zap, MessageSquare, GraduationCap, ChevronRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Describe Coursework Details',
      description: 'Paste your instructions, prompts, worksheets, regression goals, or rubric text securely in our calculator form.',
      icon: FileText
    },
    {
      number: '02',
      title: 'Get Instant Estimate',
      description: 'Our dynamic pricing recalculates live as you tweak workload details, complexity, and urgency parameters.',
      icon: Zap
    },
    {
      number: '03',
      title: 'Confirm Project Details',
      description: 'Our academic analysts review materials to confirm scope and match your requirements with certified mentors.',
      icon: MessageSquare
    },
    {
      number: '04',
      title: 'Receive Guided Support',
      description: 'Access 1-on-1 coaching, draft reviews, and comprehensive reference papers with absolute privacy guidelines.',
      icon: GraduationCap
    },
  ];

  const handleScrollToForm = () => {
    const element = document.getElementById('estimator-form');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="how-it-works" className="py-20 bg-transparent border-t border-b border-[#e7e5e4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-black tracking-widest text-[#022c22] bg-[#022c22]/10 border border-[#022c22]/20 px-3 py-1.5 rounded-full">
            Simple 4-Step Process
          </span>
          <h2 className="mt-4 font-display font-black text-3.5xl sm:text-4.5xl text-[#022c22]">
            How It Works
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#022c22]/80 font-bold">
            Getting personalized academic support has never been simpler. Follow our four transparent, verified steps to connect with a top graduate expert today.
          </p>
        </div>
 
        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <div 
                key={idx}
                className="group relative bg-[#FDFBF7] border-2 border-[#e7e5e4] hover:border-[#d97706]/40 p-6 flex flex-col justify-between rounded-3xl shadow-sm transition-all duration-300"
              >
                
                {/* Step Number Badge */}
                <div className="absolute top-4 right-4 text-4xl font-display font-black text-[#022c22]/10 transition-colors duration-300 group-hover:text-[#d97706]/20 select-none">
                  {step.number}
                </div>
 
                <div>
                  {/* Icon Frame */}
                  <div className="w-12 h-12 rounded-xl mb-6 flex items-center justify-center text-[#FDFBF7] bg-[#022c22] border border-[#d97706]/30 shadow-lg">
                    <IconComponent className="w-5 h-5 text-[#d97706]" />
                  </div>
 
                  {/* Title */}
                  <h3 className="text-lg font-black font-display text-[#022c22] mb-2">
                    {step.title}
                  </h3>
 
                  {/* Description */}
                  <p className="text-[13px] text-[#022c22]/80 font-bold leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>
 
                {/* Arrow Link Indicator */}
                <div className="mt-1 pb-1 flex items-center gap-1 text-xs font-black uppercase tracking-widest text-[#022c22]/90 hover:text-[#d97706] transition-colors cursor-pointer" onClick={handleScrollToForm}>
                  <span>Get Started</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#d97706]" />
                </div>
 
              </div>
            );
          })}
        </div>
 
        {/* Floating Call to Action Bar */}
        <div className="mt-16 bg-[#f4f4f0] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto shadow border border-[#e7e5e4]">
          <div className="text-center sm:text-left">
            <h4 className="text-base font-black text-[#022c22]">Have custom guidelines, course syllabus worksheets or complex rubrics?</h4>
            <p className="text-xs text-[#022c22]/80 mt-1 font-bold">Our verified academic experts handle bespoke, multi-disciplinary requests around the clock.</p>
          </div>
          <button 
            onClick={handleScrollToForm}
            className="px-6 py-3.5 bg-[#022c22] hover:bg-[#023126] text-[#FDFBF7] border border-[#d97706] rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow shrink-0 cursor-pointer flex items-center gap-2"
          >
            FREE ESTIMATE <ChevronRight className="w-4 h-4 text-[#FDFBF7]" />
          </button>
        </div>
 
      </div>
    </section>
  );
}
