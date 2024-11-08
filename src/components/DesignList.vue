<script setup lang="ts">
import { nextTick, onMounted, useTemplateRef, watch } from 'vue'
import { useDesignStore } from '@/stores/designs'

const store = useDesignStore()
const listRef = useTemplateRef<HTMLLIElement>('designs')

onMounted(() => {
  store.designLog()
  if (listRef.value) {
    const typeEl = listRef.value.querySelector(`.type-${store.currentType}`)
    if (!typeEl) {
      return scrollToTop()
    }
    const item = typeEl.querySelector('.selected-item')
    if (item) {
      item.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      })
    } else {
      return scrollToTop()
    }
  }
})

watch(
  () => store.errors,
  async nextVal => {
    if (nextVal.length && listRef.value) {
      const typeEl = listRef.value.querySelector(`.type-${nextVal[0]}`)
      const item = typeEl?.querySelector('.design')
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

function onSelect(item: number, design: number) {
  store.setDesignData(item, design)
  scrollToTop()
}
</script>

<template>
  <section class="designs">
    <ul ref="designs" class="scroll-container list-reset">
      <li
        v-for="item in store.getItems()"
        :key="item.id"
        :class="`type-${item.id}`"
      >
        <h3 class="sticky-title">{{ item.name }}</h3>
        <div class="group" v-for="type in item.styles" :key="type">
          <h4 class="group-title" v-if="item.styles.length > 1">
            {{ store.getTypeName(type) }}
          </h4>
          <ul class="list-reset design-list">
            <li
              v-for="design in store.getDesigns(item, type)"
              :key="design.id"
              :data-id="design.id"
            >
              <button
                class="design button-reset"
                :class="{
                  'selected-item': store.selected[item.id] == design.id,
                }"
                @click="onSelect(item.id, design.id)"
              >
                <figure class="figure-reset">
                  <img :src="`/designs/${design.image}`" alt="design image" />
                </figure>
                <div class="design-detail">
                  <div class="name">{{ design.name.toLowerCase() }}</div>
                </div>
              </button>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.designs {
  width: 100%;
}

.scroll-container {
  padding-block: 20px;
}

.sticky-title {
  padding: 10px 20px;
  background-color: var(--gray);
  position: sticky;
  z-index: 4;
  top: 54px;
  text-align: center;
  font-size: clamp(1.2rem, 4vw, 1.6rem);
  font-weight: 800;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5vw;
}

.sticky-title::before,
.sticky-title::after {
  content: '';
  display: block;
  flex: 1;
  height: 8px;
  border-top: 2px solid var(--dark);
  border-bottom: 2px solid var(--dark);
}

.group-title {
  padding-inline: 20px;
  font-size: 1.2rem;
  font-weight: 800;
  margin-bottom: -15px;
}

.design-list {
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 10px;
  justify-content: flex-start;
  align-content: flex-start;
  overflow-y: scroll;
}

.design-list li {
  display: grid;
}

.design {
  width: 100%;
  height: 140px;
  background-color: var(--white);

  position: relative;
  overflow: hidden;
  border-radius: var(--border-radius);

  /* outline: 2px solid var(--dark-gray); */
}

.selected-item {
  outline-color: var(--primary);
}

.figure-reset {
  position: absolute;
  z-index: 0;
  left: 0;
  top: 0;
  height: 100%;
  translate: -30px 0;
}

.figure-reset img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.design-detail {
  width: 50%;
  max-width: 180px;
  position: absolute;
  right: 15px;
  top: 50%;
  translate: 0 -50%;

  display: flex;
  justify-content: center;
  align-items: center;
}

.name {
  text-align: center;
  font-size: clamp(1.1rem, 3vw, 1.4rem);
  font-weight: 800;
  padding: 10px 0;
  color: var(--black);
  text-transform: capitalize;
  text-shadow: 0 0 2px var(--white), 0 0 2px var(--white), 0 0 2px var(--white),
    0 0 2px var(--white), 0 0 2px var(--white), 0 0 2px var(--white),
    0 0 2px var(--white), 0 0 2px var(--white), 0 0 2px var(--white),
    0 0 2px var(--white);
}

@media (min-width: 1200px) {
  .designs {
    height: 100%;

    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
  }

  .sticky-title {
    top: -20px;
  }

  .design {
    height: 160px;
  }
}
</style>