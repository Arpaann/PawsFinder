import React from 'react';

/**
 * Breadcrumbs component — shown on every page except Home.
 * Renders a simple, screen-reader-friendly breadcrumb trail.
 * Also outputs BreadcrumbList schema as a JSON-LD script.
 */

const LABELS = {
  feed:           'Missing Pets',
  report:         'Report a Pet',
  donate:         'Support & Donate',
  privacy:        'Privacy Policy',
  terms:          'Terms & Conditions',
  'refund-policy':'Refund Policy',
  notfound:       '404 Not Found',
};

export function Breadcrumbs({ activeTab, setActiveTab }) {
  // Don't render on home page
  if (!activeTab || activeTab === 'home') return null;

  const label = LABELS[activeTab] || activeTab;
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://pawsfinder.org';

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl + "/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": label,
        "item": `${siteUrl}/#${activeTab}`
      }
    ]
  };

  return (
    <>
      {/* JSON-LD BreadcrumbList schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Visual breadcrumb trail */}
      <nav
        aria-label="Breadcrumb"
        className="max-w-5xl mx-auto px-4 py-3 text-sm text-slate-400"
      >
        <ol className="flex items-center gap-1 flex-wrap list-none p-0 m-0">
          <li>
            <button
              onClick={() => setActiveTab('home')}
              className="hover:text-indigo-400 focus:text-indigo-400 focus:outline-none transition-colors"
              aria-label="Go to Home"
            >
              Home
            </button>
          </li>
          <li aria-hidden="true" className="text-slate-600 select-none">/</li>
          <li>
            <span className="text-slate-200 font-medium" aria-current="page">
              {label}
            </span>
          </li>
        </ol>
      </nav>
    </>
  );
}
