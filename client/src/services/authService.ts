import api from '@/lib/api'
import type { AuthResponse, LoginCredentials, RegisterData } from '@/types'

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/login', credentials)
    return data
  },

  async register(userData: RegisterData): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/register', userData)
    return data
  },

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },
}
