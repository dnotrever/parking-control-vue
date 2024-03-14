<script setup>


</script>

<template>

    <div class="toast-container fixed bottom-0 end-0 p-3">

        <div class="toast text-white px-2 py-1 text-lg tracking-wider" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false">

            <div class="flex items-center">

                <div class="toast-body"></div>

                <button type="button" class="btn-close btn-close-white me-2 ms-auto" data-bs-dismiss="toast" aria-label="Close"></button>

            </div>

        </div>

    </div>

</template>
  
<style scoped>

    .toast-container {
        z-index: 9999;  
    }

    .toast {
        min-width: 350px;
        width: fit-content !important;
    }

</style>
