<script setup lang="ts">
import { computed, inject, toRaw } from 'vue'
import { comboboxKey, type ComboboxProvide } from './AppCombobox.vue'

const props = defineProps<{
  option: unknown
}>()

const { model, updateModel } = inject(comboboxKey) as ComboboxProvide

const isChecked = computed(() => {
  if (Array.isArray(model.value)) {
    return model.value.find((el) => toRaw(el) === toRaw(props.option)) ? true : false
  }
  return toRaw(model.value) === toRaw(props.option)
})
</script>

<template>
  <div
    class="flex items-center px-2 py-1.5 hover:bg-neutral-100"
    :class="{ 'bg-neutral-100': isChecked }"
    role="option"
    @click="() => updateModel(option)"
  >
    <slot />
  </div>
</template>
