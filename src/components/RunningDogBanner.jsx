import React from 'react';
import { usePaws } from '../context/PawsContext';
import { PhoneCall, MessageCircle, Lock, Unlock, Globe } from 'lucide-react';
import { BRAND, SOCIAL } from '../data/brandConfig';

export const RunningDogBanner = ({ onOpenAdmin }) => {
  const { siteConfig, currency, currencies, changeCurrency, isAdmin, logoutAdmin } = usePaws();

  return (
    <div className="bg-slate-950 border-b border-slate-800/50 sticky top-0 z-40 shadow-xl overflow-hidden no-print">

      {/* 1. Alert Ticker Bar */}
      <div className="bg-slate-950 border-b border-slate-800/40 py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

          {/* Left: Brand pill */}
          <div className="shrink-0 hidden sm:flex items-center gap-2">
            <span className="bg-red-600/90 text-white font-black px-3 py-0.5 rounded-full text-[10px] uppercase tracking-wider">
              🐾 {BRAND.name}
            </span>
            <span className="text-slate-600 text-xs hidden md:block">·</span>
            <span className="text-slate-400 text-[10px] font-semibold italic hidden md:block">
              "{BRAND.tagline}"
            </span>
          </div>

          {/* Center: Scrolling ticker */}
          <div className="overflow-hidden flex-1 mx-2">
            <div className="animate-ticker whitespace-nowrap flex items-center gap-8 text-xs">
              <span className="text-amber-300 font-semibold">
                {siteConfig.alertTickerText}
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400 font-medium">
                PawsFinder Community · Nepal & Worldwide
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-emerald-400 font-semibold">
                Every share can help bring a dog home.
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-amber-300 font-semibold">
                {siteConfig.alertTickerText}
              </span>
            </div>
          </div>

          {/* Right: Controls */}
          <div className="flex items-center gap-2 shrink-0">

            {/* Currency selector */}
            <div className="flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded-lg border border-slate-800 text-[11px]">
              <Globe className="w-3 h-3 text-indigo-400" />
              <select
                value={currency.code}
                onChange={(e) => changeCurrency(e.target.value)}
                className="bg-transparent text-white font-bold outline-none cursor-pointer text-[11px]"
                title="Select currency"
                aria-label="Select platform currency"
              >
                {currencies.map(c => (
                  <option key={c.code} value={c.code} className="bg-slate-900 text-white">
                    {c.symbol} {c.code}
                  </option>
                ))}
              </select>
            </div>

            {/* Phone */}
            <a
              href={BRAND.phoneTel}
              className="hidden sm:flex items-center gap-1 text-red-300 hover:text-white font-bold bg-red-950/50 hover:bg-red-950 px-2.5 py-0.5 rounded-lg border border-red-900/40 text-[11px] transition-all"
              aria-label={`Call PawsFinder: ${BRAND.phoneDisplay}`}
            >
              <PhoneCall className="w-3 h-3 text-red-400" />
              <span>{BRAND.phone}</span>
            </a>

            {/* WhatsApp */}
            <a
              href={SOCIAL.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1 text-emerald-300 hover:text-white font-bold bg-emerald-950/50 hover:bg-emerald-950 px-2.5 py-0.5 rounded-lg border border-emerald-900/40 text-[11px] transition-all"
              aria-label="Message PawsFinder on WhatsApp"
            >
              <MessageCircle className="w-3 h-3 text-emerald-400" />
              <span>WhatsApp</span>
            </a>

            {/* Admin toggle */}
            {isAdmin ? (
              <button
                onClick={logoutAdmin}
                className="flex items-center gap-1 text-amber-300 hover:text-white font-semibold bg-amber-950/50 px-2.5 py-0.5 rounded-lg border border-amber-700/40 text-[11px] transition-all"
                aria-label="Admin logged in — click to log out"
              >
                <Unlock className="w-3 h-3 text-amber-400" />
                <span>Admin</span>
              </button>
            ) : (
              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-1 text-slate-400 hover:text-white font-semibold bg-slate-900 hover:bg-slate-800 px-2.5 py-0.5 rounded-lg border border-slate-700 text-[11px] transition-all"
                aria-label="Open admin login"
              >
                <Lock className="w-3 h-3 text-slate-500" />
                <span>Admin</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Running Dog Track */}
      <div className="relative h-10 bg-slate-900/80 overflow-hidden flex items-center">
        {/* Subtle dot grid */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px]" aria-hidden="true"></div>
        {/* Track line */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" aria-hidden="true"></div>

        <div className="absolute right-6 top-1.5 text-[10px] text-indigo-300/60 font-semibold tracking-wider hidden lg:block" aria-hidden="true">
          {BRAND.tagline}
        </div>

        {/* Animated dog — aria-hidden, purely decorative */}
        <div className="animate-dog-run absolute left-0 flex items-end pointer-events-none z-10" aria-hidden="true">
          <div className="relative flex flex-col items-center">
            <svg className="w-10 h-8 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Body */}
              <path d="M30 40 Q45 32 65 40 Q72 45 68 55 Q50 62 30 55 Q25 48 30 40 Z" fill="#f59e0b"/>
              {/* Head */}
              <path d="M62 42 Q72 30 82 36 Q88 40 85 46 Q75 52 65 48 Z" fill="#d97706"/>
              {/* Ear */}
              <path d="M68 32 Q62 20 64 35 Z" fill="#b45309"/>
              {/* Eye */}
              <circle cx="78" cy="38" r="2" fill="#000"/>
              {/* Nose */}
              <circle cx="85" cy="42" r="2.5" fill="#000"/>
              {/* Collar */}
              <rect x="62" y="44" width="4" height="7" rx="2" fill="#ef4444"/>
              <circle cx="64" cy="47" r="1.5" fill="#fef08a"/>
              {/* Tail */}
              <g className="animate-tail-wag">
                <path d="M32 44 Q15 30 18 20 Q24 25 30 40 Z" fill="#d97706"/>
              </g>
              {/* Front legs */}
              <g className="animate-leg-front">
                <path d="M60 52 L66 70 L62 70 L56 54 Z" fill="#b45309"/>
                <path d="M64 54 L70 72 L66 72 L60 56 Z" fill="#d97706"/>
              </g>
              {/* Back legs */}
              <g className="animate-leg-back">
                <path d="M34 54 L26 70 L30 70 L38 56 Z" fill="#b45309"/>
                <path d="M38 56 L32 72 L36 72 L42 58 Z" fill="#d97706"/>
              </g>
            </svg>
            <div className="w-8 h-0.5 bg-amber-500/25 rounded-full blur-sm"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
