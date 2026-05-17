// Plausible Analytics — cookieless, privacy-friendly.
// Uses account-specific script (new Plausible format with unique script ID).
// To disable analytics (e.g. in dev), set NEXT_PUBLIC_DISABLE_ANALYTICS=true.

import Script from "next/script";

const DEFAULT_SCRIPT = "https://plausible.io/js/pa-HdNjeLgFVODFFquo30T4-.js";

export default function Analytics() {
  if (process.env.NEXT_PUBLIC_DISABLE_ANALYTICS === "true") return null;

  // Allow overriding the script via env var (e.g. self-hosted Plausible)
  const scriptSrc = process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT || DEFAULT_SCRIPT;

  return (
    <>
      <Script async src={scriptSrc} strategy="afterInteractive" />
      <Script id="plausible-init" strategy="afterInteractive">
        {`window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init();`}
      </Script>
    </>
  );
}
