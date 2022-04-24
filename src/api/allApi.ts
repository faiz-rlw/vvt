import { fetchEndpoint } from "../utils/request";

export const login = (data: object = {}) => fetchEndpoint("/login:id", data);
