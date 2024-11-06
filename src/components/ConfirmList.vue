<script setup lang="ts">
import { useConfirmStore } from '@/stores/confirm'
import { onMounted } from 'vue'

const store = useConfirmStore()

onMounted(() => {
  scrollToTop()
})

function saveSelection() {}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <section class="confirm">
    <div class="scroll-container">
      <div class="message">
        <div class="avatar" :class="{ lady: store.gender == 2 }"></div>
        <p>
          シミュレーション内容を保存する場合は、メールで送信をクリックしてください。
        </p>
      </div>

      <h3 class="sticky-title">注文内容確認</h3>

      <div class="group">
        <div class="card">
          <div class="list-group">
            <div class="card-list">
              <div class="cell label">生地</div>
              <div class="cell value">
                {{ store.fabric?.name }} / {{ store.fabric?.code }}
              </div>
            </div>
            <div class="card-list">
              <div class="cell label">コース</div>
              <div class="cell value">
                {{ store.course?.name }}
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="list-group">
            <template v-for="(value, key) in store.designs" :key="key">
              <div class="card-list">
                <div class="cell label">{{ store.getItem(key) }}</div>
                <div class="cell value">
                  {{ store.getDesign(value) }}
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>

      <h3 class="sticky-title">オプション内容確認</h3>

      <div class="group">
        <div class="card">
          <div class="list-group">
            <div class="card-list" v-if="store.button">
              <div class="cell label">ボタン</div>
              <div class="cell value">
                {{ store.button.name }}
              </div>
            </div>
            <div class="card-list" v-if="store.lining">
              <div class="cell label">裏地</div>
              <div class="cell value">
                {{ store.lining.name }}
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="list-group">
            <template v-for="(value, key) in store.options" :key="key">
              <div class="card-list">
                <div class="cell label">
                  {{ store.getOption(key) }}
                </div>
                <div class="cell value">
                  {{ store.getOptionItem(key, value) }}
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <footer>
      <div class="footer-start"></div>
      <div class="footer-end">
        <button class="button-reset btn-save" @click="saveSelection">
          選択を保存
        </button>
      </div>
    </footer>
  </section>
</template>

<style scoped>
.confirm {
  width: 100%;
}

.item {
  padding: 40px;
}

ul li {
  padding: 20px;
}

footer {
  display: none;
}

.group {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: flex-start;
  gap: 20px;
  padding: 20px;
}

.sticky-title {
  width: 100%;
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

.message {
  display: grid;
  grid-template-columns: 60px 1fr;
  padding: 40px 20px;
  gap: 20px;
}

.avatar {
  height: 50px;
  background-image: url(/style_order_icons/persona.png);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
.avatar.lady {
  background-image: url(/style_order_icons/persona-test.png);
}

.card {
  width: 100%;
}

.card-header {
  padding: 5px 10px;
  border-block-end: 2px solid var(--gray);
  font-weight: 900;
}

.list-group {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 2px;
}
.card-list {
  display: grid;
  grid-template-columns: minmax(150px, 0.5fr) 1fr;
  gap: 2px;
}
.card-list .cell {
  padding: 8px 10px;
}
.card-list:nth-child(odd) .value {
  background-color: var(--white);
}
.card-list:nth-child(even) .value {
  background-color: var(--light-gray);
}
.card-list .label {
  font-weight: 900;

  background-color: var(--custom-blue);
  color: var(--white);
}

@media (min-width: 1200px) {
  .confirm {
    height: 100%;

    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr) 60px;
  }

  .sticky-title {
    top: 0px;
    padding-inline: 40px;
  }

  footer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
  }

  .footer-start {
    background-color: var(--bg-dark-blue);
  }

  .footer-end {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 60px;
    background-color: var(--dark-gray);
    padding-inline: 20px;
  }

  .btn-save {
    flex: 1;
    max-width: 150px;
    height: 40px;
    border-radius: 40px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
      rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    position: relative;
    background-color: var(--primary);
    color: var(--white);
  }

  .btn-save::after {
    content: '';
    position: absolute;
    width: 1em;
    height: 1em;
    top: 50%;
    translate: 0 -50%;
    right: 15px;

    background-image: url(/style_order_icons/arrow-right-circle.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
}
</style>