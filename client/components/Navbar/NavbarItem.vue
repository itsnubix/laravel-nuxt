<script lang="ts" setup>
defineProps<{ value: { label: string; href: string } }>()
</script>

<template>
  <NuxtLink
    class="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
    exact-active-class="border-blue-500 text-gray-900"
    :href="value.href"
    v-text="value.label"
  />
</template>
