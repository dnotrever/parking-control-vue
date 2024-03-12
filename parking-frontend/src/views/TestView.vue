<script setup>

    // _____ Imports _____

    import { reactive, computed, watch, nextTick, onMounted } from 'vue'
    import { helpers } from '@vuelidate/validators'
    import { required, minLength, email, sameAs } from '@/locale/validators'
    import IMask from 'imask'
    import useVuelidate from '@vuelidate/core'
    import i18n from '@/plugins/i18n'
    import axios from 'axios' 
    import BaseInput from '@/components/BaseInput.vue'


    // _____ Variables _____

    const formData = reactive({
        email: '',
        name: '',
        phone: '',
        cpf: '',
        cep: '',
        password: '',
        password_confirmation: '',
    })

    const formErrors = reactive({
        email: '',
        name: '',
        phone: '',
        cpf: '',
        cep: '',
        password: '',
        password_confirmation: '',
    })


    // _____ Vuelidate _____

    const phoneValidate = (value) => {
        return !helpers.req(value) || value.length == 15
    }

    const rules = computed(() => {
        return {
            email: { required, email },
            name: { required, minLength: minLength(3) },
            phone: { required, phoneValidate: helpers.withMessage(i18n.global.t('validations.phone'), phoneValidate) },
            cpf: { required },
            password: { required, minLength: minLength(6) },
            password_confirmation: { required, sameAsPassword: sameAs(formData.password) },
        }
    })

    const v$ = useVuelidate(rules, formData)

    const options = {
        phone: {
            mask: '(00) 00000-0000'
        },
        cpf: {
            mask: '000.000.000-00'
        },
        cep: {
            mask: '00.000-000'
        },
    }

    Object.keys(formData).forEach(async field => {
        
        await nextTick()

        const maskOptions = options[field]

        if (maskOptions) {
            var mask = new IMask(document.getElementById(field), maskOptions)
        }

        watch(() => formData[field], async (newValue, oldValue) => {

            if (mask) {
                mask.value = newValue
                formData[field] = mask.value
            }

            const validator = await v$.value[field]

            if (formData[field] && validator !== undefined) {
                const isInvalid = ! await validator.$validate()
                formErrors[field] = isInvalid ? validator.$errors[0].$message : ''
            } else {
                formErrors[field] = ''
            }
            
        })

    })


    // _____ Methods _____

    const resetFocus = () => {
        document.querySelectorAll('form input')[0].focus()
    }

    const focusIfError = () => {

        const inputs = document.querySelectorAll('form .is-invalid')

        if (inputs.length > 0) {
            inputs[0].focus()
        }

    }

    const submitForm = async () => {
        
        const isValid = await v$.value.$validate()

        if (isValid) {

            alert('Success!')

            console.log(formData)

            ////

            // ?

            ////

            Object.keys(formData).forEach(field => {
                formData[field] = ''
                formErrors[field] = ''
            })

            resetFocus()

        } else {

            for (const field in formData) {

                const fieldError = await v$.value[field]

                if (fieldError !== undefined && fieldError.$errors[0] !== undefined) {
                    formErrors[field] = await fieldError.$errors[0].$message
                }

            }

            focusIfError()

        }

    }


    // _____ Language _____

    const setLocale = async (lang) => {

        const locale = i18n.global.locale

        if (locale.value !== lang) {

            locale.value = lang

            for (const field in formData) {
                formData[field] = ''
                formErrors[field] = ''
                const fieldError = await v$.value[field]
                if (fieldError !== undefined) {
                    await fieldError.$reset()
                }
            }

        }

    }

</script>

<template>

    <div class="h-screen p-6 bg-white border border-gray-200 rounded-lg flex flex-col items-center">

        <h2 class="mb-10 text-3xl">
            {{ $t('message.testing') }}
        </h2>

        <h4>{{ $t('message.language') }}</h4>
        <div class="mt-2 mb-5">
            <button class="mx-2 text-2xl" @click="setLocale('en')">🇺🇸</button>
            <button class="mx-2 text-2xl" @click="setLocale('br')">🇧🇷</button>
        </div>

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
                v-model="formData.cpf"
                :id="'cpf'"
                :label="$t('label.cpf')"
                :error="formErrors.cpf"
            />

            <BaseInput
                v-model="formData.cep"
                :id="'cep'"
                :label="$t('label.cep')"
                :error="formErrors.cep"
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
