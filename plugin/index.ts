import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Inspect from 'vite-plugin-inspect'
import ViteRestart from 'vite-plugin-restart'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Prism from 'markdown-it-prism'
import Markdown from 'vite-plugin-md'
import WindiCSS from 'vite-plugin-windicss'
import {
    AntDesignVueResolver,
    VueUseComponentsResolver,
} from 'unplugin-vue-components/resolvers'

const markdownWrapperClasses = 'prose md:prose-lg lg:prose-lg dark:prose-invert text-left p-10 prose-slate prose-img:rounded-xl prose-headings:underline prose-a:text-blue-600'
export default () => {
    return [
        vue({
			include: [/\.vue$/, /\.md$/],
		}),

        // 文件路由
        Pages({
            extensions: ['vue', 'md', 'tsx'],
        }),

        // 布局系统
        Layouts(),

        // api 自动按需引入
        AutoImport({
            imports: [
                'vue',
                'pinia',
                'vue-router',
                '@vueuse/head',
                '@vueuse/core',
            ],
            dts: 'src/auto-imports.d.ts',
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
            dts: 'src/components.d.ts',
            resolvers: [
                IconsResolver(),
                AntDesignVueResolver(),
                VueUseComponentsResolver(),
            ],
        }),
        
        // 支持WindiCSS
        WindiCSS(),

        // 支持markdown页面
        Markdown({
            wrapperClasses: markdownWrapperClasses,
            markdownItSetup(md) {
                md.use(Prism)
            },
        }),

        // 调试工具
        Inspect(),

        // tsx 支持
        vueJsx()
    ]
}