// filepath: c:\Users\Usuario\Desktop\app\porrodoro\public\service-worker.js
const CACHE_NAME = 'porrodoro-cache-v1';
const urlsToCache = [
  '/porrodoro/',
  '/porrodoro/index.html',
  '/porrodoro/assets/favicon.ico',
  '/porrodoro/assets/logo192.png',
  '/porrodoro/assets/manifest.json',
  '/porrodoro/assets/cough1.mp3',
  '/porrodoro/assets/cough2.mp3',
  '/porrodoro/assets/cough3.mp3'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Error during cache installation:', error);
      })
  );
});

self.addEventListener('fetch', event => {
  // Ajusta la URL para manejar las solicitudes relativas al subdirectorio
  const adjustedUrl = event.request.url.includes('/porrodoro/')
    ? event.request.url
    : event.request.url.replace(self.location.origin, self.location.origin + '/porrodoro');

  event.respondWith(
    caches.match(adjustedUrl)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(response => {
          // Verifica si recibimos una respuesta válida
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clona la respuesta
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
      .catch(error => {
        console.error('Fetch error:', error);
        // Aquí podrías retornar una respuesta fallback
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Manejo de mensajes
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});