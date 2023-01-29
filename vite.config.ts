import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import svgx from "@svgx/vite-plugin-qwik";

import path from "path";

export default defineConfig(() => {
  return {
    plugins: [
      qwikCity(),
      qwikVite(),
      tsconfigPaths(),
      svgx({
        defaultImport: "component",
      }),
    ],
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
    resolve: {
      alias: {
        "@svg": path.resolve(__dirname, "./node_modules/@material-symbols/svg-400/rounded"),
      },
    },
  };
});
