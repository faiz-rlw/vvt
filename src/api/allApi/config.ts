import { fetchEndpoint } from "~/utils/request";

/**
 * reqUrl : 请求地址
 * data : 请求数据
 * contentType : HTTP内容类型; 默认JSON类型('JSON'|'FORM'|'FORMDATA')
 * type : 请求方式 ; 默认POST('POST'|'GET'|'PUT'|'DELETE')
 * isHaveToken: 是否需要在请求头加token; 默认加token(true)
 */
export default {
    login: (data: object) =>
        fetchEndpoint({
            reqUrl: "/login",
            data,
        }),
};
