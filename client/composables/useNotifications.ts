import { useNotificationStore } from '~~/client/stores/notifications'

export const useNotifications = () => {
  const { addNotification, clearNotification, notifications } =
    useNotificationStore()

  const notify = (message: string, title = '', persist = false) => {
    addNotification({ id: notifications.length + 1, message, title, persist })
  }

  return {
    notify,
    notifications,
    clearNotification,
  }
}
