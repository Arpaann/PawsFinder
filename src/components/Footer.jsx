import React from 'react';
import { usePaws } from '../context/PawsContext';
import { PhoneCall, ShieldCheck } from 'lucide-react';
import { SOCIAL, BRAND } from '../data/brandConfig';

// ─── Social icon SVGs ────────────────────────────────────────────────────────
const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const TikTokIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.34 6.34 0 00-.79-.05A6.34 6.34 0 003.15 15.6a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V11.2a8.27 8.27 0 005.58 2.15v-3.4a4.83 4.83 0 01-1.82-.26z"/>
  </svg>
);

const LinkedInIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
);

const LinktreeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M13.511 5.853l4.005-4.117 1.46 1.418-4.005 4.117h5.747v2.019h-5.744l4.008 4.115-1.46 1.418-5.013-5.149-5.013 5.149-1.46-1.418 4.008-4.115H4.282V7.271h5.747L6.024 3.154l1.46-1.418 4.005 4.117V.453h2.022v5.4zm-2.022 7.174h2.022V23.55h-2.022z"/>
  </svg>
);

const WhatsAppIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export const Footer = ({ setActiveTab, onOpenAdmin }) => {
  const { siteConfig } = usePaws();

  return (
    <footer className="bg-slate-950 border-t border-slate-800/60 text-slate-400 text-xs no-print" aria-label="Site Footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Col 1: Brand */}
          <div className="space-y-5 lg:col-span-1">
            <button
              onClick={() => setActiveTab('home')}
              className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg"
              aria-label="Go to PawsFinder homepage"
            >
              <div className="h-11 w-auto max-w-[180px] flex items-center">
                <img
                  src={siteConfig.logoUrl}
                  alt="PawsFinder logo"
                  className="h-full w-auto object-contain"
                  loading="lazy"
                />
              </div>
            </button>

            <p className="text-sm font-semibold text-slate-300 italic">
              "{BRAND.tagline}"
            </p>

            <p className="text-slate-500 text-xs leading-relaxed">
              Helping lost dogs find their way home through community alerts, printable street posters, and neighborhood coordination.
            </p>

            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0"></span>
              <span>Based in Nepal · Serving Worldwide</span>
            </div>
          </div>

          {/* Col 2: Contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">Contact & Helpline</h4>
            <div className="space-y-2">
              <a
                href={`tel:${BRAND.phone}`}
                className="flex items-center gap-2.5 bg-red-950/50 hover:bg-red-950/80 text-red-300 hover:text-white p-3 rounded-xl border border-red-900/40 font-bold transition-all"
              >
                <PhoneCall className="w-4 h-4 text-red-400 shrink-0" />
                <div>
                  <span className="block text-[10px] font-semibold text-red-500 uppercase tracking-wider">Call or Text</span>
                  <span>{BRAND.phoneDisplay}</span>
                </div>
              </a>

              <a
                href={SOCIAL.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 bg-emerald-950/50 hover:bg-emerald-950/80 text-emerald-300 hover:text-white p-3 rounded-xl border border-emerald-900/40 font-bold transition-all"
              >
                <WhatsAppIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="block text-[10px] font-semibold text-emerald-500 uppercase tracking-wider">WhatsApp</span>
                  <span>Message Us</span>
                </div>
              </a>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">Quick Links</h4>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2 font-medium">
                {[
                  { label: 'Home', tab: 'home' },
                  { label: 'Lost Dogs Directory', tab: 'feed' },
                  { label: 'Report a Missing Dog', tab: 'report', accent: 'text-amber-400 hover:text-amber-300' },
                  { label: 'Support & Donate', tab: 'donate' },
                  { label: 'Privacy Policy', tab: 'privacy' },
                  { label: 'Terms & Conditions', tab: 'terms' },
                  { label: 'Refund Policy', tab: 'refund-policy' },
                ].map(({ label, tab, accent }) => (
                  <li key={tab}>
                    <button
                      onClick={() => setActiveTab(tab)}
                      className={`hover:text-indigo-400 transition-colors text-left ${accent || ''}`}
                    >
                      {label}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={onOpenAdmin}
                    className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 transition-colors"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Admin Portal
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Col 4: Social Media */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">Follow PawsFinder</h4>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Share alerts. Help spread the word. Every share can bring a dog home.
            </p>

            <div className="space-y-2">
              {/* Instagram */}
              <a
                href={SOCIAL.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow PawsFinder on Instagram"
                className="flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white p-2.5 rounded-xl border border-slate-800 hover:border-pink-800/40 transition-all group"
              >
                <InstagramIcon className="w-4 h-4 text-pink-500 group-hover:scale-110 transition-transform shrink-0" />
                <div className="min-w-0">
                  <span className="font-semibold block text-xs">Instagram</span>
                  <span className="text-[10px] text-slate-500">{SOCIAL.instagram.handle}</span>
                </div>
              </a>

              {/* TikTok */}
              <a
                href={SOCIAL.tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow PawsFinder on TikTok"
                className="flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white p-2.5 rounded-xl border border-slate-800 hover:border-slate-600 transition-all group"
              >
                <TikTokIcon className="w-4 h-4 text-slate-300 group-hover:scale-110 transition-transform shrink-0" />
                <div className="min-w-0">
                  <span className="font-semibold block text-xs">TikTok</span>
                  <span className="text-[10px] text-slate-500">{SOCIAL.tiktok.handle}</span>
                </div>
              </a>

              {/* Linktree */}
              <a
                href={SOCIAL.linktree.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit PawsFinder Linktree"
                className="flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white p-2.5 rounded-xl border border-slate-800 hover:border-green-800/40 transition-all group"
              >
                <LinktreeIcon className="w-4 h-4 text-green-400 group-hover:scale-110 transition-transform shrink-0" />
                <div className="min-w-0">
                  <span className="font-semibold block text-xs">Linktree</span>
                  <span className="text-[10px] text-slate-500">{SOCIAL.linktree.handle}</span>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href={SOCIAL.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect with PawsFinder on LinkedIn"
                className="flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white p-2.5 rounded-xl border border-slate-800 hover:border-sky-800/40 transition-all group"
              >
                <LinkedInIcon className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform shrink-0" />
                <div className="min-w-0">
                  <span className="font-semibold block text-xs">LinkedIn</span>
                  <span className="text-[10px] text-slate-500">{SOCIAL.linkedin.handle}</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} PawsFinder.</span>
            <span className="text-slate-600">·</span>
            <span className="italic text-slate-400">"{BRAND.tagline}"</span>
            <span className="text-slate-600">·</span>
            <span>All rights reserved.</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap font-medium">
            <button onClick={() => setActiveTab('privacy')} className="hover:text-indigo-400 transition-colors">
              Privacy
            </button>
            <span className="text-slate-700">·</span>
            <button onClick={() => setActiveTab('terms')} className="hover:text-indigo-400 transition-colors">
              Terms
            </button>
            <span className="text-slate-700">·</span>
            <button onClick={() => setActiveTab('refund-policy')} className="hover:text-indigo-400 transition-colors">
              Refund Policy
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
