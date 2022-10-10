<script lang="ts" setup>
import { CheckIcon } from '@heroicons/vue/20/solid'
const props = withDefaults(
  defineProps<{
    loaded?: boolean
    loading?: boolean
    success?: boolean
    type?: 'button' | 'submit'
  }>(),
  {
    loaded: false,
    loading: false,
    success: false,
    type: 'submit',
  },
)

const showCheck = ref(false)
watch(
  () => props.success,
  (value) => {
    showCheck.value = value

    if (value) {
      setTimeout(() => {
        showCheck.value = false
      }, 4000)
    }
  },
)
</script>

<template>
  <FormButton :type="type" :disabled="loading">
    <slot v-bind="{ showCheck, success, loading, loaded }" />

    <div class="text-primary-400" aria-hidden="true">
      <CheckIcon v-if="showCheck" class="ml-2 h-5 w-5" />
      <!-- Loading icon -->
      <svg
        v-else-if="loading"
        class="ml-2 h-5 w-5 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  </FormButton>
</template>
