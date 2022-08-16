export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = useAuth()

  console.log(user, 'user')

  if (user) {
    return navigateTo('/')
  }
})
