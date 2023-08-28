import { defineConfig, loadEnv } from "vite";
import vueJsx from "@vitejs/plugin-vue-jsx";
import legacy from "@vitejs/plugin-legacy";
import plugins from "./src/plugins";
import path from "path";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode, process.cwd()),
  };
  const { VITE_APP_BASE_PATH, VITE_ENABLE_COMPATIBILITY_MODE } = process.env;
  if (VITE_ENABLE_COMPATIBILITY_MODE === "true") {
    plugins.push(
      // 兼容低版本浏览器
      legacy({
        targets: ["defaults", "not IE 11"],
      })
    );
  }
  if (process.env.VITE_ENABLE_JAX === "true") {
    plugins.push(
      // 支持jsx/tsx
      vueJsx()
    );
  }
  return defineConfig({
    base: VITE_APP_BASE_PATH,
    plugins,
    build: {
      target: VITE_ENABLE_COMPATIBILITY_MODE === "true" ? "ES2015" : "modules",
      rollupOptions: {
        external: [path.resolve(__dirname, "./src/scripts/*")],
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  });
};
