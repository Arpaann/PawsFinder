import React from 'react';
import { usePaws } from '../context/PawsContext';
import { PhoneCall, MessageCircle, ShieldCheck } from 'lucide-react';

export const Footer = ({ setActiveTab, onOpenAdmin }) => {
  const { siteConfig } = usePaws();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs no-print" aria-label="Site Footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Brand & Logo */}
          <div className="space-y-4 md:col-span-1">
            <div className="h-12 w-auto max-w-[200px] flex items-center">
              <img
                src={siteConfig.logoUrl}
                alt={`${siteConfig.appTitle} logo`}
                className="h-full w-auto object-contain"
                loading="lazy"
              />
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              PawsFinder is a community lost pet recovery and street poster network based in Nepal, operating internationally to reunite pets with their families.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Based in Nepal • Serving Worldwide</span>
            </div>
          </div>

          {/* Col 2: Emergency Helpline & WhatsApp */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Helpline & WhatsApp</h4>
            <div className="space-y-2">
              <a
                href={`tel:${siteConfig.emergencyPhone}`}
                className="flex items-center gap-2.5 bg-red-950/60 text-red-300 hover:text-white p-3 rounded-xl border border-red-800/50 font-bold transition-all group"
              >
                <PhoneCall className="w-4 h-4 text-red-400" />
                <span>{siteConfig.emergencyPhone}</span>
              </a>

              <a
                href={`https://wa.me/${siteConfig.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 bg-emerald-950/60 text-emerald-300 hover:text-white p-3 rounded-xl border border-emerald-800/50 font-bold transition-all group"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Rescue Line</span>
              </a>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 font-medium">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-indigo-400 transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('feed')} className="hover:text-indigo-400 transition-colors">
                  Missing Pets Directory
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('report')} className="text-amber-400 hover:text-amber-300 transition-colors">
                  Report a Missing Pet (+)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('donate')} className="hover:text-rose-400 transition-colors">
                  Support & QR Hub
                </button>
              </li>
              <li>
                <button onClick={onOpenAdmin} className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Login</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Social Channels */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Official Social Media</h4>
            <p className="text-slate-400 text-xs">Follow PawsFinder for localized sighting alerts and community updates:</p>
            
            <div className="grid grid-cols-2 gap-2">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit PawsFinder Instagram page"
                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white p-2.5 rounded-xl border border-slate-800 transition-colors"
              >
                <svg className="w-4 h-4 text-pink-500 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span className="font-semibold">Instagram</span>
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit PawsFinder TikTok page"
                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white p-2.5 rounded-xl border border-slate-800 transition-colors"
              >
                <svg className="w-4 h-4 text-cyan-400 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.29 0 .56.04.82.1v-3.5a6.37 6.37 0 00-.82-.05A6.34 6.34 0 003.15 15.6a6.34 6.34 0 0010.86 4.45V11.2a8.27 8.27 0 005.58 2.15v-3.5a4.8 4.8 0 01-3.4-1.46 4.83 4.83 0 01-1.46-3.4h3.45v1.7z"/>
                </svg>
                <span className="font-semibold">TikTok</span>
              </a>

              {/* Linktree */}
              <a
                href="https://linktr.ee"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit PawsFinder Linktree"
                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white p-2.5 rounded-xl border border-slate-800 transition-colors"
              >
                <svg className="w-4 h-4 text-emerald-400 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M13.511 5.853l3.963-3.963 1.414 1.414-3.963 3.963 3.963 3.963-1.414 1.414-3.963-3.963v6.321h-2v-6.321l-3.963 3.963-1.414-1.414 3.963-3.963-3.963-3.963 1.414-1.414 3.963 3.963v-4.853h2v4.853zm-6.511 12.147h10v2h-10z"/>
                </svg>
                <span className="font-semibold">Linktree</span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit PawsFinder LinkedIn profile"
                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white p-2.5 rounded-xl border border-slate-800 transition-colors"
              >
                <svg className="w-4 h-4 text-sky-400 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26Z"/>
                </svg>
                <span className="font-semibold">LinkedIn</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Legal Links Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} PawsFinder Network. All rights reserved.</p>
          <div className="flex items-center gap-3 flex-wrap font-medium">
            <button onClick={() => setActiveTab('privacy')} className="hover:text-indigo-400 transition-colors">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={() => setActiveTab('terms')} className="hover:text-indigo-400 transition-colors">
              Terms & Conditions
            </button>
            <span>•</span>
            <button onClick={() => setActiveTab('refund-policy')} className="hover:text-indigo-400 transition-colors">
              Refund Policy
            </button>
            <span>•</span>
            <button onClick={onOpenAdmin} className="text-amber-400 hover:underline">
              Admin Portal
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
