import { useRouter } from 'vue-router'
import { useFetch } from './fetch'
import { useUser } from '@/stores/user'

export function useAuth() {
  /**
   * Hooks
   */

  const { send } = useFetch()
  const { setUser } = useUser()
  const router = useRouter()

  /**
   * Methods
   */

  /**
   * Regenerate session if goods credentials
   * @param credentials
   */
  async function login(credentials: { email: string; password: string }) {
    try {
      await send('http://localhost:8000/sanctum/csrf-cookie')
      const body = await send('http://localhost:8000/login', 'post', {
        body: JSON.stringify(credentials),
      })
      setUser(body)
      router.replace({ name: 'home' })
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Destroy current session and create a new one
   */
  async function logout() {
    try {
      await send('http://localhost:8000/logout', 'post')
      setUser(null)
      router.replace({ name: 'login' })
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Return
   */

  return {
    login,
    logout,
  }
}
