<script setup>

    // _____ Imports _____

    import { reactive, computed, watch, nextTick } from 'vue'
    import { required, minLength, email, sameAs } from '@/locale/validators'
    import useVuelidate from '@vuelidate/core'
    import { validate as vldt } from '@/mixins/validate'
    import { utils as ut } from '@/mixins/utils'
    import BaseInput from '@/components/BaseInput.vue'


    // _____ Variables _____

    const formData = reactive({
        email: '',
        name: '',
        phone: '',
        password: '',
        password_confirmation: '',
    })

    const formErrors = reactive({
        email: '',
        name: '',
        phone: '',
        password: '',
        password_confirmation: '',
    })


    // _____ Vuelidate _____

    const rules = computed(() => {

        return {
            email: { required, email },
            name: { required, minLength: minLength(3) },
            phone: { required, phone: vldt.message('phone', vldt.customs.phoneValidate) },
            password: { required, minLength: minLength(6) },
            password_confirmation: { required, sameAsPassword: sameAs(formData.password) },
        }

    })

    const v$ = useVuelidate(rules, formData)

    const options = {
        phone: vldt.masks.phone
    }

    vldt.validateFields(v$, formData, formErrors, watch, nextTick, options)

    const submitForm = async () => {

        const isValid = await vldt.formIsValid(v$)
        
        if (isValid) {
        
            console.log('Success!', formData)

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
            {{ $t('message.testing') }}
        </h2>

        <form class="space-y-6 w-2/5 flex flex-col justify-between" @submit.prevent="submitForm">

            <BaseInput
                autofocus
                v-model="formData.email"
                :id="'email'"
                :label="$t('label.email')"
                :error="formErrors.email"
            />

            <BaseInput
                v-model="formData.name"
                :id="'name'"
                :label="$t('label.name')"
                :error="formErrors.name"
            />

            <BaseInput
                v-model="formData.phone"
                :id="'phone'"
                :label="$t('label.phone')"
                :error="formErrors.phone"
            />

            <BaseInput
                type="password" autocomplete="current_password"
                v-model="formData.password"
                :id="'password'"
                :label="$t('label.password')"
                :error="formErrors.password"
            />

            <BaseInput
                type="password" autocomplete="new_password"
                v-model="formData.password_confirmation"
                :id="'password_confirmation'"
                :label="$t('label.password_confirmation')"
                :error="formErrors.password_confirmation"
            />

            <button class="py-2 px-6 bg-purple-600 text-white rounded-lg tracking-wider text-xl">
                {{ $t('button.register') }}
            </button>

        </form>

    </div>

</template>

<style scoped>
</style>
