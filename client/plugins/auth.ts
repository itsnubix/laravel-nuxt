import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin((app) => {
  const authStore = useAuthStore()

  return {
    provide: { auth: authStore },
  }
})
