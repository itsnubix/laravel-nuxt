<script lang="ts" setup>
defineProps<{ value: { href: string; label: string } }>()
</script>
<template>
  <NuxtLink
    :href="value.href"
    class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
    exact-active-class="!bg-blue-50 !border-blue-500 !text-blue-700"
    v-text="value.label"
  />
</template>
