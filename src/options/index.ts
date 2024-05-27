import App from './App.vue'
import './index.scss'
import '@/style/index.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'

const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')
