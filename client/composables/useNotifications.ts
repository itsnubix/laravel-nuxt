import { useNotificationStore } from '@/stores/notifications'

export const useNotifications = () => {
  const {
    addNotification,
    clearNotification,
    hasNotifications,
    notifications,
  } = useNotificationStore()

  const notify = (message: string, title = '') => {
    addNotification({ id: notifications.length + 1, message, title })
  }

  return {
    notify,
    notifications,
    hasNotifications,
    clearNotification,
  }
}
