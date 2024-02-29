<template>

    <div class="w-96 mx-auto mt-32 p-12 bg-white border border-gray-200 rounded-lg">

        <form class="space-y-6 flex flex-col items-center" @submit.prevent="submitForm">

            <h2 class="mb-2 text-2xl">Access</h2>

            <div class="form-group">
                <label class="form-label">Email</label>
                <input type="text" placeholder="Insert here the email address" class="form-control mt-1 py-2 px-3"
                    v-model="form.email" @input="removeError('email')" :class="{'is-invalid': errors.email}"
                >
                <p class="text-red-500" v-if="errors.email">{{ errors.email }}</p>
            </div>

            <div class="form-group">
                <label class="form-label">Password</label>
                <input type="password"  placeholder="Insert here the password" class="form-control mt-2 py-2 px-3" autocomplete
                    v-model="form.password" @input="removeError('password')" :class="{'is-invalid': errors.password}"
                >
                <p class="text-red-500" v-if="errors.password">{{ errors.password }}</p>
            </div>

            <div>
                <button class="w-full mt-2 py-2 px-6 bg-purple-600 text-white rounded-lg">Login</button>
            </div>

        </form>

    </div>

</template>

<script>

    import { useUserStore } from '@/stores/user'
    import { inputsHandler } from '@/mixins/inputs.js'
    import axios from 'axios'

    export default {

        name: 'LoginView',

        setup() {
            const userStore = useUserStore()
            return {
                userStore
            }
        },

        data() {
            return {
                form: {
                    email: '',
                    password: '',
                },
                errors: {},
            }
        },

        mixins: [
            inputsHandler
        ],

        methods: {

            async submitForm() {

                if (this.form.email === '') {
                    this.errors.email = 'Your email is missing.'
                }

                if (this.form.password === '') {
                    this.errors.password = 'Your password is missing.'
                }

                if (Object.keys(this.errors).length === 0) {

                    await axios
                        .post('/api/v1/login/', this.form)
                        .then(response => {
                            this.userStore.setToken(response.data)
                            axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access
                        })
                        .catch(error => {
                            console.log('error', error)
                        })

                    await axios
                        .get('/api/v1/home/')
                        .then(response => {
                            this.userStore.setUserInfo(response.data)
                            this.$router.push('/home')
                        })
                        .catch(error => {
                            console.log('error', error)
                        })

                }

            },

        },

    }

</script>