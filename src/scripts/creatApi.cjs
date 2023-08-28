const fs = require("fs");
const path = require("path");
const process = require("process");

// 获取命令行参数，第一个参数是文件名
const fileName = process.argv[2];

// 如果没有提供文件名，提示用户输入
if (!fileName) {
  console.error("系统提示：请输入文件名");
  process.exit(1);
}

// 校验文件名
if (!/^api[a-zA-Z0-9]*$/.test(fileName)) {
  console.error(
    "系统提示：文件名命名规则[1.小驼峰命名规则；2.不得使用特殊字符;3.文件名需要以api开头]"
  );
  process.exit(1);
}

// 定义要创建的文件的路径和内容
const filePath = `src/apis/${fileName}.ts`;
// 使用 fs.writeFile 方法来创建和写入文件
const fileContent = `import { fetchEndpoint } from "@/utils/request";

// 使用方法：${fileName}.test()
export default {
  test: (data: any) =>
    fetchEndpoint({
      url: "/test",
      data,
    }),
};

`;
// 使用 fs.writeFile 方法来创建和写入文件
fs.writeFile(filePath, fileContent, "utf8", async (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`api文件创建成功\n文件地址：${filePath}`);
  }
});
