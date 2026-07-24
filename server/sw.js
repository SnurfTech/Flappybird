const CACHE_NAME = 'flappy-bird-v1';

// List all files needed for your game to run offline
const ASSETS_TO_CACHE = [
  './',
  './index.html'
  // Add any image or sound paths here if they are separate files (e.g., './bg.png')
];

// Install Event: Save game files to browser cache
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Fetch Event: Serve cached files when offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
