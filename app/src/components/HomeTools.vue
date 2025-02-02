<script setup lang="ts">
import { Apple, Banana, Bean, X } from 'lucide-vue-next'
import { ref } from 'vue'

const tools = ref([
  {
    icon: X,
    name: 'X',
  },
  {
    icon: Bean,
    name: 'Bean',
  },
  {
    icon: Apple,
    name: 'Apple',
  },
  {
    icon: Banana,
    name: 'Banana',
  },
])
</script>

<template>
  <div>
    <div class="m-auto max-w-[1600px] text-center">
      <h2
        v-motion
        :variants="{
          initial: {
            opacity: 0,
          },
          enter: {
            opacity: 1,
            transition: {
              delay: 300,
            },
          },
        }"
        class="mt-10 text-xl text-amber-950"
      >
        Tools
      </h2>
      <div class="mt-10 grid grid-cols-1 gap-3 px-10 sm:grid-cols-2 md:grid-cols-4">
        <button
          v-motion
          :variants="{
            initial: {
              opacity: 0,
            },
            enter: {
              opacity: 1,
              transition: {
                delay: 300 + index * 50,
              },
            },
          }"
          v-for="(_, index) in tools"
          :key="index"
          class="group flex items-center justify-center rounded-md border border-neutral-200 p-2 transition-colors duration-300 hover:border-green-600 md:h-40"
        >
          <div
            class="flex items-center justify-center sm:flex-col"
            v-motion
            :variants="{
              initial: {
                y: -5,
                opacity: 0,
              },
              enter: {
                y: 0,
                opacity: 1,
                transition: {
                  delay: 300 + index * 100,
                  bounce: 0,
                },
              },
            }"
          >
            <component
              :is="tools[index].icon"
              class="m-auto size-7 stroke-green-950 transition-colors group-hover:stroke-green-600"
            />
            <h3 class="m-auto mt-3 text-green-950 transition-colors group-hover:text-green-600">
              {{ tools[index].name }}
            </h3>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
