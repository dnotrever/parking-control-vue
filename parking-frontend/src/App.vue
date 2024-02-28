<template>

    <nav class="py-6 px-16 border-b border-gray-200" v-if="userStore.user.isAuthenticated">

        <div class="max-w-7xl mx-auto">

            <div class="flex items-center justify-between">

                <div class="menu-left flex flex-col">
                    <span class="text-sm text-slate-500">Operator</span>
                    <h3 class="text-xl">{{ userStore.user.name }}</h3>
                </div>

                <div class="menu-center flex space-x-12">

                    <RouterLink to="/home">
                        <i class="fa-solid fa-house text-xl"></i>
                    </RouterLink>

                    <RouterLink to="/car-list">
                        <i class="fa-solid fa-car-side text-xl"></i>
                    </RouterLink>

                    <RouterLink to="/car-insert">
                        <i class="fa-solid fa-arrow-right-to-bracket text-xl"></i>
                    </RouterLink>

                </div>

                <div class="menu-right">
                    <i class="fa-solid fa-bars"></i>
                </div>

            </div>

        </div>

    </nav>

    <main class="h-screen px-8 py-6 bg-gray-100">
        <!-- <div class="p-6 bg-white border border-gray-200 rounded-lg flex flex-col items-center"> -->
            <RouterView />
        <!-- </div> -->
    </main>

    <Toast />

</template>

<script>

    import { RouterLink, RouterView } from 'vue-router'
    import { useUserStore } from '@/stores/user'
    import Toast from '@/components/Toast.vue'
    import axios from 'axios'

    export default {

        setup() {
            const userStore = useUserStore()
            return {
                userStore
            }
        },

        components: {
            Toast
        },

        beforeCreate() {
            this.userStore.initStore()
            const token = this.userStore.user.access
            axios.defaults.headers.common['Authorization'] = token ? 'Bearer ' + token : ''
        },

    }

</script>