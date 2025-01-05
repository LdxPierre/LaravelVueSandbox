import { computed, onMounted, reactive, toRefs, toValue, type Ref } from 'vue'

type State<T> = {
  data: T | null
  error: unknown | null
  pending: boolean
  completed: boolean
}

export function useFetch<T>(
  url?: string | Ref<string>,
  method: 'get' | 'post' | 'patch' | 'put' | 'delete' = 'get',
  options?: RequestInit,
  immediate: boolean | Ref<boolean> = false,
) {
  /**
   * States
   */

  const state = reactive<State<T>>({
    data: null,
    error: null,
    pending: false,
    completed: false,
  })

  /**
   * Getters
   */

  const xsrfCookie = computed(() =>
    document.cookie.split(';').find((el) => el.includes('XSRF-TOKEN')),
  )
  const xsrfToken = computed(() =>
    decodeURIComponent(xsrfCookie.value ? xsrfCookie.value.split('=')[1] : ''),
  )

  /**
   * Methods
   */

  /**
   * Call fetch
   * @param sendOptions Additionnal options put on top of the composable options
   */
  async function send(sendUrl?: string, sendMethod = method, sendOptions?: RequestInit) {
    state.data = null
    state.error = null
    state.pending = true
    state.completed = false

    // Error if no path
    if (typeof sendUrl === 'undefined' && typeof toValue(url) === 'undefined') {
      throw new Error('URL missing')
    }

    // Default options
    let queryOptions: RequestInit = {
      method: sendMethod,
      credentials: 'include',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      ...options,
      ...sendOptions,
    }

    // Add XSRF-TOKEN
    if (xsrfToken.value) {
      queryOptions = {
        ...queryOptions,
        headers: {
          ...queryOptions.headers,
          'X-XSRF-TOKEN': xsrfToken.value,
        },
      }
    }

    try {
      const query = await fetch(sendUrl ?? toValue(url)!, queryOptions)
      const body = await query.json()
      state.data = body
      return body
    } catch (error) {
      state.error = error
    } finally {
      state.pending = false
      state.completed = true
    }
  }

  /**
   * Lifecycle
   */

  onMounted(async () => {
    if (immediate) {
      await send()
    }
  })

  /**
   * Return
   */

  return {
    send,
    ...toRefs(state),
  }
}
