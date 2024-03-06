<script setup>

    // _____ Imports _____

    import { reactive, computed } from 'vue'
    import { helpers } from '@vuelidate/validators'
    import { required } from '@/locale/validators'
    import { vMaska } from "maska"
    import useVuelidate from '@vuelidate/core'
    import i18n from '@/plugins/i18n'
    import BaseInput from '@/components/BaseInput.vue'
    

    // _____ Variables _____

    const formData = reactive({
        phone: '',
        email: '',
    })

    const messages = i18n.global


    // _____ Vuelidate _____

    const phoneValidate = (value) => {
        return !helpers.req(value) || value.length > 14
    }

    const rules = computed(() => {
        return {
            phone: {
                required,
                phoneValidate: helpers.withMessage(messages.t('validations.phone'), phoneValidate),
            },
            email: {
                required,
            },
        }
    })

    const v$ = useVuelidate(rules, formData)

    const validateField = (field) => {
        v$.value[field].$touch()
        v$.value[field].$validate()
    }
    

    // _____ Methods _____

    const focusIfError = () => {

        const inputs = document.querySelectorAll('.is-invalid input')

        if (inputs.length > 0) {
            inputs[0].focus()
        }

    }
    
    const submitForm = async () => {

        const result = await v$.value.$validate()

        if (result) {

            alert('Success!')

            // Object.keys(formData).forEach(key => {
            //     formData[key] = ''
            // })

        } else {

            focusIfError()

        }

    }

</script>

<template>

    <div class="h-screen p-6 bg-white border border-gray-200 rounded-lg flex flex-col items-center">

        <h2 class="mb-12 text-3xl">
            {{ $t('message.testing') }}
        </h2>

        <form class="space-y-6 w-2/5 flex flex-col justify-between" @submit.prevent="submitForm">

            <div class="input-container">

                <BaseInput :label="$t('label.phone')" v-model="formData.phone" @input="validateField('phone')" v-maska data-maska="(##) #####-####" autofocus 
                    :class="{'is-valid': formData.phone && !v$.phone.$errors[0], 'is-invalid': v$.phone.$errors[0]}" />

                <p class="text-red-500 text-sm mt-1"
                    v-for="error in v$.phone.$errors">{{ error.$message }}</p>

                    
                    
            </div>

            <div class="input-container">

                <BaseInput :label="$t('label.email')" v-model="formData.email" @input="validateField('email')" autofocus
                    :class="{'is-valid': formData.email && !v$.email.$errors[0], 'is-invalid': v$.email.$errors[0]}" />

                <p class="text-red-500 text-sm mt-1"
                    v-for="error in v$.email.$errors">{{ error.$message }}</p>

            </div>

            <button class="py-2 px-6 bg-purple-600 text-white rounded-lg tracking-wider text-xl">
                {{ $t('button.register') }}
            </button>
  
        </form>
        
    </div>

</template>

<style scoped>
</style>
