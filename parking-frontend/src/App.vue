<script setup>
    import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <nav class="py-10 px-8 border-b border-gray-200">
        <div class="max-w-7xl mx-auto">
            <div class="flex items-center justify-between">
                <div class="menu-left">
                    <a href="#" class="text-xl">Peter</a>
                </div>
                <div class="menu-center flex space-x-12">
                    <a href="" class="text-purple-700">
                        <i class="fa-solid fa-house"></i>
                    </a>
                    <a href="">
                        <i class="fa-solid fa-car"></i>
                    </a>
                    <a href="">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </a>
                </div>
                <div class="menu-right">
                    <a href="">
                        <i class="fa-solid fa-bars"></i>
                    </a>
                </div>
            </div>
        </div>
    </nav>
    <main class="px-8 py-6 bg-gray-100">
        <RouterView />
    </main>
</template>

<style scoped>
</style>
