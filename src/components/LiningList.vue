<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'
import { useLiningsStore } from '@/stores/linings'
import { useSelectedStore } from '@/stores/selected'

const listRef = useTemplateRef<HTMLLIElement>('linings')
const store = useLiningsStore()
const { selected, setSelected } = useSelectedStore()

onMounted(() => {
  if (listRef.value) {
    const item = listRef.value.querySelector('.selected-item')
    if (item)
      item.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      })
  }
})
</script>


<template>
  <section class="linings">
    <ul ref="linings" class="scroll-container list-reset lining-list">
      <li v-for="item in store.linings" :key="item.id">
        <button
          class="lining button-reset"
          :class="{ 'selected-item': item.code == selected.lining }"
          @click="setSelected('lining', item.code)"
        >
          <figure class="figure-reset">
            <img
              v-if="item.image"
              :src="store.getImageUrl(item.image)"
              alt="lining image"
            />
            <div v-else class="image-holder"></div>
          </figure>
          <div class="lining-detail">
            <div class="code">{{ item.code }}</div>
            <div class="name">{{ item.name }}</div>
          </div>
        </button>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.lining {
  width: 100%;
  height: 100%;
  background-color: var(--white);
  border-radius: var(--border-radius);
  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

figure {
  width: 100%;
  position: relative;
  z-index: 0;
}

.lining img,
.image-holder {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  display: block;
}

.image-holder {
  background-color: var(--custom-blue);
}

.lining-detail {
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
  white-space: normal;
  color: var(--black);
}

@media (max-width: 1119px) {
  .linings {
    width: 100%;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
  }

  .lining-list {
    display: flex;
    padding: 30px 20px;
    white-space: nowrap;
    display: flex;
    gap: 10px;

    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
  }

  .lining-list::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }

  .lining-list::before,
  .lining-list::after {
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
  .lining-list::before {
    left: -10px;
    rotate: -135deg;
  }
  .lining-list::after {
    right: -10px;
    rotate: 45deg;
  }

  .lining-list li {
    min-width: 180px;
    max-width: 220px;
  }
}

@media (min-width: 1200px) {
  .linings {
    width: 100%;
    height: 100%;

    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
  }

  .lining-list {
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