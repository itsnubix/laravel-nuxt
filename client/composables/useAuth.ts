export const useAuth = () => {
  const { $api } = useNuxtApp()

  const user = null

  const csrf = () => $api('/sanctum/csrf-cookie')

  const login = async (credentials: { email: string; password: string }) => {
    // await csrf()
    // try {
    //   const response = await $api('login', {
    //     body: JSON.stringify(credentials),
    //     method: 'post',
    //   })
    //   const json = await response.json()
    //   console.log(json)
    // } catch (error) {
    //   createError(error)
    // }
  }

  const register = async () => {}

  const logout = async () => {}

  return { user, csrf, login, register, logout }
}
