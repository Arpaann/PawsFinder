import React from 'react';
import { usePaws } from '../context/PawsContext';
import { PlusCircle, Search, Heart, ArrowRight, Bell, MapPin, PhoneCall, Calendar, Users } from 'lucide-react';
import { BRAND, MILESTONES, SOCIAL } from '../data/brandConfig';

export const HomePage = ({ setActiveTab, onSelectPet }) => {
  const { pets } = usePaws();

  const urgentPets = pets.filter(p => p.approved && p.status !== 'reunited');
  const reunitedTotal = pets.filter(p => p.status === 'reunited').length + MILESTONES.dogsReunited;

  return (
    <div className="space-y-20 pb-20">

      {/* ── 1. HERO ────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-900 border-b border-slate-800/60 py-16 lg:py-24" aria-labelledby="hero-heading">
        {/* Background */}
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:24px_24px]" aria-hidden="true"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/8 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left — Text */}
            <div className="lg:col-span-7 space-y-7 text-center lg:text-left">

              <div className="inline-flex items-center gap-2 bg-red-950/60 border border-red-800/50 px-4 py-1.5 rounded-full text-xs font-semibold text-red-300">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping shrink-0" aria-hidden="true"></span>
                Lost Dog Recovery Network · Nepal & Worldwide
              </div>

              <h1 id="hero-heading" className="text-5xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.95]">
                Help bring<br />
                <span className="text-red-500">them home.</span>
              </h1>

              <p className="text-lg text-slate-300 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
                PawsFinder helps pet owners report missing dogs, create printable street posters, and get community alerts out fast — so every lost dog has a real chance of coming home.
              </p>

              <p className="text-base font-semibold text-slate-400 italic">
                "{BRAND.tagline}"
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => setActiveTab('report')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-bold text-base px-8 py-4 rounded-2xl shadow-xl shadow-red-950/40 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                >
                  <PlusCircle className="w-5 h-5" aria-hidden="true" />
                  Report a Missing Dog
                </button>

                <button
                  onClick={() => setActiveTab('feed')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-base px-7 py-4 rounded-2xl border border-slate-700 hover:border-slate-500 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  <Search className="w-5 h-5 text-indigo-400" aria-hidden="true" />
                  Browse Lost Dogs
                </button>
              </div>

              {/* Trust strip */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-slate-400 pt-2">
                <span className="flex items-center gap-1.5 font-medium">
                  <Heart className="w-4 h-4 text-emerald-400 fill-current" aria-hidden="true" />
                  100% free for the community
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <PhoneCall className="w-4 h-4 text-red-400" aria-hidden="true" />
                  <a href={BRAND.phoneTel} className="hover:text-white transition-colors">
                    {BRAND.phone}
                  </a>
                </span>
              </div>
            </div>

            {/* Right — Live Alert Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-950/70 p-6 rounded-3xl border border-slate-800/60 shadow-2xl space-y-5">

                <div className="flex items-center justify-between border-b border-slate-800/50 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" aria-hidden="true"></span>
                    <span className="text-xs font-bold uppercase text-red-400 tracking-wider">Active Search</span>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-900/40">
                    Helpline Active
                  </span>
                </div>

                {/* Featured pet */}
                {urgentPets.length > 0 && (
                  <div
                    onClick={() => onSelectPet(urgentPets[0])}
                    className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800/60 hover:border-red-500/40 transition-all cursor-pointer group space-y-3"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && onSelectPet(urgentPets[0])}
                    aria-label={`View poster for ${urgentPets[0].name}`}
                  >
                    <div className="flex gap-4">
                      <img
                        src={urgentPets[0].photoUrl}
                        alt={`Photo of missing dog ${urgentPets[0].name}`}
                        className="w-20 h-20 rounded-xl object-cover border border-slate-700 shrink-0 group-hover:scale-105 transition-transform"
                      />
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h3 className="font-black text-white text-lg truncate group-hover:text-amber-400 transition-colors">
                            {urgentPets[0].name}
                          </h3>
                          <span className="text-[10px] font-bold uppercase text-red-400 bg-red-950/70 px-2 py-0.5 rounded border border-red-900/40 shrink-0">
                            Missing
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 font-semibold truncate">{urgentPets[0].breed}</p>
                        <p className="text-xs text-slate-500 truncate flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-red-400 shrink-0" aria-hidden="true" />
                          {urgentPets[0].lastSeenLocation}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs font-semibold text-indigo-400 pt-1">
                      <span>View printable poster</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </div>
                  </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800/60">
                    <span className="text-2xl font-black text-emerald-400 block font-display">{reunitedTotal}</span>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">Reunited</span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800/60">
                    <span className="text-2xl font-black text-amber-400 block font-display">{urgentPets.length}</span>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">Active</span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800/60">
                    <span className="text-2xl font-black text-indigo-400 block font-display">{MILESTONES.daysActive}</span>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">Days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. LIVE ALERT FEED ────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6" aria-labelledby="feed-heading">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/60 pb-5">
          <div>
            <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Bell className="w-4 h-4 text-red-500" aria-hidden="true" />
              Community Alerts
            </div>
            <h2 id="feed-heading" className="text-2xl sm:text-3xl font-black text-white">Missing Right Now</h2>
            <p className="text-sm text-slate-400 mt-1">Click any dog to view and download their printable street poster.</p>
          </div>

          <button
            onClick={() => setActiveTab('feed')}
            className="flex items-center gap-2 text-indigo-400 hover:text-white font-semibold text-xs bg-indigo-950/40 hover:bg-indigo-950 px-4 py-2.5 rounded-xl border border-indigo-900/50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 shrink-0"
          >
            <span>See all {pets.length} reports</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pets.filter(p => p.approved).slice(0, 6).map((pet) => (
            <article
              key={pet.id}
              onClick={() => onSelectPet(pet)}
              onKeyDown={(e) => e.key === 'Enter' && onSelectPet(pet)}
              role="button"
              tabIndex={0}
              className="bg-slate-900/80 rounded-2xl border border-slate-800/60 hover:border-indigo-500/40 transition-all overflow-hidden shadow-lg cursor-pointer group flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              aria-label={`Missing dog: ${pet.name} — click to view poster`}
            >
              {/* Photo */}
              <div className="relative aspect-[4/3] w-full bg-slate-950 overflow-hidden">
                <img
                  src={pet.photoUrl}
                  alt={`Photo of missing dog ${pet.name}, ${pet.breed}`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Status */}
                <div className="absolute top-3 left-3">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md ${
                    pet.status === 'missing'  ? 'bg-red-600 text-white' :
                    pet.status === 'sighted'  ? 'bg-amber-500 text-slate-950' :
                    'bg-emerald-500 text-slate-950'
                  }`}>
                    {pet.status === 'missing' ? 'Missing' : pet.status === 'sighted' ? 'Sighted' : 'Reunited'}
                  </span>
                </div>
                {/* Reward */}
                {pet.rewardActive && (
                  <div className="absolute top-3 right-3 bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-full uppercase shadow-md">
                    Reward
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-xl font-black text-white group-hover:text-amber-400 transition-colors leading-tight">{pet.name}</h3>
                    <span className="text-[10px] font-mono text-slate-600 shrink-0 mt-1">#{pet.id}</span>
                  </div>
                  <p className="text-xs font-semibold text-indigo-400 mb-2">{pet.breed} · {pet.age}</p>

                  <div className="space-y-1 text-xs text-slate-400">
                    <p className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" aria-hidden="true" />
                      <span className="truncate">{pet.lastSeenLocation}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-600 shrink-0" aria-hidden="true" />
                      <span>Lost: {new Date(pet.lostDate).toLocaleDateString()}</span>
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/50 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Contact: {pet.contactName || 'Pet owner'}</span>
                  <span className="font-semibold text-indigo-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Print poster <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── 3. HOW IT WORKS ───────────────────────────────────────────────── */}
      <section className="bg-slate-950/80 border-y border-slate-800/40 py-16" aria-labelledby="how-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Simple & Fast</span>
            <h2 id="how-heading" className="text-3xl font-black text-white">How PawsFinder Works</h2>
            <p className="text-sm text-slate-400 leading-relaxed">Four steps to give every missing dog a real chance of coming home.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { n: '01', color: 'red',    title: 'Report It',      body: 'Fill in what you know — dog name, breed, photo, location. It takes under 2 minutes.' },
              { n: '02', color: 'amber',  title: 'Get a Poster',   body: 'Instantly download a print-ready A4 street poster and a ready-to-copy social media message.' },
              { n: '03', color: 'indigo', title: 'Spread the Word',body: 'Paste posters in your neighborhood. Share on Instagram, TikTok, WhatsApp, and local groups.' },
              { n: '04', color: 'green',  title: 'Bring Them Home',body: 'People spot the dog, call or WhatsApp directly. Community searches actually work.' },
            ].map(({ n, color, title, body }) => (
              <div key={n} className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/40 space-y-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-sm border ${
                  color === 'red'    ? 'bg-red-950/60 text-red-400 border-red-900/40' :
                  color === 'amber'  ? 'bg-amber-950/60 text-amber-400 border-amber-900/40' :
                  color === 'indigo' ? 'bg-indigo-950/60 text-indigo-400 border-indigo-900/40' :
                  'bg-emerald-950/60 text-emerald-400 border-emerald-900/40'
                }`}>
                  {n}
                </div>
                <h3 className="text-base font-bold text-white">{title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. MILESTONE BANNER ───────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="milestone-heading">
        <div className="bg-slate-900 border border-slate-800/60 rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
            <div>
              <p className="text-6xl sm:text-7xl font-black text-emerald-400 font-display leading-none">{MILESTONES.daysActive}</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Days Active</p>
            </div>
            <div className="w-px h-16 bg-slate-800 hidden sm:block" aria-hidden="true"></div>
            <div>
              <p className="text-6xl sm:text-7xl font-black text-amber-400 font-display leading-none">{MILESTONES.dogsReunited}</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Dogs Reunited</p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto space-y-2">
            <h2 id="milestone-heading" className="text-2xl font-black text-white">
              {MILESTONES.daysActive} days of helping lost dogs find their way home.
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              None of this would have been possible without the people, volunteers, and communities who shared posts, searched, and helped spread the word.
            </p>
            <p className="text-sm font-semibold text-slate-300">
              Thank you for being part of PawsFinder. 🐾
            </p>
          </div>

          <p className="text-xs text-slate-500 italic">"{BRAND.tagline}"</p>
        </div>
      </section>

      {/* ── 5. FOLLOW US CTA ──────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="social-heading">
        <div className="border border-slate-800/60 rounded-3xl p-8 text-center space-y-5">
          <div className="flex items-center justify-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-widest">
            <Users className="w-4 h-4" aria-hidden="true" />
            Follow & Share
          </div>
          <h2 id="social-heading" className="text-xl font-black text-white">Stay connected. Every share helps.</h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { href: SOCIAL.instagram.url, label: 'Follow on Instagram', handle: '@pawsfinder0_0', color: 'hover:border-pink-700/40' },
              { href: SOCIAL.tiktok.url,    label: 'Follow on TikTok',    handle: '@pawsfinder0_0', color: 'hover:border-slate-500/40' },
              { href: SOCIAL.linktree.url,  label: 'Linktree',            handle: 'All links',      color: 'hover:border-green-700/40' },
            ].map(({ href, label, handle, color }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white px-4 py-2.5 rounded-xl border border-slate-800/60 ${color} transition-all text-xs font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500`}
              >
                {handle}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile FAB */}
      <div className="fixed bottom-20 right-5 z-40 md:hidden" aria-label="Quick report shortcut">
        <button
          onClick={() => setActiveTab('report')}
          className="flex items-center justify-center bg-red-600 hover:bg-red-500 text-white p-4 rounded-full shadow-2xl shadow-red-950/60 transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
          aria-label="Report a missing dog"
        >
          <PlusCircle className="w-7 h-7" aria-hidden="true" />
        </button>
      </div>

    </div>
  );
};
