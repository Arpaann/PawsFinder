import React, { useState } from 'react';
import { usePaws } from '../context/PawsContext';
import { Search, Filter, MapPin, Calendar, ArrowRight, Award, PlusCircle, AlertCircle } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const FeedPage = ({ setActiveTab, onSelectPet }) => {
  const { pets } = usePaws();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [onlyRewards, setOnlyRewards] = useState(false);

  const filteredPets = pets.filter((pet) => {
    if (!pet.approved) return false;

    const query = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !query ||
      pet.name.toLowerCase().includes(query) ||
      pet.breed.toLowerCase().includes(query) ||
      pet.lastSeenLocation.toLowerCase().includes(query) ||
      pet.id.toLowerCase().includes(query);

    const matchesStatus = statusFilter === 'all' || pet.status === statusFilter;
    const matchesReward = !onlyRewards || pet.rewardActive;

    return matchesSearch && matchesStatus && matchesReward;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-sans">
      <Breadcrumbs activeTab="feed" setActiveTab={setActiveTab} />
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white">Missing Pets Search Directory</h1>
          <p className="text-xs text-slate-400 mt-1">Search active pet alerts, view printable street posters, or report sightings.</p>
        </div>

        <button
          onClick={() => setActiveTab('report')}
          className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-extrabold text-xs px-5 py-3 rounded-xl shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Report New Lost Dog</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-4 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Search Box */}
          <div className="md:col-span-6 relative">
            <label htmlFor="directory-search" className="sr-only">Search Directory</label>
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              id="directory-search"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by dog name, breed, location, or case ID..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 text-slate-200 text-xs pl-10 pr-4 py-3 rounded-xl outline-none transition-colors"
            />
          </div>

          {/* Status Filter Dropdown */}
          <div className="md:col-span-3">
            <label htmlFor="status-filter" className="sr-only">Filter by Status</label>
            <div className="relative">
              <Filter className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs pl-10 pr-4 py-3 rounded-xl outline-none cursor-pointer"
              >
                <option value="all">All Case Statuses</option>
                <option value="missing">🔴 Missing Only</option>
                <option value="sighted">🟡 Sighted Only</option>
                <option value="reunited">🟢 Reunited Cases</option>
              </select>
            </div>
          </div>

          {/* Rewards Only Toggle */}
          <div className="md:col-span-3 flex items-center">
            <button
              onClick={() => setOnlyRewards(!onlyRewards)}
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold border transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                onlyRewards
                  ? 'bg-amber-950/70 text-amber-300 border-amber-600/60'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>{onlyRewards ? 'Showing Rewards Only' : 'Filter Rewards Offered'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Count */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>Showing {filteredPets.length} of {pets.length} pet reports</span>
        {searchTerm && (
          <button onClick={() => setSearchTerm('')} className="text-indigo-400 hover:underline font-bold">
            Clear search filter
          </button>
        )}
      </div>

      {/* Grid */}
      {filteredPets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPets.map((pet) => (
            <div
              key={pet.id}
              onClick={() => onSelectPet(pet)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onSelectPet(pet)}
              className="bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-indigo-500/60 transition-all overflow-hidden shadow-xl cursor-pointer group flex flex-col focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <div className="relative aspect-[4/3] w-full bg-slate-950 overflow-hidden">
                <img
                  src={pet.photoUrl}
                  alt={`Photograph of missing pet ${pet.name} (${pet.breed})`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider shadow-lg ${
                    pet.status === 'missing' ? 'bg-red-600 text-white' :
                    pet.status === 'sighted' ? 'bg-amber-500 text-slate-950' :
                    'bg-emerald-500 text-slate-950'
                  }`}>
                    {pet.status === 'missing' ? 'MISSING' : pet.status === 'sighted' ? 'SIGHTED' : 'REUNITED'}
                  </span>
                </div>

                {pet.rewardActive && (
                  <div className="absolute top-3 right-3 bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-full uppercase shadow-lg">
                    {pet.currencySymbol || 'Rs.'} {pet.rewardAmount}
                  </div>
                )}
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-xl font-black text-white group-hover:text-amber-400 transition-colors">
                      {pet.name}
                    </h3>
                    <span className="text-[10px] font-mono text-slate-400">Notice #{pet.id}</span>
                  </div>

                  <p className="text-xs font-bold text-indigo-400 mb-2">{pet.breed} • {pet.age} • {pet.gender}</p>

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
      ) : (
        <div className="bg-slate-900/60 p-12 rounded-3xl border border-slate-800 text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-slate-500 mx-auto" />
          <h2 className="text-lg font-bold text-white">No Missing Pet Reports Found</h2>
          <p className="text-xs text-slate-400">Try clearing your search query or status filters.</p>
        </div>
      )}

    </div>
  );
};
