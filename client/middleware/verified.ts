import { useAuthStore } from '@/stores/auth'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const route = useRoute()
  const { verified, authenticated, loadUser } = useAuthStore()

  if (authenticated && verified) {
    return
  }

  if (route.query.verified) {
    const user = await loadUser()

    if (user.email_verified_at) {
      return
    }
  }

  return navigateTo('/verify-email')
})
