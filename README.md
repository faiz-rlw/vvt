<div align="center">
    <img width="200px" height="200px" src="" />
    <h1>vvt</h1>
    <h2>vite + vue3 + typescript 开发模板</h2>
    <a href="https://github.com/antfu"><h4>借鉴Anthony Fu 大佬的vitess</h4></a>
</div>
<br />
<br />

## 项目地址

```shell
git clone https://gitee.com/yysr_rlw/vue3-vite.git
```

## 项目配置项

-   文件路由
-   布局系统
-   Api 自动引入
-   组件自动引入
-   图标库引入
-   插件自动加载支持
-   axios 封装请求
-   pinia
-   VueUse 支持
-   Uno css
-   pnpm 包管理器
-   页面跳转进度条
-   Inspect 调试支持
-   tsx 支持
-   支持 Markdown 渲染
-   路径别名 `~` 支持

## 项目起步

### 1. 安装依赖

```shell
pnpm install

# npm install

# yarn
```

### 2. 项目启动

```shell
pnpm dev

# npm run dev

# yarn dev
```

### 3. 项目打包

```shell
pnpm build

# npm run build

# yarn build
```

## 项目细节

### [1. 文件路由](https://github.com/hannoeru/vite-plugin-pages)

-   `src/pages/index.vue` => `/`（ 默认 index.vue 为路由根目录）
-   `src/pages/about.md` => `/about` 持 md 文件渲染显示)
-   `src/pages/users/index.vue` => `/users` （文件夹为上级目录)
-   `src/pages/users/[id].vue` => `/users/:id`（页面 prams 传参)
-   `src/pages/[user]/settings.vue` => `/:user/settings`（动态路由）
-   `src/pages/[...notFound].vue` => 404 路由（无效页面跳转至 404)

<br />

### [2. 布局系统](https://github.com/dishait/vite-plugin-vue-meta-layouts)

-   default.vue

```html
<!-- src/layouts/default.vue -->
<template>
    我是默认布局
    <router-view />
    <!-- 页面视图出口 -->
</template>
```

-   index.vue

```html
<!-- src/pages/index.vue -->
<template>
    <div>我是首页</div>
</template>

<!-- 
    默认（default）时可省略以下内容
    此处的（default）来自于layouts文件夹下的default.vue
    举一反三，若想修改布局，layouts文件下的notFound.vue，将meta：后面改成文件名即可（otFound）
-->
<route lang="yaml"> { meta: { layout: 'default' } } </route>
```

<br />

### [3. Api 自动引入](https://github.com/antfu/unplugin-auto-import)

如 `vue` 的 `api` 需要在页面手动通过 `import`引入，且`api`为按需自动引入。

模板内支持：

1. vue
2. vueuse
3. vue-router

```ts
import { ref, onMounted } from "vue";
const count = ref(0);
onMounted(() => {
    count.value++;
});
```

现在可以直接在页面开发中直接使用，无需录入。

```ts
const count = ref(0);
onMounted(() => {
    count.value++;
});
```

原地址： 👉 [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) 与

<br />

### [4. 组件自动引入](https://github.com/antfu/unplugin-auto-import)

功能同上可省略文件引入

只要在 `src/components` 下定义的组件都将会按需引入，即 `import` 是不需要的。

```html
<script setup lang="ts">
    // 可省略引入
    import HelloWord from "../components/HelloWord.vue";
</script>

<template>
    <HelloWord />
</template>
```

