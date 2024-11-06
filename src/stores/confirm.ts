import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useSelectedStore } from './selected'
import { useFabricsStore } from './fabrics'
import { useCourseStore } from './courses'
import { useDesignStore } from './designs'
import { useButtonsStore } from './buttons'
import { useLiningsStore } from './linings'
import { useOptionsStore } from './options'

export const useConfirmStore = defineStore('confirm', () => {
    const selectedStore = useSelectedStore()
    const fabricStore = useFabricsStore()
    const courseStore = useCourseStore()
    const designStore = useDesignStore()
    const buttonStore = useButtonsStore()
    const liningStore = useLiningsStore()
    const optionStore = useOptionsStore()

    const gender = computed(() => selectedStore.selected.gender)
    const fabric = computed(() => fabricStore.fabrics.find(item => item.id == selectedStore.selected.fabric))
    const course = computed(() => courseStore.getCourse(selectedStore.selected.course))
    const designs = computed(() => selectedStore.selected.designs)
    const button = computed(() => buttonStore.buttons.find(item => item.code == selectedStore.selected.button))
    const lining = computed(() => liningStore.getLining(selectedStore.selected.lining))
    const options = computed(() => selectedStore.selected.options)

    function getItem(id: number) {
        return designStore.getItem(id)?.name
    }

    function getDesign(id: number | string) {
        return designStore.getDesign(Number(id))?.name
    }

    function getOption(id: number) {
        const option = optionStore.getOption(Number(id))
        if (!option) return '--'
        return option.name
    }

    function getOptionItem(id: number, code: string | number) {
        const key = Number(id)
        if (typeof code == 'string') return code
        const item = optionStore.getOptionItem(code)
        if (!item) return '-----'
        return [46].includes(key) ? item.code : item.name
    }

    return { gender, fabric, course, designs, button, lining, options, getItem, getDesign, getOption, getOptionItem }
})