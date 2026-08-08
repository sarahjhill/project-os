/* Project OS service worker — offline support.
   Bump CACHE when you change any file, or browsers will keep serving the old one. */
const CACHE = 'project-os-v4';
const ASSETS = [
  "./",
  "index.html",
  "css/styles.css",
  "icon.svg",
  "icon-192.png",
  "icon-512.png",
  "manifest.webmanifest",
  "js/config.js",
  "js/data-phases.js",
  "js/data-phases-2.js",
  "js/data-docs.js",
  "js/data-docs-2.js",
  "js/data-forms.js",
  "js/forms.js",
  "js/cloud.js",
  "js/store.js",
  "js/clients-ui.js",
  "js/app.js",
  "client.html",
  "forms/index.html",
  "forms/intake.html",
  "forms/screener.html",
  "forms/consent.html",
  "forms/signoff.html",
  "forms/content.html"
];

self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function (c) {
    return Promise.all(ASSETS.map(function (a) {
      return c.add(a).catch(function () { /* skip anything missing */ });
    }));
  }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; })
      .map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  var url = new URL(e.request.url);
  if (url.origin !== location.origin) return;

  // Network-first for pages so updates appear promptly; cache-first for assets.
  var isPage = e.request.mode === 'navigate' || url.pathname.endsWith('.html');
  if (isPage) {
    e.respondWith(
      fetch(e.request).then(function (r) {
        var copy = r.clone();
        caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
        return r;
      }).catch(function () { return caches.match(e.request); })
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(function (hit) {
        return hit || fetch(e.request).then(function (r) {
          var copy = r.clone();
          caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
          return r;
        });
      })
    );
  }
});
