<script lang="ts" setup>
const element = ref(null)

defineExpose({ element })
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
  <input
    ref="element"
    class="shadow-sm focus:ring-slate-900 focus:border-slate-900 block w-full sm:text-sm border-slate-300 rounded-md placeholder-slate-400"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target['value'])"
  />
</template>
