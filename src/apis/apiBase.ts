import { fetchEndpoint } from "@/utils/request";

export default {
  uploadFile: (data: any) =>
    fetchEndpoint({
      url: "/uploadFile",
      data
    }),
};

