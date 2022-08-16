<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'

definePageMeta({
  middleware: 'auth',
})

const authStore = useAuthStore()
</script>

<template>
  <div>
    <ApplicationLogo />

    {{ authStore.user }}
  </div>
</template>
