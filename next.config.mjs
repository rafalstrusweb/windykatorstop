/** @type {import('next').NextConfig} */

// Security headers — applied to all routes
const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
];

// Service worker needs custom caching
const swHeaders = [
  { key: "Service-Worker-Allowed", value: "/" },
  { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/sw.js",
        headers: swHeaders,
      },
    ];
  },

  async redirects() {
    return [
      // Common typos & SEO redirects
      { source: "/pomoc", destination: "/ekspertyza", permanent: false },
      { source: "/kontakt", destination: "/#pomoc-prawna", permanent: false },
      { source: "/blog", destination: "/wiedza", permanent: true },
      { source: "/blog/:slug", destination: "/wiedza/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
