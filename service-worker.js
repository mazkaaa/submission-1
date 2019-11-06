const cache_name = "journalizr";
var urlsToCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/pages/home.html",
    "/pages/about.html",
    "/pages/contact.html",
    "/css/materialize.min.css",
    "/css/style.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/js/pages.js",
    "/manifest.json"
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(cache_name).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches.match(event.request, { cacheName: cache_name }).then(function(res) {
            if (res) {
                console.log("Service Worker: Use asset from cache: ", res.url);
                return res;
            }
            console.log("Service Worker: Loading asset from ", event.request.url);
            return fetch(event.request);
        })
    );
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != cache_name) {
                        console.log("Service Worker: " + cacheName + " deleted.");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});