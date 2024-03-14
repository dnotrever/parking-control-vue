import { computed, watch, nextTick } from 'vue'
import { helpers } from '@vuelidate/validators'
import IMask from 'imask'
import i18n from '@/plugins/i18n'

export const validate = {

    validateFields: (v$, data, errors, options) => {
    
        Object.keys(data).forEach(async field => {
            
            await nextTick()
        
            const maskOptions = options ? options[field] : null
        
            if (maskOptions) {
                var mask = new IMask(document.getElementById(field), maskOptions)
            }
        
            watch(() => data[field], async (newValue, oldValue) => {
        
                if (mask) {
                    mask.value = newValue
                    data[field] = mask.value
                }
        
                const validator = await v$.value[field]
        
                if (data[field] && validator !== undefined) {
                    const isInvalid = ! await validator.$validate()
                    errors[field] = isInvalid ? validator.$errors[0].$message : ''
                } else {
                    errors[field] = ''
                }
                
            })
        
        })
    
    },

    message: (field, validator) => {

        return helpers.withMessage(i18n.global.t(`validations.${field}`), validator)

    },

    formIsValid: (v$) => {

        return v$.value.$validate()

    },

    formWithErrors: async (v$, data, errors) => {

        for (const field in data) {
    
            const fieldError = await v$.value[field]
    
            if (fieldError !== undefined && fieldError.$errors[0] !== undefined) {
                errors[field] = await fieldError.$errors[0].$message
            }
    
        }

    },

    customs: {

        phoneValidate: (value) => {
            return !helpers.req(value) || value.length == 15
        },
    
    },

    masks: {

        phone: {
            mask: '(00) 00000-0000'
        },

    },

}
