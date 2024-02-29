<template>

    <div v-if="toastStore.isVisible"
        class="transition ease-in-out delay-500 duration-500 px-8 py-6 fixed top-full right-8 rounded-xl shadow-xl tracking-wide"
        :class="toastStore.classes"
    >
        {{ toastStore.message }}
    </div>

</template>

<script>

    import { useToastStore } from '@/stores/toast'

    export default {

        name: 'Toast',

        setup() {
            const toastStore = useToastStore()
            return {
                toastStore
            }
        },
        
    }

</script>