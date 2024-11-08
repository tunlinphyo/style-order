import { defineStore } from 'pinia'
// import { AMF_STITCH } from './data'
import { amfStitchList, optionItemList, optionList } from './simu-data'
import { FLOWER_HALL } from './data';
import { useDesignStore, type Item } from './designs';
import { useSelectedStore } from './selected';
import { computed, ref, watch } from 'vue';
import { removeValueFromArray } from './utils';

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

interface ItemOption {
  item: Item;
  options: Option[];
}

export const useOptionsStore = defineStore('options', () => {
  const designStore = useDesignStore()
  const selectedStore = useSelectedStore()

  const currentOptions = ref<number[]>([])
  const errors = ref<number[]>([])
  const selected = computed(() => selectedStore.selected.options)

  const amfStitches: OptionItem[] = amfStitchList

  watch(selectedStore.selected, (nextVal) => {
    errors.value.forEach(id => {
      if (id in nextVal.options) {
        errors.value = removeValueFromArray<number>(errors.value, id)
      }
    })
  })

  function getOptionList() {
    currentOptions.value = []
    const list: ItemOption[] = []
    const items = designStore.getItems()
    items.forEach(item => {
      const options = getOptions(item.type)
      options.forEach(o => {
        currentOptions.value.push(o.id)
      })
      list.push({ item, options })
    })

    return list
  }

  function getOptions(type: number) {

    const isType = (option: Option) => {
      if (option.optionType == 'hyoujun' && option.isKatagami) return false
      else if (option.optionType == 'katagaminai' && option.isKatagami) return true
      else return true
    }

    const removeSome = (option: Option) => {
      // 63 for 25 - code:2
      return !([48, 49, 61, 62, 67, 36, 46, 55, 56, 63, 44, 69].includes(option.id))
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
  }

  function getImageUrl(img: string) {
    return `https://style-order.taka-q.com/sandbox/upload/save_image/${img}`
  }

  function getOption(id: number) {
    return optionList.find(item => item.id == id)
  }

  function getOptionItem(code: number, option: number) {
    return optionItemList.find(item => (item.code == code && item.option == option))
  }

  function checkSelected() {
    let isError = false
    const err: number[] = []

    currentOptions.value.forEach(key => {
      if (!(key in selectedStore.selected.options)) {
        isError = true
        err.push(key)
      } else if (selectedStore.selected.options[31] && !selectedStore.selected.options[44]) {
        isError = true
        err.push(44)
      } else if (selectedStore.selected.options[45] && !(46 in selectedStore.selected.options)) {
        isError = true
        err.push(46)
      }
    })

    errors.value = err

    return isError
  }

  function isError(id: number) {
    return errors.value.includes(id)
  }

  function deleteOption(key: string | number) {
    delete selectedStore.selected.options[Number(key)]
  }

  return {
    errors, selected, amfStitches,
    isError, getOptionList, getOptionItems, getImageUrl,
    getCustomOptions, getOption, getOptionItem,
    checkSelected, deleteOption,
    setOption: selectedStore.setOption
  }
})