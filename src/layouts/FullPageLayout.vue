<!-- <script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  setVh()
  window.addEventListener('resize', setVh)
})
onUnmounted(() => {
  window.removeEventListener('resize', setVh)
})

function setVh() {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}
</script> -->

<template>
  <main>
    <slot />
  </main>
</template>

<style scoped>
main {
  background-color: var(--light-gray);
  width: 100%;
  height: 100%;

  display: grid;
  place-items: center;
}

@media (max-width: 1119px) {
  main {
    min-height: 100vh;
    /* min-height: calc(var(--vh, 1vh) * 100); */
    min-height: 100dvh;
  }
}
</style>