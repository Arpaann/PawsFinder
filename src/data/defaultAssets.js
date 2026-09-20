// Default SVG Assets converted into clean data URLs for PawsFinder

export const DEFAULT_LOGO_URL = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 120" width="100%" height="100%">
  <defs>
    <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="%236366f1" />
      <stop offset="100%" stop-color="%234338ca" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="%23fbbf24" />
      <stop offset="100%" stop-color="%23f59e0b" />
    </linearGradient>
  </defs>
  <!-- Shield Badge -->
  <path d="M40 10 L80 10 C80 10 90 60 40 110 C-10 60 0 10 0 10 Z" transform="translate(10, 0)" fill="url(%23shieldGrad)" />
  <!-- Paw Print inside shield -->
  <path d="M50 58 C42 58 36 50 36 44 C36 40 42 38 50 38 C58 38 64 40 64 44 C64 50 58 58 50 58 Z" fill="%23ffffff" />
  <circle cx="36" cy="33" r="6" fill="url(%23goldGrad)" />
  <circle cx="45" cy="27" r="6.5" fill="url(%23goldGrad)" />
  <circle cx="55" cy="27" r="6.5" fill="url(%23goldGrad)" />
  <circle cx="64" cy="33" r="6" fill="url(%23goldGrad)" />
  
  <!-- Text Brand -->
  <text x="110" y="58" font-family="'Outfit', sans-serif" font-weight="900" font-size="44" fill="%23ffffff" letter-spacing="1">Paws</text>
  <text x="215" y="58" font-family="'Outfit', sans-serif" font-weight="800" font-size="44" fill="%23818cf8" letter-spacing="1">Finder</text>
  <text x="112" y="88" font-family="'Inter', sans-serif" font-weight="600" font-size="13" fill="%23cbd5e1" letter-spacing="2">NEPAL & INTERNATIONAL LOST PET NETWORK</text>
  <rect x="112" y="96" width="370" height="4" rx="2" fill="url(%23goldGrad)" />
</svg>`;

export const DEFAULT_QR_URL = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" rx="24" fill="%23ffffff" />
  <rect x="20" y="20" width="360" height="360" rx="16" fill="none" stroke="%234338ca" stroke-width="4" stroke-dasharray="12 8"/>
  
  <!-- Corner Position Targets -->
  <rect x="50" y="50" width="80" height="80" rx="8" fill="%231e1b4b"/>
  <rect x="65" y="65" width="50" height="50" rx="4" fill="%23ffffff"/>
  <rect x="77" y="77" width="26" height="26" rx="2" fill="%234338ca"/>
  
  <rect x="270" y="50" width="80" height="80" rx="8" fill="%231e1b4b"/>
  <rect x="285" y="65" width="50" height="50" rx="4" fill="%23ffffff"/>
  <rect x="297" y="77" width="26" height="26" rx="2" fill="%234338ca"/>
  
  <rect x="50" y="270" width="80" height="80" rx="8" fill="%231e1b4b"/>
  <rect x="65" y="285" width="50" height="50" rx="4" fill="%23ffffff"/>
  <rect x="77" y="297" width="26" height="26" rx="2" fill="%234338ca"/>

  <!-- QR Matrix Code Elements -->
  <path d="M160 50 h30 v30 h-30 z M210 50 h40 v20 h-40 z M160 90 h20 v40 h-20 z M200 100 h30 v30 h-30 z M150 150 h50 v20 h-50 z M220 150 h30 v40 h-30 z M270 150 h50 v20 h-50 z M150 190 h30 v30 h-30 z M200 190 h40 v40 h-40 z M260 190 h30 v30 h-30 z M300 200 h40 v40 h-40 z M150 240 h60 v30 h-60 z M230 240 h30 v30 h-30 z M280 250 h40 v30 h-40 z M150 280 h30 v60 h-30 z M190 290 h40 v30 h-40 z M250 290 h60 v30 h-60 z M200 330 h70 v30 h-70 z" fill="%231e293b"/>
  
  <!-- Center Logo Emblem Overlay -->
  <circle cx="200" cy="200" r="42" fill="%23ffffff" stroke="%234338ca" stroke-width="6"/>
  <path d="M200 210 C194 210 190 204 190 199 C190 195 194 193 200 193 C206 193 210 195 210 199 C210 204 206 210 200 210 Z" fill="%23ef4444" />
  <circle cx="190" cy="186" r="4" fill="%234338ca" />
  <circle cx="196" cy="182" r="4" fill="%234338ca" />
  <circle cx="204" cy="182" r="4" fill="%234338ca" />
  <circle cx="210" cy="186" r="4" fill="%234338ca" />
  
  <text x="200" y="375" font-family="'Inter', sans-serif" font-weight="800" font-size="13" fill="%234338ca" text-anchor="middle" letter-spacing="1">SCAN TO DONATE • PAWSFINDER FUND</text>
</svg>`;
