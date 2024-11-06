<script setup lang="ts">
import { RouterView, useRouter, useRoute } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import { useStepStore } from '@/stores/steps'
import { useSelectedStore } from './stores/selected'

const loading = ref(true)
const router = useRouter()
const route = useRoute()
const stepStore = useStepStore()
const selectedStore = useSelectedStore()

onMounted(() => {
  setTimeout(() => {
    stepStore.setStep(route.name as string)
    selectedStore.setAllSelected(route.query)
    loading.value = false
  }, 1000)
})

watch(
  () => stepStore.step,
  nextStep => {
    const name = nextStep.routeName == 'home' ? '' : nextStep.routeName
    router.push({
      path: `/${name}`,
      query: selectedStore.getQuery(),
    })
  }
)

watch(selectedStore.selected, () => {
  router.replace({ query: selectedStore.getQuery() })
})
</script>

<template>
  <section class="loading" v-if="loading">
    <h1>LOADING...</h1>
  </section>
  <RouterView v-else />
</template>

<style scoped>
.loading {
  width: 100%;
  height: 100%;
  background-color: var(--light-gray);

  display: grid;
  place-items: center;
}

@media (max-width: 1119px) {
  .loading {
    /* min-height: calc(var(--vh, 1vh) * 100); */
    min-height: 100dvh;
  }
}
</style>