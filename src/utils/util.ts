import { createVNode } from "vue";
import { notification, Modal } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
/**
 * @description: 系统提示
 * @param {string} description 提示内容
 * @return {*}
 */
export function toast(description: string): void {
  notification.info({
    message: "系统提示",
    description,
  });
}

toast.fail = (description: string) => {
  return notification.error({
    message: "系统提示",
    description,
  });
};

/**
 * @description 确认框
 * @param {string} title 标题
 * @param {string | VueNode | (() => VueNode)} content 提示内容
 * @returns {Promise}
 */
export function confirm(
  title: string = "",
  content: string = ""
): Promise<string> {
  return new Promise((resolve, reject) => {
    Modal.confirm({
      title,
      icon: createVNode(ExclamationCircleOutlined),
      content,
      onOk() {
        resolve("OK");
      },
      onCancel() {
        reject("Cancel");
      },
    });
  });
}

confirm.warn = (title: string = "", content: string = "") => {
  return new Promise((resolve, reject) => {
    Modal.confirm({
      title,
      icon: createVNode(ExclamationCircleOutlined),
      content: createVNode("div", { style: "color:red;" }, `${content}`),
      okType: "danger",
      onOk() {
        resolve("OK");
      },
      onCancel() {
        reject("Cancel");
      },
    });
  });
};

/**
 * @description 防抖函数
 * @param func 执行函数
 * @param delay 延迟时间
 * @returns
 */
export function debounce(func: Function, delay: number): Function {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return function (this: any, ...args: any[]) {
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
