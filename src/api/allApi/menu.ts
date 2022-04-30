import { fetchEndpoint } from "~/utils/request";

export default {
    getMenuList: (data: object) => fetchEndpoint("/menu/getMenuList", data),
};