import React, { useState } from 'react';
import { usePaws } from '../context/PawsContext';
import { Heart, QrCode, Check, Copy, Globe, Sparkles } from 'lucide-react';

export const DonatePage = ({ setActiveTab }) => {
  const { siteConfig, currency, currencies, changeCurrency } = usePaws();
  const [customAmount, setCustomAmount] = useState('');
  const [copied, setCopied] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [thankYouMsg, setThankYouMsg] = useState(false);

  // Preset amounts tailored to selected currency
  const getPresetAmounts = () => {
    switch (currency.code) {
      case 'NPR':
        return [500, 1000, 2500, 5000];
      case 'INR':
        return [200, 500, 1000, 2000];
      case 'EUR':
      case 'GBP':
      case 'USD':
      case 'AUD':
      case 'CAD':
      default:
        return [10, 25, 50, 100];
    }
  };

  const presetAmounts = getPresetAmounts();
  const [selectedAmount, setSelectedAmount] = useState(presetAmounts[2]);

  const walletAddress = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F";

  const handleCopyWallet = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDonateSubmit = (e) => {
    e.preventDefault();
    setThankYouMsg(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 bg-rose-950/80 border border-rose-800/50 px-4 py-1.5 rounded-full text-xs font-bold text-rose-300">
          <Heart className="w-4 h-4 text-rose-400 fill-current" />
          <span>PawsFinder Support Fund</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">Support Lost Pet Recovery</h1>
        <p className="text-xs sm:text-sm text-slate-300">
          100% of community contributions help fund free street printing kits, emergency rescue food, and lost pet notification broadcasts in Nepal and internationally.
        </p>
      </div>

      {/* Main Grid: Custom QR Code Hub + Preset Options */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Official Custom QR Code Hub */}
        <div className="lg:col-span-5 bg-slate-900/90 p-8 rounded-3xl border-2 border-indigo-500/30 text-center space-y-6 shadow-2xl backdrop-blur-md">
          
          <div className="flex items-center justify-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <QrCode className="w-5 h-5" />
            <span>Scan-to-Donate QR Code</span>
          </div>

          {/* Dynamic QR Code Container */}
          <div className="bg-white p-4 rounded-2xl max-w-xs mx-auto shadow-2xl border-4 border-slate-900">
            <img
              src={siteConfig.donationQrUrl}
              alt="PawsFinder Donation QR Code"
              className="w-full h-auto object-contain mx-auto rounded-lg"
            />
          </div>

          <div className="space-y-1">
            <p className="text-xs font-bold text-white">Scan with eSewa, Khalti, Fonepay, or Banking Apps</p>
            <p className="text-[11px] text-slate-400">QR Code image is managed dynamically via the Admin Panel.</p>
          </div>

          {/* Wallet / Direct Payment Box */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-left">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Direct Support Account</span>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-mono text-indigo-300 truncate">{walletAddress}</span>
              <button
                onClick={handleCopyWallet}
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors shrink-0 flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Preset Donation Selection Form */}
        <div className="lg:col-span-7 bg-slate-900/90 p-8 rounded-3xl border border-slate-800 space-y-6 shadow-xl">
          
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" /> Select Contribution Amount
            </h2>

            {/* Currency Selector */}
            <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <select
                value={currency.code}
                onChange={(e) => changeCurrency(e.target.value)}
                className="bg-transparent text-white font-bold outline-none cursor-pointer text-xs"
              >
                {currencies.map(c => (
                  <option key={c.code} value={c.code} className="bg-slate-900 text-white">
                    {c.symbol} {c.code}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {thankYouMsg ? (
            <div className="bg-emerald-950/80 border border-emerald-500/50 p-8 rounded-2xl text-center space-y-4">
              <Heart className="w-12 h-12 text-rose-400 fill-current mx-auto" />
              <h3 className="text-2xl font-black text-white">Thank You for Supporting PawsFinder!</h3>
              <p className="text-xs text-slate-300">
                Your pledge of {currency.symbol} {customAmount || selectedAmount} directly powers missing pet recovery in local communities.
              </p>
              <button
                onClick={() => setThankYouMsg(false)}
                className="bg-slate-800 text-slate-200 text-xs font-bold px-6 py-2.5 rounded-xl border border-slate-700"
              >
                Make Another Contribution
              </button>
            </div>
          ) : (
            <form onSubmit={handleDonateSubmit} className="space-y-6">
              
              {/* Presets */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {presetAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => { setSelectedAmount(amt); setCustomAmount(''); }}
                    className={`py-4 px-3 rounded-2xl font-black text-base transition-all border ${
                      selectedAmount === amt && !customAmount
                        ? 'bg-gradient-to-r from-indigo-600 to-rose-600 text-white border-white/40 shadow-lg scale-105'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {currency.symbol} {amt.toLocaleString()}
                  </button>
                ))}
              </div>

              {/* Custom Input */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Or Enter Custom Amount ({currency.symbol} {currency.code})
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-slate-400 font-bold text-sm">
                    {currency.symbol}
                  </span>
                  <input
                    type="number"
                    placeholder="Custom amount..."
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 text-white font-bold text-sm pl-9 pr-4 py-3 rounded-xl outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Donor Name / Organization (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Anonymous, Kathmandu Animal Rescue..."
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 text-white text-xs px-4 py-3 rounded-xl outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-rose-600 via-indigo-600 to-rose-600 hover:from-rose-500 hover:to-indigo-500 text-white font-black py-4 rounded-2xl shadow-xl text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2"
              >
                <Heart className="w-5 h-5 fill-current" />
                <span>Confirm Support ({currency.symbol} {customAmount || selectedAmount})</span>
              </button>

            </form>
          )}

          {/* Allocation Breakdown */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fund Allocation</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-indigo-400 block">50% Street Printing</span>
                <span className="text-[10px] text-slate-400">High-visibility Posters</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-emerald-400 block">30% Food & Shelter</span>
                <span className="text-[10px] text-slate-400">Field Rescue Care</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-amber-400 block">20% Community Alerts</span>
                <span className="text-[10px] text-slate-400">Social Broadcasts</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
