import { createRouter, createWebHistory } from 'vue-router'

import TestView from '../views/TestView.vue'

const router = createRouter({

    history: createWebHistory(import.meta.env.BASE_URL),

    routes: [
        {
            path: '/test',
            name: 'Test',
            component: TestView
        },
    ]

})

export default router
