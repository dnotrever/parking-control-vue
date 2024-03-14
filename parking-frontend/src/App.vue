<script setup>

    import { RouterLink, RouterView } from 'vue-router'
    import Toast from '@/components/Toast.vue'
    

    // _____ Language _____

    import i18n from '@/plugins/i18n'

    const locale = i18n.global.locale

    if (document.cookie) {

        const cookie = document.cookie
            .split(';')
            .map(cookie => cookie.trim())
            .find(cookie => cookie.startsWith('language='))
            .split('=')[1]

        if (cookie) locale.value = cookie

    }

    const setLocale = async (lang) => {

        if (locale.value !== lang) {

            window.location.reload()

            document.cookie = `language=${lang}`

        }

    }

</script>

<template>

    <div class="w-full my-4 flex flex-col items-center">
        <h4>{{ $t('message.language') }}</h4>
        <div>
            <button class="mx-2 text-2xl" @click="setLocale('en')">🇺🇸</button>
            <button class="mx-2 text-2xl" @click="setLocale('br')">🇧🇷</button>
        </div>
    </div>

    <RouterView />

    <Toast />

</template>

<style scoped>
</style>
