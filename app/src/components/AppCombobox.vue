<script lang="ts">
export type ComboboxProvide = {
  open: Ref<boolean>
  updateOpen: (value: boolean) => void
  search: Ref<string | number>
  updateSearch: (value: string | number) => void
  model: Ref<unknown>
  updateModel: (value: unknown) => void
}

export const comboboxKey = Symbol() as InjectionKey<ComboboxProvide>
</script>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { provide, ref, toRaw, useTemplateRef, type InjectionKey, type Ref } from 'vue'

const model = defineModel<unknown>({ default: null })
const search = defineModel<string | number>('search', { required: false, default: '' })

const root = useTemplateRef('root')
const open = ref(false)

function updateOpen(value: boolean) {
  open.value = value
}

function updateSearch(value: string | number) {
  search.value = value
}

function updateModel(value: unknown) {
  if (Array.isArray(model.value)) {
    const array = [...model.value]
    const index = array.findIndex((el) => toRaw(el) === toRaw(value))
    if (index < 0) {
      array.push(value)
    } else {
      array.splice(index, 1)
    }

    model.value = array
    return
  }

  if (toRaw(model.value) === toRaw(value)) {
    model.value = null
  } else {
    model.value = value
  }
}

onClickOutside(root, () => {
  open.value = false
  search.value = ''
})

provide(comboboxKey, { open, updateOpen, search, updateSearch, model, updateModel })
</script>

<template>
  <div ref="root">
    <slot />
  </div>
</template>
