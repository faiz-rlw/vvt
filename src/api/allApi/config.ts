import { fetchEndpoint } from "~/utils/request";
export default {
  login: (data: object) => fetchEndpoint("/login", data),
};
