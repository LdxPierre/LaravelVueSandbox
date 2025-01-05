import type { User } from '@/types/user'
import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'

type State = {
  user: User | null
  logged: boolean
}

export const useUser = defineStore('user', () => {
  /**
   * States
   */

  const state = reactive<State>({
    user: null,
    logged: false,
  })

  /**
   * Methods
   */

  /**
   * Set the current logged user
   * @param user
   */
  function setUser(user: User | null) {
    state.user = user
    state.logged = user ? true : false
  }

  /**
   * Return
   */

  return {
    ...toRefs(state),
    setUser,
  }
})
