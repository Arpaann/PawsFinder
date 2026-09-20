import React, { useState } from 'react';
import { usePaws } from '../context/PawsContext';
import { X, Lock, Key, ShieldCheck, Upload, Trash2, CheckCircle2, RefreshCw, Save, Image, Phone, MessageSquare, AlertCircle, FileText } from 'lucide-react';

export const AdminPanelModal = ({ isOpen, onClose }) => {
  const {
    siteConfig,
    isAdmin,
    loginAdmin,
    logoutAdmin,
    pets,
    updatePetStatus,
    approvePet,
    deletePet,
    updateSiteConfig,
    updateLogo,
    updateQrCode,
    resetToDefault
  } = usePaws();

  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState('listings');

  const [configForm, setConfigForm] = useState({
    appTitle: siteConfig.appTitle,
    subtitle: siteConfig.subtitle,
    alertTickerText: siteConfig.alertTickerText,
    emergencyPhone: siteConfig.emergencyPhone,
    whatsappNumber: siteConfig.whatsappNumber
  });

  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    const result = loginAdmin(password);
    if (!result.success) {
      setErrorMsg(result.message);
    } else {
      setErrorMsg('');
      setPassword('');
    }
  };

  const handleSaveConfig = (e) => {
    e.preventDefault();
    updateSiteConfig(configForm);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleLogoFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQrFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateQrCode(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">PAWS Global Admin Dashboard</h2>
              <p className="text-xs text-slate-400">Manage Pet Reports, Site Content & Brand Assets</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isAdmin ? (
          /* Login Screen */
          <div className="p-8 max-w-md mx-auto w-full my-8 space-y-6 text-center">
            <div className="w-16 h-16 bg-indigo-950 border-2 border-indigo-500/40 rounded-3xl flex items-center justify-center mx-auto text-indigo-400">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-black text-white">Admin Authentication</h3>
              <p className="text-xs text-slate-400 mt-1">Please enter your admin password to manage platform content.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Key className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Admin Password..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 text-white pl-11 pr-4 py-3 rounded-xl text-sm outline-none transition-colors"
                  required
                />
              </div>

              {errorMsg && (
                <div className="flex items-center gap-2 text-red-400 text-xs bg-red-950/60 p-3 rounded-xl border border-red-800/40">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-900/40 text-sm"
              >
                Log In to Admin Panel
              </button>
            </form>

            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400">
              💡 Admin Password: <code className="text-amber-400 font-mono">PAWS_Admin@2026!</code>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 overflow-y-auto flex flex-col">
            
            {/* Tabs */}
            <div className="bg-slate-950 px-6 py-2 border-b border-slate-800 flex items-center justify-between gap-4 overflow-x-auto shrink-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('listings')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'listings'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  Manage Reports ({pets.length})
                </button>

                <button
                  onClick={() => setActiveTab('content')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'content'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  Edit Site Text & Hotline
                </button>

                <button
                  onClick={() => setActiveTab('assets')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'assets'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  Replace Logo & QR Code
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={resetToDefault}
                  className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-amber-400 p-2 hover:bg-slate-800 rounded-lg transition-colors"
                  title="Reset data to initial state"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Demo Data</span>
                </button>

                <button
                  onClick={logoutAdmin}
                  className="text-[11px] font-bold text-red-400 hover:text-red-300 bg-red-950/40 px-3 py-1.5 rounded-lg border border-red-800/40"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Tab 1: Manage Listings */}
            {activeTab === 'listings' && (
              <div className="p-6 space-y-4 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Reported Missing Pets</h3>
                  <span className="text-xs text-slate-400">Updates sync instantly</span>
                </div>

                <div className="space-y-3">
                  {pets.map((pet) => (
                    <div
                      key={pet.id}
                      className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={pet.photoUrl}
                          alt={pet.name}
                          className="w-14 h-14 rounded-xl object-cover border border-slate-700 shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-black text-white text-base">{pet.name}</h4>
                            <span className="text-xs text-slate-400 font-mono">({pet.breed})</span>
                          </div>
                          <p className="text-xs text-slate-400">{pet.lastSeenLocation}</p>
                          {pet.rewardActive && (
                            <span className="text-[10px] font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40 mt-1 inline-block">
                              {pet.rewardAmount}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center gap-2 self-end md:self-center">
                        <select
                          value={pet.status}
                          onChange={(e) => updatePetStatus(pet.id, e.target.value)}
                          className="bg-slate-900 text-xs font-bold text-slate-200 border border-slate-700 rounded-lg px-3 py-2 outline-none"
                        >
                          <option value="missing">🔴 Missing</option>
                          <option value="sighted">🟡 Sighted</option>
                          <option value="reunited">🟢 Reunited</option>
                        </select>

                        <button
                          onClick={() => approvePet(pet.id, !pet.approved)}
                          className={`px-3 py-2 rounded-lg text-xs font-bold border transition-colors flex items-center gap-1 ${
                            pet.approved
                              ? 'bg-emerald-950/50 text-emerald-400 border-emerald-800/50'
                              : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{pet.approved ? 'Approved' : 'Pending'}</span>
                        </button>

                        <button
                          onClick={() => deletePet(pet.id)}
                          className="p-2 bg-red-950/50 hover:bg-red-900/60 text-red-400 rounded-lg border border-red-800/40 transition-colors"
                          title="Delete Report"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Global Content Editor */}
            {activeTab === 'content' && (
              <form onSubmit={handleSaveConfig} className="p-6 space-y-5 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Site Text & Contact Info</h3>
                  {saveSuccess && (
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Changes saved!
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-400 block mb-1">Platform Name</label>
                    <div className="relative">
                      <FileText className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={configForm.appTitle}
                        onChange={(e) => setConfigForm({ ...configForm, appTitle: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 text-white text-xs pl-9 pr-3 py-2.5 rounded-xl outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-400 block mb-1">Helpline Phone Number</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={configForm.emergencyPhone}
                        onChange={(e) => setConfigForm({ ...configForm, emergencyPhone: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 text-white text-xs pl-9 pr-3 py-2.5 rounded-xl outline-none"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-xs font-bold text-slate-400 block mb-1">WhatsApp Contact Number</label>
                    <div className="relative">
                      <MessageSquare className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={configForm.whatsappNumber}
                        onChange={(e) => setConfigForm({ ...configForm, whatsappNumber: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 text-white text-xs pl-9 pr-3 py-2.5 rounded-xl outline-none"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-xs font-bold text-amber-400 block mb-1">Top Banner Alert Ticker Message</label>
                    <textarea
                      rows={3}
                      value={configForm.alertTickerText}
                      onChange={(e) => setConfigForm({ ...configForm, alertTickerText: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 text-white text-xs p-3 rounded-xl outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-colors shadow-lg shadow-indigo-900/30"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </form>
            )}

            {/* Tab 3: Brand Logo & Donation QR Uploader */}
            {activeTab === 'assets' && (
              <div className="p-6 space-y-6 flex-1">
                <div>
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Logo & Donation QR Code Manager</h3>
                  <p className="text-xs text-slate-400">Upload new files to replace the site logo and donation QR code across the website instantly.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Brand Logo Uploader */}
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-400 uppercase flex items-center gap-1.5">
                        <Image className="w-4 h-4" /> Brand Logo Image
                      </span>
                    </div>

                    <div className="h-20 bg-slate-900 rounded-xl p-3 border border-slate-800 flex items-center justify-center overflow-hidden">
                      <img
                        src={siteConfig.logoUrl}
                        alt="Logo Preview"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-2">Upload New Logo Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoFileUpload}
                        className="w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Donation QR Code Uploader */}
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-rose-400 uppercase flex items-center gap-1.5">
                        <Upload className="w-4 h-4" /> Donation QR Code Image
                      </span>
                    </div>

                    <div className="h-32 bg-white rounded-xl p-2 border border-slate-800 flex items-center justify-center overflow-hidden">
                      <img
                        src={siteConfig.donationQrUrl}
                        alt="QR Code Preview"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-2">Upload New QR Code Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleQrFileUpload}
                        className="w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-rose-600 file:text-white hover:file:bg-rose-500 cursor-pointer"
                      />
                    </div>
                  </div>

                </div>
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
};
