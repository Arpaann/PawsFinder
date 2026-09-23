import React, { useState, useRef } from 'react';
import { usePaws } from '../context/PawsContext';
import html2canvas from 'html2canvas-pro';
import {
  X, Printer, Download, Copy, Check, Share2
} from 'lucide-react';
import { BRAND, SOCIAL } from '../data/brandConfig';

// ─── Correct social handles ───────────────────────────────────────────────────
const HANDLES = {
  instagram: '@pawsfinder0_0',
  tiktok:    '@pawsfinder0_0',
  linktree:  'linktr.ee/pawsfinder0_0',
  whatsapp:  BRAND.phone,
};

// ─── Social icon SVGs (inline, canvas-safe) ──────────────────────────────────
const IgSVG = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#db2777" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const TtSVG = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#0f172a" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.34 6.34 0 00-.79-.05A6.34 6.34 0 003.15 15.6a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V11.2a8.27 8.27 0 005.58 2.15v-3.4a4.83 4.83 0 01-1.82-.26z"/>
  </svg>
);

const LtSVG = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#43d854" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.511 5.853l4.005-4.117 1.46 1.418-4.005 4.117h5.747v2.019h-5.744l4.008 4.115-1.46 1.418-5.013-5.149-5.013 5.149-1.46-1.418 4.008-4.115H4.282V7.271h5.747L6.024 3.154l1.46-1.418 4.005 4.117V.453h2.022v5.4zm-2.022 7.174h2.022V23.55h-2.022z"/>
  </svg>
);

