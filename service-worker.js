importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
    { url: '/index.html', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/teamlist.html', revision: '1' },
    { url: '/icon.png', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/css/style.css', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/script.js', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/push.js', revision: '1' },
]);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

// Menyimpan cache untuk file font selama 1 tahun
workbox.routing.registerRoute(
  /^https:\/\/api\.football\-data\.org/,
  workbox.strategies.cacheFirst({
    cacheName: 'football-api',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);



// const CACHE_NAME = "football-api";
// var urlsToCache = [
//   "/",
//   "/nav.html",
//   "/index.html",
//   "/teamlist.html",
//   "/pages/match.html",
//   "/pages/saved.html",
//   "/pages/team.html",
//   "/css/materialize.min.css",
//   "/css/style.css",
//   "/js/push.js",
//   "/js/materialize.min.js",
//   "/js/nav.js",
//   "/js/api.js",
//   "/js/db.js",
//   "/js/idb.js",
//   "/manifest.json",
//   "/icon.png",
//   "https://fonts.googleapis.com/icon?family=Material+Icons"
// ];

// // install sw dan membuka cache lalu menambahkan aset ke cache
// self.addEventListener("install", function(event) {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then(function(cache) {
//       return cache.addAll(urlsToCache);
//     })
//   );
// });

// memuat aset yang ada di cache, sehingga bisa diakses ketika offline
self.addEventListener("fetch", function(event) {
  var base_url = "https://api.football-data.org/";
  
  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(response) {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request, {ignoreSearch: true}).then(function(response) {
        return response || fetch (event.request);
      })
    )
  }
});

// // menghapus cache lama apabila update
// self.addEventListener("activate", function(event) {
//     event.waitUntil(
//       caches.keys().then(function(cacheNames) {
//         return Promise.all(
//           cacheNames.map(function(cacheName) {
//             if (cacheName != CACHE_NAME) {
//               console.log("ServiceWorker: cache " + cacheName + " dihapus");
//               return caches.delete(cacheName);
//             }
//           })
//         );
//       })
//     );
// });

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'img/notification.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});