import axios from 'axios'
import { utils as ut } from '@/mixins/utils'

export const requests = {

    registration: (data) => {

        axios
            .post('/api/auth/register/', data)
            .then(response => {
                ut.toast.show('User was successfully registered.', 'success', 10)
            })
            .catch(error => {
                ut.toast.show('Something went wrong...', 'error', 10)
            })

    },

    login: (data) => {

        axios
            .post('/api/auth/login/', data)
            .then(response => {
                console.log(response.data.key)
                // localStorage.setItem('user.access', response.data.key)
                ut.toast.show('Logged in successfully.', 'success', 10)
                // window.location.href = '/home'
            })
            .catch(error => {
                const message = error.response.data.non_field_errors[0]
                ut.toast.show(message, 'error', 10)
            })

    },

}
