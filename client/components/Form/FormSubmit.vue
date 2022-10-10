<script lang="ts" setup>
import { CheckIcon } from '@heroicons/vue/20/solid'
const props = withDefaults(
  defineProps<{
    loading?: boolean
    loaded?: boolean
    success?: boolean
    type?: 'button' | 'submit'
    icon?: any
    iconOnly?: boolean
  }>(),
  { type: 'submit' },
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

    <div
      :class="['text-primary-400', !iconOnly && '-mr-1 ml-2']"
      aria-hidden="true"
    >
      <component
        v-if="icon && !loading && !showCheck"
        :is="icon"
        class="h-5 w-5"
      />
      <Loading v-else-if="loading && !showCheck" class="h-5 w-5" />
      <CheckIcon v-else-if="showCheck" class="h-5 w-5" />
    </div>
  </FormButton>
</template>
