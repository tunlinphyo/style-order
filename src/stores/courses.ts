import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useSelectedStore, type ObjectData, type SelectedName } from './selected';

export interface Course {
    id: number;
    name: string;
    image: string;
    designs: number[];
    gender: number;
}

export const useCourseStore = defineStore('courses', () => {
    const selectedStore = useSelectedStore()

    const courses: Course[] = [
        {
            id: 1,
            name: 'スーツ',
            image: '/simulator/parts/parts_suit.png',
            designs: [1, 3],
            gender: 1
        },
        {
            id: 2,
            name: '2パンツスーツ',
            image: '/simulator/parts/parts_2pants_suit.png',
            designs: [1, 3, 4],
            gender: 1
        },
        {
            id: 3,
            name: '３ピーススーツ',
            image: '/simulator/parts/parts_3pants_suit.png',
            designs: [1, 2, 3],
            gender: 1
        },
        {
            id: 4,
            name: 'ジャケット',
            image: '/simulator/parts/parts_jacket.png',
            designs: [1],
            gender: 1
        },
        {
            id: 5,
            name: 'スラックス',
            image: '/simulator/parts/parts_pants.png',
            designs: [3],
            gender: 1
        },
        {
            id: 6,
            name: 'ベスト',
            image: '/simulator/parts/parts_vest.png',
            designs: [2],
            gender: 1
        },
        {
            id: 7,
            name: 'ジャケット + スカート',
            image: '/simulator/parts/parts_women_jacket_skirt.png',
            designs: [5, 8],
            gender: 2
        },
        {
            id: 8,
            name: 'ジャケット + パンツ',
            image: '/simulator/parts/parts_women_jacket_pants.png',
            designs: [5, 6],
            gender: 2
        },
        {
            id: 9,
            name: 'ジャケット + パンツ + スカート',
            image: '/simulator/parts/parts_women_jacket_slacks_skirt.png',
            designs: [5, 6, 8],
            gender: 2
        },
        {
            id: 10,
            name: 'ジャケット + ２スカート',
            image: '/simulator/parts/parts_women_jacket_2skirt.png',
            designs: [5, 8, 9],
            gender: 2
        },
        {
            id: 11,
            name: 'ジャケット + 2パンツ',
            image: '/simulator/parts/parts_women_jacket_2pants.png',
            designs: [5, 6, 7],
            gender: 2
        },
        {
            id: 12,
            name: 'パンツ + スカート',
            image: '/simulator/parts/parts_women_slacks_skirt.png',
            designs: [6, 8],
            gender: 2
        },
        {
            id: 13,
            name: '2スカート',
            image: '/simulator/parts/parts_women_2skirt.png',
            designs: [8, 9],
            gender: 2
        },
        {
            id: 14,
            name: '2パンツ',
            image: '/simulator/parts/parts_women_2pants.png',
            designs: [6, 7],
            gender: 2
        },
        {
            id: 15,
            name: 'ジャケット',
            image: '/simulator/parts/parts_women_jacket.png',
            designs: [5],
            gender: 2
        },
        {
            id: 16,
            name: 'スカート',
            image: '/simulator/parts/parts_women_skirt.png',
            designs: [8],
            gender: 2
        },
        {
            id: 17,
            name: 'パンツ',
            image: '/simulator/parts/parts_women_slacks.png',
            designs: [6],
            gender: 2
        }
    ]

    const error = ref(false)
    const selected = computed(() => selectedStore.selected.course)

    function getCourses() {
        return courses.filter(item => item.gender == selectedStore.selected.gender)
    }

    function getCourse(id: number) {
        if (!id) return null
        return courses.find(item => item.id == id) as Course
    }

    function isAllDesignSelected(courseId: number, designs: ObjectData) {
        const course = getCourse(courseId)
        let is = true
        course?.designs.forEach(item => {
            if (!designs[item]) is = false
        })
        return is
    }


    function checkError() {
        error.value = !selectedStore.selected.course

        if (error.value) return '[コース]を選択してください!'
        return ''
    }

    function setSelected(name: SelectedName, value: number) {
        selectedStore.setSelected(name, value)
    }

    return { error, selected, checkError, getCourse, getCourses, isAllDesignSelected, setSelected }
})