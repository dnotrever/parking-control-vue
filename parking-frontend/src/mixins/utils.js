import { reactive } from 'vue'

export const utils = {

    form: {

        resetFields: (data, errors) => {

            Object.keys(data).forEach(field => {
                data[field] = ''
                errors[field] = ''
            })

        },

        reactiveFields: (fields) => {

            const obj = {}

            for (const field of fields) {
                obj[field] = ''
            }

            return reactive(obj)

        },

    },

    input: {

        focusIfError: () => {

            setTimeout(() => {

                const inputs = document.querySelectorAll('form .is-invalid')
        
                if (inputs.length > 0) {
                    inputs[0].focus()
                }

            }, 0)

        },

        resetFocus: () => {

            document.querySelectorAll('form input')[0].focus()

        },

    },

    toast: {

        show: (timeout, message, status) => {

            const statusColors = {
                'success': 'bg-green-700',
                'error': 'bg-red-500',
            }

            const toast = document.querySelector('.toast')

            const bgColor = statusColors[status]

            for (const key in statusColors) {
                const value = statusColors[key]
                if (Array.from(toast.classList).includes(value)) {
                    toast.classList.remove(value)
                }
            }

            toast.classList.add(bgColor)

            const toastBody = document.querySelector('.toast-body')
            toastBody.textContent = message

            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast)
            toastBootstrap.show()

            setTimeout(() => {
                toastBootstrap.hide()
            }, timeout * 1000)

        },

    },

}