模板内支持：
👉 [ant design of vue](https://next.antdv.com/docs/vue/introduce-cn/) （模板内置）
[element-plus](https://element-plus.gitee.io/zh-CN/)
...

```shell
# 若不想使用ant design of vue
pnpm uninstall ant-design-vue
```

```typescript
/**
 * plugin/index.ts
 * 删除以下内容
*/
import {
--  AntDesignVueResolver,
    ...
} from 'unplugin-vue-components/resolvers'

Components({
    ...
    resolvers: [
--      AntDesignVueResolver(),
        ...
    ],
}),
```

<br />

### [5. VueUse 支持](https://vueuse.org/)

VueUse 是一个基于 Composition API 的实用函数集合。

```html
<script setup lang="ts">
    // useMouse 被自动按需引入了，不需要import
    const { x, y } = useMouse();
</script>
<template>
    <div>x坐标 {{x}}</div>
    <div>y坐标 {{y}}</div>
</template>
```

原地址： 👉 [VueUse](https://vueuse.org/)

<br />

### [6. axios 支持](https://github.com/axios/axios)

将 axios 进行二次分装，导出 fetchEndpoint 函数

将请求所有放置在~/api/allApi 文件夹下

以 export default 对象的形式抛出接口请求

```typescript
/**
 * @description: 封装请求
 * @param {string} reqUrl 请求地址 若后面加'reqUrl:id'实际请求为'reqUrl/id'的形式
 * @param {object} data 请求数据(object)
 * @param {boolean} contentType true: json格式  false: form格式
 * @param {Method} type 请求方式
 * @return {AxiosInstance}
 */
import { fetchEndpoint } from "~/utils/request";

export default {
    login: (data: object) => fetchEndpoint("/login:id", data),
};
```

调用接口方法

index.vue

```html
<script setup lang="ts">
    import http from "~/api";

    http.login({ id: 1 });
</script>
```

<br />

### [7. Unocss 支持](https://github.com/unocss/unocss)

原子化 CSS 是一种 CSS 的架构方式，它倾向于小巧且用途单一的 class，并且会以视觉效果进行命名。

UnoCSS 是一个引擎，而非一款框架，因为它并未提供核心工具类，所有功能可以通过预设和内联配置提供。

实际用法：

直接在 dom 元素的 class 写上表达式

```css
  <div class="bg-blue-200 p-10px text-18px m-15px">Unocss</div>
  <div class="bg-hex-F2F2F2">Unocss</div>
  ...
```

原地址： 👉 [Unocss](https://github.com/unocss/unocss)

<br />

### [8. pinia 支持](https://pinia.vuejs.org/)

就像编写页面时一样，直接导出变量、方法

在页面引入调用即可

甚至可以使用计算属性 computed

```javascript
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
    const name = ref("hellow pinia");
    const newName = computed(() => name.value + "!");
    return {
        name,
        newName,
    };
});
```

```html
<script setup lang="ts">
    import { useUserStore } from "~/store/user";
    const user = useUserStore();
</script>

<template>
    <div class="container">{{user.name}}</div>
    // hellow pinia
    <div class="container">{{user.newName}}</div>
    // hellow pinia!
</template>
```

原地址： 👉 [pinia](https://pinia.vuejs.org/)

<br />

### [9. 图标库](https://github.com/antfu/unplugin-icons)

在该 👉 [icones] (https://icones.netlify.app/) 图标库中任意的图标，都可直接点击即复制至页面内

支持 svg、h5 标签等方式载入

```html
<template>
    // 标签的形式
    <i-ic:baseline-back-hand />

    // svg的形式
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        class="iconify iconify--ic"
        width="32"
        height="32"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
    >
        <path
            fill="currentColor"
            d="M13 24c-3.
  26 0-6.19-1.99-7.4-5.02l-3.03-7.61a1 1 0 0 1 1.24-1.32l.79.26c.56.18 1.02.61 1.24 1.16L7.25 
  15H8V3.25a1.25 1.25 0 0 1 2.5 0V12h1V1.25a1.25 1.25 0 0 1 2.5 0V12h1V2.75a1.25 1.25 0 0 1 2.5 
  0V12h1V5.75a1.25 1.25 0 0 1 2.5 0V16c0 4.42-3.58 8-8 8z"
        ></path>
    </svg>

    ...
</template>
```

推荐使用 `vscode` 插件 `Iconify IntelliSense`

若标签的形式引入图标，将可以在 vscode 代码中直接可以看到标签的具体图标

其他用法：👉 [unplugin-icons](https://github.com/antfu/unplugin-icons)

<br />

### [9. rem 支持]()
1. [amfe-flexable](https://github.com/amfe/lib-flexible)是阿里发布的一套可伸缩适配方案。它能根据设备的宽高来设置页面body元素的字体大小，将1rem设置为设备宽度/10以及在页面大小转换时可以重新计算这些数值。
2. [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem)是postcss的一个插件，可以将对应的像素单位转换为rem。在vite中可以直接对其进行配置，因为vite已经集成了postcss。

配置：[详细可查询Github](https://github.com/cuth/postcss-pxtorem)
```javascript
// vite.config.ts
export default defineConfig({
    ...
    css: {
        postcss: {
            plugins: [
                postCssPxToRem({
                    rootValue: 75, // 根元素的值，即1rem对应的像素值大小。一般设置为设计稿尺寸/10
                    propList: ["*"], // 需要进行转换的css属性的值，可以使用通配符。如：*意思是将全部属性单位都进行转换；
                    selectorBlackList: ["fixedall_"], // 过滤掉fixedall_开头的class，不进行rem转换;若设置为[/^body$/]，则body会被匹配到而不是.body
                    // exclude: /node_modules/, // 不需要转换的文件，此处排除node_modules下的文件
                    // mediaQuery: false, // 是否允许像素在媒体查询中进行转换
                }),
            ],
        },
    },
}
```

使用方法: 
以下可以将px转换成rem
```html
// 1. 原子化css
<div class="w-1200px"></div>

// 2. 普通css
<div class="label_style"></div>
<style>
.label_style{
    width: 1200px
}
</style>
```

不进行rem转换:

```html
// 1. 将px转换成大写 PX 、Px、 pX
<div class="w-1200PX"></div>

// 2. 过滤掉fixedall_开头的class
<div class="fixedall_label"> </div>

```

注：若不需要该插件，请执行以下操作
```javascript
// mian.ts
-- import 'amfe-flexible'
```

```javascript
// vite.config.ts
export default defineConfig({
    ...
--  css: {
--      postcss: {
--          plugins: [
--              postCssPxToRem({
--                  rootValue: 75, // 1rem的大小
--                  propList: ["*"], // 需要转换的属性，这里选择全部都进行转换
--                  selectorBlackList: ["fixedall_"], // 过滤掉fixedall_开头的class，不进行rem转换
--              }),
--          ],
--      },
--  },
}
```
```JSON
// package.json
pnpm remove amfe-flexible postcss postcss-pxtorem
```

<br />