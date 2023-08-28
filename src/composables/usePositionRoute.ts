import { useRoute } from "vue-router";
import { useSystemStore } from "../stores/useSystem";

// 新增/删除需要维持原页面滚动位置的页面
// 添加后，只有浏览器前进或者后退才可以触发
// 建议在点击事件里或者使用nextTick包裹，不然容易取不到node节点
export function usePositionRoute(node: string = "#pageLayout") {
  const { addSavePositionPaths, deleteSavePositionPaths } = useSystemStore();
  const route = useRoute();
  const { path } = route;
  let dom: HTMLElement | null = null;

  onMounted(() => {
    dom = document.querySelector(node);
  });

  const addPath = (url: string) => {
    if (dom) {
      addSavePositionPaths(url, (dom as HTMLElement).offsetTop);
    } else {
      console.error("未找到指定路由元素,请检查布局文件");
    }
  };
  const deletePath = (url: string) => {
    if (dom) {
      deleteSavePositionPaths(url);
    } else {
      console.error("未找到指定路由元素,请检查布局文件");
    }
  };

  return {
    // 新增指定页面
    addPath,
    // 删除指定页面
    deletePath,
    // 新增当前页面
    addNowPath: () => {
      addPath(path);
    },
    // 删除当前页面
    decreaseNowPath: () => {
      deletePath(path);
    },
  };
}
