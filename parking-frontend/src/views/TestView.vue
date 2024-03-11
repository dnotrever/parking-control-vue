<script setup>

    // _____ Imports _____

    import { reactive, computed, nextTick, watch, onMounted } from 'vue'
    import { helpers } from '@vuelidate/validators'
    import { required, minLength, maxLength, email } from '@/locale/validators'
    import { masks } from "@/utils/masks"
    import useVuelidate from '@vuelidate/core'
    import i18n from '@/plugins/i18n'
    import BaseInput from '@/components/BaseInput.vue'


    // _____ Variables _____

    const formData = reactive({
        email: '',
        name: '',
        phone: '',
        password: '',
    })

    const formErrors = reactive({
        email: '',
        name: '',
        phone: '',
        password: '',
    })


    // _____ Vuelidate _____

    const phoneValidate = (value) => {
        return !helpers.req(value) || value.length > 14
    }

    const rules = computed(() => {
        return {
            email: {
                required,
                email,
            },
            name: {
                required,
                minLength: minLength(3),
            },
            phone: {
                required,
                phoneValidate: helpers.withMessage(i18n.global.t('validations.phone'), phoneValidate),
            },
            password: {
                required,
                minLength: minLength(8),
            },
        }
    })

    const v$ = useVuelidate(rules, formData)

    Object.keys(formData).forEach(field => {

        watch(() => formData[field], async (newValue, oldValue) => {

            if (newValue) {
                const validator = await v$.value[field]
                const isInvalid = ! await validator.$validate()
                formErrors[field] = isInvalid ? await validator.$errors[0].$message : ''
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

            Object.keys(formData).forEach(key => {
                formData[key] = ''
            })

            Object.keys(formErrors).forEach(key => {
                formErrors[key] = ''
            })

            alert('Success!')

            resetFocus()

        } else {

            for (const field in formData) {

                const fieldError = v$.value[field].$errors[0]

                if (fieldError !== undefined) {
                    formErrors[field] = await fieldError.$message
                }

            }

            focusIfError()

        }

    }


    // _____ Masks _____

    onMounted(() => {

        const element = (selector) => document.querySelector(selector)
    
        masks.email(element('#email'), 10)
        masks.string(element('#name'), 20)
        masks.phone(element('#phone'))

    })


    // _____ Language _____

    const setLocale = async (lang) => {

        const locale = i18n.global.locale

        if (locale.value !== lang) {

            locale.value = lang

            for (const field in formData) {
                formData[field] = ''
                formErrors[field] = ''
                await v$.value[field].$reset()
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
                type="password" autocomplete="password"
                v-model="formData.password"
                :id="'password'"
                :label="$t('label.password')"
                :error="formErrors.password"
            />

            <button class="py-2 px-6 bg-purple-600 text-white rounded-lg tracking-wider text-xl">
                {{ $t('button.register') }}
            </button>

        </form>

    </div>

</template>

<style scoped>
</style>
