<script lang="ts" setup>
defineProps<{
  hidden?: boolean
}>()
</script>

<template>
  <label
    :class="[
      hidden ? 'sr-only' : 'block text-sm font-medium text-slate-700 mb-1',
    ]"
  >
    <slot />
  </label>
</template>
