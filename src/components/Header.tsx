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
        ? 'py-3 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200/50' 
        : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="bg-gradient-to-tr from-blue-600 to-emerald-500 p-2 rounded-xl text-white shadow-md shadow-blue-500/20">
              <GraduationCap className="h-6 w-6" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-gray-900">
              Assign<span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">ly</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('how-it-works')} 
              className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection('estimator-form')} 
              className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              Calculate Price
              <span className="px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-emerald-100 text-emerald-700 rounded">Live</span>
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')} 
              className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
            >
              Testimonials
            </button>
            <button 
              onClick={openIntegrityModal}
              className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors cursor-pointer flex items-center gap-1"
            >
              <CheckSquare className="w-4 h-4 text-emerald-500" />
              Academic Honor
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* CTA Button */}
            <button
              onClick={() => scrollToSection('estimator-form')}
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-bold text-gray-900 rounded-xl group bg-gradient-to-br from-blue-600 to-emerald-500 hover:text-white cursor-pointer"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-[10px] group-hover:bg-opacity-0 text-xs uppercase tracking-wider font-semibold">
                Submit Assignment
              </span>
            </button>
          </div>

          {/* Mobile Menu Controls */}
          <div className="flex items-center space-x-3 md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-gray-200/50 shadow-lg absolute top-full left-0 right-0 px-4 py-6 space-y-4 flex flex-col items-stretch">
          <button 
            onClick={() => scrollToSection('how-it-works')} 
            className="text-left py-2 font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            How It Works
          </button>
          <button 
            onClick={() => scrollToSection('estimator-form')} 
            className="text-left py-2 font-medium text-gray-700 hover:text-blue-600 transition-colors flex items-center justify-between"
          >
            <span>Live Cost Estimator</span>
            <span className="px-1.5 py-0.5 text-[9px] uppercase font-bold tracking-wider bg-emerald-100 text-emerald-700 rounded">Calculator</span>
          </button>
          <button 
            onClick={() => scrollToSection('testimonials')} 
            className="text-left py-2 font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            Testimonials
          </button>
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              openIntegrityModal();
            }}
            className="text-left py-2 font-medium text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-1.5"
          >
            <CheckSquare className="w-4 h-4 text-emerald-500" />
            Academic Integrity Notice
          </button>
          <hr className="border-gray-200" />
          <button
            onClick={() => scrollToSection('estimator-form')}
            className="w-full bg-gradient-to-r from-blue-600 to-emerald-500 text-white py-3 px-4 rounded-xl font-medium text-center shadow-md shadow-blue-500/15 hover:shadow-blue-500/25 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            Submit Assignment <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </header>
  );
}
