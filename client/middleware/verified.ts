export default defineNuxtRouteMiddleware(async (to, from) => {
  const route = useRoute()
  const { $store, authenticated, verified } = useAuth()

  if (authenticated && verified) {
    return
  }

  if (route.query.verified) {
    const user = await $store.loadUser()

    if (user.email_verified_at) {
      return
    }
  }

  return navigateTo('/verify-email')
})
