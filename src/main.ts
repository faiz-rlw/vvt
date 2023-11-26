import { createApp } from "vue";
import App from "./App.vue";
import router from "./routers";
import { createPinia } from "pinia";

// https://www.npmjs.com/package/vue3-image-preview
import preview from "vue3-image-preview";

import "normalize.css/normalize.css";
import "virtual:uno.css";
import "@/styles/global.css";

import loading from "@/directives/useLoading";

let app = createApp(App);

app.directive("useLoading", loading);
app.use(preview).use(createPinia()).use(router).mount("#app");
