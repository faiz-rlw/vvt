import { createRouter, createWebHistory } from "vue-router";
import { setupLayouts } from "virtual:generated-layouts";
import fileRoutes from "virtual:generated-pages";
import NProgress from "nprogress";
import { useSystemStore } from "@/stores/useSystem";
import { positionPathScrollBehavior, toKeepAliceBeforeEach } from "./routers";

const router = createRouter({
  routes: setupLayouts(fileRoutes),
  history: createWebHistory(),
  scrollBehavior: (to) => positionPathScrollBehavior(to),
});

router.beforeEach((to, from, next) => {
  // 缓存页面
  toKeepAliceBeforeEach(to, from);

  // 开启页面进度条
  NProgress.start();
  next();
});

router.afterEach(() => {
  // 跳转后取消全局loading
  const { useGlobalLoading, updateGlobalLoading } = useSystemStore();
  useGlobalLoading && updateGlobalLoading(false);

  // 关闭页面进度条
  NProgress.done();
});

export default router;
