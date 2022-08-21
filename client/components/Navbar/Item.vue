<script lang="ts" setup>
import { NavigationLink } from './NavigationLink'

const route = useRoute()
const props = defineProps<{ value: NavigationLink }>()
</script>

<template>
  <NuxtLink
    class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
    exact-active-class="border-blue-500 text-gray-900"
    :href="props.value.href"
    v-text="props.value.label"
  />
</template>
