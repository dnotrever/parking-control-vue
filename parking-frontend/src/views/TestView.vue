<script setup>

    // _____ Imports _____

    import { reactive, computed, nextTick, watch } from 'vue'
    import { helpers } from '@vuelidate/validators'
    import { required, minLength, maxLength } from '@/locale/validators'
    import { vMaska } from "maska"
    import useVuelidate from '@vuelidate/core'
    import i18n from '@/plugins/i18n'
    import BaseInput from '@/components/BaseInput.vue'

    // _____ Variables _____

    const formData = reactive({
        email: '',
        name: '',
        phone: '',
    })

    const formErrors = reactive({
        email: '',
        name: '',
        phone: '',
    })

    const messages = i18n.global


    // _____ Vuelidate _____

    const phoneValidate = (value) => {
        return !helpers.req(value) || value.length > 14
    }

    const rules = computed(() => {
        return {
            email: {
                required,
            },
            name: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(20),
            },
            phone: {
                required,
                phoneValidate: helpers.withMessage(messages.t('validations.phone'), phoneValidate),
            },
        }
    })

    const v$ = useVuelidate(rules, formData)

    const validateField = async (field) => {

        if (formData[field]) {

            let validator = v$.value[field]

            let fieldError = await validator.$errors[0]
            let result = await validator.$validate()

            if (fieldError !== undefined && !result) {
                formErrors[field] = await fieldError.$message
            }
            else {
                formErrors[field] = ''
            }

            validator.$touch()
            validator.$validate()

        } else {

            formErrors[field] = ''

        }

    }


    // _____ Methods _____

    const focusIfError = async () => {

        await nextTick()

        let inputs = document.querySelectorAll('.is-invalid')

        if (inputs.length > 0) {
            inputs[0].querySelector('input').focus()
        }

    }

    const submitForm = async () => {
        
        let result = await v$.value.$validate()

        if (result) {

            Object.keys(formData).forEach(key => {
                formData[key] = ''
            })

            Object.keys(formErrors).forEach(key => {
                formErrors[key] = ''
            })

            alert('Success!')

            document.querySelectorAll('input')[0].focus()

        } else {

            for (let field in formErrors) {

                let fieldError = v$.value[field].$errors[0]

                if (fieldError !== undefined) {
                    formErrors[field] = await fieldError.$message
                }

            }

            focusIfError()
        }

    }


    // _____ Masks _____

    const capitalize = (value) => {
        return value.toLowerCase().replace(/(?:^|\s)\S/g, (match) => match.toUpperCase())
    }

    const upper = (value) => {
        return value.replace(/[a-zà-ú]/g, (match) => match.toUpperCase())
    }

    const lower = (value) => {
        return value.replace(/[A-ZÀ-Ú]/g, (match) => match.toLowerCase())
    }

</script>

<template>

    <div class="h-screen p-6 bg-white border border-gray-200 rounded-lg flex flex-col items-center">

        <h2 class="mb-12 text-3xl">
            {{ $t('message.testing') }}
        </h2>

        <form class="space-y-6 w-2/5 flex flex-col justify-between" @submit.prevent="submitForm">

            <div class="input-container">

                <BaseInput :label="$t('label.email')" v-model="formData.email" @input="validateField('email')" autofocus
                    :class="{'is-valid': formData.email && !formErrors.email, 'is-invalid': formErrors.email}" />

                <p class="text-red-500 text-sm mt-1">{{ formErrors.email }}</p>

            </div>

            <div class="input-container">

                <BaseInput :label="$t('label.name')" v-model="formData.name" @input="validateField('name')"
                    :class="{'is-valid': formData.name && !formErrors.name, 'is-invalid': formErrors.name}" />

                <p class="text-red-500 text-sm mt-1">{{ formErrors.name }}</p>

            </div>

            <div class="input-container">

                <BaseInput :label="$t('label.phone')" v-model="formData.phone" @input="validateField('phone')"
                    :class="{'is-valid': formData.phone && !formErrors.phone, 'is-invalid': formErrors.phone}" />

                <p class="text-red-500 text-sm mt-1">{{ formErrors.phone }}</p>

            </div>

            <button class="py-2 px-6 bg-purple-600 text-white rounded-lg tracking-wider text-xl">
                {{ $t('button.register') }}
            </button>

        </form>

    </div>

</template>

<style scoped>
</style>
