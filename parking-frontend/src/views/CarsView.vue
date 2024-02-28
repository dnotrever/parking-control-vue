<template>
    <div class="max-w-7xl mx-auto">
        <div class="p-6 bg-white border border-gray-200 rounded-lg flex flex-col">
            <h2 class="self-center">Cars List</h2>
            <div class="p-6 my-6 bg-violet-300 rounded-lg">
                <table class="table-auto w-full">
                    <thead class="text-left">
                        <tr>
                            <th>Owner</th>
                            <th>Maker</th>
                            <th>Model</th>
                            <th>Plate</th>
                            <th>Space</th>
                            <th>Date</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>James</td>
                            <td>Chevrolet</td>
                            <td>Corsa</td>
                            <td>XXX-9999</td>
                            <td>A1</td>
                            <td>14:00 27/02/2024</td>
                            <td>
                                <a href="">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </a>
                            </td>
                            <td>
                                <a href="">
                                    <i class="fa-solid fa-xmark"></i>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>