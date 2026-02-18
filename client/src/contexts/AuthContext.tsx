import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { User } from '@/types'

interface AuthContextType {
  user: User | null
  login: (user: User) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {

  const storedUser = localStorage.getItem('user')


  const [user, setUser] = useState<User | null>(storedUser ? JSON.parse(storedUser) : null)


  const login = (newUser: User) => {
    localStorage.setItem('user', JSON.stringify(newUser))
    setUser(newUser)
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
