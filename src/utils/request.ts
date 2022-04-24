import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from "axios";

import { saveAs } from "file-saver";

export const API_HOST =
  process.env.NODE_ENV === "development"
    ? window.location.origin + "/api"
    : window.location.origin;

const service: AxiosInstance = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: API_HOST,
  // 超时
  timeout: 10000,
});

// request拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 让每个请求携带自定义token
    if (config.headers) {
      config.headers.token = localStorage.getItem("WORKSYSTEMTOKEN") || "";
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
  (error) => {
    console.log(error);
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (res: AxiosResponse) => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200;

    // 二进制数据则直接返回
    if (
      res.request.responseType === "blob" ||
      res.request.responseType === "arraybuffer"
    ) {
      return res;
    }
    if (code === 200) {
      return Promise.resolve(res);
    } else {
      return Promise.reject(res);
    }
  },
  (error) => {
    const { response } = error;
    return Promise.reject(response);
  }
);

/**
 * @description: 封装请求
 * @param {string} reqUrl 请求地址 若后面加'reqUrl:id'实际请求为'reqUrl/id'的形式
 * @param {object} data 请求数据(object)
 * @param {boolean} contentType true: json格式  false: form格式
 * @param {Method} type 请求方式
 * @return {AxiosInstance}
 */
export function fetchEndpoint(
  reqUrl: string,
  data: object,
  contentType: boolean = true,
  type: Method = "POST"
): AxiosInstance | any {
  if (!reqUrl) {
    return false;
  }
  let urlArr = reqUrl.split(":");
  let url = `${urlArr[0]}${
    urlArr.length > 1 ? "/" + Object.values(data)[0] : ""
  }`;
  let reqData = {
    method: type,
    url,
    headers: {
      requestContentType: contentType,
    },
    data: urlArr.length > 1 ? {} : contentType ? data : {},
    params: urlArr.length > 1 ? {} : contentType ? {} : data,
  };
  return service({
    ...reqData,
  });
}

/**
 * @description 参数处理
 * @param {*} params  参数
 */
export function tansParams(params: any): string {
  let result = "";
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    var part = encodeURIComponent(propName) + "=";
    if (value !== null && typeof value !== "undefined") {
      if (typeof value === "object") {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && typeof value[key] !== "undefined") {
            let params = propName + "[" + key + "]";
            var subPart = encodeURIComponent(params) + "=";
            result += subPart + encodeURIComponent(value[key]) + "&";
          }
        }
      } else {
        result += part + encodeURIComponent(value) + "&";
      }
    }
  }
  return result;
}

export function downloadFile(url: string, params: object, filename: string) {
  service(url, params).then((res) => {
    const { data } = res.data;
    const blob = new Blob([data]);
    let name = filename ? filename : new Date().getTime().toString()
    saveAs(blob, name);
  }).catch(res =>{
    console.log(res)
  })
}
