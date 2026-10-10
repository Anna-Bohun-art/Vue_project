import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { vuexStore } from './stores/vuexStore'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(vuexStore)
app.use(router)

app.mount('#app')