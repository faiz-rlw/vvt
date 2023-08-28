import { onUpdated, onBeforeUnmount } from "vue";
export function useLeaveTip(
  fn: () => boolean = () => {
    return false;
  },
  tip: string = "当前页面数据未保存，确认离开？"
) {
  // 监听组件更新事件，注册window.onbeforeunload事件
  onUpdated(() => {
    window.onbeforeunload = (event) => {
      if (!fn()) return;
      event.preventDefault();
      event.returnValue = tip;
      return tip;
    };
  });

  // 监听组件销毁事件，移除window.onbeforeunload事件和导航守卫
  onBeforeUnmount(() => {
    window.onbeforeunload = null;
  });
}
