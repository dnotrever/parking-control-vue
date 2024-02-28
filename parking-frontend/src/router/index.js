import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import CarsView from '../views/CarsView.vue'
import SearchView from '../views/SearchView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
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
