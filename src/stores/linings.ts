import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { buttonList, liningList } from './simu-data'
import { LININGS } from './data';

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

  // Object.values(LININGS).forEach((value, index) => {
  //   linings.push({
  //     id: index + 1,
  //     name: value.option_field,
  //     option: Number(value.option_id),
  //     code: Number(value.option_code),
  //     image: value.option_image,
  //     itemid: value.item_id,
  //     sortNo: index
  //   })
  // })
  //   const linings: Lining[] = buttonList
  // const buttons = computed(() => list)

  function getImageUrl(img: string) {
    return `https://style-order.taka-q.com/sandbox/upload/save_image/${img}`
  }

  function getLining(code: number) {
    return linings.find(item => item.code == code)
  }

  return { linings, getImageUrl, getLining }
})