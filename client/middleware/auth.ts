export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = useAuth()

  if (!user) {
    return navigateTo('/login')
  }
})
