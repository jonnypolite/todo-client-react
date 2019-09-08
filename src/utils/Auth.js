import { UserClient } from '../UserClient'

const AUTH_STORAGE_KEY = 'user'

export default {
  getUser: () => {
    return JSON.parse(sessionStorage.getItem(AUTH_STORAGE_KEY))
  },
  isAuthenticated: () => {
    return sessionStorage.getItem(AUTH_STORAGE_KEY) !== null
  },
  login: async (username, password) => {
    try {
      const loginResponse = await UserClient.login(
        username,
        password
      )

      if (loginResponse.success) {
        sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({
          id: loginResponse.id
        }))
      }

      return loginResponse
    } catch (error) {
      console.log('[authenticate]:', error)
    }
  },
  logout: () => {
    sessionStorage.clear()
  }
}