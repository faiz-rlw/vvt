import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Markdown from 'vite-plugin-md'
import Inspect from 'vite-plugin-inspect'
import ViteRestart from 'vite-plugin-restart'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Unocss from 'unocss/vite'
import Prism from 'markdown-it-prism'
import LinkAttributes from 'markdown-it-link-attributes'

const markdownWrapperClasses = 'prose prose-sm m-auto text-left'

import {
  VueUseComponentsResolver,
} from 'unplugin-vue-components/resolvers'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue({
      reactivityTransform: true,
      include: [/\.vue$/, /\.md$/],
    }),

    // 文件路由
    Pages(),

    // 布局系统
    Layouts(),

    // api 自动按需引入
    AutoImport({
      imports: [
        'vue',
        'pinia',
        'vue/macros',
        'vue-router',
        '@vueuse/core',
      ],
      dts: true,
    }),

    // 图标库（ https://icones.netlify.app/ ）
    Icons({
      autoInstall: true,
    }),

    // 预设热重启服务
    ViteRestart({
      restart: ['.env*', 'plugin/index.[jt]s'],
    }),

    // 组件自动按需引入
    Components({
      extensions: ['vue', 'md', 'tsx'],
      include: [/\.vue$/, '/\.md$/', /\.tsx$/],
      dts: true,
      resolvers: [
        IconsResolver(),
        VueUseComponentsResolver(),
      ],
    }),

    // 支持markdown页面
    Markdown({
      wrapperClasses: markdownWrapperClasses,
      headEnabled: true,
      markdownItSetup(md) {
        md.use(Prism)
        md.use(LinkAttributes, {
          matcher: (link: string) => /^https?:\/\//.test(link),
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        })
      },
    }),

    Inspect(),

    vueJsx(),

    Unocss(),
  ],
})
