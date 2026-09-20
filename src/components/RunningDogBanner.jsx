import React from 'react';
import { usePaws } from '../context/PawsContext';
import { PhoneCall, MessageCircle, Lock, Unlock, Globe, Heart } from 'lucide-react';

export const RunningDogBanner = ({ onOpenAdmin }) => {
  const { siteConfig, currency, currencies, changeCurrency, isAdmin, logoutAdmin } = usePaws();

  return (
    <div className="bg-slate-950 border-b border-indigo-900/50 sticky top-0 z-40 shadow-xl overflow-hidden">
      {/* 1. Top Community Alert Ticker */}
      <div className="bg-gradient-to-r from-red-900/90 via-indigo-950 to-red-900/90 py-2 px-4 text-xs font-medium text-slate-200 border-b border-red-500/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          
          {/* Tagline */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="flex items-center gap-1.5 bg-red-600 text-white font-bold px-2.5 py-0.5 rounded-full text-[10px]">
              <Heart className="w-3 h-3 fill-current" />
              Nepal & Global Pet Rescue
            </span>
            <div className="h-3 w-px bg-slate-700 hidden md:block"></div>
          </div>

          {/* Ticker Text */}
          <div className="overflow-hidden relative w-full flex-1 mx-2">
            <div className="animate-ticker whitespace-nowrap flex items-center gap-8">
              <span className="text-amber-300 font-semibold flex items-center gap-1.5">
                {siteConfig.alertTickerText}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-emerald-300 font-medium">
                PawsFinder Community Search Network • Based in Nepal, Serving Worldwide
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-amber-300 font-semibold flex items-center gap-1.5">
                {siteConfig.alertTickerText}
              </span>
            </div>
          </div>

          {/* Currency Switcher & Helpline */}
          <div className="flex items-center gap-2.5 shrink-0">
            
            {/* Global Currency Selector Dropdown */}
            <div className="flex items-center gap-1 bg-slate-900/90 px-2 py-0.5 rounded-lg border border-slate-700 text-[11px]">
              <Globe className="w-3 h-3 text-indigo-400" />
              <select
                value={currency.code}
                onChange={(e) => changeCurrency(e.target.value)}
                className="bg-transparent text-white font-bold outline-none cursor-pointer text-[11px]"
                title="Select Platform Currency"
              >
                {currencies.map(c => (
                  <option key={c.code} value={c.code} className="bg-slate-900 text-white">
                    {c.symbol} {c.code}
                  </option>
                ))}
              </select>
            </div>

            <a
              href={`tel:${siteConfig.emergencyPhone}`}
              className="flex items-center gap-1 text-red-300 hover:text-white font-bold transition-colors bg-red-950/60 px-2.5 py-0.5 rounded-lg border border-red-800/40 text-[11px]"
            >
              <PhoneCall className="w-3 h-3 text-red-400" />
              <span>{siteConfig.emergencyPhone}</span>
            </a>
            
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 text-emerald-300 hover:text-white font-bold transition-colors bg-emerald-950/60 px-2.5 py-0.5 rounded-lg border border-emerald-800/40 text-[11px]"
            >
              <MessageCircle className="w-3 h-3 text-emerald-400" />
              <span>WhatsApp</span>
            </a>

            {isAdmin ? (
              <button
                onClick={logoutAdmin}
                className="flex items-center gap-1 text-amber-300 hover:text-white font-semibold bg-amber-950/60 px-2.5 py-0.5 rounded-lg border border-amber-600/40 text-[11px]"
              >
                <Unlock className="w-3 h-3 text-amber-400" />
                <span>Admin</span>
              </button>
            ) : (
              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-1 text-slate-300 hover:text-white font-semibold bg-slate-900 hover:bg-slate-800 px-2.5 py-0.5 rounded-lg border border-slate-700 text-[11px] transition-all"
              >
                <Lock className="w-3 h-3 text-slate-400" />
                <span>Admin</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Running Dog Track Banner */}
      <div className="relative h-12 bg-slate-900/90 overflow-hidden flex items-center border-b border-indigo-500/10">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-500/20 via-amber-500/50 to-indigo-500/20"></div>

        <div className="absolute right-4 top-1.5 text-[11px] text-indigo-300 font-semibold tracking-wider opacity-80 hidden md:block">
          PawsFinder Community Recovery Network
        </div>

        {/* Animated Dog Container */}
        <div className="animate-dog-run absolute left-0 flex items-center pointer-events-none z-10">
          <div className="relative flex flex-col items-center">
            
            <svg
              className="w-12 h-10 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]"
              viewBox="0 0 100 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30 40 Q45 32 65 40 Q72 45 68 55 Q50 62 30 55 Q25 48 30 40 Z"
                fill="#f59e0b"
              />
              <path
                d="M62 42 Q72 30 82 36 Q88 40 85 46 Q75 52 65 48 Z"
                fill="#d97706"
              />
              <path
                d="M68 32 Q62 20 64 35 Z"
                fill="#b45309"
              />
              <circle cx="78" cy="38" r="2" fill="#000000" />
              <circle cx="85" cy="42" r="2.5" fill="#000000" />
              <rect x="62" y="44" width="4" height="8" rx="2" fill="#ef4444" />
              <circle cx="64" cy="48" r="2" fill="#fef08a" />

              <g className="animate-tail-wag">
                <path
                  d="M32 44 Q15 30 18 20 Q24 25 30 40 Z"
                  fill="#d97706"
                />
              </g>

              <g className="animate-leg-front">
                <path d="M60 52 L66 72 L62 72 L56 54 Z" fill="#b45309" />
                <path d="M64 54 L70 74 L66 74 L60 56 Z" fill="#d97706" />
              </g>

              <g className="animate-leg-back">
                <path d="M34 54 L26 72 L30 72 L38 56 Z" fill="#b45309" />
                <path d="M38 56 L32 74 L36 74 L42 58 Z" fill="#d97706" />
              </g>
            </svg>
            
            <div className="w-10 h-1 bg-amber-500/30 rounded-full blur-[1px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
