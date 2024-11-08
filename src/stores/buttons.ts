import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { buttonList } from './simu-data'
import { useSelectedStore } from './selected';

export interface Button {
  id: number;
  name: string;
  option: number;
  code: number;
  image: string | null;
  itemid: string;
  sortNo: number;
}

export const useButtonsStore = defineStore('buttons', () => {
  const buttons: Button[] = buttonList
  const selectedStore = useSelectedStore()
  const error = ref(false)
  const selected = computed(() => selectedStore.selected.button)

  function getImageUrl(img: string) {
    return `https://style-order.taka-q.com/sandbox/upload/save_image/${img}`
  }

  function checkError() {
    error.value = !selectedStore.selected.button

    if (error.value) return '[ボタン]を選択してください!'
    return ''
  }

  return { buttons, selected, error, checkError, getImageUrl, setSelected: selectedStore.setSelected }
})