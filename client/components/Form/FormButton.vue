<script lang="ts" setup>
import { RouteLocationRaw } from 'vue-router'

withDefaults(
  defineProps<{
    to?: RouteLocationRaw
    type?: 'submit' | 'button'
  }>(),
  {
    type: 'button',
  },
)
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    :class="[
      to
        ? 'hover:bg-indigo-700'
        : 'enabled:hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50',
      'inline-flex items-center rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
    ]"
  >
    <slot />
  </NuxtLink>

  <button
    v-else-if="!to"
    :type="type"
    :class="[
      'inline-flex items-center rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
      to
        ? 'hover:bg-indigo-700'
        : 'enabled:hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50',
    ]"
  >
    <slot />
  </button>
</template>
