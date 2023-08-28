// 请求头类型
export const CONTENT_TYPE_MAP: CONTENT_TYPE_MAP_TYPE = {
  JSON: "application/json; charset=utf-8",
  FORM: "application/x-www-form-urlencoded; charset=utf-8",
  FORMDATA: "multipart/form-data",
};

import { LOADING_TEXT } from "./global.config";
/**
 * @param {boolean} isHasToken 是否请求带token - 默认(true)
 * @param {boolean} isOpenPath 是否直接打开链接 - 默认(false)
 * @param {boolean} isAutoToastFail 是否自动提示报错 - 默认(true)
 * @param {string} fileName 文件名称 - 默认(文件.txt)
 */
export const DEDAULT_OPERATION: DEDAULT_OPERATION_TYPE = {
  withToken: true,
  openInNewWindow: false,
  autoShowErrorMessage: true,
  useLoading: false,
  fileName: "文件.txt",
  loadingText: LOADING_TEXT,
};

/**
 * @description 默认请求参数
 * @param {string} url 请求地址 - 默认("")
 * @param {string} contentType 请求头类型 JSON: json格式 FORM: form格式 FORMDATA:formData格式 - 默认(JSON)
 * @param {string} method 请求方式 - 默认(post) post put get delete
 * @param {Record<string, unknown>} data body请求数据 - 默认({})
 * @param {Record<string, unknown>} params url请求数据 - 默认({})
 * @param {Function} useProgressBar 是否开启返回进度条 - 默认(false)
 * @param {function} progressCallback 进度条回调函数 (val)=>{ console.log(val) } val: 进度百分比
 * @param {number} progressPrecision 进度条小数点精度
 *
 * DEDAULT_OPERATION:
 * @param {boolean} withToken 是否请求带token - 默认(true)
 * @param {boolean} autoShowErrorMessage 是否自动提示报错 - 默认(true)
 * @param {boolean} openInNewWindow 是否直接打开链接 - 默认(false)
 * @param {string} fileName 文件名称 - 默认(文件.txt)
 * @param {string} loadingText 加载时文本
 */
export const DEDAULT_REQUEST_OPTION: DEDAULT_REQUEST_OPTION_TYPE = {
  url: "",
  contentType: "JSON",
  method: "POST",
  data: {},
  params: {},
  useProgressBar: false,
  progressCallback: () => {},
  progressPrecision: 2,
  ...DEDAULT_OPERATION,
};
