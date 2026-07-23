const CACHE_NAME = 'flappy-bird-v1';

// List all files needed for your game to run offline
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './game.js',
  './img/ground.png',
  './img/BG.png',
  './img/toppipe.png',
  './img/botpipe.png',
  './img/go.png',
  './img/getready.png',
  './img/tap/t0.png',
  './img/tap/t1.png',
  './img/bird/b0.png',
  './img/bird/b1.png',
  './img/bird/b2.png',
  './sfx/start.wav',
  './sfx/flap.wav',
  './sfx/score.wav',
  './sfx/hit.wav',
  './sfx/die.wav'
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
