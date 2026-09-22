import React from 'react';
import { Heart, RefreshCw, HelpCircle, Mail, CheckCircle2 } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const RefundPage = ({ setActiveTab }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-slate-300">
      <Breadcrumbs activeTab="refund-policy" setActiveTab={setActiveTab} />
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 space-y-3">
        <div className="inline-flex items-center gap-2 bg-rose-950/80 border border-rose-800/50 px-3.5 py-1 rounded-full text-xs font-bold text-rose-300">
          <Heart className="w-4 h-4 text-rose-400 fill-current" />
          <span>Support & Contribution Policy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">Refund & Payment Policy</h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Last updated: September 19, 2026 • Effective Date: September 19, 2026
        </p>
      </div>

      <div className="bg-slate-900/80 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-8 text-xs sm:text-sm leading-relaxed">
        
        {/* Intro */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-400" /> 1. Platform Contributions & Services
          </h2>
          <p>
            PawsFinder allows community supporters to contribute voluntarily to fund street printing kits, food rescue supplies, and neighborhood notification broadcasts.
          </p>
        </section>

        {/* Voluntary Donations */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-indigo-400" /> 2. Non-Refundable Contributions
          </h2>
          <p>
            Voluntary donations pledged to the PawsFinder rescue fund are allocated immediately to community printing kits and rescue supplies, and are generally non-refundable once processed.
          </p>
        </section>

        {/* Duplicate & Failed Payments */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-indigo-400" /> 3. Duplicate or Erroneous Transactions
          </h2>
          <p>
            If you experience a duplicate payment or billing error (e.g. accidentally clicking submit twice or an improper bank charge), we are happy to assist you:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
            <li>Refund requests for duplicate payments must be submitted within 14 calendar days of the transaction.</li>
            <li>Approved refunds are processed back to the original payment method within 5–7 business days.</li>
          </ul>
        </section>

        {/* Contact Support */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-400" /> 4. How to Request Assistance
          </h2>
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
            <p className="font-bold text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-indigo-400" /> Support Desk:
            </p>
            <p className="text-xs text-slate-300 font-mono">Email: support@pawsfinder.org</p>
            <p className="text-xs text-slate-400">Please provide your transaction reference, date, and amount for prompt resolution.</p>
          </div>
        </section>

      </div>

      <div className="pt-4 flex justify-between items-center text-xs">
        <button
          onClick={() => setActiveTab('terms')}
          className="text-indigo-400 hover:underline font-bold"
        >
          ← Terms & Conditions
        </button>
        <button
          onClick={() => setActiveTab('donate')}
          className="text-indigo-400 hover:underline font-bold"
        >
          Go to Support & QR Hub →
        </button>
      </div>

    </div>
  );
};
