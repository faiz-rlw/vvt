import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import './styles/main.css'
import 'ant-design-vue/dist/antd.css';

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')
