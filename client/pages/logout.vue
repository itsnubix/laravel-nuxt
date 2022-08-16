<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
})
const { logout } = useAuth()

logout()
</script>
<template></template>
