export const useAuth = () => {
    const token: string | null = localStorage.getItem('token')
    const isAuth: boolean = Boolean(token)
    return {
      isAuth,
      token
    }
}