
const CACHE = 'fishradar-v1';
const ASSETS = ['/', '/index.html', '/manifest.json', '/icon-192.png', '/icon-512.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS).catch(()=>{})));
});
self.addEventListener('fetch', e => {
  const url = e.request.url;
  // Don't cache API calls - always fetch fresh weather
  if (url.includes('api.open-meteo.com') || url.includes('marine-api.open-meteo.com')) {
    e.respondWith(fetch(e.request).catch(()=> caches.match(e.request)));
    return;
  }
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
