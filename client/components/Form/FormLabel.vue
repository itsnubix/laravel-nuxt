<script lang="ts" setup>
defineProps<{
  hidden?: boolean
}>()
</script>

<template>
  <label
    :class="[
      hidden ? 'sr-only' : 'mb-1 block text-sm font-medium text-gray-700',
    ]"
  >
    <slot />
  </label>
</template>
