import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export interface Fabric {
  id: number;
  name: string;
  code: string;
  price: number;
}

export const useFabricsStore = defineStore('fabrics', () => {
  const fabrics: Fabric[] = [
    {
      id: 7,
      name: "Original",
      code: '449083A',
      price: 18000
    },
    {
      id: 1,
      name: "Robin's Egg Blue",
      code: '445209A',
      price: 18000
    },
    {
      id: 2,
      name: "Stormy Weather",
      code: '445217A',
      price: 18000
    },
    {
      id: 3,
      name: "Dark Green3",
      code: '449148A',
      price: 18000
    },
    {
      id: 4,
      name: "Sage",
      code: '449067A',
      price: 18000
    },
    {
      id: 5,
      name: "Burgundy",
      code: '449075A',
      price: 18000
    },
    {
      id: 6,
      name: "Burgundy Plain",
      code: '449130A',
      price: 18000
    },
    {
      id: 8,
      name: "Poly/Cotton Twill",
      code: '449106A',
      price: 18000
    },
    {
      id: 9,
      name: "Charcoal VBC",
      code: '449156A',
      price: 18000
    },
    {
      id: 10,
      name: "Airforce Blue VBC",
      code: '449025A',
      price: 18000
    },
  ]

  return { fabrics }
})