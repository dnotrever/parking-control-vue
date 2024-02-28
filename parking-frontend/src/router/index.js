import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '../views/WelcomeView.vue'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import CarsView from '../views/CarsView.vue'
import SearchView from '../views/SearchView.vue'

const router = createRouter({

    history: createWebHistory(import.meta.env.BASE_URL),

    routes: [
        {
            path: '/',
            name: 'Welcome',
            component: WelcomeView
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/home',
            name: 'home',
            component: HomeView
        },
        {
            path: '/cars',
            name: 'cars',
            component: CarsView
        },
        {
            path: '/search',
            name: 'search',
            component: SearchView
        },
    ]

})

export default router
