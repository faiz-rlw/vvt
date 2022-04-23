import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:windi.css'
import router from "./router/index";

import 'ant-design-vue/dist/antd.css';
import './config/main.css'

import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' 
dayjs.locale('zh-cn') 

const app = createApp(App)
app.use(router)
app.mount('#app')
