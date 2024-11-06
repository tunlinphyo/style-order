<script setup lang="ts">
import { useCourseStore } from '@/stores/courses'
import { useDesignStore } from '@/stores/designs'
import { useOptionsStore } from '@/stores/options'
import { useSelectedStore } from '@/stores/selected'
import { onMounted, ref, watch } from 'vue'

const store = useOptionsStore()
const design = useDesignStore()
const selected = useSelectedStore()
const course = useCourseStore()

const name = ref('')

onMounted(() => {
  scrollToTop()
  // store.getCustomOptions()
  if (selected.selected.options[44]) {
    name.value = String(selected.selected.options[44])
  }

  Object.entries(selected.selected).forEach(([key, value]) => {
    if (value == undefined) {
      delete selected.selected.options[Number(key)]
    }
  })
})

watch(name, nextVal => {
  if (nextVal) {
    selected.setOption(44, nextVal)
  } else {
    delete selected.selected.options[44]
  }
})

watch(
  () => selected.selected.options[31],
  (nextVal, prevVal) => {
    if (!(nextVal && prevVal)) {
      name.value = ''
    }
  }
)

watch(
  () => selected.selected.options[45],
  nextVal => {
    if (!nextVal) {
      delete selected.selected.options[46]
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
  <div class="options">
    <ul class="scroll-container list-reset">
      <li
        v-for="item in design.getItems(
          course.getCourse(selected.selected.course)
        )"
        :key="item.id"
        :class="`type-${item.id}`"
      >
        <h3 class="sticky-title">{{ item.name }}</h3>
        <ul class="list-reset option-list">
          <li
            class="option-grid"
            v-for="option in store.getOptions(item.type)"
            :key="option.id"
          >
            <div class="grid-start">
              <h4>
                {{ option.name }}
              </h4>
              <figure v-if="option.image" class="figure-reset option-image">
                <img
                  :src="store.getImageUrl(option.image)"
                  alt="Option Image"
                />
              </figure>
              <p>
                {{ option.id }} | {{ option.apiField }} ||
                {{ option.optionType }} | {{ option.type }}
              </p>
              <p class="option-detail" v-if="option.detail">
                {{ option.detail }}
              </p>
            </div>
            <div class="grid-end">
              <ul class="list-reset option-item-list">
                <li
                  v-for="item in store.getOptionItems(option.id)"
                  :key="item.id"
                >
                  <button
                    class="button-reset option-item"
                    :class="{
                      'selected-item':
                        selected.selected.options[option.id] == item.code,
                    }"
                    @click="selected.setOption(option.id, item.code)"
                  >
                    <figure v-if="item.image" class="figure-reset">
                      <img
                        :src="store.getImageUrl(item.image)"
                        alt="option item image"
                      />
                    </figure>
                    <div class="option-item-detail">
                      {{ item.name }}
                    </div>
                  </button>
                </li>
              </ul>
              <ul
                class="list-reset option-item-list padding-top"
                v-if="option.id == 45 && selected.selected.options[option.id]"
              >
                <li v-for="item in store.amfStitches" :key="item.id">
                  <button
                    class="button-reset option-item"
                    :class="{
                      'selected-item':
                        selected.selected.options[46] == item.code,
                    }"
                    @click="selected.setOption(46, item.code)"
                  >
                    <figure v-if="item.image" class="figure-reset">
                      <img
                        :src="store.getImageUrl(item.image)"
                        alt="option item image"
                      />
                    </figure>
                    <div class="option-item-detail">
                      {{ item.name }}
                    </div>
                  </button>
                </li>
              </ul>
              <div
                class="input-container"
                v-if="option.id == 31 && selected.selected.options[option.id]"
              >
                <h6>文字を入力してください</h6>
                <input type="text" v-model="name" />
              </div>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.options {
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

.option-list {
  padding-inline: 20px;
}

.option-grid {
  padding: 20px 0;
  display: grid;
  gap: 20px;
}
.option-grid:not(:last-child) {
  border-bottom: 1px solid var(--dark-gray);
}

.grid-start h4 {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--black);
}

.grid-end {
  padding-block-end: 5px;
}

.option-item {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.option-image {
  margin-top: 10px;
}
.option-image img {
  width: 100%;
}
.option-item img {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  display: block;
}

.option-detail {
  padding-block-start: 5px;
}

.option-item-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 10px;
}
.option-item-list.padding-top {
  padding-top: 10px;
}

.option-item-detail {
  flex: 1;
  width: 100%;
  min-height: 60px;
  background-color: var(--white);
  color: var(--black);

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.input-container {
  display: block;
  padding-block: 10px;
}

.input-container h6 {
  font-size: 1rem;
}

.input-container input {
  width: 100%;
  max-width: 500px;
  height: 40px;
  padding: 0 10px;
  outline-color: var(--primary);
}

@media (min-width: 1200px) {
  .options {
    height: 100%;

    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
  }

  .sticky-title {
    top: -20px;
    padding-inline: 40px;
  }

  .option-list {
    padding-inline: 40px;
  }

  .option-grid {
    display: grid;
    grid-template-columns: minmax(200px, 0.25fr) 1fr;
    gap: 40px;
  }

  .grid-start h4 {
    text-align: right;
  }

  .option-item-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
  }
}
</style>