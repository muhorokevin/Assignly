import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import AssignmentForm from './components/AssignmentForm';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import HistoryList from './components/HistoryList';
import IntegrityModal from './components/IntegrityModal';
import Footer from './components/Footer';
import { TermsOfUseModal, PrivacyPolicyModal } from './components/LegalModals';

export default function App() {
  // State to toggle Academic integrity honor code modal
  const [isIntegrityModalOpen, setIsIntegrityModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  // Sync state to force history list to reload when assignments are submitted
  const [historyRefreshCounter, setHistoryRefreshCounter] = useState(0);

  // Force clean light mode on initial load
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('unihandler_theme', 'light');
  }, []);

  const notifySubmissionsUpdated = () => {
    setHistoryRefreshCounter(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans transition-colors duration-300 relative selection:bg-[#022c22]/10 selection:text-[#022c22]">
      
      {/* Bento Grid Dynamic Ambient Background and blurs */}
      <div className="bento-bg-blur" />
      
      {/* Glow points matching modern visual styles */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#022c22]/5 to-[#d97706]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[20%] left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#d97706]/5 to-[#022c22]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Panel */}
      <Header 
        openIntegrityModal={() => setIsIntegrityModalOpen(true)} 
      />

      {/* Hero Presentation */}
      <main className="relative">
        
        {/* Hero Section */}
        <Hero />

        {/* Dynamic Statistical Numbers Banner */}
        <Stats />

        {/* Step-by-Step Cycle Guide */}
        <HowItWorks />

        {/* Core Estimator Calculation & Upload Form */}
        <AssignmentForm onSubmissionsUpdated={notifySubmissionsUpdated} />

        {/* Expandable client database logs */}
        <HistoryList 
          refreshTrigger={historyRefreshCounter} 
          onSubmissionsUpdated={notifySubmissionsUpdated} 
        />

        {/* Regional Student Testimonial Slider */}
        <Testimonials />

      </main>

      {/* Footer Section */}
      <Footer 
        openIntegrityModal={() => setIsIntegrityModalOpen(true)}
        openTermsModal={() => setIsTermsModalOpen(true)}
        openPrivacyModal={() => setIsPrivacyModalOpen(true)}
      />

      {/* Academic Honor Modal Panel */}
      <IntegrityModal 
        isOpen={isIntegrityModalOpen} 
        onClose={() => setIsIntegrityModalOpen(false)} 
      />

      {/* Legal terms & privacy popups */}
      <TermsOfUseModal 
        isOpen={isTermsModalOpen} 
        onClose={() => setIsTermsModalOpen(false)} 
      />
      <PrivacyPolicyModal 
        isOpen={isPrivacyModalOpen} 
        onClose={() => setIsPrivacyModalOpen(false)} 
      />

    </div>
  );
}
