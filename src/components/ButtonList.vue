<script setup lang="ts">
import { nextTick, onMounted, useTemplateRef, watch } from 'vue'
import { useButtonsStore } from '@/stores/buttons'

const listRef = useTemplateRef<HTMLLIElement>('buttons')
const store = useButtonsStore()

onMounted(() => {
  if (listRef.value) {
    const item = listRef.value.querySelector('.selected-item')
    if (item) {
      item.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      })
    } else {
      scrollToTop()
    }
  }
})

watch(
  () => store.error,
  async nextVal => {
    if (nextVal && listRef.value) {
      const item = listRef.value.querySelector('.button')
      if (item) {
        await nextTick()
        item.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        })
      }
    }
  }
)

function scrollToTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <section class="buttons">
    <ul ref="buttons" class="scroll-container list-reset button-list">
      <li v-for="button in store.buttons" :key="button.id">
        <button
          class="button button-reset"
          :class="{ 'selected-item': button.code == store.selected }"
          @click="store.setSelected('button', button.code)"
        >
          <figure class="figure-reset">
            <img
              v-if="button.image"
              :src="store.getImageUrl(button.image)"
              alt="button image"
            />
            <div v-else class="image-holder"></div>
          </figure>
          <div class="button-detail">
            <div class="code">{{ button.code }}</div>
            <div class="name">{{ button.name }}</div>
          </div>
        </button>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.button {
  width: 100%;
  height: 100%;
  background-color: var(--white);
  border-radius: var(--border-radius);
  overflow: hidden;
}

figure {
  width: 100%;
  position: relative;
  z-index: 0;
}

.button img,
.image-holder {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  display: block;
}

.image-holder {
  background-color: var(--custom-blue);
}

.button-detail {
  width: 100%;
  padding: 12px;

  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.code,
.name {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--black);
}

@media (max-width: 1119px) {
  .buttons {
    width: 100%;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
  }

  .button-list {
    display: flex;
    padding: 30px 20px;
    white-space: nowrap;
    display: flex;
    gap: 10px;

    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
  }

  .button-list::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }

  .button-list::before,
  .button-list::after {
    content: '';
    display: block;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    align-self: center;

    position: sticky;
    z-index: 5;
    pointer-events: none;

    border-top: 2px solid var(--black);
    border-right: 2px solid var(--black);

    box-shadow: 2px -2px 0 0 var(--gray);
  }
  .button-list::before {
    left: -10px;
    rotate: -135deg;
  }
  .button-list::after {
    right: -10px;
    rotate: 45deg;
  }

  .button-list li {
    min-width: 180px;
    max-width: 220px;
  }
}

@media (min-width: 1200px) {
  .buttons {
    width: 100%;
    height: 100%;

    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
  }

  .button-list {
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    grid-template-rows: auto;
    grid-gap: 10px;
    justify-content: flex-start;
    align-content: flex-start;
    overflow-y: scroll;
  }
}
</style>