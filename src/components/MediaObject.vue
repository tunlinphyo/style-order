<script setup lang="ts">
import { ref, useTemplateRef, watch } from 'vue'
import { useObjectStore } from '@/stores/object'

const object = useObjectStore()
const modelRef = useTemplateRef<HTMLObjectElement>('model')
const fabricRef = useTemplateRef<HTMLImageElement>('fabric')
const buttonRef = useTemplateRef<HTMLImageElement>('button')
const flowerRef = useTemplateRef<HTMLImageElement>('flower')
const loading = ref(true)

watch(
  () => object.modelSrc,
  () => {
    loading.value = true

    if (buttonRef.value) {
      buttonRef.value.dataset.error = '0'
      buttonRef.value.style.opacity = '1'
    }
    if (flowerRef.value) {
      flowerRef.value.dataset.error = '0'
      flowerRef.value.style.opacity = '1'
    }
  }
)

watch(
  () => object.buttonSrc,
  () => {
    if (buttonRef.value) {
      buttonRef.value.dataset.error = '0'
      buttonRef.value.style.opacity = '1'
    }
  }
)

watch(
  () => object.flowerSrc,
  () => {
    if (flowerRef.value) {
      flowerRef.value.dataset.error = '0'
      flowerRef.value.style.opacity = '1'
    }
  }
)

function onObjectLoaded() {
  const fabricImg = fabricRef.value
  const model = modelRef.value

  if (fabricImg && model) {
    const target = model.contentDocument as Document

    if (!target) return

    const [src, width, height] = [
      fabricImg.src,
      fabricImg.width,
      fabricImg.height,
    ]

    const patterns = target.querySelectorAll('pattern')
    patterns.forEach(elem => {
      if (elem.id != 'button') {
        const imageEl = elem.querySelector('image') as SVGImageElement
        if (imageEl) {
          imageEl.setAttribute('xlink:href', src)
          imageEl.setAttribute('width', `${width}`)
          imageEl.setAttribute('height', `${height}`)
        }

        elem.setAttribute('width', `${width}`)
        elem.setAttribute('height', `${height}`)
      }
    })
  }
  loading.value = false
}

function onLoaded(event: Event) {
  const elem = event.target as HTMLImageElement
  elem.style.opacity = '1'
  elem.dataset.error = '0'
}

function flowerError(event: Event) {
  const elem = event.target as HTMLImageElement
  const errorCount = Number(elem.dataset.error)
  if (errorCount > 1) {
    elem.style.opacity = '0'
    return
  }
  elem.dataset.error = String(errorCount + 1)
  elem.src = object.flowerDefaultSrc
}

function buttonError(event: Event) {
  const elem = event.target as HTMLImageElement
  const errorCount = Number(elem.dataset.error)
  if (errorCount >= 1) {
    elem.style.opacity = '0'
    return
  }
  elem.dataset.error = String(errorCount + 1)
  elem.src = object.flowerDefaultSrc
}
</script>

<template>
  <section class="container" :class="{ hide: loading }">
    <img
      ref="button"
      :src="object.buttonSrc"
      @error="buttonError"
      @loaded="onLoaded"
      data-error="0"
      alt="Button"
    />
    <img
      ref="flower"
      :src="object.flowerSrc"
      @error="flowerError"
      @loaded="onLoaded"
      data-error="0"
      alt="Flower"
    />
    <img
      ref="fabric"
      @load="onObjectLoaded"
      :src="object.fabricSrc"
      alt="Fabric Preload"
      class="preload"
    />
    <img class="torso" :src="object.torsoSrc" />
    <object
      ref="model"
      class="suitmodel model2"
      type="image/svg+xml"
      :data="object.modelSrc"
      @load="onObjectLoaded"
      style="-ms-interpolation-mode: bicubic; image-rendering: pixelated"
    ></object>
    <img class="shadow" :src="object.shadowSrc" />
  </section>
</template>

<style scoped>
.preload {
  position: absolute;
  z-index: -999;
  left: 10000px;
  top: 10000px;
}

.container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  transition: all 0.2s ease;
}

.container.hide {
  scale: 0.5;
  opacity: 0;
  transition: all 0s ease;
}

img:not(.preload),
object {
  --resize: 80px;
  position: absolute;
  inset: calc(var(--resize) * -1);

  width: calc(100% + (var(--resize) * 2));
  height: calc(100% + (var(--resize) * 2));
  object-fit: contain;

  translate: 0 calc(var(--resize) * -1);
}

object {
  -ms-interpolation-mode: bicubic;
  image-rendering: pixelated;
}

@media (min-width: 1200px) {
  img:not(.preload),
  object {
    translate: 0 calc(var(--resize) * -1);
  }
}
</style>