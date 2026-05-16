// Plausible Analytics — cookieless, privacy-friendly.
// Disabled if NEXT_PUBLIC_PLAUSIBLE_DOMAIN is not set (e.g. local dev).

import Script from "next/script";

export default function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const host = process.env.NEXT_PUBLIC_PLAUSIBLE_HOST || "https://plausible.io";

  if (!domain) return null;

  return (
    <>
      <Script
        defer
        data-domain={domain}
        src={`${host}/js/script.tagged-events.js`}
        strategy="afterInteractive"
      />
      {/* Custom event helper attached to window */}
      <Script id="plausible-init" strategy="afterInteractive">
        {`window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`}
      </Script>
    </>
  );
}
