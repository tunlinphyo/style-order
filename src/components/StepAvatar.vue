<script setup lang="ts">
import { ref, watch } from 'vue'
import { useStepStore } from '../stores/steps'
import { useSelectedStore } from '@/stores/selected'

const stepStore = useStepStore()
const selectedStore = useSelectedStore()
const stepName = ref(stepStore.step.name.toLowerCase())

watch(
  () => stepStore.step,
  nextStep => {
    stepName.value = nextStep.name.toLowerCase()
  }
)
</script>

<template>
  <div class="step-avatar">
    <div
      class="persona"
      :class="{ lady: selectedStore.selected.gender == 2 }"
    ></div>
    <div class="message-group">
      <p>
        {{ stepName }}をお選びください。.
        <span class="large-only"
          >シミュレーションウィンドウでイメージを確認することができます。</span
        >
      </p>
    </div>
  </div>
</template>

<style scoped>
.step-avatar {
  display: grid;
  grid-template-columns: 50px auto;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  padding-inline: 20px;
}

.persona {
  width: 50px;
  height: 50px;
  background-image: url(/style_order_icons/persona.png);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
.persona.lady {
  background-image: url(/style_order_icons/persona-test.png);
}

.message-group {
  padding: 5px 25px;
  border-radius: 10px;
  background-color: var(--white);
  position: relative;
}

.message-group::before {
  content: '';
  display: block;
  width: 0;
  height: 0;
  border-top: 3px solid transparent;
  border-bottom: 3px solid transparent;
  border-right: 20px solid var(--white);
  position: absolute;
  left: -15px;
  bottom: 25%;
  transform-origin: bottom right;
  rotate: -15deg;
}

.message-group p {
  font-size: 1rem;
}

.large-only {
  display: none;
}

@media (min-width: 768px) {
  .large-only {
    display: inline-block;
  }
}
</style>