<script lang="ts" setup>
definePageMeta({ middleware: ['auth', 'verified'] })
</script>

<template>
  <div class="mt-12">
    <Card class="max-w-7xl mx-auto">You are logged in!</Card>
  </div>
</template>
