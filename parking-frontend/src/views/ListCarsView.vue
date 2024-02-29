<template>

    <div class="p-6 bg-white border border-gray-200 rounded-lg flex flex-col items-center">

        <h2 class="mb-12 text-3xl">Cars List</h2>

        <div class="w-full p-6 bg-violet-300 rounded-lg">

            <table class="table-auto w-full">

                <thead class="text-left">
                    <tr>
                        <th class="w-[8%]">Status</th>
                        <th class="w-[10%]">Owner</th>
                        <th class="w-[8%]">Maker</th>
                        <th class="w-[10%]">Model</th>
                        <th class="w-[8%]">Plate</th>
                        <th class="w-[6%]">Space</th>
                        <th class="w-[10%]">Entry</th>
                        <th class="w-[10%]">Exit</th>
                        <th class="w-[8%]">Value</th>
                        <th class="w-[8%]">Operator</th>
                        <th class="w-[4%]"></th>
                        <th class="w-[2%]"></th>
                    </tr>
                </thead>

                <tbody>

                    <tr
                        v-for="car in cars"
                        v-bind:key="car.id"
                    >
                        <td>{{ car.status }}</td>
                        <td>{{ car.owner }}</td>
                        <td>{{ car.maker }}</td>
                        <td>{{ car.model }}</td>
                        <td>{{ car.plate }}</td>
                        <td>{{ car.space }}</td>
                        <td>{{ car.entry }}</td>
                        <td>{{ car.exit }}</td>
                        <td>{{ car.value }}</td>
                        <td>{{ car.operator.name }}</td>
                        <td><i class="fa-solid fa-pen-to-square text-md text-black"></i></td>
                        <td><i class="fa-solid fa-xmark text-xl text-red-500"></i></td>
                    </tr>

                </tbody>

            </table>

        </div>
        
    </div>

</template>

<script>

    import { useUserStore } from '@/stores/user'
    import axios from 'axios'

    export default {

        name: 'ListCarsView',

        setup() {
            const userStore = useUserStore()
            return {
                userStore
            }
        },

        mounted() {
            this.getCarsList()
        },

        data() {
            return {
                cars: []
            }
        },

        methods: {

            getCarsList() {
                axios
                    .get('/api/v1/car-list')
                    .then(response => {
                        this.cars = response.data
                    })
                    .catch(error => {
                        console.log('error', error)
                    })
            },

        },

    }

</script>