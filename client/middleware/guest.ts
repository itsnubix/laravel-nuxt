export default defineNuxtRouteMiddleware((to, from) => {
  const { authenticated } = useAuth()

  if (authenticated) {
    return navigateTo('/home')
  }
})
