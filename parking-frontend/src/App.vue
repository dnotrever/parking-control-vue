<template>

    <nav class="py-6 px-16 border-b border-gray-200" v-if="userStore.user.isAuthenticated">

        <div class="max-w-7xl mx-auto">

            <div class="flex items-center justify-between">

                <div class="menu-left flex flex-col">
                    <span class="text-sm text-slate-500">Operator</span>
                    <h3 class="text-xl">Peter</h3>
                </div>

                <div class="menu-center flex space-x-12">

                    <RouterLink to="/home" class="text-purple-700">
                        <i class="fa-solid fa-house"></i>
                    </RouterLink>

                    <RouterLink to="/cars">
                        <i class="fa-solid fa-car"></i>
                    </RouterLink>

                    <RouterLink to="/search">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </RouterLink>

                </div>

                <div class="menu-right">
                    <i class="fa-solid fa-bars"></i>
                </div>

            </div>

        </div>

    </nav>

    <main class="px-8 py-6 bg-gray-100">
        <RouterView />
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
            const token = this.userStore.access
            axios.defaults.headers.common['Authorization'] = token ? 'Bearer ' + token : ''
        },

    }

</script>

<style scoped>
</style>
