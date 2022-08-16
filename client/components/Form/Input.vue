<script lang="ts" setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
  <input
    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
