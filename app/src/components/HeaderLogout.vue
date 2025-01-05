<script setup lang="ts">
import { useAuth } from '@/composables/auth'

const { logout } = useAuth()
</script>

<template>
  <form @submit.prevent="logout">
    <input type="submit" value="Logout" />
  </form>
</template>
