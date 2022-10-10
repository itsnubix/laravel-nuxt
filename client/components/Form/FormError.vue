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
    <li v-for="error in errors" :key="error" class="mt-1 text-xs text-red-600">
      {{ error }}
    </li>
  </ul>
</template>
