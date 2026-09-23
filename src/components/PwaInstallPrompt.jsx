import React, { useState, useEffect } from 'react';
import { Smartphone, Download, X, Share } from 'lucide-react';

const DISMISS_STORAGE_KEY = 'pawsfinder_pwa_prompt_dismissed';

export const PwaInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIos] = useState(() => {
    if (typeof window === 'undefined') return false;
    const ua = window.navigator.userAgent;
    const isIosDevice = /iphone|ipad|ipod/i.test(ua);
    const isSafari = /safari/i.test(ua) && !/chrome|crios|fxios/i.test(ua);
    return Boolean(isIosDevice && isSafari);
  });

  const [showPrompt, setShowPrompt] = useState(() => {
    if (typeof window === 'undefined') return false;
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    if (isStandalone) return false;

    try {
      const dismissedAt = localStorage.getItem(DISMISS_STORAGE_KEY);
      if (dismissedAt) {
        const days = (Date.now() - parseInt(dismissedAt, 10)) / (1000 * 60 * 60 * 24);
        if (days < 7) return false;
      }
    } catch {
      // Ignore storage errors
    }

    const ua = window.navigator.userAgent;
    const isIosDevice = /iphone|ipad|ipod/i.test(ua);
    const isSafari = /safari/i.test(ua) && !/chrome|crios|fxios/i.test(ua);
    return Boolean(isIosDevice && isSafari);
  });

  const [showIosGuide, setShowIosGuide] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIos) {
      setShowIosGuide(!showIosGuide);
      return;
    }

    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    try {
      localStorage.setItem(DISMISS_STORAGE_KEY, Date.now().toString());
    } catch {
      // Ignore storage error
    }
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <aside
      aria-label="App Installation Prompt"
      className="fixed bottom-20 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-sm z-30 bg-slate-900/95 backdrop-blur-xl border border-indigo-500/40 p-4 rounded-2xl shadow-2xl text-slate-100 text-xs space-y-3 font-sans animate-fadeIn no-print"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600/30 border border-indigo-500/50 text-indigo-400 rounded-xl flex items-center justify-center shrink-0 shadow-inner">
            <Smartphone className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">Install PawsFinder App</h3>
            <p className="text-slate-400 text-[11px] leading-tight">Fast access, offline posters & instant rescue alerts.</p>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          aria-label="Dismiss app install banner"
          className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {isIos && showIosGuide && (
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5 text-[11px] text-slate-300">
          <p className="font-semibold text-white flex items-center gap-1.5">
            <Share className="w-3.5 h-3.5 text-indigo-400" /> How to install on iOS Safari:
          </p>
          <ol className="list-decimal list-inside space-y-1 text-slate-400">
            <li>Tap the <span className="text-white font-medium">Share</span> icon in Safari navigation bar.</li>
            <li>Scroll down and tap <span className="text-indigo-400 font-bold">Add to Home Screen</span>.</li>
          </ol>
        </div>
      )}

      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={handleInstallClick}
          className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold py-2 px-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-xs active:scale-95"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{isIos ? (showIosGuide ? 'Hide Steps' : 'Install Instructions') : 'Add to Home Screen'}</span>
        </button>

        <button
          onClick={handleDismiss}
          className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2 px-3 rounded-xl transition-colors text-xs"
        >
          Not Now
        </button>
      </div>
    </aside>
  );
};
