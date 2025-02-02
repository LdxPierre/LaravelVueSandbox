<script setup lang="ts">
import { comboboxKey, type ComboboxProvide } from './AppCombobox.vue'
import { inject } from 'vue'

const { open } = inject(comboboxKey) as ComboboxProvide
</script>

<template>
  <div v-show="open" class="mt-1 flex flex-col rounded-md border bg-white p-1">
    <slot />
  </div>
</template>
