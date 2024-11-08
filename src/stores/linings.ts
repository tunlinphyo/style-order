import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { liningList } from './simu-data'
import { useSelectedStore } from './selected';

export interface Lining {
  id: number;
  name: string;
  option: number;
  code: number;
  image: string | null;
  itemid: string;
  sortNo: number;
}

export const useLiningsStore = defineStore('linings', () => {
  const linings: Lining[] = liningList
  const selectedStore = useSelectedStore()
  const error = ref(false)
  const selected = computed(() => selectedStore.selected.lining)

  function getImageUrl(img: string) {
    return `https://style-order.taka-q.com/sandbox/upload/save_image/${img}`
  }

  function getLining(code: number) {
    return linings.find(item => item.code == code)
  }

  function checkError() {
    error.value = !selectedStore.selected.lining

    if (error.value) return '[裏地]を選択してください!'
    return ''
  }

  return { linings, selected, error, checkError, getImageUrl, setSelected: selectedStore.setSelected, getLining }
})