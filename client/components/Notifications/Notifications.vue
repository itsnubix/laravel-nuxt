<script lang="ts" setup>
import Notification from './Notification.vue'

const { notifications } = useNotifications()
</script>

<template>
  <div
    aria-live="assertive"
    class="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
  >
    <div class="w-full flex flex-col items-center space-y-4 sm:items-end">
      <Notification
        v-for="notification in notifications"
        :notification="notification"
      />
    </div>
  </div>
</template>
