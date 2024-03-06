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
    })

</script>

<template>

    <div class="form-group">
        <label class="form-label" v-if="label">{{ label }}</label>
        <input type="text" class="form-control py-2 px-3 tracking-wider"
            :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" v-bind="$attrs">
    </div>

</template>

<style scoped>
</style>
