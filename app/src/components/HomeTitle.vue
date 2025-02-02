<script setup lang="ts"></script>

<template>
  <div class="bg-neutral-100">
    <div class="m-auto flex h-96 w-full max-w-[1600px] items-center justify-center p-5 text-center">
      <h1
        v-motion
        :variants="{
          initial: {
            opacity: 0,
          },
          enter: {
            opacity: 1,
            transition: {
              bounce: 0,
              delay: 150,
              duration: 400,
            },
          },
        }"
        class="text-3xl text-green-950"
      >
        <span>Title</span> <span class="mt-1 block text-green-600">Accent</span>
      </h1>
    </div>
  </div>
</template>
