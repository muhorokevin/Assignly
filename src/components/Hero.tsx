import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, MessageSquare, Shield, Clock, Award, Users, 
  FileText, CheckCircle2, TrendingUp, Sparkles 
} from 'lucide-react';

export default function Hero() {
  // Simple state for our interactive dashboard simulator on the right side
  const [activeStep, setActiveStep] = useState(1);
  const [estimatedVal, setEstimatedVal] = useState(25);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  // Cycle simulator steps for progress tracker in dashboard
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev % 3) + 1);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

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

  const handleWhatsAppChat = () => {
    const url = `https://wa.me/254710974670?text=${encodeURIComponent(
      "Hello Assignly, I would like to get custom academic support for my coursework. Can you guide me?"
    )}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-transparent">
      
      {/* Decorative Floating Aurora Gradients matching the bento-bg-blur */}
      <div className="absolute top-1/10 left-1/10 w-96 h-96 bg-[#022c22]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/5 right-1/10 w-[450px] h-[450px] bg-[#d97706]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side Content */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
            
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-1.5 self-center lg:self-start px-3 py-1.5 mb-6 rounded-full bg-[#022c22]/10 border border-[#022c22]/20 text-xs font-bold text-[#022c22]">
              <Sparkles className="w-4 h-4 text-[#d97706] animate-pulse" />
              <span>Premium 1-on-1 Academic Mentorship by Assignly</span>
            </div>
 
            {/* Core Titles */}
            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7.5xl text-[#022c22] tracking-tighter leading-[1.05] drop-shadow-sm">
              Academic Support <br />
              <span className="text-[#d97706]">Made Simple.</span>
            </h1>
 
            {/* Radiant Sub-tagline */}
            <h2 className="mt-4 font-display font-black text-2xl sm:text-3xl text-[#78350f] tracking-wide">
              Fast ⚡ Affordable 💎 Absolute Integrity 🛡️
            </h2>
 
            {/* Pitch Intro */}
            <p className="mt-6 text-base sm:text-lg text-[#022c22]/90 max-w-xl mx-auto lg:mx-0 leading-relaxed font-bold bg-[#f4f4f0]/95 py-3.5 px-4 rounded-2xl border border-[#e7e5e4] shadow-sm">
              Describe your syllabus requirements or paste your worksheet tasks in our 60-second calculator form below. Receive highly customized academic coaching from vetted Global Subject Experts.
            </p>
 
            {/* Action CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={handleScrollToForm}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-black bg-[#022c22] hover:bg-[#023126] hover:scale-[1.01] text-[#FDFBF7] border-2 border-[#d97706] shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-base uppercase tracking-wider"
              >
                Submit Assignment <ArrowRight className="h-5 w-5 font-black" />
              </button>
              
              <button
                onClick={handleWhatsAppChat}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-black bg-white text-[#022c22] border-2 border-[#e7e5e4] hover:bg-[#f4f4f0] transition-all flex items-center justify-center gap-2 cursor-pointer text-base shadow-md tracking-wider"
              >
                <MessageSquare className="h-5 w-5 text-[#022c22] fill-[#022c22]/10" />
                CHAT ON WHATSAPP
              </button>
            </div>
 
            {/* Trust Badges */}
            <div className="mt-12 pt-8 border-t border-[#e7e5e4] grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2 text-left">
                <div className="p-2 rounded-lg bg-[#d97706]/10 text-[#d97706] border border-[#d97706]/20">
                  <Clock className="w-5 h-5 font-bold" />
                </div>
                <div>
                  <p className="text-xs font-black text-[#022c22] uppercase tracking-wider">Fast Response</p>
                  <p className="text-[11px] font-bold text-[#78350f]">Quotes in minutes</p>
                </div>
              </div>
 
              <div className="flex items-center gap-2 text-left">
                <div className="p-2 rounded-lg bg-[#022c22]/10 text-[#022c22] border border-[#022c22]/20">
                  <Users className="w-5 h-5 font-bold" />
                </div>
                <div>
                  <p className="text-xs font-black text-[#022c22] uppercase tracking-wider">Global Experts</p>
                  <p className="text-[11px] font-bold text-[#78350f]">Top Tutors</p>
                </div>
              </div>
 
              <div className="flex items-center gap-2 text-left">
                <div className="p-2 rounded-lg bg-[#022c22]/10 text-[#022c22] border border-[#022c22]/20">
                  <Award className="w-5 h-5 font-bold" />
                </div>
                <div>
                  <p className="text-xs font-black text-[#022c22] uppercase tracking-wider">Confidential</p>
                  <p className="text-[11px] font-bold text-[#78350f]">100% Private</p>
                </div>
              </div>
 
              <div className="flex items-center gap-2 text-left">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-700 border border-amber-500/20">
                  <Shield className="w-5 h-5 font-bold" />
                </div>
                <div>
                  <p className="text-xs font-black text-[#022c22] uppercase tracking-wider">Fair Pricing</p>
                  <p className="text-[11px] font-bold text-[#78350f]">Jobs from $5</p>
                </div>
              </div>
            </div>
 
          </div>
 
          {/* Right Side Interactive Dashboard Mockup */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center z-10">
            
            {/* Visual Backdrops / Glowing rings */}
            <div className="absolute -inset-2 bg-gradient-to-r from-[#022c22]/5 to-[#d97706]/10 rounded-3xl blur-2xl" />
            
            {/* Master Dashboard Frame */}
            <div className="w-full max-w-[420px] bg-[#FDFBF7] border-2 border-[#e7e5e4] rounded-3xl p-6 relative overflow-hidden transition-all duration-300 hover:border-[#d97706] hover:shadow-[0_20px_50px_rgba(2,44,34,0.06)] shadow-xl">
              
              {/* Header inside Mockup */}
              <div className="flex items-center justify-between border-b border-[#e7e5e4] pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-mono text-[#022c22]/70 ml-2">Live Tracker v2.6</span>
                </div>
                <span className="px-2.5 py-1 text-[10px] bg-[#022c22]/10 border border-[#022c22]/20 text-[#022c22] font-extrabold rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-[#022c22] rounded-full animate-ping" /> Online Help
                </span>
              </div>
 
              {/* Box 1: Guide info inside right section */}
              <div className="bg-[#f4f4f0] rounded-2xl border-2 border-dashed border-[#e7e5e4] p-4 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-[#022c22]/80 uppercase tracking-wider">Academic Level Selected</span>
                </div>
                
                <div className="flex items-center gap-3 bg-white border border-[#e7e5e4] rounded-xl p-3">
                  <FileText className="w-8 h-8 text-[#022c22]/60" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black text-[#022c22] truncate">University Syllabus Checklist</p>
                    <p className="text-[10px] text-[#022c22]/80 font-bold flex items-center gap-1">
                      <span>✓ Pricing multiplier active</span>
                    </p>
                  </div>
                </div>
              </div>
 
              {/* Box 2: Live Price Estimate Simulator widget */}
              <div className="mt-4 bg-gradient-to-br from-[#f4f4f0] to-[#FDFBF7] p-4 rounded-2xl border border-[#e7e5e4]">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#78350f] block">Student Budget Multiplier</span>
                    <h3 className="text-3xl font-black font-mono text-[#022c22] mt-1">
                      ${estimatedVal}.00 <span className="text-xs text-[#022c22]/70 font-sans font-normal">USD</span>
                    </h3>
                  </div>
                  <TrendingUp className="w-5 h-5 text-[#d97706] animate-pulse" />
                </div>
                
                {/* Simulated Estimator Slider */}
                <div className="mt-3 font-semibold">
                  <input 
                    type="range" 
                    min="5" 
                    max="150" 
                    step="5"
                    value={estimatedVal}
                    onChange={(e) => setEstimatedVal(Number(e.target.value))}
                    className="w-full h-2 bg-[#e7e5e4] rounded-lg appearance-none cursor-pointer accent-[#022c22]" 
                  />
                  <div className="flex justify-between text-[10px] text-[#022c22]/80 mt-1.5 font-mono font-bold">
                    <span>Homework: $5</span>
                    <span>Dissertation: $150</span>
                  </div>
                </div>
              </div>
 
              {/* Box 3: Progress Tracker */}
              <div className="mt-4 bg-[#f4f4f0]/60 p-4 rounded-xl border border-[#e7e5e4]">
                <span className="text-[10px] uppercase font-black text-[#022c22]/70 block mb-2 tracking-widest">Assignly Live Work Pipeline</span>
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${activeStep >= 1 ? 'bg-[#022c22] animate-pulse' : 'bg-stone-300'}`} />
                    <span className={`text-[11px] font-bold ${activeStep >= 1 ? 'text-[#022c22] font-extrabold' : 'text-[#022c22]/50'}`}>Assigned to Graduate Expert</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${activeStep >= 2 ? 'bg-[#d97706] animate-pulse' : 'bg-stone-300'}`} />
                    <span className={`text-[11px] font-bold ${activeStep >= 2 ? 'text-[#022c22] font-extrabold' : 'text-[#022c22]/50'}`}>Syllabus formatting checks</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${activeStep >= 3 ? 'bg-[#022c22] animate-pulse' : 'bg-stone-300'}`} />
                    <span className={`text-[11px] font-bold ${activeStep >= 3 ? 'text-[#022c22] font-extrabold' : 'text-[#022c22]/50'}`}>Assistance files & guides delivered</span>
                  </div>
                </div>
              </div>
 
              {/* Box 4: Interactive Mock Support Chat Bubble */}
              <div className="mt-4 flex gap-2 items-start">
                <div className="w-8 h-8 rounded-full bg-[#022c22] text-[#FDFBF7] flex items-center justify-center text-[10px] font-black shrink-0 shadow border border-white/20">
                  AS
                </div>
                <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-[#e7e5e4] relative shadow-sm">
                  <p className="text-[11px] text-[#022c22] font-bold leading-relaxed">
                    "We can help formatting any coursework or infographic guides starting at just $5! Send details below."
                  </p>
                  <p className="text-[9px] text-[#d97706] text-right mt-1 font-mono font-black uppercase tracking-wider">Sarah (Assignly Expert Coach)</p>
                </div>
              </div>
 
            </div>
 
            {/* Decorative Floating Badges */}
            <div className="absolute -top-6 -left-6 bg-[#FDFBF7] border-2 border-[#e7e5e4] p-2.5 shadow rounded-xl z-20 animate-bounce flex items-center gap-2" style={{ animationDuration: '6s' }}>
              <div className="bg-[#022c22]/10 p-1.5 rounded-md border border-[#022c22]/20">
                <FileText className="w-4 h-4 font-black text-[#022c22]" />
              </div>
              <span className="text-[11px] font-black text-[#022c22]">PDF Syllabus</span>
            </div>
 
            <div className="absolute top-1/2 -right-8 bg-[#FDFBF7] border-2 border-[#e7e5e4] p-2.5 shadow rounded-xl z-20 animate-bounce flex items-center gap-2" style={{ animationDuration: '8s' }}>
              <div className="bg-[#d97706]/10 p-1.5 rounded-md border border-[#d97706]/20">
                <Award className="w-4 h-4 font-black text-[#d97706]" />
              </div>
              <span className="text-[11px] font-black text-[#022c22]">100% Secure</span>
            </div>
 
          </div>
 
        </div>
      </div>
    </section>
  );
}
