export const OvlVersion = "1.00.081101"
const RUNTIME = "ovl" + OvlVersion
// The install handler takes care of precaching the resources we always need.
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(RUNTIME).then(self.skipWaiting()))
})

// The activate handler takes care of cleaning up old caches.
self.addEventListener("activate", (event) => {
  const currentCaches = [RUNTIME]
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return cacheNames.filter(
          (cacheName) => !currentCaches.includes(cacheName)
        )
      })
      .then((cachesToDelete) => {
        return Promise.all(
          cachesToDelete.map((cacheToDelete) => {
            return caches.delete(cacheToDelete)
          })
        )
      })
      .then(() => self.clients.claim())
  )
})

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return
  }
  // let chkUrl = self.location.origin.replace(":" + self.location.port, "")
  // if (event.request.url.startsWith(chkUrl)) {
  if (event.request.url.indexOf("ovlnocache") < 0) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse
        }
        return caches.open(RUNTIME).then((cache) => {
          return fetch(event.request).then((response) => {
            // Put a copy of the response in the runtime cache.
            return cache.put(event.request, response.clone()).then(() => {
              return response
            })
          })
        })
      })
    )
  }
  //}
})
