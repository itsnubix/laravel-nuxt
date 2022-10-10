<script setup>
const { appName } = useRuntimeConfig()

useHead({
  titleTemplate: (chunk) => (chunk ? `${chunk} - ${appName}` : appName),
})
</script>
<template>
  <div>
    <Html class="h-full" />
    <Body
      class="flex min-h-full flex-col font-sans text-gray-600 antialiased"
    />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
