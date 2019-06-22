// Define a variable with the name of my cache
const cacheName = "RestaurantReviewsApp_1.0";

// Define array that holds all files that will appear in browser cache offline
const files = [
  "/index.html",
  "/restaurant.html",
  "js/main.js",
  "js/dbhelper.js",
  "js/restaurant_info.js",
  "css/styles.css",
  "data/restaurants.json",
  "img/1.jpg",
  "img/2.jpg",
  "img/3.jpg",
  "img/4.jpg",
  "img/5.jpg",
  "img/6.jpg",
  "img/7.jpg",
  "img/8.jpg",
  "img/9.jpg",
  "img/10.jpg",
  "img/favicon.jpg",
  "https://fonts.googleapis.com/css?family=Josefin+Sans&display=swap",
  "https://fonts.googleapis.com/css?family=Special+Elite&display=swap",
  "https://unpkg.com/leaflet@1.3.1/dist/leaflet.css"
];

// The install event of the service worker puts all needed files in the cache

self.addEventListener("install", function(event) {
  console.log("Worker install event in progress.");
  event.waitUntil(
    caches
      .open(cacheName)
      .then(function(cache) {
        return cache.addAll(files);
      })
      .then(function() {
        console.log("Installation complete");
      })
      .catch(function() {
        console.log("Cache install failed!");
      })
  );
});

// The activate service worker's event to check if the files in the cache are up to date to serve it to the user

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(cache => {
          if ([cache].indexOf(cache) === -1) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// The fetch event of the service worker to look for a file in the cache and if that file is in the cache serve it to the user

self.addEventListener("fetch", function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});
