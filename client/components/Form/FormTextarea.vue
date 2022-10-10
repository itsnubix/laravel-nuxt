<script lang="ts" setup>
const element = ref(null)

defineExpose({ element })
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
  <textarea
    ref="element"
    class="block w-full rounded-md border-slate-300 placeholder-slate-400 shadow-sm focus:border-slate-900 focus:ring-slate-900 sm:text-sm"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target['value'])"
  />
</template>
