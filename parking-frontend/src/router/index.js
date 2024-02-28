import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '../views/WelcomeView.vue'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import ListCarsView from '../views/ListCarsView.vue'
import InsertCarView from '../views/InsertCarView.vue'

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
            path: '/car-list',
            name: 'car-list',
            component: ListCarsView
        },
        {
            path: '/car-insert',
            name: 'car-insert',
            component: InsertCarView
        },
    ]

})

export default router
