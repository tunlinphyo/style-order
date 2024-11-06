import { defineStore } from 'pinia'
// import { AMF_STITCH } from './data'
import { amfStitchList, optionItemList, optionList } from './simu-data'
import { FLOWER_HALL } from './data';

export interface OptionItem {
  id: number;
  option: number;
  code: number;
  name: string;
  isDefault: boolean;
  image: string | null;
}

export interface Option {
  id: number;
  name: string;
  number: string;
  type: number;
  items: number[];
  isKatagami: boolean;
  inputType: number;
  image: string | null;
  apiField: string;
  optionType: string;
  sort: number;
  detail?: string;
}

export const useOptionsStore = defineStore('options', () => {

  // function intersection(arr1: number[], arr2: number[]): number[] {
  //   return arr1.filter(value => arr2.includes(value));
  // }

  const amfStitches: OptionItem[] = amfStitchList

  function getOptions(type: number) {

    const isType = (option: Option) => {
      if (option.optionType == 'hyoujun' && option.isKatagami) return false
      else if (option.optionType == 'katagaminai' && option.isKatagami) return true
      else return true
    }

    const removeSome = (option: Option) => {
      // 63 for 25 - code:2
      return !([48, 49, 61, 62, 67, 36, 46, 55, 56, 63, 44].includes(option.id))
    }

    return optionList.filter(option => {
      let category = type
      if (type == 3) {
        category = 4
      } else if (type == 4) {
        category = 3
      }
      return (
        option.items.includes(category)
        && isType(option)
        && removeSome(option)
      )
    }).sort((a, b) => b.sort - a.sort)
  }

  function getOptionItems(id: number) {
    return optionItemList.filter(item => item.option == id)
  }

  // function getOptions() {
  //   const options: Option[] = []
  //   const optionItems: OptionItem[] = []

  //   const getItems = (list: string | string[]) => {
  //     if (Array.isArray(list)) return list.map(n => Number(n))
  //     return list.split(',').map(n => Number(n))
  //   }

  //   Object.values(OPTIONS).forEach(option => {
  //     options.push({
  //       id: Number(option.option_id),
  //       name: option.option_name,
  //       number: option.option_num,
  //       type: Number(option.option_type),
  //       items: getItems(option.option_item),
  //       isKatagami: Boolean(option.katagami_flg),
  //       inputType: Number(option.input_type),
  //       image: option.images,
  //       apiField: option.api_field,
  //       optionType: option.option_shiwake,
  //       sort: option.rank
  //     })
  //     Object.values(option.optionitems).forEach(item => {
  //       optionItems.push({
  //         id: Number(item.item_id),
  //         option: Number(item.option_id),
  //         code: Number(item.option_code),
  //         name: item.option_field,
  //         isDefault: Boolean(item.option_default),
  //         image: item.option_image,
  //       })
  //     })
  //   })

  //   console.log('OPTIONS', options)
  //   console.log('OPTION_ITEMS', optionItems)
  // }

  function getCustomOptions() {
    const optionItems: OptionItem[] = []
    Object.values(FLOWER_HALL).forEach(item => {
      optionItems.push({
        id: Number(item.item_id),
        option: 64,
        code: Number(item.option_code),
        name: item.option_field,
        isDefault: Boolean(item.option_default),
        image: item.option_image,
      })
    })
    console.log('OPTION_ITEMS', optionItems)
  }

  function getImageUrl(img: string) {
    return `https://style-order.taka-q.com/sandbox/upload/save_image/${img}`
  }

  function getOption(id: number) {
    return optionList.find(item => item.id == id)
  }

  function getOptionItem(code: number | string) {
    return optionItemList.find(item => item.code == code)
  }

  return { getOptions, getOptionItems, getImageUrl, amfStitches, getCustomOptions, getOption, getOptionItem }
})