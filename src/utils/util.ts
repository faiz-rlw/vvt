import { ElNotification, ElMessageBox } from "element-plus";

/**
 * @description: 系统提示
 * @param {string} message 提示内容
 * @return {*}
 */
export function toast(message: string): void {
  ElNotification({
    title: "系统提示",
    message,
    type: "success",
  });
}

toast.fail = (message: string) => {
  return ElNotification({
    title: "系统提示",
    message,
    type: "error",
  });
};

/**
 * @description 确认框
 * @param {string} title 标题
 * @param {string} msg 提示内容
 * @returns {Promise}
 */
export function confirm(title: string = "", msg: string = ""): Promise<any> {
  return ElMessageBox.confirm(`${title}`, `${msg}`, { type: "info" });
}

confirm.warn = (title: string = "", msg: string = "") => {
  return ElMessageBox.confirm(`${title}`, `${msg}`, { type: "warning" });
};

/**
 * @description 防抖函数
 * @param func 执行函数
 * @param delay 延迟时间 
 * @returns 
 */
export function debounce(func: Function, delay: number): Function {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return function(this: any, ...args: any[]) {
    // 如果有上一次的调用未执行，则取消操作
    if (timer) {
      clearTimeout(timer);
    }
    // 设置一个定时器，在延迟时间后执行操作
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
