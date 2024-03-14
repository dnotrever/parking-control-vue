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
        'password1',
        'password2',
    ]

    const formData = ut.form.reactiveFields(fields)
    const formErrors = ut.form.reactiveFields(fields)


    // _____ Vuelidate _____

    const rules = computed(() => {

        return {
            username: { required },
            password1: { required, minLength: minLength(6) },
            password2: { required, minLength: minLength(6), sameAsPassword: sameAs(formData.password1) },
        }

    })

    const v$ = useVuelidate(rules, formData)

    vldt.validateFields(v$, formData, formErrors)

    const submitForm = async () => {

        const isValid = await vldt.formIsValid(v$)
        
        if (isValid) {

            axios
                .post('/api/auth/register/', formData)
                .then(response => {
                    ut.toast.show(10, 'User was successfully registered.', 'success')
                })
                .catch(error => {
                    ut.toast.show(10, 'Something went wrong...', 'error')
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
            {{ $t('message.signup') }}
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
                v-model="formData.password1"
                :id="'password1'"
                :label="$t('label.password1')"
                :error="formErrors.password1"
            />

            <BaseInput
                type="password" autocomplete="new_password"
                v-model="formData.password2"
                :id="'password2'"
                :label="$t('label.password2')"
                :error="formErrors.password2"
            />

            <button class="py-2 px-6 bg-purple-600 text-white rounded-lg tracking-wider text-xl">
                {{ $t('button.register') }}
            </button>

        </form>

    </div>

</template>

<style scoped>
</style>