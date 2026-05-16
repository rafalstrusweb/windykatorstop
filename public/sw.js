// Service Worker for WindykatorStop.pl
// Strategy: cache-first for static assets, network-first for HTML pages.
// Critical: ensures Skrypt Rozmowy works offline during a phone call.

const VERSION = "v1";
const CACHE_NAME = `windykatorstop-${VERSION}`;

// Pages that MUST work offline (critical for users in low-connectivity situations)
const PRECACHE_URLS = [
  "/",
  "/skrypt-rozmowy",
  "/epu",
  "/generator-pism",
  "/wiedza",
];

// Install: precache critical pages
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS).catch(() => null))
  );
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: network-first for navigation (fresh content), cache-first for assets
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Skip non-GET, API routes, and external requests
  if (request.method !== "GET") return;
  if (request.url.includes("/api/")) return;
  if (!request.url.startsWith(self.location.origin)) return;

  // Navigation requests (HTML pages): network-first, fallback to cache
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Update cache with fresh page
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          return response;
        })
        .catch(() =>
          caches.match(request).then((cached) => cached || caches.match("/"))
        )
    );
    return;
  }

  // Static assets (JS, CSS, images, fonts): cache-first
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((response) => {
          if (response.status === 200 && response.type === "basic") {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return response;
        })
        .catch(() => cached);
    })
  );
});
