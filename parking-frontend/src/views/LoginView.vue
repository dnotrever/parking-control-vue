<template>

    <div class="w-96 mx-auto mt-32 p-12 bg-white border border-gray-200 rounded-lg">

        <form class="space-y-6 flex flex-col items-center" @submit.prevent="submitForm">

            <h2 class="mb-2 text-2xl">Access</h2>

            <div class="form-group">
                <label class="form-label">Email</label>
                <input ref="email" type="text" placeholder="Insert here the email address" class="form-control mt-1 py-2 px-3" autofocus
                    v-model="form.email" :class="{'is-invalid': errors.email}">
                <p class="text-red-500" v-if="errors.email">{{ errors.email }}</p>
            </div>

            <div class="form-group">
                <label class="form-label">Password</label>
                <input ref="password" type="password"  placeholder="Insert here the password" class="form-control mt-2 py-2 px-3" autocomplete
                    v-model="form.password" :class="{'is-invalid': errors.password}">
                <p class="text-red-500" v-if="errors.password">{{ errors.password }}</p>
            </div>

            <div>
                <button class="w-full mt-2 py-2 px-6 bg-purple-600 text-white rounded-lg">Login</button>
            </div>

        </form>

    </div>

</template>

<script>

    import axios from 'axios'
    import { useUserStore } from '@/stores/user'
    import { inputsHandler } from '@/mixins/inputs'
    import { submitValidations } from '@/mixins/submit'

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
                order: [],
            }
        },

        mixins: [
            inputsHandler,
            submitValidations,
        ],

        created() {

            this.setInputFieldWatchers([
                [this.isValid],
            ])

            const fields = {
                'email': [
                    //
                ],
                'password': [
                    //
                ],
            }

            this.setValidationField(fields)
            this.setFormWatchers(fields)

        },

        methods: {

            async submitForm() {

                const fields = {
                    'email': [
                        [this.required],
                    ],
                    'password': [
                        [this.required],
                    ],
                }

                this.setValidationField(fields)

                this.focusIfError()

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