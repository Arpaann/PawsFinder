import React from 'react';
import { Home, Search, AlertCircle, ArrowLeft } from 'lucide-react';

export const NotFoundPage = ({ setActiveTab }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
      
      <div className="w-20 h-20 bg-slate-800/80 border-2 border-slate-700 text-indigo-400 rounded-3xl flex items-center justify-center mx-auto shadow-xl">
        <AlertCircle className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest block font-bold">ERROR 404</span>
        <h1 className="text-3xl sm:text-5xl font-black text-white">Page or Report Not Found</h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
          The lost pet report or page you are searching for might have been reunited, removed, or typed incorrectly.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <button
          onClick={() => setActiveTab('home')}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-6 py-3.5 rounded-xl transition-colors shadow-lg"
        >
          <Home className="w-4 h-4" />
          <span>Return to Home</span>
        </button>

        <button
          onClick={() => setActiveTab('feed')}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs px-6 py-3.5 rounded-xl border border-slate-700 transition-colors"
        >
          <Search className="w-4 h-4 text-indigo-400" />
          <span>Search Missing Pets Directory</span>
        </button>
      </div>

    </div>
  );
};
