import React from 'react';
import { Home, Search, PlusCircle, Heart, ShieldCheck } from 'lucide-react';

const NAV = [
  { key: 'home',   label: 'Home',    Icon: Home,       accent: false },
  { key: 'feed',   label: 'Dogs',    Icon: Search,     accent: false },
  { key: 'report', label: 'Report',  Icon: PlusCircle, accent: true  },
  { key: 'donate', label: 'Support', Icon: Heart,      accent: false },
];

export const MobileNav = ({ activeTab, setActiveTab, onOpenAdmin }) => {
  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/80 no-print pb-safe shadow-2xl"
      aria-label="Mobile navigation bar"
    >
      <div className="flex items-center justify-around px-2 py-1.5 min-h-[56px]">
        {NAV.map(({ key, label, Icon, accent }) => {
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
              className={`relative flex flex-col items-center justify-center gap-0.5 flex-1 min-h-[44px] py-1.5 rounded-xl transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                accent
                  ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white mx-1 font-bold shadow-lg shadow-red-950/50'
                  : isActive
                  ? 'text-indigo-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200 font-medium'
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive && !accent ? 'scale-110' : ''}`} aria-hidden="true" />
              <span className="text-[10px] tracking-tight">{label}</span>
              {isActive && !accent && (
                <span className="absolute bottom-1 w-1 h-1 bg-indigo-400 rounded-full animate-ping" />
              )}
            </button>
          );
        })}

        {/* Admin */}
        <button
          onClick={onOpenAdmin}
          aria-label="Admin panel"
          className="flex flex-col items-center justify-center gap-0.5 flex-1 min-h-[44px] py-1.5 text-slate-500 hover:text-slate-300 transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <ShieldCheck className="w-5 h-5" aria-hidden="true" />
          <span className="text-[10px] font-medium">Admin</span>
        </button>
      </div>
    </nav>
  );
};
