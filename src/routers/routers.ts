import { RouteLocationNormalized } from "vue-router";
import { useSystemStore } from "@/stores/useSystem";

export const positionPathScrollBehavior = (to: RouteLocationNormalized) => {
  const { savePositionPaths } = useSystemStore();
  let positionPath = savePositionPaths.filter((item) => item.url === to.path);
  if (positionPath.length) {
    // 返回保存的位置
    return { top: positionPath[0].top };
  } else {
    // 返回顶部
    return { top: 0 };
  }
};

export const toKeepAliceBeforeEach = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
) => {
  // 根据页面meta的toKeepAlice描述去向哪些指定页面需要缓存当前页面信息
  const list: Array<string> = from.meta.toKeepAlice as Array<string>;
  const { includeList } = toRefs(useSystemStore());
  const { addIncludeList, deleteIncludeList } = useSystemStore();
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
    includeList.value.length &&
    includeList.value.some(
      (item) => item.path === to.path && item.to !== from.path
    )
  ) {
    deleteIncludeList(to.path);
  }
};
