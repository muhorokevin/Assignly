import React, { useState, useEffect } from 'react';
import { GraduationCap, ArrowRight, Menu, X, CheckSquare } from 'lucide-react';

interface HeaderProps {
  openIntegrityModal: () => void;
}

export default function Header({ openIntegrityModal }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'py-3 bg-[#FDFBF7]/90 backdrop-blur-xl border-b border-[#e7e5e4] shadow-[0_8px_32px_rgba(2,44,34,0.06)]' 
        : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="bg-[#022c22] p-2 rounded-xl text-white shadow-lg shadow-blue-500/25">
              <GraduationCap className="h-6 w-6 text-[#d97706]" />
            </div>
            <span className="font-display font-black text-2xl tracking-tighter text-[#022c22]">
              Assign<span className="text-[#d97706]">ly</span>
            </span>
          </div>
 
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('how-it-works')} 
              className="text-sm font-extrabold text-[#022c22]/80 hover:text-[#d97706] transition-colors cursor-pointer tracking-wide"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection('estimator-form')} 
              className="text-sm font-extrabold text-[#022c22]/80 hover:text-[#d97706] transition-colors cursor-pointer flex items-center gap-1.5 tracking-wide"
            >
              Calculate Price
              <span className="px-1.5 py-0.5 text-[10px] uppercase font-black tracking-widest bg-[#d97706] text-[#FDFBF7] rounded-md animate-pulse">Live</span>
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')} 
              className="text-sm font-extrabold text-[#022c22]/80 hover:text-[#d97706] transition-colors cursor-pointer tracking-wide"
            >
              Testimonials
            </button>
            <button 
              onClick={openIntegrityModal}
              className="text-sm font-extrabold text-[#022c22]/80 hover:text-[#d97706] transition-colors cursor-pointer flex items-center gap-1 tracking-wide"
            >
              <CheckSquare className="w-4 h-4 text-[#d97706] font-extrabold" />
              Academic Honor
            </button>
          </nav>
 
          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* CTA Button */}
            <button
              onClick={() => scrollToSection('estimator-form')}
              className="px-5 py-2.5 bg-[#022c22] text-[#FDFBF7] text-xs uppercase tracking-widest font-black rounded-xl border border-[#d97706] hover:bg-[#023126] cursor-pointer transition-all duration-300 shadow-md"
            >
              Submit Assignment
            </button>
          </div>
 
          {/* Mobile Menu Controls */}
          <div className="flex items-center space-x-3 md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-200 hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
 
        </div>
      </div>
 
      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#FDFBF7] border-b border-[#e7e5e4] shadow-2xl absolute top-full left-0 right-0 px-5 py-6 space-y-4 flex flex-col items-stretch backdrop-blur-2xl">
          <button 
            onClick={() => scrollToSection('how-it-works')} 
            className="text-[#022c22] font-black hover:text-[#d97706] transition-colors text-sm uppercase tracking-wider text-left"
          >
            How It Works
          </button>
          <button 
            onClick={() => scrollToSection('estimator-form')} 
            className="text-[#022c22] font-black hover:text-[#d97706] transition-colors flex items-center justify-between text-sm uppercase tracking-wider text-left"
          >
            <span>Live Cost Estimator</span>
            <span className="px-2 py-0.5 text-[9px] uppercase font-black tracking-widest bg-[#d97706] text-[#FDFBF7] rounded">Calculator</span>
          </button>
          <button 
            onClick={() => scrollToSection('testimonials')} 
            className="text-[#022c22] font-black hover:text-[#d97706] transition-colors text-sm uppercase tracking-wider text-left"
          >
            Testimonials
          </button>
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              openIntegrityModal();
            }}
            className="text-[#022c22] font-black hover:text-[#d97706] transition-colors flex items-center gap-1.5 text-sm uppercase tracking-wider text-left"
          >
            <CheckSquare className="w-4 h-4 text-[#d97706]" />
            Academic Integrity Notice
          </button>
          <hr className="border-[#e7e5e4]" />
          <button
            onClick={() => scrollToSection('estimator-form')}
            className="w-full bg-[#022c22] text-[#FDFBF7] py-3.5 px-4 rounded-xl font-black text-center shadow-lg border border-[#d97706] transition-all text-sm uppercase tracking-widest cursor-pointer flex items-center justify-center gap-1.5"
          >
            Submit Assignment <ArrowRight className="h-4 w-4 inline-block ml-1" />
          </button>
        </div>
      )}
    </header>
  );
}
