import { reactive, toRefs } from 'vue'

type State = {
  fields: Record<string, string>
}

export function useForm() {
  const state = reactive<State>({
    fields: {},
  })

  return {
    ...toRefs(state),
  }
}
