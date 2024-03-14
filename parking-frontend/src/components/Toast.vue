<script setup>
</script>

<template>

    <div id="toast-container" class="fixed bottom-0 end-0 p-3">
        <div class="toast px-2 py-1 text-lg tracking-wider" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false">
            <div class="flex items-center">
                <div class="toast-body text-white"></div>
                <button type="button" class="btn-close mx-1 ms-auto flex items-center justify-center" data-bs-dismiss="toast" aria-label="Close">
                    <i class="fa-solid fa-xmark text-xl text-white"></i>
                </button>
            </div>
        </div>
    </div>
    
</template>
  
<style scoped>

    #toast-container {
        z-index: 9999;  
    }

    .toast {
        min-width: 350px;
        width: fit-content !important;
    }

</style>
