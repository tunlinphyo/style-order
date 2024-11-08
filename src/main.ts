import './assets/main.css'
import './assets/toast.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import toastPlugin from './plugins/toast/ToastPlugin'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(toastPlugin)

app.mount('#app')