const WaSVG = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#25d366" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// ─── Shared poster footer strip ───────────────────────────────────────────────
function PosterSocialStrip() {
  return (
    <div style={{ borderColor: '#e2e8f0', paddingTop: '16px', marginTop: '16px', borderTopWidth: '2px', borderTopStyle: 'solid' }}>
      <p style={{ color: '#64748b', fontSize: '10px', fontWeight: '700', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>
        CONNECT & SHARE THIS ALERT
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
        {[
          { icon: <IgSVG />, label: HANDLES.instagram },
          { icon: <TtSVG />, label: HANDLES.tiktok },
          { icon: <LtSVG />, label: HANDLES.linktree },
          { icon: <WaSVG />, label: HANDLES.whatsapp },
        ].map(({ icon, label }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            {icon}
            <span style={{ fontSize: '10px', fontWeight: '700', color: '#334155' }}>{label}</span>
          </div>
        ))}
      </div>
      <p style={{ textAlign: 'center', fontSize: '10px', color: '#94a3b8', marginTop: '8px' }}>
        {BRAND.name} · {BRAND.website} · "{BRAND.tagline}"
      </p>
    </div>
  );
}

// ─── LOST poster template ─────────────────────────────────────────────────────
function LostPoster({ pet, siteConfig, rewardText }) {
  return (
    <div style={{ backgroundColor: '#ffffff', color: '#0f172a' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: '3px', borderBottomStyle: 'solid', borderColor: '#0f172a', paddingBottom: '16px', marginBottom: '16px' }}>
        <div style={{ height: '48px', maxWidth: '200px' }}>
          <img src={siteConfig.logoUrl} alt="PawsFinder" style={{ height: '100%', width: 'auto', objectFit: 'contain' }} />
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ color: '#dc2626', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px' }}>Neighborhood Alert</p>
          <p style={{ color: '#64748b', fontSize: '10px', fontWeight: '700' }}>PAWSFINDER RECOVERY NETWORK</p>
        </div>
      </div>

      {/* LOST headline */}
      <div style={{ backgroundColor: '#dc2626', color: '#ffffff', textAlign: 'center', padding: '20px 24px', borderRadius: '16px', marginBottom: '16px' }}>
        <h1 style={{ fontSize: '72px', fontWeight: '900', letterSpacing: '-2px', lineHeight: '1', margin: '0' }}>LOST</h1>
        <p style={{ fontSize: '16px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '3px', marginTop: '6px', opacity: 0.9 }}>
          {pet.name.toUpperCase()}
        </p>
      </div>

      {/* Reward */}
      {rewardText && (
        <div style={{ backgroundColor: '#fef3c7', border: '2px solid #f59e0b', borderRadius: '12px', padding: '12px 16px', textAlign: 'center', marginBottom: '16px' }}>
          <p style={{ color: '#451a03', fontSize: '18px', fontWeight: '900', textTransform: 'uppercase' }}>
            REWARD: {rewardText}
          </p>
        </div>
      )}

      {/* Main content grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '16px' }}>
        {/* Photo */}
        <div style={{ borderRadius: '16px', overflow: 'hidden', border: '3px solid #0f172a', aspectRatio: '1', backgroundColor: '#f8fafc' }}>
          <img
            src={pet.photoUrl || 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80'}
            alt={pet.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* Breed/age */}
          <div style={{ backgroundColor: '#f1f5f9', borderRadius: '12px', padding: '12px' }}>
            <p style={{ color: '#64748b', fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>Dog Details</p>
            <p style={{ color: '#0f172a', fontSize: '14px', fontWeight: '800', marginTop: '2px' }}>{pet.breed}</p>
            <p style={{ color: '#334155', fontSize: '12px', fontWeight: '600' }}>{pet.age} · {pet.gender}</p>
          </div>

          {/* Last seen */}
          <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '12px' }}>
            <p style={{ color: '#991b1b', fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>Last Seen</p>
            <p style={{ color: '#0f172a', fontSize: '13px', fontWeight: '800', marginTop: '2px' }}>{pet.lastSeenLocation}</p>
            <p style={{ color: '#64748b', fontSize: '11px', fontWeight: '600', marginTop: '2px' }}>
              {new Date(pet.lostDate).toLocaleDateString(undefined, { dateStyle: 'medium' })}
            </p>
          </div>

          {/* Markings */}
          {pet.markings && (
            <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fcd34d', borderRadius: '12px', padding: '12px' }}>
              <p style={{ color: '#78350f', fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>Markings</p>
              <p style={{ color: '#0f172a', fontSize: '11px', fontWeight: '700', marginTop: '2px', lineHeight: '1.4' }}>{pet.markings}</p>
            </div>
          )}
        </div>
      </div>

      {/* Behavior */}
      {pet.behaviorNotes && (
        <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '12px', marginBottom: '16px' }}>
          <p style={{ color: '#1e3a8a', fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
            Behavior & Handling
          </p>
          <p style={{ color: '#1e293b', fontSize: '11px', fontWeight: '600', lineHeight: '1.5' }}>{pet.behaviorNotes}</p>
        </div>
      )}

      {/* Contact box */}
      <div style={{ backgroundColor: '#0f172a', color: '#ffffff', borderRadius: '16px', padding: '20px', border: '3px solid #dc2626', marginBottom: '16px' }}>
        <p style={{ color: '#fbbf24', fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '6px' }}>
          IF SPOTTED — CALL IMMEDIATELY
        </p>
        <p style={{ fontSize: '24px', fontWeight: '900', letterSpacing: '-0.5px' }}>
          {pet.contactName || 'Pet Owner'}
        </p>
        <p style={{ fontSize: '32px', fontWeight: '900', color: '#f87171', letterSpacing: '-1px', marginTop: '4px' }}>
          {pet.contactPhone}
        </p>
        <p style={{ color: '#94a3b8', fontSize: '11px', marginTop: '4px' }}>
          WhatsApp also available · {BRAND.phone}
        </p>
      </div>

      <PosterSocialStrip />
    </div>
  );
}

// ─── FOUND poster template ────────────────────────────────────────────────────
function FoundPoster({ pet, siteConfig }) {
  return (
    <div style={{ backgroundColor: '#ffffff', color: '#0f172a' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: '3px', borderBottomStyle: 'solid', borderColor: '#0f172a', paddingBottom: '16px', marginBottom: '16px' }}>
        <div style={{ height: '48px', maxWidth: '200px' }}>
          <img src={siteConfig.logoUrl} alt="PawsFinder" style={{ height: '100%', width: 'auto', objectFit: 'contain' }} />
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ color: '#059669', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px' }}>Community Notice</p>
          <p style={{ color: '#64748b', fontSize: '10px', fontWeight: '700' }}>PAWSFINDER RECOVERY NETWORK</p>
        </div>
      </div>

      {/* FOUND headline */}
      <div style={{ backgroundColor: '#059669', color: '#ffffff', textAlign: 'center', padding: '20px 24px', borderRadius: '16px', marginBottom: '16px' }}>
        <h1 style={{ fontSize: '72px', fontWeight: '900', letterSpacing: '-2px', lineHeight: '1', margin: '0' }}>FOUND</h1>
        <p style={{ fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '3px', marginTop: '6px', opacity: 0.9 }}>
          A dog has been found — do you know this dog?
        </p>
      </div>

      {/* Photo + Info */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '16px' }}>
        <div style={{ borderRadius: '16px', overflow: 'hidden', border: '3px solid #059669', aspectRatio: '1', backgroundColor: '#f8fafc' }}>
          <img
            src={pet.photoUrl || 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80'}
            alt={pet.name || 'Found dog'}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '12px' }}>
            <p style={{ color: '#166534', fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>Dog Details</p>
            <p style={{ color: '#0f172a', fontSize: '14px', fontWeight: '800', marginTop: '2px' }}>{pet.breed || 'Unknown breed'}</p>
            <p style={{ color: '#334155', fontSize: '12px', fontWeight: '600' }}>{pet.age || 'Unknown age'} · {pet.gender || ''}</p>
          </div>

          <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '12px' }}>
            <p style={{ color: '#166534', fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>Found At</p>
            <p style={{ color: '#0f172a', fontSize: '13px', fontWeight: '800', marginTop: '2px' }}>{pet.lastSeenLocation}</p>
          </div>

          {pet.markings && (
            <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fcd34d', borderRadius: '12px', padding: '12px' }}>
              <p style={{ color: '#78350f', fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>Identifying Features</p>
              <p style={{ color: '#0f172a', fontSize: '11px', fontWeight: '700', marginTop: '2px' }}>{pet.markings}</p>
            </div>
          )}
        </div>
      </div>

      {/* Notice */}
      <div style={{ backgroundColor: '#f0fdf4', border: '2px solid #059669', borderRadius: '12px', padding: '14px', textAlign: 'center', marginBottom: '16px' }}>
        <p style={{ color: '#065f46', fontSize: '13px', fontWeight: '700' }}>
          If you know this dog, please contact us.
        </p>
      </div>

      {/* Contact */}
      <div style={{ backgroundColor: '#0f172a', color: '#ffffff', borderRadius: '16px', padding: '20px', border: '3px solid #059669', marginBottom: '16px' }}>
        <p style={{ color: '#6ee7b7', fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '6px' }}>
          CONTACT US
        </p>
        <p style={{ fontSize: '28px', fontWeight: '900', color: '#6ee7b7', letterSpacing: '-0.5px' }}>
          {pet.contactPhone || BRAND.phone}
        </p>
        <p style={{ color: '#94a3b8', fontSize: '11px', marginTop: '4px' }}>WhatsApp · {BRAND.phone}</p>
      </div>

      <PosterSocialStrip />
    </div>
  );
}

// ─── REUNITED poster template ─────────────────────────────────────────────────
function ReunitedPoster({ pet, siteConfig }) {
  return (
    <div style={{ backgroundColor: '#ffffff', color: '#0f172a' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: '3px', borderBottomStyle: 'solid', borderColor: '#10b981', paddingBottom: '16px', marginBottom: '16px' }}>
        <div style={{ height: '48px', maxWidth: '200px' }}>
          <img src={siteConfig.logoUrl} alt="PawsFinder" style={{ height: '100%', width: 'auto', objectFit: 'contain' }} />
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ color: '#059669', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px' }}>🐾 {BRAND.tagline}</p>
        </div>
      </div>

      {/* REUNITED headline */}
      <div style={{ backgroundColor: '#059669', color: '#ffffff', textAlign: 'center', padding: '24px', borderRadius: '16px', marginBottom: '20px' }}>
        <p style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '4px', opacity: 0.85, marginBottom: '4px' }}>
          Happy News
        </p>
        <h1 style={{ fontSize: '64px', fontWeight: '900', letterSpacing: '-2px', lineHeight: '1', margin: '0' }}>
          REUNITED 🐾
        </h1>
        <p style={{ fontSize: '22px', fontWeight: '800', marginTop: '8px', letterSpacing: '-0.5px' }}>{pet.name}</p>
        <p style={{ fontSize: '14px', opacity: 0.8, marginTop: '4px', fontWeight: '600' }}>Back where they belong.</p>
      </div>

      {/* Photo */}
      <div style={{ borderRadius: '20px', overflow: 'hidden', border: '4px solid #10b981', marginBottom: '20px', maxHeight: '320px' }}>
        <img
          src={pet.photoUrl || 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80'}
          alt={`${pet.name} — reunited`}
          style={{ width: '100%', height: '100%', objectFit: 'cover', maxHeight: '320px' }}
        />
      </div>

      {/* Thank you message */}
      <div style={{ backgroundColor: '#f0fdf4', border: '2px solid #6ee7b7', borderRadius: '16px', padding: '20px', textAlign: 'center', marginBottom: '16px' }}>
        <p style={{ color: '#065f46', fontSize: '15px', fontWeight: '700', lineHeight: '1.6' }}>
          Thank you to everyone who shared, searched, called, and helped.
        </p>
        <p style={{ color: '#059669', fontSize: '13px', fontWeight: '600', marginTop: '8px' }}>
          This reunion happened because of this community.
        </p>
      </div>

      {/* Brand sign-off */}
      <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#0f172a', borderRadius: '16px' }}>
        <p style={{ color: '#ffffff', fontSize: '16px', fontWeight: '900' }}>{BRAND.name} 🐾</p>
        <p style={{ color: '#6ee7b7', fontSize: '12px', fontStyle: 'italic', marginTop: '4px' }}>"{BRAND.tagline}"</p>
        <p style={{ color: '#64748b', fontSize: '10px', marginTop: '4px' }}>{BRAND.website}</p>
      </div>

      <PosterSocialStrip />
    </div>
  );
}

// ─── Main Modal Component ─────────────────────────────────────────────────────
export const PetPosterModal = ({ pet, onClose }) => {
  const { siteConfig, currency } = usePaws();
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const posterRef = useRef(null);

  if (!pet) return null;

  const rewardSymbol = pet.currencySymbol || currency.symbol;
  const rewardText = pet.rewardActive && pet.rewardAmount
    ? `${rewardSymbol} ${pet.rewardAmount}`
    : '';

  // Determine poster type from pet status
  const posterType = pet.status === 'reunited' ? 'reunited'
    : pet.status === 'found' ? 'found'
    : 'lost';

  const shareableText = `PLEASE HELP FIND ${pet.name.toUpperCase()}!

${pet.name} went missing near ${pet.lastSeenLocation} on ${new Date(pet.lostDate).toLocaleDateString()}.

Breed: ${pet.breed} (${pet.age || 'Age unknown'}, ${pet.gender || ''})
Last Seen: ${pet.lastSeenLocation}
Date: ${new Date(pet.lostDate).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
${rewardText ? `Reward: ${rewardText}\n` : ''}${pet.markings ? `Markings: ${pet.markings}\n` : ''}${pet.behaviorNotes ? `Behavior: ${pet.behaviorNotes}\n` : ''}
IF YOU SEE ${pet.name.toUpperCase()}, PLEASE CALL IMMEDIATELY:
${pet.contactName ? `Contact: ${pet.contactName}\n` : ''}Phone: ${pet.contactPhone}
WhatsApp: ${BRAND.phone}

Follow & share:
Instagram: ${HANDLES.instagram}
TikTok: ${HANDLES.tiktok}
Links: ${HANDLES.linktree}

Thank you so much — every share helps!
— PawsFinder · "${BRAND.tagline}"`;

  const handleCopyText = () => {
    navigator.clipboard.writeText(shareableText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        if (posterRef.current) {
          const canvas = await html2canvas(posterRef.current, { scale: 2, useCORS: true, backgroundColor: '#ffffff', logging: false });
          const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
          if (blob) {
            const file = new File([blob], `PAWSFINDER_${posterType.toUpperCase()}_${pet.name}.png`, { type: 'image/png' });
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
              await navigator.share({
                title: `PLEASE HELP FIND ${pet.name.toUpperCase()}!`,
                text: shareableText,
                files: [file]
              });
              return;
            }
          }
        }
        await navigator.share({
          title: `PLEASE HELP FIND ${pet.name.toUpperCase()}!`,
          text: shareableText,
          url: window.location.href
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          handleCopyText();
        }
      }
    } else {
      handleCopyText();
    }
  };

  const handlePrint = () => window.print();

  const handleDownload = async () => {
    if (!posterRef.current) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(posterRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
      });
      const link = document.createElement('a');
      link.download = `PAWSFINDER_${posterType.toUpperCase()}_${pet.name}_${pet.id}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Poster export failed:', err);
      window.print();
    } finally {
      setIsDownloading(false);
    }
  };

  const statusLabel = posterType === 'reunited' ? 'REUNITED' : posterType === 'found' ? 'FOUND' : 'MISSING';
  const statusClass = posterType === 'reunited'
    ? 'bg-emerald-500 text-slate-950'
    : posterType === 'found'
    ? 'bg-indigo-500 text-white'
    : 'bg-red-600 text-white';

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={`Poster for ${pet.name}`}
    >
      <div className="bg-slate-900 border border-slate-800/60 rounded-2xl sm:rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl my-auto max-h-[94vh] flex flex-col">

        {/* Mobile Pull Bar */}
        <div className="sm:hidden flex justify-center pt-2 pb-1 bg-slate-950">
          <div className="w-12 h-1 bg-slate-700 rounded-full" />
        </div>

        {/* Controls bar */}
        <div className="bg-slate-950 px-4 sm:px-5 py-3 border-b border-slate-800/60 flex items-center justify-between shrink-0 no-print flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${statusClass}`}>
              {statusLabel}
            </span>
            <span className="text-xs font-medium text-slate-500">#{pet.id}</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={handleNativeShare}
              className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-xl transition-colors active:scale-95"
              aria-label="Share poster"
            >
              <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Share</span>
            </button>

            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-700 transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />
              Print
            </button>

            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xl transition-colors active:scale-95"
              aria-label="Download poster as PNG"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              {isDownloading ? 'Preparing…' : 'PNG'}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
              aria-label="Close poster"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">

          {/* PRINTABLE POSTER — inline styles only for canvas export accuracy */}
          <div
            id="printable-poster"
            ref={posterRef}
            style={{
              backgroundColor: '#ffffff',
              padding: '32px',
              borderRadius: '16px',
              fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
              border: '1px solid #e2e8f0',
            }}
          >
            {posterType === 'reunited' ? (
              <ReunitedPoster pet={pet} siteConfig={siteConfig} />
            ) : posterType === 'found' ? (
              <FoundPoster pet={pet} siteConfig={siteConfig} />
            ) : (
              <LostPoster pet={pet} siteConfig={siteConfig} rewardText={rewardText} />
            )}
          </div>

          {/* Clickable social links (web-only — not in PNG) */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800/60 p-4 space-y-3 no-print">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Quick Links</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { href: SOCIAL.instagram.url, label: 'Instagram', color: 'hover:border-pink-700/50' },
                { href: SOCIAL.tiktok.url,    label: 'TikTok',    color: 'hover:border-slate-500' },
                { href: SOCIAL.linktree.url,  label: 'Linktree',  color: 'hover:border-green-700/50' },
                { href: SOCIAL.whatsapp.url,  label: 'WhatsApp',  color: 'hover:border-emerald-700/50' },
              ].map(({ href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} — opens in new tab`}
                  className={`flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 p-2.5 rounded-xl border border-slate-800/60 ${color} transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500`}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Share text */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800/60 p-4 space-y-3 no-print">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-indigo-400" aria-hidden="true" />
                <h3 className="text-xs font-bold text-slate-300">Social Media Message — ready to copy</h3>
              </div>
              <button
                onClick={handleCopyText}
                className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <textarea
              readOnly
              value={shareableText}
              rows={8}
              className="w-full bg-slate-900 text-slate-400 text-xs font-mono p-3 rounded-xl border border-slate-800/60 focus:outline-none resize-none"
              aria-label="Shareable social media message"
            />
          </div>

        </div>
      </div>
    </div>
  );
};
