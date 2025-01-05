<script setup lang="ts">
import { useAuth } from '@/composables/auth'
import { useForm } from '@/composables/form'

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
  <form @submit.prevent="handleSubmit">
    <input v-model="fields.email" type="text" name="email" id="email" class="border" />
    <input v-model="fields.password" type="password" name="password" id="password" class="border" />
    <input type="submit" value="Connexion" />
  </form>
</template>
