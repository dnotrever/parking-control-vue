<script setup>

    // _____ Imports _____

    import { computed } from 'vue'
    import { RouterLink } from 'vue-router'
    import useVuelidate from '@vuelidate/core'
    
    import { required, minLength, sameAs } from '@/locale/validators'

    import { validate as vt } from '@/mixins/validate'
    import { utils as ut } from '@/mixins/utils'
    import { requests as req } from '@/mixins/requests'

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

    vt.validateFields(v$, formData, formErrors)

    const submitForm = async () => {

        const isValid = await vt.formIsValid(v$)
        
        if (isValid) {

            req.registration(formData)

            ut.form.resetFields(formData, formErrors)

            ut.input.resetFocus()

        } else {

            vt.formWithErrors(v$, formData, formErrors)

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

        <div class="my-4">
            <router-link to="/login">
                {{ $t('link.login') }}
            </router-link>
        </div>

    </div>

</template>

<style scoped>
</style>
