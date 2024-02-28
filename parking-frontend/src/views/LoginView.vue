<template>

    <div class="w-96 mx-auto">

        <div class="main">

            <div class="p-12 bg-white border border-gray-200 rounded-lg">

                <form class="space-y-6 flex flex-col items-center" v-on:submit.prevent="submitForm">

                    <h2 class="mb-2 text-2xl">Access</h2>

                    <div>
                        <label class="ms-1">Email</label><br>
                        <input type="email" v-model="form.email" placeholder="Insert here the email address" class="w-full mt-2 py-2 px-3 border border-gray-200 rounded-lg">
                    </div>

                    <div>
                        <label class="ms-1">Password</label><br>
                        <input type="password" v-model="form.password" placeholder="Insert here the password" class="w-full mt-2 py-2 px-3 border border-gray-200 rounded-lg" autocomplete>
                    </div>

                    <template v-if="errors.length > 0">
                        <div class="bg-red-300 text-whie rounded-lg px-6 py-3 w-full">
                            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                        </div>
                    </template>

                    <div>
                        <button class="w-full mt-2 py-2 px-6 bg-purple-600 text-white rounded-lg">Login</button>
                    </div>

                </form>

            </div>

        </div>

    </div>

</template>

<script>

    import axios from 'axios'
    import { useUserStore } from '@/stores/user';

    export default {

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
                errors: [],
            }

        },

        methods: {

            async submitForm() {

                this.errors = []

                if (this.form.email === '') {
                    this.errors.push('Your name is missing.')
                }

                if (this.form.password === '') {
                    this.errors.push('Your password is missing.')
                }

                if (this.errors.length === 0) {

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

            }
        },

    }

</script>