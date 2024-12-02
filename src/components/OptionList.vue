<script setup lang="ts">
import { useOptionsStore } from '@/stores/options'
import {
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  useTemplateRef,
  watch,
} from 'vue'

const store = useOptionsStore()
const listRef = useTemplateRef<HTMLLIElement>('options')

const mounted = ref(false)
const name = ref('')
const mackinWidth = ref<number | null>(null)

onMounted(() => {
  scrollToTop()
  // store.getCustomOptions()
  if (store.selected[44]) {
    name.value = String(store.selected[44])
  }
  if (store.selected[63]) {
    mackinWidth.value = Number(store.selected[63])
  }

  Object.entries(store.selected).forEach(([key, value]) => {
    if (value == undefined) {
      store.deleteOption(key)
    }
  })

  mounted.value = true
})

onBeforeUnmount(() => {
  mounted.value = false
})

watch(
  () => store.errors,
  async () => {
    await nextTick()
    if (listRef.value && mounted.value) {
      const textInput = listRef.value.querySelector('#textInput')
      if (document.activeElement == textInput) return
      const error = listRef.value.querySelector('.error-item')
      if (error) {
        error.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest',
        })
      }
    }
  }
)

watch(name, nextVal => {
  if (nextVal) {
    store.setOption(44, nextVal)
  } else {
    store.deleteOption(44)
  }
})

watch(
  () => store.selected[31],
  (nextVal, prevVal) => {
    if (!(nextVal && prevVal)) {
      name.value = ''
    }
  }
)

watch(
  () => store.selected[45],
  nextVal => {
    if (!nextVal) {
      store.deleteOption(46)
    }
  }
)

watch(mackinWidth, nextVal => {
  if (nextVal) {
    store.selected[63] = nextVal
  } else {
    store.deleteOption(63)
  }
})

watch(
  () => store.selected[25],
  nextVal => {
    if (nextVal == 2) {
      mackinWidth.value = 2.5
    } else {
      mackinWidth.value = null
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
  <div class="options" ref="options">
    <ul class="scroll-container list-reset">
      <li
        v-for="data in store.getOptionList()"
        :key="data.item.id"
        :class="`type-${data.item.id}`"
      >
        <h3 class="sticky-title">{{ data.item.name }}</h3>
        <ul class="list-reset option-list">
          <li
            class="option-grid"
            v-for="option in data.options"
            :key="option.id"
          >
            <div
              class="grid-start"
              :class="{
                'error-item':
                  store.isError(option.id) ||
                  (option.id == 45 && store.isError(46)),
              }"
              :data-id="option.id"
            >
              <h4>{{ option.name }}</h4>
              <figure v-if="option.image" class="figure-reset option-image">
                <img
                  :src="store.getImageUrl(option.image)"
                  alt="Option Image"
                />
              </figure>
              <!-- <p>
                {{ option.id }}
              </p> -->
              <p class="option-detail" v-if="option.detail">
                {{ option.detail }}
              </p>
            </div>
            <div class="grid-end" :class="{ error: store.isError(option.id) }">
              <ul class="list-reset option-item-list">
                <li
                  v-for="item in store.getOptionItems(option.id)"
                  :key="item.id"
                >
                  <button
                    class="button-reset option-item"
                    :class="{
                      'selected-item': store.selected[option.id] == item.code,
                    }"
                    @click="store.setOption(option.id, item.code)"
                    :data-code="item.code"
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
                :class="{ error: store.isError(46) }"
                v-if="option.id == 45 && store.selected[option.id]"
              >
                <li v-for="item in store.amfStitches" :key="item.id">
                  <button
                    class="button-reset option-item"
                    :class="{
                      'selected-item': store.selected[46] == item.code,
                    }"
                    @click="store.setOption(46, item.code)"
                    :data-code="item.code"
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
                :class="{ 'error-item': store.isError(44) }"
                v-if="option.id == 31 && store.selected[option.id]"
              >
                <h6>文字を入力してください</h6>
                <input id="textInput" type="text" v-model="name" />
              </div>
              <div
                class="select-container"
                v-if="option.id == 25 && store.selected[option.id] == 2"
              >
                <select v-model="mackinWidth">
                  <option
                    v-for="item in store.getOptionItems(63)"
                    :key="item.id"
                    :value="item.code"
                  >
                    {{ item.name }}
                  </option>
                </select>
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
  padding-inline: 10px;
}

.option-grid {
  padding: 20px 0;
  display: grid;
  gap: 20px;
  align-items: flex-start;
}
.option-grid:not(:last-child) {
  border-bottom: 1px solid var(--dark-gray);
}

.grid-end.error,
.grid-end .error {
  background-color: #faa;
  border-radius: calc(var(--border-radius) * 2);
}

.grid-start {
  padding-inline: 10px;
}

.grid-start h4 {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--black);
}

.grid-end {
  margin-block-end: 5px;
}

.option-item {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-radius: var(--border-radius);
  overflow: hidden;
}

.option-image {
  margin-top: 10px;
}
.option-image img {
  width: 100%;
  max-width: 400px;
  border-radius: calc(var(--border-radius) * 0.5);
}
.option-item img {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  display: block;
}

.option-detail {
  max-width: 600px;
  padding-block-start: 5px;
}

.option-item-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 10px;
  padding: 10px;
  border-radius: var(--border-radius);
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
  padding: 10px;
}

.input-container.error-item input {
  background-color: #fcc;
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
  font-size: 16px;
}

.select-container {
  padding-block-start: 15px;
  padding-inline: 10px;
}

.select-container select {
  width: 100%;
  max-width: 500px;
  height: 40px;
  padding: 0 10px;
  outline-color: var(--primary);
  font-size: 16px;
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
    padding-inline: 30px;
  }

  .option-grid {
    display: grid;
    grid-template-columns: minmax(200px, 0.3fr) 1fr;
    gap: 20px;
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