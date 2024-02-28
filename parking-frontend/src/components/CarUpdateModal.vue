<template>

<div class="modal fade" id="carUpdateModal" tabindex="-1" aria-labelledby="carUpdateModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="carUpdateModalLabel">Edit Car</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form class="space-y-6 flex flex-col">
                    <div>
                        <label class="ms-1">Owner</label><br>
                        <input type="text" value="James" class="w-full mt-2 py-2 px-3 border border-gray-200 rounded-lg">
                    </div>
                    <div class="flex">
                        <div class="mx-2">
                            <label class="ms-1">Maker</label><br>
                            <input type="text" value="Chevrolet" class="w-full mt-2 py-2 px-3 border border-gray-200 rounded-lg">
                        </div>
                        <div class="mx-2">
                            <label class="ms-1">Model</label><br>
                            <input type="text" value="Corsa" class="w-full mt-2 py-2 px-3 border border-gray-200 rounded-lg">
                        </div>
                    </div>
                    <div class="flex">
                        <div class="mx-2">
                            <label class="ms-1">Plate</label><br>
                            <input type="text" value="XXX-999" class="w-full mt-2 py-2 px-3 border border-gray-200 rounded-lg">
                        </div>
                        <div class="mx-2">
                            <label class="ms-1">Space</label><br>
                            <input type="text" value="A1" class="w-full mt-2 py-2 px-3 border border-gray-200 rounded-lg">
                        </div>
                    </div>
                    <div>
                        <div class="flex mb-2">
                            <div class="text-slate-500 text-sm me-1 flex">
                                <p>Registered at: 14:00 27/02/2024</p>
                                <span class="mx-2">-</span>
                                <p>Peter</p>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="text-slate-500 text-sm me-1 flex">
                                <p>Last Updated: 16:00 27/02/2024</p>
                                <span class="mx-2">-</span>
                                <p>Mary</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button class="w-full mt-2 py-2 px-6 bg-purple-600 text-white rounded-lg">Save</button>
                    </div>
                </form>
            
            </div>
        </div>
    </div>
</div>

</template>