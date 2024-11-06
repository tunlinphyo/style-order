<script setup lang="ts">
import { useStepStore } from '../stores/steps'

const store = useStepStore()

function saveSelection() {}
</script>

<template>
  <div class="step-container">
    <button class="button-reset step step--prev" @click="store.prevStep">
      戻る
    </button>
    <button
      v-if="store.step.step < 7"
      class="button-reset step step--next"
      @click="store.nextStep"
    >
      次へ
    </button>
    <button
      class="button-reset step step--next"
      :class="{ hide: store.step.step == 7 }"
      v-else
      @click="saveSelection"
    >
      選択を保存
    </button>
  </div>
</template>

<style scoped>
.step-container {
  width: 100%;
}

.step {
  pointer-events: auto;
}

@media (max-width: 1119px) {
  .step-container {
    height: 60px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 20px;
    padding-inline: 20px;
  }

  .step {
    flex: 1;
    max-width: 150px;
    height: 40px;
    border-radius: 40px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
      rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    position: relative;
  }

  .step::after {
    content: '';
    position: absolute;
    width: 1em;
    height: 1em;
    top: 50%;
    translate: 0 -50%;

    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .step--prev {
    background-color: var(--gray);
    color: var(--black);
  }
  .step--next {
    background-color: var(--primary);
    color: var(--white);
  }

  .step--prev::after {
    left: 15px;
    background-image: url(/style_order_icons/arrow-left-circle.png);
  }
  .step--next::after {
    right: 15px;
    background-image: url(/style_order_icons/arrow-right-circle.png);
  }

  .step.disabled {
    opacity: 0.4;
  }
}

@media (min-width: 1200px) {
  .step-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-inline: 8px;
  }

  .step {
    width: 64px;
    height: 64px;
    background-color: var(--primary);
    color: var(--white);
    border: 3px solid var(--white);
    border-radius: 50%;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    font-weight: 800;
    font-size: 0.8rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .step::after {
    content: '';
    width: 1.2rem;
    height: 0.6em;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
  .step--prev::after {
    background-image: url(/style_order_icons/arrow_white_left.png);
  }
  .step--next::after {
    background-image: url(/style_order_icons/arrow_white_right.png);
  }

  .step.hide {
    display: none;
  }
}
@media (min-width: 1600px) {
  .step-container {
    padding-inline: 18px;
  }
}
</style>