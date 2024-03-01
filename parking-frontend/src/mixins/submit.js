import { utils } from '@/mixins/utils'

export const submitValidations = {

    methods: {
        
        setValidationForm(funcs) {
            Object.keys(this.form).forEach(field => {
                funcs.forEach(([func, ...args]) => {
                    func.call(this, field, ...args)
                })
            })
        },

        setValidationField(params) {
            Object.keys(params).forEach(key => {
                params[key].forEach(([func, ...args]) => {
                    func.call(this, key, ...args)
                })
            })
        },

        setFormOrder() {

            let orderErrors = {}

            Object.keys(this.form).forEach(field => {
                this.order.push(field)
            })

            this.order.forEach(key => {
                if (this.errors.hasOwnProperty(key)) {
                    orderErrors[key] = this.errors[key]
                }
            })

            this.errors = orderErrors

        },

        //

        focusIfError() {

            this.setFormOrder()

            Object.keys(this.form).forEach(field => {

                if (Object.keys(this.errors)[0] == field) {
                    this.$refs[field].focus()
                    
                }

            })

        },

        isValid(field) {

            delete this.errors[field];

            // const value = this.form[field].trim();
            // if (this.$refs[field] && value !== '') {
            //     this.$refs[field].classList.add('is-valid');
            // } else {
            //     this.$refs[field].classList.remove('is-valid');
            // }

        },

        //

        required(field) {

            if (!this.form[field]) {
                this.errors[field] = 'This field is required.'
            }

        },

        numeric(field, limit) {

            if (this.form[field]) {

                let value = utils.convertToFloat(this.form[field])

                if (value > limit) {
                    this.errors[field] = 'limit number value'
                }

            }

        },

        currency(field, limit) {

            this.form[field] = utils.brazilCurrency(this.form[field])

            let value = utils.convertToFloat(this.form[field])

            if (value > limit) {
                this.errors[field] = 'max number value'
            }
        }

    }

}