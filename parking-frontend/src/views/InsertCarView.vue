<template>

    <div class="p-6 bg-white border border-gray-200 rounded-lg flex flex-col items-center">

        <h2 class="mb-12 text-3xl">Insert Car</h2>

        <form class="space-y-6 w-2/5 flex flex-col justify-between" @submit.prevent="submitForm" method="POST">

            <div class="flex">

                <div class="form-group mr-3">
                    <label class="form-label">Owner</label>
                    <input ref="owner" type="text"  class="form-control mt-1 py-2 px-3" autofocus
                        v-model="form.owner" :class="{'is-invalid': errors.owner}">
                    <p class="text-red-500 text-sm" v-if="errors.owner">{{ errors.owner }}</p>
                </div>

                <div class="form-group ml-3">
                    <label class="form-label">Maker</label>
                    <input ref="maker" type="text" class="form-control mt-1 py-2 px-3"
                        v-model="form.maker" :class="{'is-invalid': errors.maker}">
                    <p class="text-red-500 text-sm" v-if="errors.maker">{{ errors.maker }}</p>
                </div>

            </div>

            <div class="flex">

                <div class="form-group mr-3">
                    <label class="form-label">Model</label>
                    <input ref="model" type="text" class="form-control mt-2 py-2 px-3"
                        v-model="form.model" :class="{'is-invalid': errors.model}">
                    <p class="text-red-500 text-sm" v-if="errors.model">{{ errors.model }}</p>
                </div>

                <div class="form-group ml-3">
                    <label class="form-label">Plate</label>
                    <input ref="plate" type="text" class="form-control mt-2 py-2 px-3"
                        v-model="form.plate" :class="{'is-invalid': errors.plate}">
                    <p class="text-red-500 text-sm" v-if="errors.plate">{{ errors.plate }}</p>
                </div>

            </div>

            <div class="flex mb-4">

                <div class="form-group">
                    <label class="form-label">Space</label>
                    <input ref="space" type="text" class="form-control mt-2 py-2 px-3"
                        v-model="form.space" :class="{'is-invalid': errors.space}">
                    <p class="text-red-500 text-sm" v-if="errors.space">{{ errors.space }}</p>
                </div>

            </div>

            <button class="py-2 px-6 bg-purple-600 text-white rounded-lg tracking-wide text-xl ">Register</button>
  
        </form>
        
    </div>

</template>

<script>

    import axios from 'axios'
    import { useToastStore } from '@/stores/toast'
    import { inputsHandler } from '@/mixins/inputs'
    import { submitValidations } from '@/mixins/submit'

    export default {

        name: 'InsertCarView',

        setup() {
            const toastStore = useToastStore()
            return {
                toastStore
            }
        },

        data() {
            return {
                form: {
                    owner: '',
                    maker: '',
                    model: '',
                    plate: '',
                    space: '',
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
                'owner': [
                    [this.maxLength, 15],
                ],
                'maker': [
                    [this.maxLength, 15],
                ],
                'model': [
                    [this.maxLength, 15],
                ],
                'plate': [
                    [this.maxLength, 7],
                    [this.upperCase],
                ],
                'space': [
                    [this.maxLength, 10],
                ],
            }

            this.setValidationField(fields)
            this.setFormWatchers(fields)
            
        },

        methods: {

            submitForm() {

                const fields = {
                    'owner': [
                        [this.required],
                    ],
                    'maker': [
                        [this.required],
                    ],
                    'model': [
                        [this.required],
                    ],
                    'plate': [
                        [this.required],
                    ],
                    'space': [
                        [this.required],
                    ],
                }

                this.setValidationField(fields)

                this.focusIfError()

                if (Object.keys(this.errors).length === 0) {

                    axios
                        .post('/api/v1/car-insert/', this.form)
                        .then(response => {
                            let configs = []
                            if (response.data.status == 'success') {
                                this.form = {}
                                configs = [5000, 'Car was registered successfully!', 'bg-emerald-500']
                            } else {
                                configs = [5000, 'Something went wrong...', 'bg-red-300']
                            }
                            this.toastStore.showToast(configs)
                        })
                        .catch(error => {
                            console.log('error', error)
                        })

                }

            },

        },
        
    }

</script>