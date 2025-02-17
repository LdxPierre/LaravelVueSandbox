<script setup lang="ts">
import AppCombobox from '@/components/AppCombobox.vue'
import AppComboboxContent from '@/components/AppComboboxContent.vue'
import AppComboboxItem from '@/components/AppComboboxItem.vue'
import AppComboboxTrigger from '@/components/AppComboboxTrigger.vue'
import LoginForm from '@/components/LoginForm.vue'
import { computed, ref, toRaw } from 'vue'

const options = ref(['French', 'English', 'Spanish', 'Italian', 'Deutsch'])
const search = ref('')
const result = ref([])

const optionsFilter = computed(() =>
  [...options.value].filter((el) => toRaw(el).includes(search.value)),
)
</script>

<template>
  <div class="flex h-full w-full flex-col items-center justify-center">
    <div class="w-full max-w-96">
      <h1 class="text-2xl">Login</h1>
      <LoginForm />
      <AppCombobox v-model="result" v-model:search="search" class="mt-5" >
        <AppComboboxTrigger />
        <AppComboboxContent>
          <AppComboboxItem v-for="(option, index) in optionsFilter" :key="index" :option="option" >
            {{ option }}
          </AppComboboxItem>
        </AppComboboxContent>
      </AppCombobox>
    </div>
  </div>
</template>
