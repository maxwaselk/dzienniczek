const CACHE_NAME = 'dzienniczek-cache-v1';
const urlsToCache = [
    '/dzienniczek/',
    '/dzienniczek/index.html',
    '/dzienniczek/style.css',
    '/dzienniczek/app.js',
    '/dzienniczek/manifest.json',
    '/dzienniczek/assets/icons/icon-192x192.png',
    '/dzienniczek/assets/icons/icon-512x512.png'
];

// Instalacja Service Workera
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

// Aktywacja Service Workera i usunięcie starych cache
self.addEventListener('activate', function(event) {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetching z cache'u
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                return response || fetch(event.request);
            })
    );
});
