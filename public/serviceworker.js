const CACHE_NAME = "pwa-template-v1";
const CACHE = await caches.open(CACHE_NAME);

self.addEventListener("install", _e => {
    console.log("Service worker installed.");
});

// Use the network, falling back to cache if we're offline
self.addEventListener("fetch", async e => e.respondWith(networkThenCache(e.request)));

function networkThenCache(request) {
    try {
        // First, try and make request to the server.
        const response = fetch(request);
        // Cache the response the server sent
        CACHE.put(request, response.clone());
        // and respond to the request itself with it.
        return response;
    } catch (error) {
        // Otherwise, return our cached copy.
        return CACHE.match(request);
    }
}
