<script setup lang="ts">
import { useObjectStore } from '@/stores/object'

const store = useObjectStore()
</script>

<template>
  <section class="container">
    <div class="fabric">
      <div class="label">Fabric</div>
      <img :src="store.fabricSrc" alt="Fabric" />
      <div class="lining" v-if="store.liningSrc">
        <div class="label">Lining</div>
        <img :src="store.liningSrc" alt="Fabric" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;

  display: grid;
  place-items: center;
}

.fabric {
  width: 65%;
  aspect-ratio: 2 / 3;
  position: relative;
  border-radius: var(--border-radius);
  overflow: hidden;
}

@media (min-width: 992px) and (max-width: 1200px) {
  .fabric {
    width: 25%;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .fabric {
    width: 45%;
  }
}

.lining {
  position: absolute;
  z-index: 1;
  left: 0;
  bottom: 0;
  width: 50%;
  aspect-ratio: 2 / 3;
  border: 1px solid var(--dark);
  outline: 4px solid var(--white);
}

.label {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: var(--black);
  color: var(--white);
  width: 100px;
  padding: 5px;
  text-align: center;

  border-bottom-right-radius: var(--border-radius);
}

.fabric img,
.lining img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
