import { utils } from '@/mixins/utils'

export const inputsHandler = {

    methods: {

        setInputFieldWatchers(funcs) {
            Object.keys(this.form).forEach(field => {
                this.$watch('form.' + field, () => {
                    funcs.forEach(([func, ...args]) => {
                        func.call(this, field, ...args)
                    })
                })
            })
        },

        setFormWatchers(params) {
            Object.keys(params).forEach(key => {
                params[key].forEach(([func, ...args]) => {
                    this.$watch('form.' + key, () => {
                        func.call(this, key, ...args)
                    })
                })
            })
        },

        //

        onlyNumbers(field) {
            this.form[field] = this.form[field].replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
        },

        upperCase(field) {
            if (this.form[field]) {
                this.form[field] = this.form[field].toUpperCase()
            }
        },

        maxLength(field, max) {
            if (this.form[field] && this.form[field].length > max) {
                this.form[field] = this.form[field].substring(0, max)
            }
        },

    }

}