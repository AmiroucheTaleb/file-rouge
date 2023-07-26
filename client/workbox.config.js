// workbox.config.js
import { GenerateSW } from "workbox-webpack-plugin";

export default {
  // Définition de l'entrée du Service Worker
  swSrc: "src/sw.js",

  // Définition du nom du fichier de sortie du Service Worker
  swDest: "build/sw.js",

  // Configuration pour générer le manifeste de préchargement
  globDirectory: "build/",
  globPatterns: [
    "**/*.{html,js,css}",
    "images/**/*.png",
    "fonts/**/*.woff2",
    // ...
  ],

  // Options supplémentaires pour la configuration du Service Worker
  // Par exemple, la durée de conservation du cache, etc.
  // Vous pouvez ajuster ces options selon vos besoins.
  // Consultez la documentation de Workbox pour plus d'options disponibles.
  // https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-webpack-plugin.GenerateSW
  // cacheId: 'my-cache-id',
  // maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
  // navigateFallback: '/offline.html',
  // ...
};
