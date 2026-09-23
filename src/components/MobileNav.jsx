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
      className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-slate-950/95 backdrop-blur-md border-t border-slate-800/60 no-print"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around px-2 py-2 pb-safe">
        {NAV.map(({ key, label, Icon, accent }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            aria-label={label}
            aria-current={activeTab === key ? 'page' : undefined}
            className={`flex flex-col items-center gap-1 flex-1 py-1.5 rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
              accent
                ? 'bg-red-600 text-white mx-1 shadow-lg shadow-red-950/40'
                : activeTab === key
                ? 'text-indigo-400'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Icon className="w-5 h-5" aria-hidden="true" />
            <span className="text-[10px] font-semibold">{label}</span>
          </button>
        ))}

        {/* Admin */}
        <button
          onClick={onOpenAdmin}
          aria-label="Admin login"
          className="flex flex-col items-center gap-1 flex-1 py-1.5 text-slate-600 hover:text-slate-300 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <ShieldCheck className="w-5 h-5" aria-hidden="true" />
          <span className="text-[10px] font-semibold">Admin</span>
        </button>
      </div>
    </nav>
  );
};
