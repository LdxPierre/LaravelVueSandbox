import { computed, reactive, toRefs, toValue, type Ref } from 'vue'

type State<T> = {
  result: T | null
  error: unknown | null
  pending: boolean
  completed: boolean
}

export function useFetch<T>(
  path: string | Ref<string>,
  method?: 'get' | 'post' | 'patch' | 'put' | 'delete',
  options?: RequestInit,
) {
  const state = reactive<State<T>>({
    result: null,
    error: null,
    pending: false,
    completed: false,
  })

  const getPath = computed(() => toValue(path))

  async function getFetch() {
    state.result = null
    state.error = null
    state.pending = true
    state.completed = false

    try {
      const query = await fetch(getPath.value, {
        method,
        ...options,
      })
      const body = await query.json()
      state.result = body
    } catch (error) {
      state.error = error
    } finally {
      state.pending = false
      state.completed = true
    }
  }

  return {
    getFetch,
    ...toRefs(state),
  }
}
