<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'

const { user } = useAuthStore()
definePageMeta({
  middleware: ['auth', 'verified'],
})
</script>

<template>
  <div class="mt-12">
    <Card class="max-w-7xl mx-auto">You are logged in!</Card>
  </div>
</template>
