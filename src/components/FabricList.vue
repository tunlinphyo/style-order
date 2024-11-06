<script setup lang="ts">
import { useFabricsStore } from '@/stores/fabrics'
import { useSelectedStore } from '@/stores/selected'
import { nextTick, onMounted, useTemplateRef } from 'vue'

const listRef = useTemplateRef<HTMLLIElement>('fabric')
const { fabrics } = useFabricsStore()
const { selected, setSelected } = useSelectedStore()

onMounted(async () => {
  if (listRef.value) {
    const item = listRef.value.querySelector('.selected-item')
    if (item) {
      await nextTick()
      item.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      })
    }
  }
})
</script>

<template>
  <section class="fabrics">
    <section class="fabric-actions"></section>
    <ul ref="fabric" class="scroll-container list-reset fabric-list">
      <li v-for="fabric in fabrics" :key="fabric.id">
        <button
          class="fabric button-reset"
          :class="{ 'selected-item': fabric.id == selected.fabric }"
          @click="setSelected('fabric', fabric.id)"
        >
          <figure class="figure-reset">
            <img :src="`/fabrics/${fabric.id}.jpg`" alt="fabric image" />
            <figcaption>{{ fabric.name }}</figcaption>
          </figure>
          <div class="fabric-detail">
            <div class="code">{{ fabric.code }}</div>
            <div class="price">{{ fabric.price }}</div>
          </div>
        </button>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.fabric {
  width: 100%;
  height: 100%;
  background-color: var(--white);
}

figure {
  position: relative;
  z-index: 0;
}

figcaption {
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;

  background-color: var(--black);
  color: var(--white);
  text-align: center;
  padding: 5px;
}

.fabric img {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  display: block;
}

.fabric-detail {
  padding: 12px;
}

.code,
.price {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--black);
}

@media (max-width: 1119px) {
  .fabrics {
    width: 100%;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: 0px minmax(0, 1fr);
  }

  .fabric-list {
    display: flex;
    padding: 30px 20px;
    white-space: nowrap;
    display: flex;
    gap: 10px;

    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
  }

  .fabric-list::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }

  .fabric-list::before,
  .fabric-list::after {
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
  .fabric-list::before {
    left: -10px;
    rotate: -135deg;
  }
  .fabric-list::after {
    right: -10px;
    rotate: 45deg;
  }

  .fabric-list li {
    min-width: 180px;
    max-width: 220px;
  }
}
@media (min-width: 1200px) {
  .fabrics {
    width: 100%;
    height: 100%;

    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: 60px minmax(0, 1fr);
  }

  .fabric-actions {
    position: relative;

    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-inline: 20px;
  }

  .fabric-actions::after {
    content: '';
    display: block;
    width: 20px;
    height: 100%;
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translate(0, -50%);
    background-image: url(/style_order_icons/scroll.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .fabric-list {
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    grid-template-rows: auto;
    gap: 10px;
    justify-content: flex-start;
    align-content: flex-start;
    overflow-y: scroll;
  }
}
</style>