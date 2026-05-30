import React from 'react';
import { FileText, Zap, MessageSquare, GraduationCap, ChevronRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Describe Coursework Details',
      description: 'Paste your instructions, instructions prompts, worksheets, regression goals, or rubric text securely in our calculator form.',
      icon: FileText,
      color: 'from-blue-500 to-indigo-500',
      bgLight: 'bg-blue-50/60 dark:bg-blue-950/20',
      textAccent: 'text-blue-600 dark:text-blue-400'
    },
    {
      number: '02',
      title: 'Get Instant Estimate',
      description: 'Our dynamic pricing recalculates live as you tweak workload details, complexity, and urgency parameters.',
      icon: Zap,
      color: 'from-purple-500 to-pink-500',
      bgLight: 'bg-purple-50/60 dark:bg-purple-950/20',
      textAccent: 'text-purple-600 dark:text-purple-400'
    },
    {
      number: '03',
      title: 'Confirm Project Details',
      description: 'Our academic analysts review materials to confirm scope and match your requirements with certified mentors.',
      icon: MessageSquare,
      color: 'from-amber-500 to-orange-500',
      bgLight: 'bg-amber-50/60 dark:bg-amber-950/20',
      textAccent: 'text-amber-600 dark:text-amber-400'
    },
    {
      number: '04',
      title: 'Receive Guided Support',
      description: 'Access 1-on-1 coaching, draft reviews, and comprehensive reference papers with absolute privacy guidelines.',
      icon: GraduationCap,
      color: 'from-emerald-500 to-teal-500',
      bgLight: 'bg-emerald-50/60 dark:bg-emerald-950/20',
      textAccent: 'text-emerald-600 dark:text-emerald-400'
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
    <section id="how-it-works" className="py-20 bg-transparent border-t border-b border-slate-200/50 dark:border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
            Simple Process
          </span>
          <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-4xl text-gray-900 dark:text-white">
            How It Works
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400">
            Getting personalized academic support has never been easier. Follow our four transparent, verified steps to connect with a subject-matter expert today.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <div 
                key={idx}
                className="group relative bento-card p-6 flex flex-col justify-between"
              >
                
                {/* Step Number Badge */}
                <div className="absolute top-4 right-4 text-3xl font-display font-black text-gray-200/90 dark:text-gray-800 transition-colors duration-300 group-hover:text-blue-500/15">
                  {step.number}
                </div>

                <div>
                  {/* Icon Frame */}
                  <div className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center text-white bg-gradient-to-tr ${step.color} shadow-md`}>
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold font-display text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                {/* Arrow Link Indicator */}
                <div className="mt-1 pb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:underline transition-colors cursor-pointer" onClick={handleScrollToForm}>
                  <span>Get Started</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>

              </div>
            );
          })}
        </div>

        {/* Floating Call to Action Bar */}
        <div className="mt-16 bg-gradient-to-r from-blue-600/5 to-purple-600/5 dark:from-blue-950/10 dark:to-purple-950/10 bento-card p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto shadow-sm">
          <div className="text-center sm:text-left">
            <h4 className="text-base font-bold text-gray-900 dark:text-white">Have custom guidelines or complex syllabus structures?</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Our support staff handles bespoke, multi-disciplinary requests around the clock.</p>
          </div>
          <button 
            onClick={handleScrollToForm}
            className="px-6 py-3 bg-gray-950 hover:bg-gray-850 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-950 rounded-xl font-semibold text-sm transition-all shadow-sm shrink-0 cursor-pointer flex items-center gap-2"
          >
            Calculate Free Estimate <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
