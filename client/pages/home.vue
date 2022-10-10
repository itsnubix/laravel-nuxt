<script lang="ts" setup>
useHead({ title: 'Home' })
definePageMeta({ middleware: ['auth', 'verified'] })
</script>

<template>
  <div class="mt-12">
    <Card class="mx-auto max-w-7xl">You are logged in!</Card>
  </div>
</template>
