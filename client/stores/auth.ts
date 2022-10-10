import { defineStore } from 'pinia'

interface State {
  user?: App.Models.User
}

const USER_STORAGE_KEY = 'store/auth/user'

function retrieveUser(): null | App.Models.User {
  try {
    return JSON.parse(localStorage.getItem(USER_STORAGE_KEY)) as App.Models.User
  } catch {
    useAuthStore().clearUser()
    return null
  }
}

export const useAuthStore = defineStore('auth', {
  state: (): State => ({
    user: retrieveUser(),
  }),

  actions: {
    async loadUser(): Promise<App.Models.User> {
      const user = await useAuth().getAuthenticatedUser()

      this.updateUser(user)

      return user
    },

    updateUser(user: App.Models.User) {
      this.user = user
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
    },

    clearUser() {
      this.user = null
      localStorage.removeItem(USER_STORAGE_KEY)
    },

    clearAll() {
      this.clearUser()
    },
  },

  getters: {
    authenticated({ user }) {
      return user?.id
    },

    verified({ user }) {
      return user?.email_verified_at
    },
  },
})
