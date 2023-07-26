// webpack.config.js
import { GenerateSW } from "workbox-webpack-plugin";
import path from "path";
import workboxConfig from "./workbox.config.js";

export default {
  // Autres configurations de votre projet Webpack

  // Ajoutez le plugin GenerateSW pour générer le manifeste de préchargement
  plugins: [
    new GenerateSW({
      ...workboxConfig,
      swSrc: path.resolve(__dirname, "src/sw.js"),
    }),
  ],
};
