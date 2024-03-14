<script setup>

    // _____ Imports _____

    //// Packages

    import { computed } from 'vue'
    import useVuelidate from '@vuelidate/core'
    import axios from 'axios'

    //// System

    import { required, minLength, sameAs } from '@/locale/validators'
    import { validate as vldt } from '@/mixins/validate'
    import { utils as ut } from '@/mixins/utils'
    import BaseInput from '@/components/BaseInput.vue'


    // _____ Variables _____

    const fields = [
        'username',
        'password',
    ]

    const formData = ut.form.reactiveFields(fields)
    const formErrors = ut.form.reactiveFields(fields)


    // _____ Vuelidate _____

    const rules = computed(() => {

        return {
            username: { required },
            password: { required, minLength: minLength(6) },
        }

    })

    const v$ = useVuelidate(rules, formData)

    vldt.validateFields(v$, formData, formErrors)

    const submitForm = async () => {

        const isValid = await vldt.formIsValid(v$)
        
        if (isValid) {

            axios
                .post('/api/auth/login/', formData)
                .then(response => {
                    console.log(response.data)
                })
                .catch(error => {
                    console.log(error.data)
                })

            ut.form.resetFields(formData, formErrors)

            ut.input.resetFocus()

        } else {

            vldt.formWithErrors(v$, formData, formErrors)

            ut.input.focusIfError()

        }

    }

</script>

<template>

    <div class="h-screen p-6 flex flex-col items-center">

        <h2 class="mb-10 text-3xl">
            {{ $t('message.signin') }}
        </h2>

        <form class="space-y-6 w-2/5 flex flex-col justify-between" @submit.prevent="submitForm">

            <BaseInput
                v-model="formData.username"
                :id="'username'"
                :label="$t('label.username')"
                :error="formErrors.username"
            />

            <BaseInput
                type="password" autocomplete="current_password"
                v-model="formData.password"
                :id="'password'"
                :label="$t('label.password')"
                :error="formErrors.password"
            />

            <button class="py-2 px-6 bg-purple-600 text-white rounded-lg tracking-wider text-xl">
                {{ $t('button.login') }}
            </button>

        </form>

    </div>

</template>

<style scoped>
</style>
