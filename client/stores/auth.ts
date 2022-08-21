import { defineStore } from 'pinia'

interface State {
  user: App.Models.User | null
}

export const useAuthStore = defineStore('auth', {
  state: (): State => ({
    user: JSON.parse(localStorage.getItem('store/auth/user')),
  }),

  actions: {
    async loadUser(): Promise<App.Models.User> {
      const { api } = useApi()
      const { data: user } = await api.get('api/me')

      this.updateUser(user)

      return user
    },

    updateUser(user) {
      this.user = user
      localStorage.setItem('store/auth/user', JSON.stringify(user))
    },

    clearUser() {
      this.user = null
      localStorage.removeItem('store/auth/user')
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
