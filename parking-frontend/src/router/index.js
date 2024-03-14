import { createRouter, createWebHistory } from 'vue-router'

import TestView from '../views/TestView.vue'
import SignupView from '../views/SignupView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({

    history: createWebHistory(import.meta.env.BASE_URL),

    routes: [
        {
            path: '/test',
            name: 'Test',
            component: TestView
        },
        {
            path: '/signup',
            name: 'Signup',
            component: SignupView
        },
        {
            path: '/login',
            name: 'Login',
            component: LoginView
        },
    ]

})

export default router
