// sw.js
const CACHE_NAME = 'flappy-bird-v2'; // <--- Change version when updating files!

const ASSETS_TO_CACHE = [
  './',
  './index.html'
];

// Install: Cache new assets
self.addEventListener('install', (e) => {
  self.skipWaiting(); // Forces active worker to take over immediately
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

// Activate: Delete old cache versions
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // Deletes old version caches
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch: Serve from cache, fallback to network
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
