<script setup>

    defineProps({

        label: {
            type: [String, Boolean],
            default: '',
        },

        modelValue: {
            type: String,
            default: '',
        },

        id: {
            type: String,
            default: '',
        },

        error: {
            type: String,
            default: '',
        },
        
    })

</script>

<template>

    <div class="form-group">

        <label class="form-label mb-1" v-if="label">
            {{ label }}
        </label>

        <input
            type="text" class="form-control py-2 px-3 tracking-wider"
            v-bind="$attrs"
            :id="id"
            :class="{ 'is-valid': modelValue && !error, 'is-invalid': error }"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
        />

        <p class="text-red-500 text-sm tracking-wide">
            {{ error }}
        </p>

    </div>

</template>

<style scoped>
</style>
