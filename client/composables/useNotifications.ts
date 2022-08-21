import { NotificationStatus } from '@/stores/notifications'
import { useNotificationStore } from '@/stores/notifications'

export const useNotifications = () => {
  const {
    addNotification,
    clearNotification,
    hasNotifications,
    notifications,
  } = useNotificationStore()

  const notify = (
    message: string,
    title = '',
    status = NotificationStatus.Info,
  ) => {
    addNotification({ id: notifications.length + 1, message, title, status })
  }

  const info = notify

  const warn = (message: string, title = '') => {
    notify(message, title, NotificationStatus.Warn)
  }

  const error = (message: string, title = '') => {
    notify(message, title, NotificationStatus.Error)
  }

  const success = (message: string, title = '') => {
    notify(message, title, NotificationStatus.Success)
  }

  return {
    info,
    warn,
    error,
    notify,
    success,
    notifications,
    hasNotifications,
    clearNotification,
  }
}
