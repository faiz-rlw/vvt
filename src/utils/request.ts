import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import router from "@/routers";
import {
  CONTENT_TYPE_MAP,
  DEDAULT_REQUEST_OPTION,
  DEDAULT_OPERATION,
} from "@/configs/request.config";
import { validURL } from "./validate";
import { toast } from "./util";
import { useSystemStore } from "@/stores/useSystem";
const { updateGlobalLoading } = useSystemStore();

const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // 超时
  timeout: 10000,
});

let optertion: DEDAULT_OPERATION_TYPE = DEDAULT_OPERATION,
  loadingCount: number = 0;

// request拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { useLoading } = optertion;
    if (useLoading) {
      loadingCount++;
      if (loadingCount === 0) {
        // 启动loading
        updateGlobalLoading(true);
      }
    }

    // 请求映射params参数
    if (config.params) {
      let url = config.url + "?" + tansParams(config.params);
      url = url.slice(0, -1);
      config.params = {};
      config.url = url;
    }
    return config;
  },
  (error: AxiosError) => {
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (res: AxiosResponse) => {
    const { status, msg } = res.data,
      { fileName, openInNewWindow, autoShowErrorMessage, useLoading } =
        optertion;

    // 未设置状态码则默认成功状态
    const code = status || 200;

    if (useLoading) {
      loadingCount--;
      if (loadingCount === 0) {
        // 如果是最后一个响应，就关闭loading
        updateGlobalLoading(false);
      }
    }

    // 二进制数据
    if (
      res.request.responseType === "blob" ||
      res.request.responseType === "arraybuffer"
    ) {
      downLoadFile(res.data, fileName || "文件");
    }

    if (code === 200) {
      if (openInNewWindow && validURL(res.data)) {
        window.open(res.data);
      }
      return Promise.resolve(res.data);
    } else {
      autoShowErrorMessage && toast.fail(msg);
      return Promise.reject(res.data);
    }
  },
  (error: AxiosError) => {
    let { message } = error,
      data: Record<string, any> = { message: "" };

    const { autoShowErrorMessage, useLoading } = optertion;

    if (useLoading) {
      loadingCount--;
      if (loadingCount === 0) {
        // 如果是最后一个响应，就关闭loading
        updateGlobalLoading(false);
      }
    }

    if (message == "Network Error") {
      data.message = "服务器连接异常";
    } else if (message.includes("timeout")) {
      data.message = "请求超时";
    } else if (message.includes("401")) {
      router.push("/");
      data.message = "登录过期，请重新登录";
    } else if (message.includes("500")) {
      data.message = "服务器错误";
    } else {
      data = error?.response?.data || { message: "" };
    }
    autoShowErrorMessage && toast.fail(data.message);
    return Promise.reject(data);
  }
);

/**
 * @description 统一请求
 * @param {DEDAULT_REQUEST_OPTION_TYPE} options 请求参数 默认参数：DEDAULT_REQUEST_OPTION
 * @returns
 */
export function fetchEndpoint(
  options: DEDAULT_REQUEST_OPTION_TYPE = DEDAULT_REQUEST_OPTION
): Promise<AxiosResponse> {
  const { url, method, contentType, data, params, withToken } = {
    ...DEDAULT_REQUEST_OPTION,
    ...options,
  };

  const axiosConfig: AxiosRequestConfig = {
    url,
    method,
    headers: {
      "Content-Type": CONTENT_TYPE_MAP[contentType ? contentType : "JSON"],
    },
    data,
    params,
  };

  if (withToken && axiosConfig.headers) {
    axiosConfig.headers["Authorization"] = ``;
  }

  return axios(axiosConfig);
}

/**
 * @description 参数处理
 * @param {Record<string, any>} params 参数
 * @returns {string} 处理后的参数字符串
 */
function tansParams(params: Record<string, any>): string {
  let result = "";
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    const part = encodeURIComponent(propName) + "=";

    if (value !== null && typeof value !== "undefined") {
      if (typeof value === "object") {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && typeof value[key] !== "undefined") {
            const param = `${propName}[${key}]`;
            const subPart = encodeURIComponent(param) + "=";
            result += `${subPart}${encodeURIComponent(value[key])}&`;
          }
        }
      } else {
        result += `${part}${encodeURIComponent(value)}&`;
      }
    }
  }

  return result;
}

/**
 * @description 下载文件
 * @param {*} file
 * @param {*} fileName 名称
 */
function downLoadFile(file: File, fileName: string) {
  const url = window.URL.createObjectURL(new Blob([file]));
  const link = document.createElement("a");
  link.style.display = "none";
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
