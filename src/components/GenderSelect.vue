<script setup lang="ts">
import { useStepStore } from '@/stores/steps'
import { useSelectedStore } from '@/stores/selected'

const genders = [
  {
    id: 1,
    name: "MEN's",
  },
  {
    id: 2,
    name: "LADIES'",
  },
]

const { setStep } = useStepStore()
const { selected, setSelected } = useSelectedStore()

function updateGender(gender: number) {
  setSelected('gender', gender)
  setStep('fabrics')
}
</script>

<template>
  <section class="container">
    <h1>Style Order Suit</h1>
    <p class="message">
      シミュレーターから、<br />お好みのスーツをお選びください。
    </p>

    <ul class="gender-list list-reset">
      <li v-for="gender of genders" :key="gender.id">
        <button
          class="gender"
          :class="{
            active: gender.id == selected.gender,
            'gender--lady': gender.id == 2,
          }"
          @click="updateGender(gender.id)"
        >
          {{ gender.name }}
        </button>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.container {
  width: 100%;
  max-width: 800px;

  display: flex;
  flex-direction: column;
  gap: 4vh;
  align-items: center;
  padding: 20px;
}

h1 {
  width: 100%;
  margin: 0;
  padding: 20px;
  border-block-start: 3px solid black;
  border-block-end: 3px solid black;

  font-size: clamp(1.2rem, 8vw, 4rem);
  line-height: 1.2;
  font-weight: 900;
  text-align: center;
  text-transform: uppercase;
}

.message {
  text-align: center;
  font-size: clamp(1rem, 3vw, 1.5rem);
}

.gender-list {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5vw;

  --border: 3px;
  --offset: -4px;
}

.gender {
  width: 100%;
  aspect-ratio: 1 / 1.2;
  background-color: var(--white);
  color: black;
  font-size: clamp(1.2rem, 3vw, 2rem);
  font-weight: 800;
  border: var(--border) solid var(--black);

  border-radius: 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10%;
}

.gender::before {
  content: '';
  display: block;
  width: 75%;
  aspect-ratio: 1/1;
  background-image: url(/style_order_icons/men.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border-bottom: 3px solid #333;
}
.gender--lady::before {
  background-image: url(/style_order_icons/lady.png);
}

.gender.active {
  border-color: var(--primary);
  outline: 3px solid var(--primary);
  outline-offset: var(--offset);
  position: relative;
}

.gender.active::after {
  content: '';
  display: block;
  width: 28px;
  height: 28px;
  background-image: url(/style_order_icons/check-circle.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  position: absolute;
  top: 10px;
  left: 10px;
}

@media (min-width: 768px) {
  .gender-list {
    --border: 5px;
    --offset: -7px;
    gap: 4vw;
  }
  .gender {
    aspect-ratio: 1 / 1;
  }
  .gender::before {
    width: 55%;
  }
}
</style>