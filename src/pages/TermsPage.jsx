import React from 'react';
import { ShieldCheck, AlertTriangle, FileText, CheckCircle2, UserX, Scale } from 'lucide-react';

export const TermsPage = ({ setActiveTab }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-slate-300">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 space-y-3">
        <div className="inline-flex items-center gap-2 bg-indigo-950/80 border border-indigo-800/50 px-3.5 py-1 rounded-full text-xs font-bold text-indigo-300">
          <ShieldCheck className="w-4 h-4 text-indigo-400" />
          <span>Community Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">Terms & Conditions</h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Last updated: September 19, 2026 • Effective Date: September 19, 2026
        </p>
      </div>

      <div className="bg-slate-900/80 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-8 text-xs sm:text-sm leading-relaxed">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" /> 1. Acceptance of Terms
          </h2>
          <p>
            By accessing or submitting information to PawsFinder, you agree to be bound by these Terms & Conditions. PawsFinder provides a community platform to report missing pets, publish printable posters, and share sighting alerts.
          </p>
        </section>

        {/* Section 2: Accuracy & User Responsibilities */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-indigo-400" /> 2. User Responsibilities & Accuracy of Information
          </h2>
          <p>Users submitting pet reports or sighting notifications agree to:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
            <li>Provide truthful, accurate, and current information regarding lost or found pets.</li>
            <li>Ensure uploaded photographs belong to the actual pet or that you have authorization to upload them.</li>
            <li>Maintain respectful communication with community members and pet parents.</li>
          </ul>
        </section>

        {/* Section 3: Limitations of Recovery Network */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" /> 3. Emergency & Dispatch Limitations
          </h2>
          <div className="bg-amber-950/40 p-4 rounded-2xl border border-amber-800/40 text-amber-200 text-xs leading-relaxed space-y-2">
            <p className="font-bold">Important Notice regarding emergency services:</p>
            <p>
              PawsFinder is a community-driven communication and poster distribution platform. We do not operate government animal control, police dispatch, or guaranteed emergency search personnel. For animal cruelty, dangerous animals, or immediate public safety hazards, please contact your local law enforcement or municipal animal shelter.
            </p>
          </div>
        </section>

        {/* Section 4: Prohibited Activities */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <UserX className="w-5 h-5 text-indigo-400" /> 4. Prohibited Activities
          </h2>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
            <li>Submitting false or fraudulent lost pet reports, fake photos, or extortionate reward claims.</li>
            <li>Harassing, spamming, or soliciting pet parents using contact numbers listed on posters.</li>
            <li>Scraping platform data for unauthorized commercial distribution.</li>
          </ul>
        </section>

        {/* Section 5: Limitation of Liability */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Scale className="w-5 h-5 text-indigo-400" /> 5. Limitation of Liability
          </h2>
          <p>
            PawsFinder shall not be held liable for inaccurate user submissions, unsuccessful search outcomes, or disputes between pet parents and third parties. Platform services are provided on an "as is" and "as available" basis.
          </p>
        </section>

      </div>

      <div className="pt-4 flex justify-between items-center text-xs">
        <button
          onClick={() => setActiveTab('privacy')}
          className="text-indigo-400 hover:underline font-bold"
        >
          ← Privacy Policy
        </button>
        <button
          onClick={() => setActiveTab('refund-policy')}
          className="text-indigo-400 hover:underline font-bold"
        >
          Refund & Support Policy →
        </button>
      </div>

    </div>
  );
};
