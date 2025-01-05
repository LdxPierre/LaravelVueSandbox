import type { User } from '@/types/user'
import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'

type State = {
  user: User | null
  isAuthenticated: boolean
}

export const useUser = defineStore('user', () => {
  /**
   * States
   */

  const state = reactive<State>({
    user: null,
    isAuthenticated: false,
  })

  /**
   * Methods
   */

  /**
   * Set the current authenticated user
   * @param user
   */
  function setUser(user: User | null) {
    state.user = user
    state.isAuthenticated = user ? true : false
  }

  /**
   * Return
   */

  return {
    ...toRefs(state),
    setUser,
  }
})
