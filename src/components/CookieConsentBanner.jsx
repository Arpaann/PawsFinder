import React, { useState } from 'react';
import { ShieldCheck, X } from 'lucide-react';

const COOKIE_STORAGE_KEY = 'pawsfinder_cookie_consent';

export const CookieConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(() => {
    try {
      return !localStorage.getItem(COOKIE_STORAGE_KEY);
    } catch (_err) {
      return false;
    }
  });
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(true);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify({
        essential: true,
        analytics: true,
        timestamp: new Date().toISOString()
      }));
    } catch (_err) {
      // Ignore storage error
    }
    setShowBanner(false);
  };

  const handleEssentialOnly = () => {
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify({
        essential: true,
        analytics: false,
        timestamp: new Date().toISOString()
      }));
    } catch (_err) {
      // Ignore storage error
    }
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify({
        essential: true,
        analytics: analyticsConsent,
        timestamp: new Date().toISOString()
      }));
    } catch (_err) {
      // Ignore storage error
    }
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <aside
      aria-label="Cookie and Privacy Consent"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 bg-slate-950/95 backdrop-blur-md border border-slate-800 p-5 rounded-2xl shadow-2xl text-slate-300 text-xs space-y-4 font-sans no-print"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0" />
          <h3 className="font-bold text-white text-sm">Privacy & Cookie Choices</h3>
        </div>
        <button
          onClick={handleEssentialOnly}
          aria-label="Close cookie banner with essential settings only"
          className="text-slate-400 hover:text-white p-1 rounded-lg"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-slate-400 leading-relaxed text-[11px]">
        PawsFinder uses local storage to save your pet listings, currency preferences (NPR/USD), and essential site functionality. We respect your data privacy.
      </p>

      {showPreferences && (
        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-2 text-[11px] animate-fadeIn">
          <div className="flex items-center justify-between">
            <span>Essential Storage (Required for reports)</span>
            <span className="text-emerald-400 font-bold">Always Active</span>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-800">
            <span>Performance & Analytics</span>
            <input
              type="checkbox"
              checked={analyticsConsent}
              onChange={(e) => setAnalyticsConsent(e.target.checked)}
              className="accent-indigo-500 rounded cursor-pointer"
            />
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 pt-1">
        <button
          onClick={handleAcceptAll}
          className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-3 rounded-xl transition-colors text-center text-xs"
        >
          Accept All
        </button>

        <button
          onClick={handleEssentialOnly}
          className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2 px-3 rounded-xl transition-colors text-xs"
        >
          Essential Only
        </button>

        <button
          onClick={() => {
            if (showPreferences) {
              handleSavePreferences();
            } else {
              setShowPreferences(true);
            }
          }}
          className="text-indigo-400 hover:underline text-[11px] font-semibold px-1"
        >
          {showPreferences ? 'Save Options' : 'Preferences'}
        </button>
      </div>
    </aside>
  );
};
