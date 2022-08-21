<script lang="ts" setup>
import { Notification, NotificationStatus } from '@/stores/notifications'
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
  AnnotationIcon,
} from '@heroicons/vue/outline'
import { XIcon } from '@heroicons/vue/solid'
import { ref } from 'vue'

const { clearNotification } = useNotifications()

const { notification } = defineProps<{
  notification: Notification
}>()

const show = ref(false)
nextTick(() => (show.value = true))

const dismiss = () => {
  show.value = false
}
</script>

<template>
  <transition
    enter-active-class="transform ease-out duration-300 transition"
    enter-from-class="translate-y-4 opacity-0 sm:translate-y-0 sm:translate-x-2"
    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
    leave-active-class="transition ease-in duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
    @after-leave="clearNotification(notification)"
  >
    <div
      v-if="show"
      class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
    >
      <div class="p-4">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <CheckCircleIcon
              v-if="notification.status === NotificationStatus.Success"
              class="h-6 w-6 text-green-400"
              aria-hidden="true"
            />
            <ExclamationCircleIcon
              v-if="notification.status === NotificationStatus.Warn"
              class="h-6 w-6 text-amber-400"
              aria-hidden="true"
            />
            <XCircleIcon
              v-if="notification.status === NotificationStatus.Error"
              class="h-6 w-6 text-red-400"
              aria-hidden="true"
            />
            <AnnotationIcon
              v-else
              class="h-6 w-6 text-blue-400"
              aria-hidden="true"
            />
          </div>
          <div class="ml-3 w-0 flex-1">
            <p
              v-if="notification.title"
              class="mb-1 text-sm font-medium text-gray-900"
              v-text="notification.title"
            />
            <p class="text-sm text-gray-500" v-text="notification.message" />
          </div>
          <div class="ml-4 flex-shrink-0 flex">
            <button
              type="button"
              @click="dismiss"
              class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span class="sr-only">Close</span>
              <XIcon class="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
