import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from 'axios'

import './assets/main.css'

window.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false

axios.defaults.baseURL = 'http://127.0.0.1:8000'

const app = createApp(App)
const pinia = createPinia()

app.use(router, axios)  
app.use(pinia)       

app.mount('#app')
