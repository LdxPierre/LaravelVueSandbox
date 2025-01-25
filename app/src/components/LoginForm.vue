<script setup lang="ts">
import { useAuth } from '@/composables/auth'
import { useForm } from '@/composables/form'
import AppInput from '@/components/AppInput.vue'
import AppButton from './AppButton.vue'
import AppLabel from './AppLabel.vue'

const { fields } = useForm()
const { login } = useAuth()

async function handleSubmit() {
  try {
    await login({ email: fields.value.email, password: fields.value.password })
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="mt-5 w-full">
    <div>
      <AppLabel for="email">Email</AppLabel>
      <AppInput v-model="fields.email" type="text" name="email" id="email" class="mt-1" />
    </div>
    <div class="mt-5">
      <AppLabel for="password">Password</AppLabel>
      <AppInput
        v-model="fields.password"
        type="password"
        name="password"
        id="password"
        class="mt-1"
      />
    </div>
    <AppButton class="mt-5" variant="default" as="input" type="submit" value="Go" />
  </form>
</template>
