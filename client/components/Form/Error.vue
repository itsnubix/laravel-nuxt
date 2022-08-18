<script lang="ts" setup>
const props = defineProps<{
  value?: string | Array<string>
}>()

const errors = computed(() =>
  typeof props.value === 'string' ? [props.value] : props.value,
)
</script>

<template>
  <ul>
    <li v-for="error in errors" class="text-red-600 text-xs mt-1">
      {{ error }}
    </li>
  </ul>
</template>
