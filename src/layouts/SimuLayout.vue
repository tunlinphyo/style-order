<script setup lang="ts">
withDefaults(
  defineProps<{
    isObject?: boolean
    isConfirm?: boolean
  }>(),
  {
    isObject: true,
    isConfirm: false,
  }
)

import StepControl from '@/components/StepControl.vue'
import StepDisplay from '@/components/StepDisplay.vue'
import StepAvatar from '@/components/StepAvatar.vue'
</script>

<template>
  <main :class="{ confirm: isConfirm }">
    <header>
      <StepDisplay />
    </header>
    <section class="avatar" v-if="!isConfirm">
      <StepAvatar />
    </section>
    <div v-else></div>
    <section class="container" :class="{ 'with-object': isObject }">
      <div class="object" v-if="isObject">
        <slot name="object" />
      </div>
      <div class="action">
        <div class="action-container">
          <slot name="action" />
        </div>
      </div>
    </section>
    <footer>
      <StepControl />
    </footer>
  </main>
</template>

<style scoped>
main {
  background-color: var(--light-gray);
  width: 100%;
}

.object {
  background-color: var(--white);
}

.action {
  background-color: var(--gray);
  position: relative;
}

/* @media (min-width: 768px) and (max-width: 1119px) {
  .object {
    aspect-ratio: 1.2 / 1;
    background-color: hotpink;
  }
} */

@media (max-width: 1119px) {
  main {
    display: block;
  }

  header {
    position: sticky;
    z-index: 5;
    top: 0;
    left: 0;
    background-color: var(--light-gray);
    border-bottom: 4px solid var(--bg-dark-blue);
  }

  .avatar {
    position: sticky;
    z-index: 0;
    top: 60px;
  }

  .container {
    display: block;
    --b-radius: 16px;
    padding-top: 11px;
  }

  .with-object {
    padding-top: 0;
  }

  .object {
    position: sticky;
    z-index: 0;
    top: 110px;

    width: 100%;
    aspect-ratio: 2 / 1;
    background-color: var(--white);
    border-radius: var(--b-radius) var(--b-radius) 0 0;
    overflow: hidden;
  }

  .confirm .object {
    top: 68px;
  }

  .action {
    /* height: 2000px; */
    /* background-color: var(--light-gray); */
    border-radius: var(--b-radius) var(--b-radius) 0 0;
    margin-top: -5px;
    position: relative;
    padding-block-start: 8px;
  }

  .action::before {
    content: '';
    display: block;
    width: 120px;
    height: 5px;
    background-color: var(--dark);
    border-radius: 5px;

    position: sticky;
    z-index: 5;
    top: 58px;
    margin: 0 auto;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
  }

  footer {
    position: sticky;
    z-index: 5;
    bottom: 0;
    width: 100%;
    background-color: var(--white);
  }
}

@media (max-width: 767px) {
  .object {
    aspect-ratio: 1 / 1.2;
  }
}

@media (min-width: 767px) and (max-width: 992px) {
  .object {
    aspect-ratio: 1.2 / 1;
  }
}

@media (min-width: 1200px) {
  main {
    height: 100%;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: 60px 50px 1fr;
    position: relative;
    padding: 40px;
    padding-block-start: 20px;
  }

  .confirm {
    grid-template-rows: 60px 20px 1fr;
  }

  .container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: minmax(0, 1fr);
  }
  .container.with-object {
    grid-template-columns: 0.7fr 1fr;
  }

  .action-container {
    position: absolute;
    inset: 0;
  }

  footer {
    position: absolute;
    z-index: 9;

    pointer-events: none;
    width: 100%;
    top: 50%;
    left: 0;
    translate: -50%, 0;
  }
}

@media (min-width: 1600px) {
  main {
    padding: 50px;
    padding-block-start: 25px;
  }
}
</style>