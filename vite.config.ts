import { defineConfig, loadEnv } from "vite";
import vueJsx from "@vitejs/plugin-vue-jsx";
import plugins from "./src/plugins";
import path from "path";

function resolvePath(url: string): string {
  return path.resolve(__dirname, url);
}

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode, process.cwd()),
  };
  const {
    VITE_APP_BASE_PATH,
    VITE_ALONE_CHUNK,
  } = process.env;
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
      rollupOptions: {
        external: [resolvePath("src/scripts/**")],
        output: {
          manualChunks(id) {
            // 如果模块 ID 包含 node_modules 目录，则将其分割为 vendor chunk
            if (id.includes("node_modules")) {
              return "vendor";
            }
            let chunks = VITE_ALONE_CHUNK ? JSON.parse(VITE_ALONE_CHUNK) : [];
            // 如果模块 ID 包含 src/pages 目录，则根据子目录来分割 chunk
            for (const chunk of chunks) {
              const { chunkName, chunkFile } = chunk;
              if (chunkFile.some((item:string) => id.includes(item))) {
                return chunkName;
              }
            }
            // 其他模块不分割
            return null;
          },
        },
      },
    },
    resolve: {
      alias: {
        "@": resolvePath("./src"),
      },
    },
  });
};
