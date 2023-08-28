declare type CONTENT_TYPE_MAP_TYPE = {
  JSON: string;
  FORM: string;
  FORMDATA: string;
};

declare type DEDAULT_OPERATION_TYPE = {
  withToken?: boolean;
  openInNewWindow?: boolean;
  autoShowErrorMessage?: boolean;
  useLoading?: boolean;
  fileName?: string;
  loadingText?: string;
};

declare interface DEDAULT_REQUEST_OPTION_TYPE extends DEDAULT_OPERATION_TYPE {
  url: string;
  contentType?: keyof CONTENT_TYPE_MAP_TYPE;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  data?: Record<string, unknown>;
  params?: Record<string, unknown>;
  useProgressBar?: boolean;
  progressCallback?: (progress: number) => void;
  progressPrecision?: number;
}

declare type RESPONSE_COMMON_TEYPE = {
  data: any,
  msg: string,
  status?: string
}