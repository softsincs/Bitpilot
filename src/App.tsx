import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { TradeSolutions } from './components/TradeSolutions';
import { PricingPage } from './components/PricingPage';
import { TradeDetailPage } from './components/TradeDetailPage';
import { MyAccountPage } from './components/MyAccountPage';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { TrialQuoteModal } from './components/TrialQuoteModal';
import { SystemArchitectureModal } from './components/SystemArchitectureModal';

export function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [trialModalOpen, setTrialModalOpen] = useState<boolean>(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('pro');
  const [archModalOpen, setArchModalOpen] = useState<boolean>(false);
  const [selectedTrade, setSelectedTrade] = useState<string>('General Contractor');
  const [isAccountLoggedIn, setIsAccountLoggedIn] = useState<boolean>(false);

  // Handle URL hash changes
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#pricing') {
        setCurrentPage('pricing');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#account' || hash === '#login' || hash === '#myaccount') {
        setCurrentPage('account');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash.startsWith('#trade-')) {
        setCurrentPage(hash.replace('#', ''));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (!hash || hash === '#' || hash === '#trades' || hash === '#how-it-works') {
        setCurrentPage('home');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateToPricing = () => {
    setCurrentPage('pricing');
    window.location.hash = 'pricing';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setCurrentPage('home');
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToAccount = () => {
    setCurrentPage('account');
    window.location.hash = 'account';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToTrade = (tradeId: string) => {
    const pageId = `trade-${tradeId}`;
    setCurrentPage(pageId);
    window.location.hash = pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTrial = (planId?: string) => {
    if (planId) setSelectedPlanId(planId);
    setTrialModalOpen(true);
  };

  // Determine if top marketing navbar should be visible
  const showMarketingNavbar = !(currentPage === 'account' && isAccountLoggedIn);

  return (
    <div className="min-h-screen bg-white text-[#344054] selection:bg-[#006db8] selection:text-white relative font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* 1. BidPilot AI Marketing Navbar (Hidden when logged into Hub) */}
      {showMarketingNavbar && (
        <Navbar
          currentPage={currentPage}
          onNavigatePricing={navigateToPricing}
          onNavigateHome={navigateToHome}
          onNavigateTrade={navigateToTrade}
          onNavigateAccount={navigateToAccount}
          onOpenTrial={handleOpenTrial}
          onOpenArch={() => setArchModalOpen(true)}
        />
      )}

      {/* Dynamic Page Router */}
      {currentPage === 'pricing' ? (
        /* DEDICATED PRICING PAGE */
        <main>
          <PricingPage
            onOpenTrial={handleOpenTrial}
            onOpenArch={() => setArchModalOpen(true)}
            onNavigateHome={navigateToHome}
          />
        </main>
      ) : currentPage === 'account' ? (
        /* DEDICATED MY ACCOUNT / LOGIN / HUB WORKSPACE PAGE */
        <main>
          <MyAccountPage
            isLoggedIn={isAccountLoggedIn}
            setIsLoggedIn={setIsAccountLoggedIn}
            onNavigateHome={navigateToHome}
            onOpenTrial={handleOpenTrial}
          />
        </main>
      ) : currentPage.startsWith('trade-') ? (
        /* DEDICATED TRADE PAGE */
        <main>
          <TradeDetailPage
            tradeId={currentPage.replace('trade-', '')}
            onOpenTrial={handleOpenTrial}
            onNavigateHome={navigateToHome}
            onNavigatePricing={navigateToPricing}
          />
        </main>
      ) : (
        /* FULL HOMEPAGE */
        <main>
          {/* 2. Hero Section */}
          <Hero
            onOpenTrial={handleOpenTrial}
            onOpenArch={() => setArchModalOpen(true)}
          />

          {/* 3. Takeoff Software Built for Speed and Accuracy */}
          <div id="how-it-works">
            <HowItWorks
              onOpenTrial={() => handleOpenTrial('pro')}
            />
          </div>

          {/* 4. BidPilot AI for Trades */}
          <div id="trades">
            <TradeSolutions
              selectedTrade={selectedTrade}
              onSelectTrade={(trade) => setSelectedTrade(trade)}
              onOpenTrial={() => handleOpenTrial('pro')}
            />
          </div>

          {/* 5. Customer Testimonials */}
          <Testimonials />
        </main>
      )}

      {/* Footer (Only on public marketing pages) */}
      {showMarketingNavbar && (
        <Footer
          onOpenTrial={() => handleOpenTrial('pro')}
          onOpenArch={() => setArchModalOpen(true)}
        />
      )}

      {/* Interactive Free Trial / Instant Quote Modal */}
      <TrialQuoteModal
        isOpen={trialModalOpen}
        onClose={() => setTrialModalOpen(false)}
        selectedPlanId={selectedPlanId}
      />

      {/* System Architecture Viewer Modal */}
      <SystemArchitectureModal
        isOpen={archModalOpen}
        onClose={() => setArchModalOpen(false)}
      />
    </div>
  );
}
export default App;
