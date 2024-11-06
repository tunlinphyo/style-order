import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useSelectedStore } from './selected';
import { useDesignStore, type Design } from './designs';
import { useStepStore } from './steps';
import { isObjectEmpty } from './utils';
import { useCourseStore } from './courses';
import { useLiningsStore } from './linings';

export const useObjectStore = defineStore('object-store', () => {
    const selectedStore = useSelectedStore()
    const stepStore = useStepStore()
    const courseStore = useCourseStore()
    const liningStore = useLiningsStore()
    const { getDefaultDesign, getDesign, getItem } = useDesignStore()

    const torsoSrc = computed(() => `/simulator/svg_shadow/${getObjectPath(selectedStore.currentType)}/torso.png`)
    const modelSrc = computed(() => `/simulator/svg_shadow/${getObjectPath(selectedStore.currentType)}/svg.svg`)
    const shadowSrc = computed(() => `/simulator/svg_shadow/${getObjectPath(selectedStore.currentType)}/shadow.png`)
    const buttonSrc = computed(() => `/simulator/options/${getObjectPath(selectedStore.currentType)}/up/button/${selectedStore.selected.button || 19}.png`)
    const flowerSrc = computed(() => `/simulator/options/${getObjectPath(selectedStore.currentType)}/up/flower/${getLining(selectedStore.selected.lining)}.png`)
    const flowerDefaultSrc = computed(() => `/simulator/options/${getObjectPath(selectedStore.currentType)}/up/flower/05.png`)

    const fabricSrc = computed(() => {
        const id = selectedStore.selected.fabric || 7
        return `/fabrics/${id}.jpg`
    })

    const liningSrc = computed(() => {
        if (!selectedStore.selected.lining) return null
        const lining = liningStore.getLining(selectedStore.selected.lining)
        if (!lining) return null
        if (!lining.image) return '/noimage.png'
        return liningStore.getImageUrl(lining.image)
    })

    function getLining(lining: number) {
        return !lining || lining == 99 ? '05' : lining
    }

    function getObjectPath(type: number) {
        let design: Design | undefined
        if (stepStore.step.routeName === 'designs') {
            design = getDesign(Number(selectedStore.selected.designs[type]))
        }

        if (!design) {
            const course = courseStore.getCourse(selectedStore.selected.course)
            if (course) {
                const key = Number(selectedStore.selected.designs[course.designs[0]])
                design = getDesign(key)
            }

            if (!design && course) {
                const item = getItem(course.designs[0])
                if (item) {
                    design = getDesign(item.design)
                }
            }
        }

        if (!(design || isObjectEmpty(selectedStore.selected.designs))) {
            const key = selectedStore.selected.gender == 1 ? 1 : 5
            design = getDesign(Number(selectedStore.selected.designs[key]))
        }

        if (!design) {
            design = getDefaultDesign(selectedStore.selected.gender)
        }

        return design.style
    }

    // function genderPath(gender: number) {
    //     return gender == 1 ? 'men' : 'women'
    // }

    return { selected: selectedStore.selected, fabricSrc, liningSrc, torsoSrc, modelSrc, shadowSrc, buttonSrc, flowerSrc, flowerDefaultSrc }
})