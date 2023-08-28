import { acceptHMRUpdate, defineStore } from "pinia";

export const useSystemStore = defineStore("system", () => {
  // 视窗可视宽度
  const clientWidth: Ref<number> = ref(1920);
  function updateClientWidth(val: number) {
    clientWidth.value = val;
  }

  // 页面宽度
  const pageWidth: Ref<number> = ref(1920);
  function updatePageWidth(val: number) {
    pageWidth.value = val;
  }

  // 是否缩起内嵌菜单
  let isCollapsed: Ref<boolean> = computed(() => {
    return pageWidth.value ? pageWidth.value < 1440 : false;
  });

  // 是否锁定页面
  // https://vueuse.org/core/useScrollLock/
  let isPageLocked: Ref<boolean> = ref(false);
  function updatePageLocked(val: boolean) {
    isPageLocked.value = val;
  }

  // 是否开启全局loading
  let useGlobalLoading: Ref<boolean> = ref(false);
  function updateGlobalLoading(val: boolean) {
    useGlobalLoading.value = val;
  }

  // 是否开启路由滚动距离保存
  type positionPath = {
    url: string;
    top: number;
  };
  let savePositionPaths: Ref<Array<positionPath>> = ref([]);
  function addSavePositionPaths(url: string, top: number) {
    savePositionPaths.value.push({
      url,
      top,
    });
  }
  function deleteSavePositionPaths(val: string) {
    savePositionPaths.value = savePositionPaths.value.filter(
      (item) => item.url != val
    );
  }

  // 缓存页面列表
  type includePage = {
    to: string;
    path: string;
    pathName: string;
  };
  let includeList: Ref<Array<includePage>> = ref([]);
  function addIncludeList(option: includePage) {
    includeList.value.push(option);
  }
  function deleteIncludeList(path: string) {
    includeList.value = includeList.value.filter((item) => item.path !== path);
  }
  function updateIncludeList(option: Array<includePage>) {
    includeList.value = option;
  }

  return {
    clientWidth,
    pageWidth,
    isCollapsed,
    isPageLocked,
    useGlobalLoading,
    savePositionPaths,
    keepAlive: computed(() => includeList),
    updateClientWidth,
    updatePageWidth,
    updatePageLocked,
    updateGlobalLoading,
    addSavePositionPaths,
    deleteSavePositionPaths,
    addIncludeList,
    deleteIncludeList,
    updateIncludeList,
  };
});

if (import.meta.hot)
  import.meta.hot.accept(
    acceptHMRUpdate(useSystemStore as any, import.meta.hot)
  );
