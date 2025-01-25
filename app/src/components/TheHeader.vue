<script setup lang="ts">
import { useUser } from '@/stores/user'
import { storeToRefs } from 'pinia'
import HeaderLogout from './HeaderLogout.vue'

const userStore = useUser()
const { isAuthenticated } = storeToRefs(userStore)
</script>

<template>
  <header
    class="text-foreground flex h-12 w-full items-center gap-3 bg-orange-100 px-3 py-2 font-semibold"
  >
    <RouterLink :to="{ name: 'home' }">Home</RouterLink>
    <HeaderLogout v-if="isAuthenticated" />
    <RouterLink v-else :to="{ name: 'login' }">Login</RouterLink>
  </header>
</template>
