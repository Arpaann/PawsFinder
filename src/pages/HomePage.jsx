import React from 'react';
import { usePaws } from '../context/PawsContext';
import { PlusCircle, Search, Heart, ArrowRight, Bell, MapPin, PhoneCall, Calendar } from 'lucide-react';

export const HomePage = ({ setActiveTab, onSelectPet }) => {
  const { pets, siteConfig } = usePaws();

  // Filter missing or sighted pets for the urgent live front-page feed
  const urgentPets = pets.filter(p => p.approved && p.status !== 'reunited');
  const reunitedCount = pets.filter(p => p.status === 'reunited').length + 148;

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-900 border-b border-slate-800 py-16 lg:py-24">
        {/* Background Ambient Glows & Grid */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Text & Actions */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 bg-red-950/70 border border-red-800/60 px-4 py-1.5 rounded-full text-xs font-bold text-red-300 shadow-md">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                <span>Community Lost Pet Recovery Network</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-none">
                Every Second Counts When a <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-indigo-400">Pet Goes Missing.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                PAWS Global creates instant printable street posters, shareable social media alerts, and coordinates community search teams to bring lost pets home safely.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                
                {/* Prominent Report Button */}
                <button
                  onClick={() => setActiveTab('report')}
                  className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 via-amber-600 to-red-600 hover:from-red-500 hover:to-amber-500 text-white font-extrabold text-base px-8 py-4 rounded-2xl shadow-2xl shadow-red-950 transform hover:-translate-y-1 transition-all"
                >
                  <PlusCircle className="w-6 h-6 animate-bounce" />
                  <span>REPORT MISSING PET NOW</span>
                </button>

                {/* Search Feed Button */}
                <button
                  onClick={() => setActiveTab('feed')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-800/90 hover:bg-slate-800 text-slate-100 font-bold text-base px-7 py-4 rounded-2xl border border-slate-700 hover:border-slate-500 transition-all"
                >
                  <Search className="w-5 h-5 text-indigo-400" />
                  <span>Search Lost Pets Directory</span>
                </button>

              </div>

              {/* Helpline Quick Contact Strip */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
                <span className="flex items-center gap-1.5 font-semibold text-slate-300">
                  <Heart className="w-4 h-4 text-emerald-400 fill-current" /> 100% Free Community Service
                </span>
                <span className="flex items-center gap-1.5 font-semibold text-slate-300">
                  <PhoneCall className="w-4 h-4 text-red-400" /> 24/7 Rescue Line: {siteConfig.emergencyPhone}
                </span>
              </div>

            </div>

            {/* Hero Right: Live Alert Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-950/80 p-6 sm:p-8 rounded-3xl border-2 border-red-500/30 shadow-2xl relative overflow-hidden backdrop-blur-xl space-y-6">
                
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                    <span className="text-xs font-black uppercase text-red-400 tracking-wider">ACTIVE NEIGHBORHOOD SEARCH</span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/40">
                    Helpline Active
                  </span>
                </div>

                {/* Featured Urgent Pet Preview */}
                {urgentPets.length > 0 && (
                  <div
                    onClick={() => onSelectPet(urgentPets[0])}
                    className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 hover:border-red-500/50 transition-all cursor-pointer group space-y-3"
                  >
                    <div className="flex gap-4">
                      <img
                        src={urgentPets[0].photoUrl}
                        alt={urgentPets[0].name}
                        className="w-20 h-20 rounded-xl object-cover border border-slate-700 shrink-0 group-hover:scale-105 transition-transform"
                      />
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h3 className="font-black text-white text-lg truncate group-hover:text-amber-400 transition-colors">
                            {urgentPets[0].name}
                          </h3>
                          <span className="text-[10px] font-bold uppercase text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-800/40">
                            {urgentPets[0].status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 font-semibold truncate">{urgentPets[0].breed}</p>
                        <p className="text-xs text-slate-400 truncate flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-red-400 shrink-0" />
                          {urgentPets[0].lastSeenLocation}
                        </p>
                      </div>
                    </div>

                    {urgentPets[0].rewardActive && (
                      <div className="bg-amber-500/20 text-amber-300 text-xs font-black text-center py-1.5 px-3 rounded-lg border border-amber-500/30 uppercase">
                        💰 {urgentPets[0].rewardAmount}
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs font-bold text-indigo-400 pt-1">
                      <span>View Printable Street Poster</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                )}

                {/* Network Metrics Stats Counter */}
                <div className="grid grid-cols-3 gap-3 text-center pt-2">
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="text-xl sm:text-2xl font-black text-emerald-400 block">{reunitedCount}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Pets Reunited</span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="text-xl sm:text-2xl font-black text-amber-400 block">{urgentPets.length}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Active Alerts</span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="text-xl sm:text-2xl font-black text-indigo-400 block">100%</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Community Driven</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. URGENT LIVE NEWS & ALERT FEED ON FRONT PAGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Bell className="w-4 h-4 text-red-500 animate-bounce" />
              <span>Real-Time Missing Pet Alerts</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Live Community Feed</h2>
            <p className="text-xs text-slate-400 mt-1">Visitors can instantly view and print posters of missing pets in their area.</p>
          </div>

          <button
            onClick={() => setActiveTab('feed')}
            className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-bold text-xs bg-indigo-950/50 hover:bg-indigo-950 px-4 py-2.5 rounded-xl border border-indigo-800/50 transition-colors shrink-0"
          >
            <span>View All ({pets.length}) Pet Reports</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Missing Pet Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.filter(p => p.approved).slice(0, 6).map((pet) => (
            <div
              key={pet.id}
              onClick={() => onSelectPet(pet)}
              className="bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-indigo-500/60 transition-all overflow-hidden shadow-xl cursor-pointer group flex flex-col"
            >
              {/* Card Photo Header */}
              <div className="relative aspect-[4/3] w-full bg-slate-950 overflow-hidden">
                <img
                  src={pet.photoUrl}
                  alt={pet.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider shadow-lg ${
                    pet.status === 'missing' ? 'bg-red-600 text-white animate-pulse' :
                    pet.status === 'sighted' ? 'bg-amber-500 text-slate-950' :
                    'bg-emerald-500 text-slate-950'
                  }`}>
                    {pet.status === 'missing' ? '🔴 MISSING' : pet.status === 'sighted' ? '🟡 SIGHTED' : '🟢 REUNITED'}
                  </span>
                </div>

                {/* Reward Badge */}
                {pet.rewardActive && (
                  <div className="absolute top-3 right-3 bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-full uppercase shadow-lg">
                    {pet.rewardAmount}
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-xl font-black text-white group-hover:text-amber-400 transition-colors">
                      {pet.name}
                    </h3>
                    <span className="text-[10px] font-mono text-slate-400">Notice #{pet.id}</span>
                  </div>

                  <p className="text-xs font-bold text-indigo-400 mb-2">{pet.breed} • {pet.age}</p>

                  <div className="space-y-1.5 text-xs text-slate-300">
                    <p className="flex items-center gap-1.5 text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                      <span className="truncate">{pet.lastSeenLocation}</span>
                    </p>
                    <p className="flex items-center gap-1.5 text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span>Lost: {new Date(pet.lostDate).toLocaleDateString()}</span>
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-400">Contact: {pet.contactName || 'Pet Parent'}</span>
                  <span className="font-bold text-indigo-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Print Poster <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. HOW COMMUNITY RECOVERY WORKS */}
      <section className="bg-slate-950 py-16 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Simple & Fast Steps</span>
            <h2 className="text-3xl font-black text-white">How PAWS Global Works</h2>
            <p className="text-xs text-slate-400">Bringing missing pets home safe in 4 clear steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3 text-center md:text-left relative">
              <div className="w-12 h-12 bg-red-950 text-red-400 rounded-xl flex items-center justify-center font-black text-lg border border-red-800/40 mx-auto md:mx-0">
                01
              </div>
              <h3 className="text-base font-bold text-white">Submit Report</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Fill in pet details, photo, lost location, and optional reward amount.
              </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3 text-center md:text-left relative">
              <div className="w-12 h-12 bg-amber-950 text-amber-400 rounded-xl flex items-center justify-center font-black text-lg border border-amber-800/40 mx-auto md:mx-0">
                02
              </div>
              <h3 className="text-base font-bold text-white">Generate Poster</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Instantly get a printable street poster with social media icons and copyable share text.
              </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3 text-center md:text-left relative">
              <div className="w-12 h-12 bg-indigo-950 text-indigo-400 rounded-xl flex items-center justify-center font-black text-lg border border-indigo-800/40 mx-auto md:mx-0">
                03
              </div>
              <h3 className="text-base font-bold text-white">Spread The Word</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Share on Instagram, TikTok, WhatsApp, and paste posters in your neighborhood.
              </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3 text-center md:text-left relative">
              <div className="w-12 h-12 bg-emerald-950 text-emerald-400 rounded-xl flex items-center justify-center font-black text-lg border border-emerald-800/40 mx-auto md:mx-0">
                04
              </div>
              <h3 className="text-base font-bold text-white">Safe Reunion</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Receive direct phone calls/WhatsApp messages from neighbors and unite with your pet!
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4. FLOATING ACTION BUTTON (+) SHORTCUT */}
      <div className="fixed bottom-20 right-6 z-40 md:hidden">
        <button
          onClick={() => setActiveTab('report')}
          className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-amber-500 text-white font-extrabold p-4 rounded-full shadow-2xl shadow-red-950 border-2 border-amber-400 active:scale-95 transition-all"
        >
          <PlusCircle className="w-7 h-7" />
        </button>
      </div>

    </div>
  );
};
