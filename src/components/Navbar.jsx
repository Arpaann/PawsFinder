import React from 'react';
import { usePaws } from '../context/PawsContext';
import { PlusCircle, Search, ShieldCheck, Home, Heart } from 'lucide-react';
import { BRAND } from '../data/brandConfig';

const NAV_ITEMS = [
  { key: 'home',   label: 'Home',           Icon: Home },
  { key: 'feed',   label: 'Lost Dogs',      Icon: Search },
  { key: 'donate', label: 'Support',        Icon: Heart },
];

export const Navbar = ({ activeTab, setActiveTab, onOpenAdmin }) => {
  const { siteConfig, isAdmin } = usePaws();

  return (
    <header className="bg-slate-900/95 backdrop-blur-md border-b border-slate-800/60 sticky top-[88px] z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Brand Logo */}
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-xl shrink-0"
            aria-label="PawsFinder — go to homepage"
          >
            <div className="h-10 w-auto max-w-[200px] flex items-center overflow-hidden">
              <img
                src={siteConfig.logoUrl}
                alt="PawsFinder logo"
                className="h-full w-auto object-contain"
                loading="eager"
              />
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-[10px] font-semibold text-slate-400 italic leading-none">
                "{BRAND.tagline}"
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-0.5 bg-slate-950/70 p-1 rounded-full border border-slate-800/80"
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map(({ key, label, Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                aria-current={activeTab === key ? 'page' : undefined}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-400 ${
                  activeTab === key
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Report CTA — always visible */}
            <button
              onClick={() => setActiveTab('report')}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg shadow-red-950/40 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
              aria-label="Report a missing dog"
            >
              <PlusCircle className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">Report Lost Dog</span>
              <span className="sm:hidden">Report</span>
            </button>

            {/* Admin button */}
            <button
              onClick={onOpenAdmin}
              aria-label={isAdmin ? 'Admin panel (authenticated)' : 'Admin login'}
              className={`p-2 rounded-full border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                isAdmin
                  ? 'bg-amber-500/15 text-amber-400 border-amber-600/40 hover:bg-amber-500/25'
                  : 'bg-slate-800/60 text-slate-500 border-slate-700 hover:text-white hover:border-slate-500'
              }`}
            >
              <ShieldCheck className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
