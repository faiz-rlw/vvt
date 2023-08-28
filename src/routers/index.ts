import { createRouter, createWebHistory } from "vue-router";
import { setupLayouts } from "virtual:generated-layouts";
import fileRoutes from "virtual:generated-pages";
import NProgress from "nprogress";
import { useSystemStore } from "@/stores/useSystem";

const router = createRouter({
  routes: setupLayouts(fileRoutes),
  history: createWebHistory(),
  scrollBehavior: (to) => {
    const { savePositionPaths } = useSystemStore();
    let positionPath = savePositionPaths.filter((item) => item.url === to.path);
    if (positionPath.length) {
      // 返回保存的位置
      return { top: positionPath[0].top };
    } else {
      // 返回顶部
      return { top: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  // 根据页面meta的toKeepAlice描述去向哪些指定页面需要缓存当前页面信息
  const list: Array<string> = from.meta.toKeepAlice as Array<string>;
  const { keepAlive, addIncludeList, deleteIncludeList } = useSystemStore();
  if (list && list.length && list.indexOf(to.path) < 0) {
    addIncludeList({
      to: to.path,
      path: from.path,
      pathName: from.name as string,
    });
  }
  // 判断进入是否满足缓存列表的一组方向路由
  // 不满足则将缓存列表所对应的缓存页面从缓存列表中去除
  if (
    keepAlive.value.length &&
    keepAlive.value.some(
      (item) => item.path === to.path && item.to !== from.path
    )
  ) {
    deleteIncludeList(to.path);
  }

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
