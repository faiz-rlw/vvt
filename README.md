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

- 文件路由
- 布局系统
- Api 自动引入
- 组件自动引入
- 插件自动加载支持
- axios 封装请求
- pinia
- VueUse 支持
- Windi CSS
- pnpm 包管理器
- 页面跳转进度条
- Inspect 调试支持
- tsx 支持
- 支持 Markdown 渲染
- 路径别名 `~` 支持

## 项目起步

### 1. 安装依赖

```shell
pnpm install
```

或者

```shell
npm install
```

或者

```shell
yarn
```

### 2. 项目启动

```shell
pnpm dev
```

或者

```shell
npm run dev
```

或者

```shell
yarn dev
```

### 3. 项目打包

```shell
pnpm build
```

或者

```shell
npm run build
```

或者

```shell
yarn build
```

## 项目细节

### [1. 文件路由](https://github.com/hannoeru/vite-plugin-pages)

- `src/pages/index.vue` => `/`（ 默认 index.vue 为路由根目录）
- `src/pages/about.md` => `/about` 持 md 文件渲染显示)
- `src/pages/users/index.vue` => `/users` （文件夹为上级目录)
- `src/pages/users/[id].vue` => `/users/:id`（页面 prams 传参)
- `src/pages/[user]/settings.vue` => `/:user/settings`（动态路由）
- `src/pages/[...notFound].vue` => 404 路由（无效页面跳转至 404)

### [2. 布局系统](https://github.com/dishait/vite-plugin-vue-meta-layouts)

- default.vue

```html
<!-- src/layouts/default.vue -->
<template>
  我是默认布局
  <router-view />
  <!-- 页面视图出口 -->
</template>
```

- index.vue

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
<route lang="yaml"> meta:default </route>
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

具体可见 👉 [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) 与 [vite-auto-import-resolvers](https://github.com/dishait/vite-auto-import-resolvers)

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

具体可见 👉 [VueUse](https://vueuse.org/)

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

### [7. Windi CSS 支持](https://windicss.org/guide/)

原子化 CSS

Windi CSS 是从零开始编写的 Tailwind CSS 的替代方案。它的零依赖，也不要求用户安装 PostCSS 和 Autoprefixer。更为重要的是，它支持 按需生成。Windi CSS 不会一次生成所有的 CSS，而是只会生成你在代码中实际使用到的原子化 CSS。

实际用法：

直接在 dom 元素的 class 写上表达式

```css
  <div class="bg-blue-200 p-10px text-18px m-15px">Windi CSS</div>
  <div class="bg-hex-F2F2F2">Windi CSS</div>
  ...
```

具体可见 👉 [Windi CSS](https://windicss.org/guide/)

### [8. pinia 支持](https://pinia.vuejs.org/)

就像编写页面时一样，直接导出变量、方法

在页面引入调用即可

甚至可以使用计算属性computed

```javascript
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const name = ref("hellowPinia");
  const newName = computed(() => name.value + "!");
  return {
    name,
    newName
  };
});
```

```html
<script setup lang="ts">
  import { useUserStore } from "~/store/user";
  const user = useUserStore();
</script>

<template>
  <div class="container">{{user.name}} // hellowPinia</div>
  <div class="container">{{user.newName}} // hellowPinia!</div>
</template>
```
具体可见 👉 [pinia](https://pinia.vuejs.org/)