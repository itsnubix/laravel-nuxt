<script lang="ts" setup>
const props = defineProps<{
  value?: string | Array<string>
}>()

const errors = computed(() => {
  if (!props.value) {
    return []
  }

  return (
    typeof props.value === 'string' ? [props.value] : props.value
  )?.filter((error) => error !== undefined && error !== null && error !== '')
})
</script>

<template>
  <ul v-if="errors.length > 0">
    <li v-for="error in errors" :key="error" class="text-red-600 text-xs mt-1">
      {{ error }}
    </li>
  </ul>
</template>
