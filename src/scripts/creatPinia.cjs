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
if (!/^use[A-Z][a-zA-Z]*$/.test(fileName)) {
  console.error(
    "系统提示：文件名命名规则[1.小驼峰命名规则；2.文件名需要以使use开头；3.use字符串需要首字母大写；4.不得使用特殊字符;]"
  );
  process.exit(1);
}

// 定义要创建的文件的路径和内容
const filePath = `src/stores/${fileName}.ts`;
const funSpliceName = fileName.match(/use(.*)/)[1];
const funName = funSpliceName[0].toLowerCase() + funSpliceName.slice(1);

// 使用 fs.writeFile 方法来创建和写入文件
const fileContent = `import { acceptHMRUpdate, defineStore } from "pinia";
export const ${fileName}Store = defineStore("${funName}", () => {
  return {};
});

if (import.meta.hot)
  import.meta.hot.accept(
    acceptHMRUpdate(${fileName}Store as any, import.meta.hot)
  );
`;
// 使用 fs.writeFile 方法来创建和写入文件
fs.writeFile(filePath, fileContent, "utf8", async (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`api文件创建成功\n文件地址：${filePath}`);
  }
});
