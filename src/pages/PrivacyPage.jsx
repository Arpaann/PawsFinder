import React from 'react';
import { Shield, Lock, Eye, FileText, Mail, Server, Trash2 } from 'lucide-react';

export const PrivacyPage = ({ setActiveTab }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-slate-300">
      
      {/* Page Header */}
      <div className="border-b border-slate-800 pb-6 space-y-3">
        <div className="inline-flex items-center gap-2 bg-indigo-950/80 border border-indigo-800/50 px-3.5 py-1 rounded-full text-xs font-bold text-indigo-300">
          <Shield className="w-4 h-4 text-indigo-400" />
          <span>General Privacy Policy Template</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">Privacy Policy</h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Last updated: September 19, 2026 • Effective Date: September 19, 2026
        </p>
      </div>

      <div className="bg-slate-900/80 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-8 text-xs sm:text-sm leading-relaxed">
        
        {/* Intro */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" /> 1. Overview & Commitment
          </h2>
          <p>
            At PawsFinder, we are committed to respecting your privacy while helping reunite lost pets with their families. This Privacy Policy outlines how we collect, use, store, and protect information submitted to our website and community recovery network.
          </p>
          <p className="text-xs text-slate-400">
            Note: This policy is provided as a general template for operational transparency. Users are encouraged to contact our support team regarding specific local privacy inquiries.
          </p>
        </section>

        {/* What Information We Collect */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Eye className="w-5 h-5 text-indigo-400" /> 2. Information We Collect
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-slate-300">
            <li><strong className="text-white">Pet Listing Information:</strong> Pet name, breed, age, gender, coat markings, behavior notes, and reward offers.</li>
            <li><strong className="text-white">Location Information:</strong> Last seen cross streets, neighborhood, city, and general location coordinates submitted on reports.</li>
            <li><strong className="text-white">Uploaded Photographs:</strong> Images of lost or found pets provided to generate printable posters and community alerts.</li>
            <li><strong className="text-white">Contact & Emergency Info:</strong> Contact person name, phone number, email address, and optional WhatsApp contact details provided for sighting responses.</li>
            <li><strong className="text-white">Technical Data:</strong> Basic browser type, device information, and local storage preferences (such as selected currency and cookie choices).</li>
          </ul>
        </section>

        {/* How We Use Information */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Server className="w-5 h-5 text-indigo-400" /> 3. How We Use Information
          </h2>
          <p>We use collected data solely to fulfill our community lost pet recovery mission:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
            <li>Displaying missing pet reports on public feed cards and printable posters.</li>
            <li>Enabling community members to contact pet parents directly when a pet is sighted.</li>
            <li>Generating copy-pasteable social media broadcast alerts for WhatsApp, Instagram, and local groups.</li>
            <li>Improving website security, preventing fraudulent reports, and managing platform operations.</li>
          </ul>
        </section>

        {/* Data Storage & Security */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-indigo-400" /> 4. Data Storage & Security
          </h2>
          <p>
            Submitted pet reports and site preferences are stored locally on your device via browser <code className="text-amber-300">localStorage</code> and synced securely with our platform database. We do not hardcode or expose sensitive API keys or credentials in client code.
          </p>
        </section>

        {/* Third-Party Services & Sharing */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-400" /> 5. Third-Party Services & Data Sharing
          </h2>
          <p>
            PawsFinder does not sell, rent, or trade your personal contact details to third-party marketers. Public contact phone numbers and pet details provided in lost pet reports are displayed publicly on street posters by user design to enable immediate sighting phone calls.
          </p>
        </section>

        {/* User Rights & Data Deletion Request */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-indigo-400" /> 6. User Rights & Data Deletion
          </h2>
          <p>
            You have the right to request the deletion or modification of your reported pet listings at any time. To request removal of your listing or personal contact information from our public directory:
          </p>
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
            <p className="font-bold text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-indigo-400" /> Contact Privacy Support:
            </p>
            <p className="text-xs text-slate-300 font-mono">Email: privacy@pawsfinder.org</p>
            <p className="text-xs text-slate-400">Please include your Case ID (e.g., #PF-2026-089) and phone number used during submission.</p>
          </div>
        </section>

      </div>

      <div className="pt-4 flex justify-between items-center text-xs">
        <button
          onClick={() => setActiveTab('home')}
          className="text-indigo-400 hover:underline font-bold"
        >
          ← Return to Home Overview
        </button>
        <button
          onClick={() => setActiveTab('terms')}
          className="text-indigo-400 hover:underline font-bold"
        >
          View Terms & Conditions →
        </button>
      </div>

    </div>
  );
};
