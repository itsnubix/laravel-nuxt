import { useAuthStore } from '@/stores/auth'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { verified, loadUser } = useAuthStore()
  const route = useRoute()

  if (verified) {
    return
  }

  if (route.query.verified) {
    await loadUser()
  }

  return navigateTo('/verify-email')
})
