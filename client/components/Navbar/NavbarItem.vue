<script lang="ts" setup>
defineProps<{ value: { label: string; href: string } }>()
</script>

<template>
  <NuxtLink
    class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
    exact-active-class="border-blue-500 text-gray-900"
    :href="value.href"
    v-text="value.label"
  />
</template>
