import React from 'react';
import { usePaws } from '../context/PawsContext';
import { Heart, QrCode, Check, Copy } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const DonatePage = ({ setActiveTab }) => {
  const { siteConfig } = usePaws();
  const walletAddress = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F";
  const [copied, setCopied] = React.useState(false);

  const handleCopyWallet = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <Breadcrumbs activeTab="donate" setActiveTab={setActiveTab} />
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 bg-rose-950/80 border border-rose-800/50 px-4 py-1.5 rounded-full text-xs font-bold text-rose-300">
          <Heart className="w-4 h-4 text-rose-400 fill-current" />
          <span>PawsFinder Support Fund</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">Support Lost Pet Recovery</h1>
        <p className="text-xs sm:text-sm text-slate-300">
          100% of community contributions fund free street‑printing kits, emergency rescue food,
          and lost‑pet notification broadcasts in Nepal and worldwide.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: QR & Wallet */}
        <div className="lg:col-span-5 bg-slate-900/90 p-8 rounded-3xl border-2 border-indigo-500/30 text-center space-y-6 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <QrCode className="w-5 h-5" />
            <span>Scan‑to‑Donate QR Code</span>
          </div>

          <div className="bg-white p-4 rounded-2xl max-w-xs mx-auto shadow-2xl border-4 border-slate-900">
            <img
              src={siteConfig.donationQrUrl}
              alt="PawsFinder Donation QR Code"
              className="w-full h-auto object-contain mx-auto rounded-lg"
            />
          </div>

          <div className="space-y-1">
            <p className="text-xs font-bold text-white">
              Scan with eSewa, Khalti, Fonepay, or your banking app
            </p>
            <p className="text-[11px] text-slate-400">
              QR code is managed via the Admin Panel.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-left">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">
              Direct Support Account
            </span>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-mono text-indigo-300 truncate">
                {walletAddress}
              </span>
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

        {/* Right: Static instructions */}
        <div className="lg:col-span-7 bg-slate-900/90 p-8 rounded-3xl border border-slate-800 space-y-6 shadow-xl text-center">
          <p className="text-sm text-slate-300">
            To donate, scan the QR code or copy the wallet address above.
            Use any preferred payment platform to send funds to the displayed address.
          </p>
          <p className="text-xs text-slate-400 mt-2">
            Verify the QR code and wallet address before completing the transaction.
          </p>
        </div>
      </div>
    </div>
  );
};
