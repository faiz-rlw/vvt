<script setup lang="ts">
// 可视元素
const clientLayout = ref<HTMLDivElement | null>(null);
// 路由元素
const pageLayout = ref<HTMLDivElement | null>(null);
const { includeRoutes } = useLayout(clientLayout, pageLayout);
</script>

<template>
  <div class="app_style" ref="clientLayout">
    <header class="header_area"></header>
    <section class="content_area">
      <div class="sider_area"></div>
      <div class="page_content_area">
        <div class="layout_page" id="pageLayout" ref="pageLayout">
          <router-view v-slot="{ Component, route }">
            <keep-alive :include="includeRoutes">
              <component :is="Component" :key="route.path" />
            </keep-alive>
          </router-view>
          <el-backtop target="#pageLayout" />
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.app_style {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  .header_area {
    width: 100%;
    height: 64px;
  }
  .content_area {
    display: flex;
    height: calc(100vh - 64px);

    .sider_area {
      width: 200px;
      height: 100%;
    }

    .page_content_area {
      padding: 20px;
      flex: 1;
      box-sizing: border-box;

      .layout_page {
        height: 100%;
        overflow-y: scroll;
      }
    }
  }
}
</style>
