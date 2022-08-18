<script lang="ts" setup>
const { logout } = useAuth()
</script>

<template>
  <div>
    <TopNavigation />
    <button @click="logout">Logout</button>
    <slot />
  </div>
</template>
