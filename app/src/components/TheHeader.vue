<template>
  <header class="w-full px-3 py-2 flex gap-3 bg-blue-900 text-blue-300 font-semibold">
    <RouterLink :to="{ name: 'home' }">Home</RouterLink>
    <RouterLink :to="{ name: 'login' }">Login</RouterLink>
  </header>
</template>
