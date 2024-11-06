import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useSelectedStore, type SelectedName } from './selected';
import { isObjectEmpty } from './utils';
import { useCourseStore } from './courses';

export interface Step {
    step: number;
    name: string;
    routeName: string;
    dataName: string;
}

export const useStepStore = defineStore('step', () => {
    const selectedStore = useSelectedStore()
    const courseStore = useCourseStore()

    const steps: Step[] = [
        {
            step: 0,
            name: 'home',
            routeName: 'home',
            dataName: 'gender',
        },
        {
            step: 1,
            name: '生地',
            routeName: 'fabrics',
            dataName: 'fabric',
        },
        {
            step: 2,
            name: 'コース',
            routeName: 'courses',
            dataName: 'course',
        },
        {
            step: 3,
            name: 'デザイン',
            routeName: 'designs',
            dataName: 'designs',
        },
        {
            step: 4,
            name: 'ボタン',
            routeName: 'buttons',
            dataName: 'button',
        },
        {
            step: 5,
            name: '裏地',
            routeName: 'linings',
            dataName: 'lining',
        },
        {
            step: 6,
            name: 'オプション',
            routeName: 'options',
            dataName: 'options',
        },
        {
            step: 7,
            name: '確認',
            routeName: 'confirm',
            dataName: '',
        }
    ]

    const stepIndex = ref(0)
    const step = computed(() => steps[stepIndex.value])
    const stepList = computed(() => {
        const isPantOnly = (step: number) => {
            if ([5, 14, 17].includes(selectedStore.selected.course)) {
                return step != 5
            }
            return true
        }
        const isSkirtOnly = (step: number) => {
            if ([13, 16].includes(selectedStore.selected.course)) {
                return ![4, 5].includes(step)
            }
            return true
        }
        const isVestOnly = (step: number) => {
            if ([6].includes(selectedStore.selected.course)) {
                return ![6].includes(step)
            }
            return true
        }
        return steps.filter(item => (
            isPantOnly(item.step)
            && isSkirtOnly(item.step)
            && isVestOnly(item.step)
        ))
    })
    const stepName = computed(() => {
        const step = steps[stepIndex.value]
        return step.name.toLowerCase()
    })

    function setStep(routeName: string) {
        if (!routeName) return stepIndex.value = 0

        const selected = steps.find(item => item.routeName == routeName)
        if (!selected) stepIndex.value = 0
        else stepIndex.value = selected.step
    }

    function prevStep() {
        if (stepIndex.value == 7 && isVestOnly()) {
            return stepIndex.value = stepIndex.value - 2
        } else if (stepIndex.value == 6 && isPantOnly()) {
            return stepIndex.value = stepIndex.value - 2
        } else if (stepIndex.value == 6 && isSkirtOnly()) {
            return stepIndex.value = stepIndex.value - 3
        }
        stepIndex.value = stepIndex.value - 1
    }

    function nextStep() {
        if (step.value.dataName == 'designs') {
            const is = courseStore.isAllDesignSelected(selectedStore.selected.course, selectedStore.selected.designs)
            if (!is) {
                return alert('Select designs!')
            }
        } else if (step.value.dataName == 'options') {
            if (isObjectEmpty(selectedStore.selected.options)) return alert('Select options!')
        } else {
            if (!selectedStore.selected[step.value.dataName as SelectedName]) return alert(`Select a ${step.value.dataName}`)
        }

        if (stepIndex.value == 3 && isSkirtOnly()) {
            return stepIndex.value = stepIndex.value + 3
        } else if (stepIndex.value == 4 && isPantOnly()) {
            return stepIndex.value = stepIndex.value + 2
        } else if (stepIndex.value == 5 && isVestOnly()) {
            return stepIndex.value = stepIndex.value + 2
        }

        stepIndex.value = stepIndex.value + 1
    }

    function isPantOnly() {
        return [5, 14, 17].includes(selectedStore.selected.course)
    }

    function isSkirtOnly() {
        return [13, 16].includes(selectedStore.selected.course)
    }

    function isVestOnly() {
        return selectedStore.selected.course == 6
    }

    return { steps: stepList, step, stepName, stepIndex, setStep, prevStep, nextStep, isPantOnly, isSkirtOnly, isVestOnly }
})