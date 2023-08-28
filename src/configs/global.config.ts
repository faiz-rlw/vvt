// 加载时文本
export const LOADING_TEXT: string = "资源加载中...";
// 提示信息
export const confirmOption: CONFIRMOPTIONTYPE = {
  title: "系统提示",
  content: "",
  okText: "确认",
  cancelText: "取消",
};
// 默认允许文件类型
export const ALLOW_FILE_TYPE:Array<FILETYPE> = [
  {
    name: 'xlsx',
    rules: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  },
  {
    name: 'xls',
    rules: 'application/vnd.ms-excel',
  },
  {
    name: 'doc',
    rules: 'application/msword',
  },
  {
    name: 'docx',
    rules:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  },
  {
    name: 'txt',
    rules: 'text/plain',
  },
  {
    name: 'pdf',
    rules: 'application/pdf',
  },
];

// 默认允许图片类型
export const ALLOW_IMAGE_TYPE:Array<FILETYPE> = [
  {
    name: 'png',
    rules: 'image/png',
  },
  {
    name: 'jpeg',
    rules: 'image/jpeg',
  },
];

// 文件大小限制
// 图片：一般情况下，图片的大小限制在 2MB 到 10MB 之间，具体限制根据实际情况而定。
// 视频：视频的大小限制比较大，一般在 50MB 到 2GB 之间，具体限制也根据实际情况而定。
// 文档：文档的大小限制相对较小，一般在 1MB 到 10MB 之间。
export const FILE_SIZE: number = 2 * 1024 * 1024; // 2MB