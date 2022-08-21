<script setup>
const { appName } = useRuntimeConfig()

useHead({
  titleTemplate: (chunk) => (chunk ? `${chunk} - ${appName}` : appName),
})
</script>
<template>
  <div class="antialiased min-h-screen flex flex-col">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <NotificationContainer />
  </div>
</template>
