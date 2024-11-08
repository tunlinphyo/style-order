import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { type LocationQuery } from 'vue-router';
import { isObjectEmpty, parseDesignsQuery, parseOptionsQuery } from './utils';
import { useCourseStore } from './courses'
import { useStepStore } from './steps';

export interface ObjectData {
  [key: number]: string | number;
}

interface Selected {
  gender: number;
  fabric: number;
  course: number;
  designs: ObjectData;
  button: number;
  lining: number;
  options: ObjectData;
}

interface Query {
  [key: string]: string | number;
}

export type SelectedName = 'gender' | 'fabric' | 'course' | 'button' | 'lining'

const defaultData: Selected = {
  gender: 0,
  fabric: 0,
  course: 0,
  designs: {},
  button: 0,
  lining: 0,
  options: {}
}

export const useSelectedStore = defineStore('selected', () => {
  const selected = ref<Selected>(defaultData)
  const courseStore = useCourseStore()
  const stepStore = useStepStore()
  const currentType = ref(1);

  watch(() => selected.value.course, (nextVal, prevVal) => {
    if (!prevVal || nextVal == prevVal) return
    const course = courseStore.getCourse(nextVal)
    const newDesign: ObjectData = {}
    course?.designs.forEach(item => {
      if (selected.value.designs[item]) {
        newDesign[item] = selected.value.designs[item]
      }
    })
    selected.value.options = {}
    selected.value.designs = newDesign
    if (stepStore.isPantOnly()) {
      selected.value.lining = 0
    } else if (stepStore.isSkirtOnly()) {
      selected.value.button = 0
      selected.value.lining = 0
    }
  })

  // watch(() => stepStore.step, () => {
  //   const course = courseStore.getCourse(selected.value.course)
  //   if (course) currentType.value = course.designs[0]
  // })

  function setCurrentType(id: number) {
    currentType.value = id
  }

  function setSelected(name: SelectedName, value: number) {
    if (name == 'gender' && value != selected.value[name]) {
      // selected.value.fabric = 0
      selected.value.course = 0
      selected.value.designs = {}
      selected.value.button = 0
      selected.value.lining = 0
      selected.value.options = {}
    }
    selected.value[name] = value
  }

  function setDesign(key: number, value: number) {
    selected.value.designs[key] = value
  }
  function setOption(key: number, value: string | number) {
    selected.value.options[key] = value
  }

  function getSelected() {
    return selected.value
  }

  function getQuery() {
    const query: Query = {}
    if (selected.value.gender) {
      query.gender = String(selected.value.gender)
    }
    if (selected.value.fabric) {
      query.fabric = String(selected.value.fabric)
    }
    if (selected.value.course) {
      query.course = String(selected.value.course)
    }
    if (selected.value.button) {
      query.button = String(selected.value.button)
    }
    if (selected.value.lining) {
      query.lining = String(selected.value.lining)
    }
    if (!isObjectEmpty(selected.value.designs)) {
      for (const key in selected.value.designs) {
        query[`designs[${key}]`] = String(selected.value.designs[key])
      }
    }
    if (!isObjectEmpty(selected.value.options)) {
      for (const key in selected.value.options) {
        if (key == '44' && selected.value.options[key]) {
          query[`options[${key}]`] = String(selected.value.options[key])
        } else {
          query[`options[${key}]`] = String(selected.value.options[key])
        }
      }
    }

    return query
  }

  function setAllSelected(query: LocationQuery) {
    if (query.gender) setSelected('gender', parseInt(query.gender as string))
    if (query.fabric) setSelected('fabric', parseInt(query.fabric as string))
    if (query.course) setSelected('course', parseInt(query.course as string))
    if (query.button) setSelected('button', parseInt(query.button as string))
    if (query.lining) setSelected('lining', parseInt(query.lining as string))

    const designs = parseDesignsQuery(query)
    if (!isObjectEmpty(designs)) {
      selected.value.designs = designs
    }
    const options = parseOptionsQuery(query, [44])
    if (!isObjectEmpty(options)) {
      selected.value.options = options
    }
  }

  return { selected, currentType, setCurrentType, setSelected, getSelected, getQuery, setAllSelected, setDesign, setOption }
})