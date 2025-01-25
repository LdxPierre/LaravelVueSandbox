<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from './components/TheHeader.vue'
</script>

<template>
  <div class="bg-background flex min-h-screen flex-col">
    <TheHeader />
    <main class="flex-grow basis-0">
      <RouterView />
    </main>
  </div>
</template>
