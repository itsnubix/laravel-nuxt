import { useNotificationStore } from '~~/client/stores/notifications'

export const useNotifications = () => {
  const { addNotification, clearNotification, notifications } =
    useNotificationStore()

  const notify = (message: string, title = '', important = false) => {
    addNotification({ id: notifications.length + 1, message, title, important })
  }

  return {
    notify,
    notifications,
    clearNotification,
  }
}
