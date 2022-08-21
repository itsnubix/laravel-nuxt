import { defineStore } from 'pinia'

export interface Notification {
  id?: number
  title?: string
  message: string
}

interface State {
  notifications: Notification[]
}

export const useNotificationStore = defineStore('notifications', {
  state: (): State => ({
    notifications: [],
  }),

  actions: {
    addNotification(notification: Notification) {
      this.notifications.push(notification)
    },

    clearNotification(notification: Notification) {
      this.notifications.splice(
        this.notifications.indexOf(
          (n: Notification) => n.id === notification.id,
        ),
        1,
      )
    },
  },

  getters: {
    hasNotifications({ notifications }): boolean {
      return notifications.length > 0
    },
  },
})
