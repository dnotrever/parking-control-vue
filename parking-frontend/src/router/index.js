import { createRouter, createWebHistory } from 'vue-router'

import TestView from '../views/TestView.vue'
import SignupView from '../views/SignupView.vue'

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
    ]

})

export default router
