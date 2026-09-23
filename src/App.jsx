import React, { useState, useEffect, lazy, Suspense } from 'react';
import { PawsProvider } from './context/PawsContext';
import { RunningDogBanner } from './components/RunningDogBanner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileNav } from './components/MobileNav';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { PwaInstallPrompt } from './components/PwaInstallPrompt';

// ─── Lazy-loaded pages (code splitting — each page loads only when visited) ───
const HomePage    = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const FeedPage    = lazy(() => import('./pages/FeedPage').then(m => ({ default: m.FeedPage })));
const ReportPage  = lazy(() => import('./pages/ReportPage').then(m => ({ default: m.ReportPage })));
const DonatePage  = lazy(() => import('./pages/DonatePage').then(m => ({ default: m.DonatePage })));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then(m => ({ default: m.PrivacyPage })));
const TermsPage   = lazy(() => import('./pages/TermsPage').then(m => ({ default: m.TermsPage })));
const RefundPage  = lazy(() => import('./pages/RefundPage').then(m => ({ default: m.RefundPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

// ─── Lazy-loaded modals (only downloaded when actually opened) ─────────────
const PetPosterModal  = lazy(() => import('./components/PetPosterModal').then(m => ({ default: m.PetPosterModal })));
const AdminPanelModal = lazy(() => import('./components/AdminPanelModal').then(m => ({ default: m.AdminPanelModal })));

const VALID_TABS = ['home', 'feed', 'report', 'donate', 'privacy', 'terms', 'refund-policy'];

// ─── Page title + description map ────────────────────────────────────────────
const PAGE_META = {
  home:           { title: 'PawsFinder | Lost Pet Recovery & Neighborhood Rescue Network',
                    desc: 'PawsFinder helps reunite lost pets with their families through community alerts and print-ready street posters — serving Nepal and worldwide.' },
  feed:           { title: 'PawsFinder | Browse Missing Pets Near You',
                    desc: 'Search the PawsFinder community feed for missing dogs, cats, and other pets. Filter by area, breed, or date.' },
  report:         { title: 'PawsFinder | Report a Missing Pet & Get a Free Street Poster',
                    desc: 'Submit a missing pet report and instantly generate a print-ready A4 poster you can share online or paste in your neighborhood.' },
  donate:         { title: 'PawsFinder | Support Rescue Efforts — Donate',
                    desc: 'Your contribution helps cover poster printing, community outreach, and platform costs. Every bit counts.' },
  privacy:        { title: 'PawsFinder | Privacy Policy',
                    desc: 'Learn how PawsFinder collects, stores, and protects information provided through this platform.' },
  terms:          { title: 'PawsFinder | Terms & Conditions',
                    desc: 'Read the terms and conditions that govern your use of the PawsFinder platform and services.' },
  'refund-policy':{ title: 'PawsFinder | Refund & Contribution Policy',
                    desc: 'Our policy on contributions, donations, and eligible refunds for PawsFinder services.' },
  notfound:       { title: 'PawsFinder | 404 — Page Not Found',
                    desc: 'The page you are looking for does not exist. Return to PawsFinder and find your way home.' },
};

// ─── Minimal page spinner ────────────────────────────────────────────────────
function PageLoader() {
  return (
    <div
      role="status"
      aria-label="Loading page"
      className="flex items-center justify-center min-h-[40vh]"
    >
      <div className="flex flex-col items-center gap-3 text-slate-400">
        <svg className="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"/>
        </svg>
        <span className="text-sm">Loading…</span>
      </div>
    </div>
  );
}

// ─── Structured data (Organization + WebSite schema, injected once) ──────────
function StructuredData() {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://pawsfinder.org';
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": "PawsFinder",
        "url": siteUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${siteUrl}/favicon.svg`
        },
        "description": "PawsFinder is a lost-pet recovery and community rescue platform serving Nepal and international users.",
        "sameAs": []
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": siteUrl,
        "name": "PawsFinder",
        "publisher": { "@id": `${siteUrl}/#organization` },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${siteUrl}/#feed`
          },
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}

// ─── Main application ─────────────────────────────────────────────────────────
function MainApp() {
  const [activeTab, setActiveTabState] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    if (VALID_TABS.includes(hash)) return hash;
    return 'home';
  });

  const [selectedPet, setSelectedPet] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Tab switcher with URL hash sync & scroll-to-top
  const setActiveTab = (tab) => {
    if (VALID_TABS.includes(tab)) {
      setActiveTabState(tab);
      window.location.hash = tab === 'home' ? '' : `#${tab}`;
    } else {
      setActiveTabState('notfound');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync browser back/forward navigation
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

  // Update document.title and meta description per page
  useEffect(() => {
    const meta = PAGE_META[activeTab] || PAGE_META.home;
    document.title = meta.title;

    const descTag = document.querySelector('meta[name="description"]');
    if (descTag) descTag.setAttribute('content', meta.desc);

    // Update canonical URL
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    const siteUrl = import.meta.env.VITE_SITE_URL || 'https://pawsfinder.org';
    if (canonicalLink) {
      canonicalLink.setAttribute('href',
        activeTab === 'home' ? `${siteUrl}/` : `${siteUrl}/#${activeTab}`
      );
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">

      {/* Structured data injected into <head> once */}
      <StructuredData />

      {/* 1. Animated top banner + ticker */}
      <RunningDogBanner onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* 2. Main navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Skip to main content (accessibility) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[9999] focus:bg-indigo-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm font-semibold"
      >
        Skip to main content
      </a>

      {/* 3. Page content */}
      <main className="flex-1" id="main-content" role="main">
        <Suspense fallback={<PageLoader />}>
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
        </Suspense>
      </main>

      {/* 4. Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* 5. Mobile bottom navigation */}
      <MobileNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* 6. Modals — lazy-loaded, only rendered when needed */}
      <Suspense fallback={null}>
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
      </Suspense>

      {/* 7. Cookie consent & PWA Installation */}
      <CookieConsentBanner />
      <PwaInstallPrompt />
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
