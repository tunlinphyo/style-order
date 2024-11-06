<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useStepStore } from '@/stores/steps'
import FabricLining from '@/components/FabricLining.vue'
import MediaObject from '@/components/MediaObject.vue'
import SimuLayout from '@/layouts/SimuLayout.vue'

const store = useStepStore()
</script>

<template>
  <SimuLayout
    :is-object="store.stepIndex != 6"
    :is-confirm="store.stepIndex == 7"
  >
    <template v-slot:object>
      <FabricLining v-if="store.step.step == 5" />
      <MediaObject v-else />
    </template>
    <template v-slot:action>
      <RouterView />
    </template>
  </SimuLayout>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>