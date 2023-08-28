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
