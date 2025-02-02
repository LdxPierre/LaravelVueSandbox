<script setup lang="ts">
import AppInput from './AppInput.vue'
import { comboboxKey, type ComboboxProvide } from './AppCombobox.vue'
import { inject } from 'vue'

const { updateOpen, search, updateSearch } = inject(comboboxKey) as ComboboxProvide
</script>

<template>
  <AppInput
    :model-value="search"
    type="text"
    name="search"
    id="search"
    @focus="() => updateOpen(true)"
    @update:model-value="updateSearch"
  />
</template>
