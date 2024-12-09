<script setup lang="ts">
import { nextTick, onMounted, useTemplateRef, watch } from 'vue'
import { useCourseStore } from '@/stores/courses'

const listRef = useTemplateRef<HTMLLIElement>('courses')
const store = useCourseStore()

onMounted(() => {
  if (listRef.value) {
    const item = listRef.value.querySelector('.selected-item')
    if (item) {
      item.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      })
    } else {
      scrollToTop()
    }
  }
})

watch(
  () => store.error,
  async nextVal => {
    if (nextVal && listRef.value) {
      const item = listRef.value.querySelector('.course')
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
</script>

<template>
  <section class="courses">
    <ul ref="courses" class="scroll-container list-reset course-list">
      <li v-for="course in store.getCourses()" :key="course.id">
        <button
          class="course button-reset"
          :class="{ 'selected-item': course.id == store.selected }"
          @click="store.setSelected('course', course.id)"
        >
          <figure class="figure-reset">
            <img :src="course.image" alt="course image" />
          </figure>
          <div class="course-detail">
            <div class="name">{{ course.name.toLowerCase() }}</div>
          </div>
        </button>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.courses {
  width: 100%;
}

.course-list {
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 10px;
  justify-content: flex-start;
  align-content: flex-start;
}

.course-list li {
  display: grid;
}

.course {
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
  translate: -25px 0;
}

.figure-reset img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.course-detail {
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
  .courses {
    height: 100%;

    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
  }

  .course-list {
    padding: 20px;
    padding-top: 60px;
    overflow-y: scroll;
  }
  .course {
    height: 160px;
  }
}
</style>