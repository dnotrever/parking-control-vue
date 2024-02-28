<template>

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
                <tr>
                    <td>Parked</td>
                    <td>James</td>
                    <td>Chevrolet</td>
                    <td>Corsa</td>
                    <td>XXX-9999</td>
                    <td>A1</td>
                    <td>14:00 27/02/2024</td>
                    <td>...</td>
                    <td>R$ 20,00</td>
                    <td>Peter</td>
                    <td>
                        <a href="">
                            <i class="fa-solid fa-pen-to-square text-md text-black"></i>
                        </a>
                    </td>
                    <td>
                        <a href="">
                            <i class="fa-solid fa-xmark text-xl text-red-500"></i>
                        </a>
                    </td>
                </tr>
            </tbody>

        </table>

    </div>

</template>

<script>
</script>