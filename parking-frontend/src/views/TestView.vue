<script setup>

    import { reactive, computed } from 'vue'
    import useVuelidate from '@vuelidate/core'

    import { required, minLength } from '@/locale/validators'

    import BaseInput from '@/components/BaseInput.vue'
    
    const formData = reactive({
        owner: '',
    })

    const rules = computed(() => {
        return {
            owner: {
                required,
                minLength: minLength(5)
            },
        }
    })

    const v$ = useVuelidate(rules, formData)

    const validateField = (field) => {
        v$.value[field].$touch()
        v$.value[field].$validate()
    }

    const submitForm = async () => {

        const result = await v$.value.$validate()

        if (result) {

            alert('Success!')

            Object.keys(formData).forEach(key => {
                formData[key] = ''
            })

        }

    }

</script>

<template>

    <div class="h-screen p-6 bg-white border border-gray-200 rounded-lg flex flex-col items-center">

        <h2 class="mb-12 text-3xl">{{ $t('message.testing') }}</h2>

        <form class="space-y-6 w-2/5 flex flex-col justify-between" @submit.prevent="submitForm">

            <div class="input-container">
                <BaseInput :label="$t('label.owner')" v-model="formData.owner" @input="validateField('owner')" autofocus
                    :class="{'is-valid': formData.owner && !v$.owner.$errors[0], 'is-invalid': v$.owner.$errors[0]}" />

                <p class="text-red-500 text-sm mt-0"
                    v-for="error in v$.owner.$errors">{{ error.$message }}</p>
            </div>

            <button class="py-2 px-6 bg-purple-600 text-white rounded-lg tracking-wider text-xl">{{ $t('button.register') }}</button>
  
        </form>
        
    </div>

</template>

<style scoped>
</style>
