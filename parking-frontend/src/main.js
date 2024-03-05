import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import router from './router'
import axios from 'axios'

import './assets/main.css'

window.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false

axios.defaults.baseURL = 'http://127.0.0.1:8000'

import App from './App.vue'

const app = createApp(App)

const pinia = createPinia()

app.use(pinia)


import i18n from '@/plugins/i18n'

app.use(i18n)

app.use(router, axios)  

app.mount('#app')

export { i18n }