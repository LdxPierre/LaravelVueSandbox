<script setup lang="ts">
import { useUser } from '@/stores/user'
import { storeToRefs } from 'pinia'
import HeaderLogout from './HeaderLogout.vue'

const userStore = useUser()
const { logged } = storeToRefs(userStore)
</script>

<template>
  <header class="w-full px-3 py-2 flex gap-3 bg-blue-900 text-blue-300 font-semibold">
    <RouterLink :to="{ name: 'home' }">Home</RouterLink>
    <HeaderLogout v-if="logged" />
    <RouterLink v-else :to="{ name: 'login' }">Login</RouterLink>
  </header>
</template>
