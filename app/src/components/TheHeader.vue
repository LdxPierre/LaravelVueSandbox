<script setup lang="ts">
import AppButton from './AppButton.vue'
import { Bell, User2 } from 'lucide-vue-next'
import { useRoute } from 'vue-router'
import TheLeftMenu from './TheLeftMenu.vue'

const { name } = useRoute()
</script>

<template>
  <header
    class="flex h-14 w-full items-center justify-between border-b px-2 py-2 font-semibold text-foreground"
  >
    <div class="flex items-center">
      <TheLeftMenu />
      <span class="ml-4">{{ name }}</span>
    </div>
    <div class="flex items-center">
      <AppButton variant="ghost" size="icon" class="hover:bg-neutral-200">
        <Bell class="size-5" />
      </AppButton>
      <AppButton variant="ghost" size="icon" class="hover:bg-neutral-200">
        <User2 class="size-5" />
      </AppButton>
    </div>
  </header>
</template>
