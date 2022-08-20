<script lang="ts" setup>
const props = defineProps<{ loading?: boolean }>()
</script>

<template>
  <FormButton type="submit">
    <Loading v-if="loading" class="-ml-1 mr-3" />
    <slot />
  </FormButton>
</template>
