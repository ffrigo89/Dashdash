// Dash Dash! offline support.
// Everything the game needs is cached on first visit; afterwards it starts with no network at all.
// Bump VERSION whenever any file changes so installed copies pick up the update.
const VERSION = 'dashdash-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-64.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Cache first (instant + offline), then refresh the cached copy in the background when online.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(caches.open(VERSION).then(async cache => {
    const cached = await cache.match(req, { ignoreSearch: true }) ||
                   (req.mode === 'navigate' ? await cache.match('./index.html') : undefined);
    const refresh = fetch(req).then(res => { if (res && res.ok) cache.put(req, res.clone()); return res; }).catch(() => undefined);
    if (cached) { e.waitUntil(refresh); return cached; }
    return (await refresh) || new Response('Offline', { status: 503, statusText: 'Offline' });
  }));
});
