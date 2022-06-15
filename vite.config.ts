import path from "path";
import { defineConfig } from "vite";
import plugins from "./plugin/index";
import postCssPxToRem from "postcss-pxtorem";
export default defineConfig({
    resolve: {
        alias: {
            "~/": `${path.resolve(__dirname, "src")}/`,
        },
    },
    plugins: [plugins()],
    server: {
        host: "0.0.0.0",
    },
    base: process.env.NODE_ENV === "development" ? "/" : "./",
    css: {
        postcss: {
            plugins: [
                postCssPxToRem({
                    rootValue: 75, // 1rem的大小
                    propList: ["*"], // 需要转换的属性，这里选择全部都进行转换
                    selectorBlackList: ["fixedall_"], // 过滤掉fixedall_开头的class，不进行rem转换
                }),
            ],
        },
    },
});
