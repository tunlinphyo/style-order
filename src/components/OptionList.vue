<script setup lang="ts">
import { useOptionsStore } from '@/stores/options'
import { useSelectedStore } from '@/stores/selected'
import { nextTick, onMounted, ref, useTemplateRef, watch } from 'vue'

const store = useOptionsStore()
const selected = useSelectedStore()
const listRef = useTemplateRef<HTMLLIElement>('options')

const name = ref('')
const mackinWidth = ref<number | null>(null)

onMounted(() => {
  scrollToTop()
  // store.getCustomOptions()
  if (selected.selected.options[44]) {
    name.value = String(selected.selected.options[44])
  }
  if (selected.selected.options[63]) {
    mackinWidth.value = Number(selected.selected.options[63])
  }

  Object.entries(selected.selected).forEach(([key, value]) => {
    if (value == undefined) {
      delete selected.selected.options[Number(key)]
    }
  })
})

watch(
  () => store.errors,
  async () => {
    console.log('ERROR_CAHNGE')
    await nextTick()
    if (listRef.value) {
      const textInput = listRef.value.querySelector('#textInput')
      console.log(document.activeElement, textInput)
      if (document.activeElement == textInput) return
      const error = listRef.value.querySelector('.error-item')
      console.log('ERROR_ELEM', listRef.value, error)
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

watch(mackinWidth, nextVal => {
  if (nextVal) {
    selected.selected.options[63] = nextVal
  } else {
    delete selected.selected.options[63]
  }
})

watch(
  () => selected.selected.options[25],
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
                :class="{ error: store.isError(46) }"
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
                :class="{ 'error-item': store.isError(44) }"
                v-if="option.id == 31 && selected.selected.options[option.id]"
              >
                <h6>文字を入力してください</h6>
                <input id="textInput" type="text" v-model="name" />
              </div>
              <div
                class="select-container"
                v-if="
                  option.id == 25 && selected.selected.options[option.id] == 2
                "
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
  padding-inline: 20px;
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