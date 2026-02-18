import api from '@/lib/api'
import type { AuthResponse, LoginCredentials } from '@/types'

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/login', credentials)
    return data
  },

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },
}
