//_____ Imports _____

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import axios from 'axios'

import App from './App.vue'
import router from './router'
import './assets/main.css'


//_____ Configs _____

window.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false

axios.defaults.baseURL = 'http://127.0.0.1:8000'

const app = createApp(App)


//_____ Pinia _____

const pinia = createPinia()

app.use(pinia)


//_____ i18n _____

import i18n from '@/plugins/i18n'

app.use(i18n)

export { i18n }


//_____ Mount App _____

app.use(router, axios)  

app.mount('#app')
