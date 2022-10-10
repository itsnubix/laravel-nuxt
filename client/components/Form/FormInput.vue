<script lang="ts" setup>
const element = ref(null)
defineExpose({ element })
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
  <input
    ref="element"
    class="block w-full rounded-md border-gray-300 placeholder-gray-400 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target['value'])"
  />
</template>
