<script setup lang="ts">
import { Menu } from 'lucide-vue-next'
import AppButton from './AppButton.vue'
import { ref, useTemplateRef } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { animate } from 'motion'

const open = ref(false)
const root = useTemplateRef('root')

async function onEnter(el: Element, onComplete: () => void) {
  await animate(el, { opacity: 1 })
  onComplete()
}

async function onLeave(el: Element, onComplete: () => void) {
  await animate(el, { opacity: 0 })
  onComplete()
}

async function onMenuEnter(el: Element, onComplete: () => void) {
  await animate(el, { x: -(root.value?.clientWidth ?? 0) }, { bounce: 0 })
  onComplete()
}

async function onMenuLeave(el: Element, onComplete: () => void) {
  await animate(el, { x: -(root.value?.clientWidth ?? 0) }, { bounce: 0 })
  onComplete()
}

onClickOutside(root, () => (open.value = false))
</script>

<template>
  <div>
    <AppButton
      variant="outline"
      size="icon"
      class="hover:bg-neutral-200"
      @click="() => (open = !open)"
    >
      <Menu class="size-5" />
    </AppButton>
  </div>
  <Transition :css="false" @enter="onEnter" @leave="onLeave">
    <div v-show="open" class="absolute inset-0 z-50 h-screen w-screen">
      <div class="absolute inset-0 h-full w-full bg-neutral-900/50" />
      <div class="absolute left-0 top-0 h-full w-full max-w-80">
        <Transition :css="false" @enter="onMenuEnter" @leave="onMenuLeave">
          <div v-show="open" ref="root" class="flex h-full w-full flex-col bg-neutral-50 p-5">
            <div class="my-2 mb-10 px-3">
              <span>Hello World</span>
            </div>
            <span class="flex h-8 items-center rounded-md px-3 hover:bg-neutral-200">Hello</span>
            <span class="flex h-8 items-center rounded-md px-3 hover:bg-neutral-200">Hello</span>
            <span class="flex h-8 items-center rounded-md px-3 hover:bg-neutral-200">Hello</span>
          </div>
        </Transition>
      </div>
    </div>
  </Transition>
</template>
