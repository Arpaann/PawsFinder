import React from 'react';
import { usePaws } from '../context/PawsContext';
import { PlusCircle, Search, ShieldCheck, Heart, Home, AlertTriangle } from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab, onOpenAdmin }) => {
  const { siteConfig, isAdmin } = usePaws();

  return (
    <header className="bg-slate-900/95 backdrop-blur-md border-b border-slate-800 sticky top-[72px] z-30 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-xl"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setActiveTab('home')}
          >
            <div className="h-12 w-auto max-w-[240px] flex items-center overflow-hidden transition-transform group-hover:scale-105">
              <img
                src={siteConfig.logoUrl}
                alt={`${siteConfig.appTitle} logo`}
                className="h-full w-auto object-contain drop-shadow-md"
                loading="eager"
              />
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-950/60 p-1.5 rounded-full border border-slate-800/80" aria-label="Main Navigation">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                activeTab === 'home'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>

            <button
              onClick={() => setActiveTab('feed')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                activeTab === 'feed'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Lost Dogs Directory</span>
            </button>

            <button
              onClick={() => setActiveTab('report')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-red-500 ${
                activeTab === 'report'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                  : 'text-amber-300 hover:text-white hover:bg-amber-950/40'
              }`}
            >
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Report Missing Dog</span>
            </button>

            <button
              onClick={() => setActiveTab('donate')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-rose-500 ${
                activeTab === 'donate'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Heart className="w-4 h-4 text-rose-400" />
              <span>Support & QR Hub</span>
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('report')}
              className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-xl shadow-red-950/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <PlusCircle className="w-5 h-5" />
              <span className="hidden sm:inline">Report Lost Pet</span>
              <span className="sm:hidden">Report</span>
            </button>

            <button
              onClick={onOpenAdmin}
              aria-label={isAdmin ? "Open Admin Panel (Authenticated)" : "Open Admin Login"}
              className={`p-2.5 rounded-full border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                isAdmin
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/50 hover:bg-amber-500/30'
                  : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white hover:border-slate-500'
              }`}
            >
              <ShieldCheck className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
