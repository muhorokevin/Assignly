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
      
      {/* Decorative Floating Gradients */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-blue-400/20 rounded-full blur-blob" />
      <div className="absolute top-1/3 right-1/10 w-[450px] h-[450px] bg-emerald-400/20 rounded-full blur-blob" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side Content */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
            
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-1.5 self-center lg:self-start px-3 py-1.5 mb-6 rounded-full bg-emerald-50 border border-emerald-100 text-xs font-semibold text-emerald-700">
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-emerald-500" />
              <span>World-Class Academic Mentorship & Coaching by Assignly</span>
            </div>

            {/* Core Titles */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-gray-900 tracking-tight leading-tight">
              Academic Support <br />
              <span className="text-gray-900">Made Simple.</span>
            </h1>

            {/* Radiant Sub-tagline */}
            <h2 className="mt-4 font-display font-bold text-2xl sm:text-3xl bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent tracking-wide">
              Fast. Affordable. Reliable.
            </h2>

            {/* Pitch Intro */}
            <p className="mt-6 text-base sm:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Upload your assignment outline, project parameters, dissertation proposal, or basic homework assignments and receive highly customized, ethical academic support from verified Global Subject Experts.
            </p>

            {/* Action CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={handleScrollToForm}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-blue-600 to-emerald-500 hover:opacity-90 text-white shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer text-base hover:-translate-y-0.5 duration-200"
              >
                Submit Assignment <ArrowRight className="h-5 w-5" />
              </button>
              
              <button
                onClick={handleWhatsAppChat}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 transition-all flex items-center justify-center gap-2 cursor-pointer text-base hover:-translate-y-0.5 duration-200 shadow-sm"
              >
                <MessageSquare className="h-5 w-5 text-emerald-500 fill-emerald-500/10" />
                Chat on WhatsApp
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 pt-8 border-t border-gray-200/85 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2 text-left">
                <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">Fast Response</p>
                  <p className="text-[10px] text-gray-500">Quotes in minutes</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-left">
                <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">Global Experts</p>
                  <p className="text-[10px] text-gray-500">Top-tier graduates</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-left">
                <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">Confidential</p>
                  <p className="text-[10px] text-gray-500">100% private service</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-left">
                <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">Fair Pricing</p>
                  <p className="text-[10px] text-gray-500">From just $5.00</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Side Interactive Dashboard Mockup */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center">
            
            {/* Visual Backdrops / Glowing rings */}
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/5 to-emerald-500/5 rounded-3xl blur-xl" />
            
            {/* Master Dashboard Frame */}
            <div className="w-full max-w-[420px] bento-card p-6 relative overflow-hidden transition-all duration-300 scale-95 hover:scale-100 bg-white">
              
              {/* Header inside Mockup */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="text-xs font-mono text-gray-400 ml-2">Assignly Tracker v2.6</span>
                </div>
                <span className="px-2 py-0.5 text-[10px] bg-emerald-50 text-emerald-700 font-bold rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Active Support
                </span>
              </div>

              {/* Box 1: File Uploader Simulator */}
              <div className="bg-slate-50/50 rounded-2xl border border-dashed border-gray-200 p-4 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-500">Coursework File</span>
                  {uploadedFileName && (
                    <button 
                      onClick={() => setUploadedFileName(null)}
                      className="text-[10px] text-red-500 font-bold hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </div>
                
                {!uploadedFileName ? (
                  <div className="flex flex-col items-center justify-center py-4 cursor-pointer" onClick={() => setUploadedFileName("Syllabus_Outline.pdf")}>
                    <FileText className="w-8 h-8 text-blue-500 mb-1.5 animate-bounce" />
                    <p className="text-xs font-bold text-gray-800">Click to upload file</p>
                    <p className="text-[10px] text-gray-400">All student documents supported</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 bg-white border border-emerald-500/20 rounded-xl p-2.5">
                    <FileText className="w-8 h-8 text-emerald-500" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-800 truncate">{uploadedFileName}</p>
                      <p className="text-[10px] text-emerald-600 font-semibold">Analyzed price range ready</p>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                )}
              </div>

              {/* Box 2: Live Price Estimate Simulator widget */}
              <div className="mt-4 bg-gradient-to-br from-blue-50/50 to-emerald-50/30 p-4 rounded-2xl border border-blue-100/60">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-blue-700">Student Budget Multiplier</span>
                    <h3 className="text-2xl font-extrabold font-mono text-gray-900 mt-1">
                      ${estimatedVal}.00 <span className="text-xs text-slate-500 font-sans font-normal">USD</span>
                    </h3>
                  </div>
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
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
                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                  />
                  <div className="flex justify-between text-[9px] text-gray-400 mt-1 font-mono">
                    <span>Homework Job: $5</span>
                    <span>Standard Guide: $150</span>
                  </div>
                </div>
              </div>

              {/* Box 3: Progress Tracker */}
              <div className="mt-4 bg-slate-50/50 p-4 rounded-xl border border-gray-200">
                <span className="text-[10px] uppercase font-bold text-gray-400 block mb-2">Assignly Pipeline</span>
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${activeStep >= 1 ? 'bg-emerald-500 animate-pulse' : 'bg-gray-300'}`} />
                    <span className={`text-[11px] font-medium ${activeStep >= 1 ? 'text-gray-800 font-bold' : 'text-gray-400'}`}>Assigned to Graduate Expert</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${activeStep >= 2 ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'}`} />
                    <span className={`text-[11px] font-medium ${activeStep >= 2 ? 'text-gray-800 font-bold' : 'text-gray-400'}`}>Syllabus formatting checks</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${activeStep >= 3 ? 'bg-emerald-500 animate-pulse' : 'bg-gray-300'}`} />
                    <span className={`text-[11px] font-medium ${activeStep >= 3 ? 'text-gray-800 font-bold' : 'text-gray-400'}`}>Assistance files & guides delivered</span>
                  </div>
                </div>
              </div>

              {/* Box 4: Interactive Mock Support Chat Bubble */}
              <div className="mt-4 flex gap-2 items-start">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-emerald-500 flex items-center justify-center text-[10px] text-white font-bold shrink-0 shadow-md">
                  AS
                </div>
                <div className="bg-blue-50/70 p-2.5 rounded-2xl rounded-tl-none border border-blue-100/60 relative">
                  <p className="text-[11px] text-gray-800 font-medium">
                    "We can help formatting any coursework or infographic guides starting at just $5! Send details below."
                  </p>
                  <p className="text-[8px] text-blue-600 text-right mt-1 font-mono font-bold">Sarah (Assignly Support Expert)</p>
                </div>
              </div>

            </div>

            {/* Decorative Floating Icons */}
            <div className="absolute -top-6 -left-6 bg-white border border-gray-150 p-2.5 shadow-lg rounded-xl z-20 animate-bounce flex items-center gap-2" style={{ animationDuration: '6s' }}>
              <div className="bg-red-50 p-1 rounded-md text-red-500">
                <FileText className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-gray-800">PDF Syllabus</span>
            </div>

            <div className="absolute top-1/2 -right-8 bg-white border border-gray-150 p-2.5 shadow-lg rounded-xl z-20 animate-bounce flex items-center gap-2" style={{ animationDuration: '8s' }}>
              <div className="bg-emerald-50 p-1 rounded-md text-emerald-500">
                <Award className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-gray-800">100% Secure</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
