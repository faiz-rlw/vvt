<script setup lang="ts">
// 可视元素
const clientLayout = ref<HTMLDivElement | null>(null);
// 路由元素
const pageLayout = ref<HTMLDivElement | null>(null);
// HTML BODY
const body = document.body;

const { includeRoutes } = useLayout(clientLayout, pageLayout);
</script>

<template>
  <div class="flex flex-col w-full h-screen" ref="clientLayout">
    <header class="w-full h-64px"></header>
    <section class="flex h-[calc(100vh-64px)]">
      <div class="w-200px h-full"></div>
      <div class="p-20px flex-1 box-border">
        <div class="h-full overflow-y-auto" ref="pageLayout">
          <router-view v-slot="{ Component, route }">
            <keep-alive :include="includeRoutes">
              <component :is="Component" :key="route.path" />
            </keep-alive>
          </router-view>
          <a-back-top :target="() => (pageLayout ? pageLayout : body)" />
        </div>
      </div>
    </section>
  </div>
</template>
