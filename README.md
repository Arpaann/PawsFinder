# PawsFinder

**PawsFinder** is a lost-pet recovery and community rescue platform built with React, Vite, and Tailwind CSS.

It helps pet owners report missing pets, generate print-ready street posters, and coordinate community alerts — serving Nepal and users worldwide.

## Features

- Report a missing pet and auto-generate a printable A4 street poster
- Browse the live missing pets community feed
- Multi-currency donation support (NPR, USD, EUR, GBP, INR, AUD, CAD)
- Admin panel for managing listings, site content, and branding
- Full SEO — Open Graph, Twitter Card, structured data, sitemap, robots.txt
- Works as a Progressive Web App (PWA) — installable on mobile

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build for Production

```bash
npm run build
npm run preview
```

## Environment Variables

Copy `.env.example` to `.env` and update the domain:

```
VITE_SITE_URL=https://yourproductiondomain.com
VITE_APP_NAME=PawsFinder
```

## Project Structure

```
src/
  components/   # Reusable UI components (Navbar, Footer, Modals, etc.)
  context/      # Global state (PawsContext — pets, config, currency, admin auth)
  data/         # Initial pet listings and default assets
  pages/        # Page-level components (Home, Feed, Report, Donate, Legal)
public/
  favicon.svg   # PawsFinder paw print icon
  sitemap.xml
  robots.txt
  llms.txt
  site.webmanifest
```

## License

All rights reserved. PawsFinder is a commercial product. Do not redistribute without permission.
