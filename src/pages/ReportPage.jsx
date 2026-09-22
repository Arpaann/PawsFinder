import React, { useState } from 'react';
import { usePaws } from '../context/PawsContext';
import { PlusCircle, Award, CheckCircle2, Sparkles, AlertCircle, Globe, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const ReportPage = ({ setActiveTab, onSelectPet }) => {
  const { addPet, siteConfig, currency, currencies } = usePaws();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    age: '',
    gender: 'Male',
    lostDate: new Date().toISOString().slice(0, 16),
    lastSeenLocation: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    markings: '',
    behaviorNotes: '',
    rewardActive: false,
    rewardAmount: '25,000',
    currency: currency.code,
    currencySymbol: currency.symbol,
    photoUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80'
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [createdPet, setCreatedPet] = useState(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // File validation: Size limit 5MB
    if (file.size > 5 * 1024 * 1024) {
      setFormErrors(prev => ({ ...prev, photo: 'Image file size must be less than 5MB.' }));
      return;
    }

    // File validation: Allowed image types
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) {
      setFormErrors(prev => ({ ...prev, photo: 'Please upload a valid image file (JPEG, PNG, WebP).' }));
      return;
    }

    setFormErrors(prev => ({ ...prev, photo: null }));
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, photoUrl: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleCurrencyChange = (selectedCode) => {
    const found = currencies.find(c => c.code === selectedCode);
    if (found) {
      setFormData(prev => ({
        ...prev,
        currency: found.code,
        currencySymbol: found.symbol
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Dog's name is required.";
    if (!formData.breed.trim()) errors.breed = "Breed is required.";
    if (!formData.lastSeenLocation.trim()) errors.lastSeenLocation = "Last seen location is required.";
    
    // Phone validation regex (min 7 digits)
    const phoneClean = formData.contactPhone.replace(/[^0-9]/g, '');
    if (!phoneClean || phoneClean.length < 7) {
      errors.contactPhone = "Please enter a valid contact phone number (at least 7 digits).";
    }

    // Email validation if provided
    if (formData.contactEmail.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.contactEmail.trim())) {
        errors.contactEmail = "Please enter a valid email address.";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const newPet = addPet(formData);
      setCreatedPet(newPet);
      setSubmitted(true);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error("Submission failed:", err);
      setFormErrors({ submit: "An error occurred while publishing the report. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Breadcrumbs activeTab="report" setActiveTab={setActiveTab} />
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 bg-red-950/80 border border-red-800/50 px-3.5 py-1 rounded-full text-xs font-bold text-red-300">
          <AlertCircle className="w-4 h-4 text-amber-400" />
          <span>PawsFinder Standardized Report Form</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">Report a Missing Dog</h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Enter the details below. Your report instantly generates a printable street poster and social media share alert.
        </p>
      </div>

      {submitted && createdPet ? (
        /* Success Screen */
        <div className="bg-slate-900 border-2 border-emerald-500/40 rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-6 shadow-2xl">
          <div className="w-16 h-16 bg-emerald-950 text-emerald-400 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500/50">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white">Lost Pet Alert Published!</h2>
            <p className="text-xs text-slate-300">
              {formData.name}'s report has been registered under Case <code className="text-amber-400 font-mono">#{createdPet.id}</code>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onSelectPet(createdPet)}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl text-xs transition-colors shadow-lg"
            >
              View & Print Street Poster
            </button>
            <button
              onClick={() => setActiveTab('feed')}
              className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-6 py-3 rounded-xl text-xs border border-slate-700"
            >
              Go to Missing Pets Directory
            </button>
          </div>
        </div>
      ) : (
        /* Form & Live Poster Preview Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Form Input */}
          <form onSubmit={handleSubmit} noValidate className="lg:col-span-7 bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-xl">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-indigo-400" /> Pet Details Form
              </h2>
              <span className="text-[11px] text-slate-400 font-mono">Required Fields (*)</span>
            </div>

            {formErrors.submit && (
              <div className="bg-red-950/80 border border-red-800/60 text-red-300 p-3.5 rounded-xl text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{formErrors.submit}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Dog Name */}
              <div>
                <label htmlFor="pet-name" className="text-xs font-bold text-slate-300 block mb-1">
                  Dog's Name <span className="text-red-400">*</span>
                </label>
                <input
                  id="pet-name"
                  type="text"
                  required
                  maxLength={50}
                  placeholder="e.g. Rocky, Bella..."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 text-white text-xs px-3.5 py-2.5 rounded-xl outline-none"
                />
                {formErrors.name && <p className="text-[11px] text-red-400 mt-1">{formErrors.name}</p>}
              </div>

              {/* Breed */}
              <div>
                <label htmlFor="pet-breed" className="text-xs font-bold text-slate-300 block mb-1">
                  Dog Breed <span className="text-red-400">*</span>
                </label>
                <input
                  id="pet-breed"
                  type="text"
                  required
                  maxLength={60}
                  placeholder="e.g. Golden Retriever, German Shepherd..."
                  value={formData.breed}
                  onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 text-white text-xs px-3.5 py-2.5 rounded-xl outline-none"
                />
                {formErrors.breed && <p className="text-[11px] text-red-400 mt-1">{formErrors.breed}</p>}
              </div>

              {/* Age */}
              <div>
                <label htmlFor="pet-age" className="text-xs font-bold text-slate-300 block mb-1">Age</label>
                <input
                  id="pet-age"
                  type="text"
                  maxLength={30}
                  placeholder="e.g. 3 Years, 6 Months"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 text-white text-xs px-3.5 py-2.5 rounded-xl outline-none"
                />
              </div>

              {/* Gender */}
              <div>
                <label htmlFor="pet-gender" className="text-xs font-bold text-slate-300 block mb-1">Gender</label>
                <select
                  id="pet-gender"
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 text-white text-xs px-3.5 py-2.5 rounded-xl outline-none"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Unknown">Unknown</option>
                </select>
              </div>

              {/* Lost Since Date/Time */}
              <div className="sm:col-span-2">
                <label htmlFor="pet-lost-date" className="text-xs font-bold text-slate-300 block mb-1">
                  Lost Since (Date & Time) <span className="text-red-400">*</span>
                </label>
                <input
                  id="pet-lost-date"
                  type="datetime-local"
                  required
                  value={formData.lostDate}
                  onChange={(e) => setFormData({ ...formData, lostDate: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 text-white text-xs px-3.5 py-2.5 rounded-xl outline-none"
                />
              </div>

              {/* Last Seen Location */}
              <div className="sm:col-span-2">
                <label htmlFor="pet-location" className="text-xs font-bold text-slate-300 block mb-1">
                  Last Seen Location <span className="text-red-400">*</span>
                </label>
                <input
                  id="pet-location"
                  type="text"
                  required
                  maxLength={120}
                  placeholder="e.g. Jhamsikhel, Lalitpur, Nepal (or City / Country)"
                  value={formData.lastSeenLocation}
                  onChange={(e) => setFormData({ ...formData, lastSeenLocation: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 text-white text-xs px-3.5 py-2.5 rounded-xl outline-none"
                />
                {formErrors.lastSeenLocation && <p className="text-[11px] text-red-400 mt-1">{formErrors.lastSeenLocation}</p>}
              </div>

              {/* Contact Info */}
              <div>
                <label htmlFor="contact-name" className="text-xs font-bold text-slate-300 block mb-1">Contact Person Name</label>
                <input
                  id="contact-name"
                  type="text"
                  maxLength={60}
                  placeholder="e.g. Sujan Shrestha"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 text-white text-xs px-3.5 py-2.5 rounded-xl outline-none"
                />
              </div>

              <div>
                <label htmlFor="contact-phone" className="text-xs font-bold text-slate-300 block mb-1">
                  Contact Phone Number <span className="text-red-400">*</span>
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  required
                  maxLength={25}
                  placeholder="+977 9841234567"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 text-white text-xs px-3.5 py-2.5 rounded-xl outline-none"
                />
                {formErrors.contactPhone && <p className="text-[11px] text-red-400 mt-1">{formErrors.contactPhone}</p>}
              </div>

            </div>

            {/* REWARD SECTION WITH CURRENCY SELECTOR */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <div>
                    <span className="text-xs font-bold text-white block">Reward Offer (Optional)</span>
                    <span className="text-[11px] text-slate-400">Incentivize community members to assist in search.</span>
                  </div>
                </div>

                {/* Toggle Switch */}
                <button
                  type="button"
                  aria-label="Toggle Reward Active State"
                  onClick={() => setFormData(prev => ({ ...prev, rewardActive: !prev.rewardActive }))}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                    formData.rewardActive ? 'bg-amber-500 justify-end' : 'bg-slate-800 justify-start'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-slate-950 shadow-md"></span>
                </button>
              </div>

              {formData.rewardActive && (
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                  
                  <div className="sm:col-span-5">
                    <label htmlFor="currency-select" className="text-[11px] font-bold text-indigo-300 flex items-center gap-1 mb-1">
                      <Globe className="w-3.5 h-3.5" /> Currency Format
                    </label>
                    <select
                      id="currency-select"
                      value={formData.currency}
                      onChange={(e) => handleCurrencyChange(e.target.value)}
                      className="w-full bg-slate-900 border border-indigo-500/50 text-white text-xs px-3 py-2.5 rounded-xl font-bold outline-none"
                    >
                      {currencies.map(c => (
                        <option key={c.code} value={c.code}>
                          {c.symbol} ({c.code}) - {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-7">
                    <label htmlFor="reward-amount" className="text-[11px] font-bold text-amber-300 block mb-1">Reward Amount ({formData.currencySymbol})</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 font-black text-amber-400 text-xs">
                        {formData.currencySymbol}
                      </span>
                      <input
                        id="reward-amount"
                        type="text"
                        maxLength={20}
                        placeholder="e.g. 25,000"
                        value={formData.rewardAmount}
                        onChange={(e) => setFormData({ ...formData, rewardAmount: e.target.value })}
                        className="w-full bg-slate-900 border border-amber-500/50 text-amber-300 text-xs pl-8 pr-3 py-2.5 rounded-xl font-bold outline-none"
                      />
                    </div>
                  </div>

                </div>
              )}
            </div>

            {/* Photo Upload */}
            <div className="space-y-2">
              <label htmlFor="pet-photo" className="text-xs font-bold text-slate-300 block">Dog Photo Upload (Max 5MB)</label>
              <input
                id="pet-photo"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handlePhotoUpload}
                className="w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 cursor-pointer"
              />
              {formErrors.photo && <p className="text-[11px] text-red-400 mt-1">{formErrors.photo}</p>}
            </div>

            {/* Markings & Behavior */}
            <div>
              <label htmlFor="pet-markings" className="text-xs font-bold text-slate-300 block mb-1">Distinctive Markings & Collar Details</label>
              <textarea
                id="pet-markings"
                rows={3}
                maxLength={400}
                placeholder="White patch on chest, dark ears, wearing red collar..."
                value={formData.markings}
                onChange={(e) => setFormData({ ...formData, markings: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 text-white text-xs p-3 rounded-xl outline-none"
              />
            </div>

            <div>
              <label htmlFor="pet-behavior" className="text-xs font-bold text-slate-300 block mb-1">Behavior & Friendly Handling Notes</label>
              <textarea
                id="pet-behavior"
                rows={2}
                maxLength={300}
                placeholder="Very friendly around people, loves treats, do not chase..."
                value={formData.behaviorNotes}
                onChange={(e) => setFormData({ ...formData, behaviorNotes: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 text-white text-xs p-3 rounded-xl outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-red-600 via-amber-600 to-red-600 hover:from-red-500 hover:to-amber-500 text-white font-black py-4 rounded-2xl shadow-xl text-sm tracking-wider uppercase transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Publishing Report...' : 'Publish Report & Create Street Poster'}
            </button>

          </form>

          {/* Right Column: Live Poster Preview */}
          <div className="lg:col-span-5 space-y-4 sticky top-24">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Live Poster Preview
              </span>
              <span className="text-[10px] text-slate-400">PawsFinder Standard</span>
            </div>

            <div className="bg-white text-slate-900 rounded-2xl p-5 border-4 border-red-600 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b-2 border-slate-900 pb-2">
                <img src={siteConfig.logoUrl} alt={`${siteConfig.appTitle} logo`} className="h-6 w-auto object-contain" />
                <span className="text-[10px] font-bold text-red-600 uppercase">PAWSFINDER ALERT</span>
              </div>

              <div className="bg-red-600 text-white text-center py-2 px-3 rounded-lg">
                <h3 className="text-2xl font-black uppercase">MISSING DOG</h3>
                <p className="text-[10px] font-bold uppercase tracking-wider">PLEASE HELP FIND {formData.name || "PET"}</p>
              </div>

              {formData.rewardActive && formData.rewardAmount && (
                <div className="bg-amber-400 text-amber-950 font-black text-center py-1.5 px-3 rounded-lg text-sm border border-amber-500">
                  REWARD OFFERED: {formData.currencySymbol} {formData.rewardAmount}
                </div>
              )}

              <div className="aspect-square w-full rounded-xl overflow-hidden border-2 border-slate-900 bg-slate-100">
                <img
                  src={formData.photoUrl}
                  alt={formData.name ? `Photograph of missing pet ${formData.name}` : "Missing pet photograph preview"}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2 text-xs">
                <div className="bg-slate-100 p-2.5 rounded-lg border border-slate-200">
                  <p className="font-black text-base text-slate-900">{formData.name || "Dog's Name"}</p>
                  <p className="font-bold text-slate-600">{formData.breed || "Breed"} • {formData.age || "Age"} ({formData.gender})</p>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 space-y-1 text-[11px]">
                  <p className="font-bold text-slate-800">Last Seen: {formData.lastSeenLocation || "Location..."}</p>
                  <p className="text-slate-600">Lost: {new Date(formData.lostDate).toLocaleString()}</p>
                </div>
              </div>

              <div className="bg-slate-900 text-white p-3 rounded-xl text-center space-y-0.5">
                <span className="text-[10px] text-amber-400 font-bold uppercase block">PLEASE CALL IMMEDIATELY:</span>
                <p className="text-lg font-black text-red-400">{formData.contactPhone || "+977 9841234567"}</p>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
