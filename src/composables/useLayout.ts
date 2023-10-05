export function useLayout(
  clientLayout: Ref<HTMLDivElement | null>,
  layoutPage: Ref<HTMLDivElement | null>
) {
  const { updateClientWidth, updatePageWidth } =
    useSystemStore();
  const { includeList, isPageLocked } = toRefs(useSystemStore());

  if (clientLayout) {
    // 监听可视宽度变化
    resizeObserver(clientLayout, updateClientWidth);
  } else {
    console.error("未获取到可视元素");
  }

  if (layoutPage) {
    // 监听路由宽度变化
    resizeObserver(layoutPage, updatePageWidth);

    // 监听是否锁住路由高度
    let elLocked = useScrollLock(layoutPage);
    watch(
      () => isPageLocked,
      (newVal) => {
        elLocked.value = newVal.value;
      }
    );
  } else {
    console.error("未获取到路由元素");
  }

  return {
    // 页面需被缓存的列表
    includeRoutes: computed(() => {
      return includeList.value.map((item) => item.pathName);
    }),
  };
}

function resizeObserver(
  el: Ref<HTMLDivElement | null>,
  updateFunciton: (val: number) => void
) {
  const { stop } = useResizeObserver(el, (entries) => {
    const entry = entries[0];
    const { width } = entry.contentRect;
    // 更新store
    updateFunciton(width);

    // 在组件卸载时停止观察
    tryOnUnmounted(() => {
      stop();
    });
  });
}
