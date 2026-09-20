import React from 'react';
import { Home, Search, PlusCircle, Heart, ShieldCheck } from 'lucide-react';
import { usePaws } from '../context/PawsContext';

export const MobileNav = ({ activeTab, setActiveTab, onOpenAdmin }) => {
  const { isAdmin } = usePaws();

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 z-50 px-2 py-1.5 shadow-2xl">
      <div className="flex items-center justify-around">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-xs font-medium transition-all ${
            activeTab === 'home' ? 'text-indigo-400 bg-indigo-950/50' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setActiveTab('feed')}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-xs font-medium transition-all ${
            activeTab === 'feed' ? 'text-indigo-400 bg-indigo-950/50' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Search className="w-5 h-5" />
          <span>Feed</span>
        </button>

        {/* Central Prominent Floating Button */}
        <button
          onClick={() => setActiveTab('report')}
          className="flex flex-col items-center gap-1 -mt-6 bg-gradient-to-tr from-red-600 to-amber-500 text-white p-3.5 rounded-full shadow-xl shadow-red-950/80 border-4 border-slate-950 active:scale-95 transition-transform"
        >
          <PlusCircle className="w-6 h-6" />
        </button>

        <button
          onClick={() => setActiveTab('donate')}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-xs font-medium transition-all ${
            activeTab === 'donate' ? 'text-rose-400 bg-rose-950/50' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Heart className="w-5 h-5" />
          <span>Donate</span>
        </button>

        <button
          onClick={onOpenAdmin}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-xs font-medium transition-all ${
            isAdmin ? 'text-amber-400 bg-amber-950/50' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="w-5 h-5" />
          <span>Admin</span>
        </button>
      </div>
    </div>
  );
};
