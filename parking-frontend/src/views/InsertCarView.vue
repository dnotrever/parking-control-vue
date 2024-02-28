<template>

    <div class="p-6 bg-white border border-gray-200 rounded-lg flex flex-col items-center">

        <h2 class="mb-12 text-3xl">Insert Car</h2>

        <form class="space-y-6 w-2/5 flex flex-col items-center" @submit.prevent="submitForm">

            <div class="flex">

                <div class="mr-3">
                    <label>Owner</label><br>
                    <input type="text" class="mt-1 py-2 px-3 border border-gray-200 rounded-lg">
                    <p class="text-red-500"></p>
                </div>

                <div class="ml-3">
                    <label>Maker</label><br>
                    <input type="text" class="mt-1 py-2 px-3 border border-gray-200 rounded-lg" autocomplete>
                    <p class="text-red-500"></p>
                </div>

            </div>

            
            <div class="flex">

                <div class="mr-3">
                    <label>Model</label><br>
                    <input type="text" class="mt-2 py-2 px-3 border border-gray-200 rounded-lg" autocomplete>
                    <p class="text-red-500"></p>
                </div>

                <div class="ml-3">
                    <label>Plate</label><br>
                    <input type="text" class="mt-2 py-2 px-3 border border-gray-200 rounded-lg" autocomplete>
                    <p class="text-red-500"></p>
                </div>

            </div>

            <div class="flex">

                <div class="mr-3">
                    <label>Space</label><br>
                    <input type="text" class="mt-2 py-2 px-3 border border-gray-200 rounded-lg" autocomplete>
                    <p class="text-red-500"></p>
                </div>

                <div class="ml-3">
                    <label>Entry</label><br>
                    <input type="text" class="mt-2 py-2 px-3 border border-gray-200 rounded-lg" disabled autocomplete>
                    <p class="text-red-500"></p>
                </div>

            </div>

            <div>
                <button class="mt-4 py-2 px-6 bg-purple-600 text-white rounded-lg tracking-wide text-xl">Register</button>
            </div>

        </form>
        
    </div>

</template>

<script>

    export default {

        name: 'InsertCarView',
        
    }

</script>