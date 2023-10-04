import vue from "@vitejs/plugin-vue";
import legacy from "@vitejs/plugin-legacy";
import Layouts from "vite-plugin-vue-layouts";
import viteCompression from "vite-plugin-compression";
import { createHtmlPlugin } from "vite-plugin-html";
import Pages from "vite-plugin-pages";
import ViteRestart from "vite-plugin-restart";
import UnoCSS from "unocss/vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import {
  ElementPlusResolver,
  VueUseComponentsResolver,
} from "unplugin-vue-components/resolvers";

export default [
  vue(),
  // 文件路由
  Pages({
    extensions: ["vue", "tsx"],
  }),
  // 布局系统
  Layouts(),
  // api 自动按需引入
  AutoImport({
    resolvers: [ElementPlusResolver()],
    imports: ["vue", "pinia", "vue-router", "@vueuse/core"],
    dts: "src/auto-imports.d.ts",
    dirs: ["src/apis", "src/composables", "src/stores"],
  }),
  // 预设热重启服务
  ViteRestart({
    restart: [
      ".env*",
      "src/plugins/index.[jt]s",
      "src/apis/*.[jt]s",
      "src/composables/*.[jt]s",
      "src/stores/*.[jt]s",
    ],
  }),
  // 组件自动按需引入
  Components({
    dirs: ["src/components/"],
    extensions: ["vue", "tsx"],
    include: [/\.vue$/, /\.tsx$/],
    dts: "src/components.d.ts",
    resolvers: [ElementPlusResolver(), VueUseComponentsResolver()],
    deep: true,
  }),
  // 打包压缩资源
  viteCompression(),
  // 原子化css -unocss
  UnoCSS(),
  // html模板处理
  createHtmlPlugin({
    minify: true,
  }),
  // 生成兼容代码
  legacy()
];
