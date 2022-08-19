<script lang="ts" setup>
const props = defineProps<{ isLoading?: boolean }>()
</script>

<template>
  <FormButton type="submit">
    <Loading v-if="isLoading" class="-ml-1 mr-3" />
    <slot />
  </FormButton>
</template>
