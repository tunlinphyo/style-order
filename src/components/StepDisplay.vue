<script setup lang="ts">
import { useStepStore } from '@/stores/steps'
import IconArrow from './icons/IconArrow.vue'
import { nextTick, onMounted, useTemplateRef, watch } from 'vue'

const store = useStepStore()
const listRef = useTemplateRef<HTMLLIElement>('steps')

onMounted(() => {
  scrollToActive()
})

watch(
  () => store.stepIndex,
  () => {
    scrollToActive()
  }
)

async function scrollToActive() {
  await nextTick()
  if (listRef.value) {
    const item = listRef.value.querySelector('.active')
    if (item) {
      item.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    }
  }
}
</script>

<template>
  <div class="steps-container">
    <ul ref="steps" class="list-reset steps">
      <template v-for="(data, index) in store.steps" :key="data.step">
        <li
          v-if="data.step"
          class="step"
          :class="{ active: data.step === store.stepIndex }"
        >
          <div class="step-number">{{ index }}</div>
          <div class="step-name">{{ data.name }}</div>
          <!-- <IconArrow /> -->
        </li>
      </template>
    </ul>
  </div>
</template>

<style scoped>
/* * {
  outline: 1px solid hotpink;
} */

.steps-container {
  --num-size: 28px;
  --font-size: 1rem;
  --icon-size: 24px;

  width: 100%;
  height: 100%;

  display: grid;
  place-items: center;
}

.steps {
  max-width: 100%;
  height: 50px;
  display: flex;
  white-space: nowrap;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;

  gap: 20px;
  padding-inline: 20px;
}

.step {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  opacity: 0.4;
}

.step.active {
  opacity: 1;
}

.step-number {
  display: grid;
  place-items: center;

  width: var(--num-size);
  height: var(--num-size);
  border-radius: 50%;
  background-color: var(--black);
  color: var(--white);
  font-weight: 800;
  font-size: var(--font-size);
}

.step-name {
  font-size: var(--font-size);
  font-weight: 800;
  padding-inline-start: 10px;
}

.step::after {
  content: '';
  display: block;
  margin-inline-start: 20px;
  width: var(--icon-size);
  height: var(--icon-size);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 70%;
  background-image: url(/style_order_icons/arrow-right.png);
}

.step:last-child::after {
  display: none;
}

@media (min-width: 992px) {
  .steps-container {
    --num-size: 32px;
    --font-size: 1.1rem;
    --icon-size: 28px;
  }
}
</style>