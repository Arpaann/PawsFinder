import React, { useState, useEffect } from 'react';
import { PawsProvider } from './context/PawsContext';
import { RunningDogBanner } from './components/RunningDogBanner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileNav } from './components/MobileNav';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { HomePage } from './pages/HomePage';
import { FeedPage } from './pages/FeedPage';
import { ReportPage } from './pages/ReportPage';
import { DonatePage } from './pages/DonatePage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { RefundPage } from './pages/RefundPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PetPosterModal } from './components/PetPosterModal';
import { AdminPanelModal } from './components/AdminPanelModal';

const VALID_TABS = ['home', 'feed', 'report', 'donate', 'privacy', 'terms', 'refund-policy'];

function MainApp() {
  const [activeTab, setActiveTabState] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    if (VALID_TABS.includes(hash)) return hash;
    return 'home';
  });

  const [selectedPet, setSelectedPet] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Tab switcher with location hash & title update
  const setActiveTab = (tab) => {
    if (VALID_TABS.includes(tab)) {
      setActiveTabState(tab);
      window.location.hash = tab === 'home' ? '' : `#${tab}`;
    } else {
      setActiveTabState('notfound');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash || hash === 'home') {
        setActiveTabState('home');
      } else if (VALID_TABS.includes(hash)) {
        setActiveTabState(hash);
      } else {
        setActiveTabState('notfound');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update document title for SEO
  useEffect(() => {
    const titles = {
      home: "PawsFinder | Lost Pet Recovery & Neighborhood Rescue Network",
      feed: "PawsFinder | Search Missing Pets Directory",
      report: "PawsFinder | Report a Missing Pet & Create Street Poster",
      donate: "PawsFinder | Support & Donation QR Hub",
      privacy: "PawsFinder | Privacy Policy",
      terms: "PawsFinder | Terms & Conditions",
      'refund-policy': "PawsFinder | Refund & Contribution Policy",
      notfound: "PawsFinder | 404 Page Not Found"
    };
    document.title = titles[activeTab] || titles.home;
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      
      {/* 1. Animated Running Dog Banner & Top Ticker */}
      <RunningDogBanner onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* 2. Main Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* 3. Dynamic Page Views */}
      <main className="flex-1" id="main-content" role="main">
        {activeTab === 'home' && (
          <HomePage
            setActiveTab={setActiveTab}
            onSelectPet={(pet) => setSelectedPet(pet)}
          />
        )}

        {activeTab === 'feed' && (
          <FeedPage
            setActiveTab={setActiveTab}
            onSelectPet={(pet) => setSelectedPet(pet)}
          />
        )}

        {activeTab === 'report' && (
          <ReportPage
            setActiveTab={setActiveTab}
            onSelectPet={(pet) => setSelectedPet(pet)}
          />
        )}

        {activeTab === 'donate' && (
          <DonatePage setActiveTab={setActiveTab} />
        )}

        {activeTab === 'privacy' && (
          <PrivacyPage setActiveTab={setActiveTab} />
        )}

        {activeTab === 'terms' && (
          <TermsPage setActiveTab={setActiveTab} />
        )}

        {activeTab === 'refund-policy' && (
          <RefundPage setActiveTab={setActiveTab} />
        )}

        {activeTab === 'notfound' && (
          <NotFoundPage setActiveTab={setActiveTab} />
        )}
      </main>

      {/* 4. Global Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* 5. Mobile Bottom Touch Nav */}
      <MobileNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* 6. Modals */}
      {selectedPet && (
        <PetPosterModal
          pet={selectedPet}
          onClose={() => setSelectedPet(null)}
        />
      )}

      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* 7. Cookie Consent Banner */}
      <CookieConsentBanner />

    </div>
  );
}

export default function App() {
  return (
    <PawsProvider>
      <MainApp />
    </PawsProvider>
  );
}
