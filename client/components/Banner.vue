<script lang="ts" setup>
import { XIcon } from '@heroicons/vue/outline'

const props = defineProps<{
  show: boolean
}>()

defineEmits(['update:show'])

const state = ref({ isShowing: props.show })

watch(
  () => props.show,
  (show) => (state.value.isShowing = show),
)
</script>

<template>
  <transition
    enter-active-class="transform ease-out duration-300 transition"
    enter-from-class="translate-y-4 opacity-0 sm:translate-y-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition ease-in duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="state.isShowing" class="p-2 rounded-lg shadow-lg sm:p-3">
      <div class="flex items-center justify-between flex-wrap">
        <div class="w-0 flex-1 flex items-center">
          <slot />
        </div>

        <div class="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
          <button
            type="button"
            class="-mr-1 flex p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            @click="$emit('update:show', (state.isShowing = false))"
          >
            <span class="sr-only">Dismiss</span>
            <XIcon class="h-6 w-6 text-white" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>
