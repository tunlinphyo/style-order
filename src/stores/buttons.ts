import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { buttonList } from './simu-data'

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
  // const buttons = computed(() => list)

  function getImageUrl(img: string) {
    return `https://style-order.taka-q.com/sandbox/upload/save_image/${img}`
  }

  return { buttons, getImageUrl }
})