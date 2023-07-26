import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheFirst, NetworkFirst } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";
// eslint-disable-next-line no-restricted-globals
const precacheManifest = self.__WB_MANIFEST || [];
precacheAndRoute(precacheManifest);

// Précacher les ressources générées lors de la construction de l'application

precacheAndRoute(precacheManifest);
console.log(precacheManifest);

// Mettre en cache les requêtes GET vers les API
registerRoute(({ url }) => url.pathname.startsWith("/api"), new NetworkFirst());

// Mettre en cache les ressources statiques
registerRoute(
  ({ request }) =>
    request.destination === "script" ||
    request.destination === "style" ||
    request.destination === "image",
  new CacheFirst({
    cacheName: "static-cache",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 7 * 24 * 60 * 60, // 1 semaine
      }),
    ],
  })
);
export function register() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service Worker registered:", registration);
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    });
  }
}
// eslint-disable-next-line no-restricted-globals
self.addEventListener("fetch", () => {});
