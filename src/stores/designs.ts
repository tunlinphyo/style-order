import { defineStore } from 'pinia'
import type { Course } from './courses';
import { STYLES } from './data';

export interface Design {
  id: number;
  name: string;
  image: string;
  detailImage: string | null;
  style: number;
  patterns: number[];
  types: number[];
  gender: number;
  sort: number;
}

export interface Item {
  id: number;
  gender: number;
  name: string;
  styles: number[];
  category: number;
  type: number;
  pattern: number;
  sub: string;
  design: number;
}

interface Types {
  [key: string]: string;
}

export const useDesignStore = defineStore('design', () => {
  const items: Item[] = [
    {
      id: 1,
      gender: 1,
      name: "ジャケット",
      styles: [1, 2, 3],
      category: 1,
      type: 2,
      pattern: 14,
      sub: "",
      design: 1,
    },
    {
      id: 2,
      gender: 1,
      name: "ベスト",
      styles: [1],
      category: 2,
      type: 3,
      pattern: 15,
      sub: "",
      design: 10,
    },
    {
      id: 3,
      gender: 1,
      name: "スラックス",
      styles: [1, 2, 3],
      category: 3,
      type: 4,
      pattern: 16,
      sub: "",
      design: 6,
    },
    {
      id: 4,
      gender: 1,
      name: "スラックス2",
      styles: [1, 2, 3],
      category: 3,
      type: 4,
      pattern: 16,
      sub: "pants2",
      design: 6,
    },
    {
      id: 5,
      gender: 2,
      name: "ジャケット",
      styles: [1],
      category: 5,
      type: 5,
      pattern: 31,
      sub: "",
      design: 3,
    },
    {
      id: 6,
      gender: 2,
      name: "スラックス",
      styles: [1],
      category: 6,
      type: 6,
      pattern: 32,
      sub: "",
      design: 21,
    },
    {
      id: 7,
      gender: 2,
      name: "スラックス2",
      styles: [1],
      category: 6,
      type: 6,
      pattern: 32,
      sub: "pants2",
      design: 21,
    },
    {
      id: 8,
      gender: 2,
      name: "スカート",
      styles: [1],
      category: 7,
      type: 7,
      pattern: 33,
      sub: "",
      design: 9,
    },
    {
      id: 9,
      gender: 2,
      name: "スカート2",
      styles: [1],
      category: 7,
      type: 7,
      pattern: 33,
      sub: "skirt2",
      design: 9,
    },
  ]

  const designs: Design[] = [
    {
      "id": 1,
      "name": "シングル2ボタン",
      "image": "07291003_5d3e45e8a2dd1.jpg",
      "detailImage": "08311627_5d6a217f7a1bb.jpg",
      "style": 3,
      "patterns": [
        14,
        11,
        12,
        13
      ],
      "types": [
        1
      ],
      "gender": 1,
      "sort": 41
    },
    {
      "id": 2,
      "name": "シングル3ボタン",
      "image": "07291003_5d3e45fb32d3e.jpg",
      "detailImage": "08311659_5d6a28e64f011.jpg",
      "style": 4,
      "patterns": [
        14,
        11,
        12,
        13
      ],
      "types": [
        1
      ],
      "gender": 1,
      "sort": 38
    },
    {
      "id": 3,
      "name": "シングル1ボタン L",
      "image": "07291000_5d3e452d97180.jpg",
      "detailImage": null,
      "style": 5,
      "patterns": [
        31,
        34,
        35,
        39,
        40,
        41
      ],
      "types": [
        1,
        2,
        3
      ],
      "gender": 2,
      "sort": 22
    },
    {
      "id": 4,
      "name": "ダブル",
      "image": "07291003_5d3e45d99f187.jpg",
      "detailImage": "08271735_5d64eb5ebe094.jpg",
      "style": 6,
      "patterns": [
        14,
        11,
        12,
        13
      ],
      "types": [
        2
      ],
      "gender": 1,
      "sort": 35
    },
    {
      "id": 5,
      "name": "その他",
      "image": "07291000_5d3e451287725.jpg",
      "detailImage": null,
      "style": 7,
      "patterns": [
        31,
        34,
        35,
        39,
        40,
        41
      ],
      "types": [
        1,
        2,
        3
      ],
      "gender": 2,
      "sort": 20
    },
    {
      "id": 6,
      "name": "ノータック",
      "image": "07291003_5d3e45c51ab46.jpg",
      "detailImage": "08311715_5d6a2c8e1b07c.jpg",
      "style": 8,
      "patterns": [
        16,
        11,
        12,
        13
      ],
      "types": [
        1
      ],
      "gender": 1,
      "sort": 33
    },
    {
      "id": 7,
      "name": "ワンタック",
      "image": "07291002_5d3e45954db74.jpg",
      "detailImage": "08281027_5d65d87269ee7.jpg",
      "style": 9,
      "patterns": [
        16,
        11,
        12,
        13
      ],
      "types": [
        1
      ],
      "gender": 1,
      "sort": 30
    },
    {
      "id": 8,
      "name": "ツータック",
      "image": "07291001_5d3e4586ac3a7.jpg",
      "detailImage": "08271739_5d64ec282126f.jpg",
      "style": 10,
      "patterns": [
        16,
        11,
        12,
        13
      ],
      "types": [
        2
      ],
      "gender": 1,
      "sort": 28
    },
    {
      "id": 9,
      "name": "タイト",
      "image": "07291001_5d3e45754dab8.jpg",
      "detailImage": null,
      "style": 13,
      "patterns": [
        33,
        35,
        36,
        38,
        39,
        41
      ],
      "types": [
        1,
        2,
        3
      ],
      "gender": 2,
      "sort": 19
    },
    {
      "id": 10,
      "name": "シングル衿あり",
      "image": "08160910_5d55f46d764e5.jpg",
      "detailImage": "08271742_5d64ece99e9a4.jpg",
      "style": 17,
      "patterns": [
        15,
        13
      ],
      "types": [
        1,
        2,
        3
      ],
      "gender": 1,
      "sort": 25
    },
    {
      "id": 11,
      "name": "シングル衿なし",
      "image": "08160910_5d55f47c3a0e7.jpg",
      "detailImage": "08271741_5d64ecaf08f5d.jpg",
      "style": 18,
      "patterns": [
        15,
        13
      ],
      "types": [
        1,
        2,
        3
      ],
      "gender": 1,
      "sort": 26
    },
    {
      "id": 12,
      "name": "ダブル衿あり",
      "image": "07291001_5d3e455bab682.jpg",
      "detailImage": "11061710_5dc2800e4e641.jpg",
      "style": 19,
      "patterns": [
        15,
        13
      ],
      "types": [
        1,
        2,
        3
      ],
      "gender": 1,
      "sort": 23
    },
    {
      "id": 13,
      "name": "ダブル衿なし",
      "image": "07291000_5d3e4544824e3.jpg",
      "detailImage": "08271742_5d64ed0d82fc7.jpg",
      "style": 20,
      "patterns": [
        15,
        13
      ],
      "types": [
        1,
        2,
        3
      ],
      "gender": 1,
      "sort": 24
    },
    {
      "id": 14,
      "name": "シングル2ボタン L",
      "image": "07291000_5d3e452251ccf.jpg",
      "detailImage": null,
      "style": 21,
      "patterns": [
        31,
        34,
        35,
        39,
        40,
        41
      ],
      "types": [
        1,
        2,
        3
      ],
      "gender": 2,
      "sort": 21
    },
    {
      "id": 15,
      "name": "マーメイド",
      "image": "07290958_5d3e44c70de96.jpg",
      "detailImage": null,
      "style": 22,
      "patterns": [
        33,
        35,
        36,
        38,
        39,
        41
      ],
      "types": [
        1,
        2,
        3
      ],
      "gender": 2,
      "sort": 18
    },
    {
      "id": 16,
      "name": "タックフレア",
      "image": "07290958_5d3e449f204b5.jpg",
      "detailImage": null,
      "style": 23,
      "patterns": [
        33,
        35,
        36,
        38,
        39,
        41
      ],
      "types": [
        1,
        2,
        3
      ],
      "gender": 2,
      "sort": 17
    },
    {
      "id": 17,
      "name": "フレア",
      "image": "07290958_5d3e44ab52ab4.jpg",
      "detailImage": null,
      "style": 24,
      "patterns": [
        33,
        35,
        36,
        38,
        39,
        41
      ],
      "types": [
        1,
        2,
        3
      ],
      "gender": 2,
      "sort": 16
    },
    {
      "id": 18,
      "name": "ハギフレア",
      "image": "07290957_5d3e4484c88c6.jpg",
      "detailImage": null,
      "style": 25,
      "patterns": [
        33,
        35,
        36,
        38,
        39,
        41
      ],
      "types": [
        1,
        2,
        3
      ],
      "gender": 2,
      "sort": 15
    },
    {
      "id": 19,
      "name": "セミタイト",
      "image": "07290957_5d3e44748d09f.jpg",
      "detailImage": null,
      "style": 26,
      "patterns": [
        33,
        35,
        36,
        38,
        39,
        41
      ],
      "types": [
        1,
        2,
        3
      ],
      "gender": 2,
      "sort": 14
    },
    {
      "id": 20,
      "name": "Aラインタック",
      "image": "07290956_5d3e4435ca036.jpg",
      "detailImage": null,
      "style": 27,
      "patterns": [
        33,
        35,
        36,
        38,
        39,
        41
      ],
      "types": [
        1,
        2,
        3
      ],
      "gender": 2,
      "sort": 13
    },
    {
      "id": 21,
      "name": "ブーツカット",
      "image": "07290957_5d3e44618df47.jpg",
      "detailImage": null,
      "style": 28,
      "patterns": [
        32,
        34,
        36,
        37,
        39,
        40
      ],
      "types": [
        1,
        2,
        3
      ],
      "gender": 2,
      "sort": 11
    },
    {
      "id": 22,
      "name": "ストレート",
      "image": "07290956_5d3e44529d831.jpg",
      "detailImage": null,
      "style": 29,
      "patterns": [
        32,
        34,
        36,
        37,
        39,
        40
      ],
      "types": [
        1,
        2,
        3
      ],
      "gender": 2,
      "sort": 10
    },
    {
      "id": 23,
      "name": "テーパード",
      "image": "07290956_5d3e444555c0a.jpg",
      "detailImage": null,
      "style": 30,
      "patterns": [
        32,
        34,
        36,
        37,
        39,
        40
      ],
      "types": [
        1,
        2,
        3
      ],
      "gender": 2,
      "sort": 12
    },
    {
      "id": 24,
      "name": "シングル2ボタン",
      "image": "09031333_5d6ded1684eab.jpg",
      "detailImage": "08311641_5d6a24a311afe.jpg",
      "style": 41,
      "patterns": [
        14,
        11,
        12,
        13
      ],
      "types": [
        2
      ],
      "gender": 1,
      "sort": 40
    },
    {
      "id": 25,
      "name": "シングル2ボタン",
      "image": "09031334_5d6ded5504b3f.jpg",
      "detailImage": "08311640_5d6a2476643aa.jpg",
      "style": 42,
      "patterns": [
        14,
        11,
        12,
        13
      ],
      "types": [
        3
      ],
      "gender": 1,
      "sort": 39
    },
    {
      "id": 26,
      "name": "ダブル",
      "image": "09031336_5d6dedbd82500.jpg",
      "detailImage": "08311657_5d6a28692b6bd.jpg",
      "style": 43,
      "patterns": [
        14,
        11,
        12,
        13
      ],
      "types": [
        3
      ],
      "gender": 1,
      "sort": 34
    },
    {
      "id": 27,
      "name": "シングル3ボタン",
      "image": "09031341_5d6def0921591.jpg",
      "detailImage": "08311701_5d6a294b4bb35.jpg",
      "style": 44,
      "patterns": [
        14,
        11,
        12,
        13
      ],
      "types": [
        2
      ],
      "gender": 1,
      "sort": 37
    },
    {
      "id": 28,
      "name": "シングル3ボタン",
      "image": "09031335_5d6ded95b383f.jpg",
      "detailImage": "08311703_5d6a29d2d37c1.jpg",
      "style": 45,
      "patterns": [
        14,
        11,
        12,
        13
      ],
      "types": [
        3
      ],
      "gender": 1,
      "sort": 36
    },
    {
      "id": 29,
      "name": "ノータック",
      "image": "09031337_5d6dedf8536e5.jpg",
      "detailImage": "08311717_5d6a2d1eb7049.jpg",
      "style": 46,
      "patterns": [
        16,
        11,
        12,
        13
      ],
      "types": [
        2
      ],
      "gender": 1,
      "sort": 32
    },
    {
      "id": 30,
      "name": "ノータック",
      "image": "09031337_5d6dee0cc44ac.jpg",
      "detailImage": "08311720_5d6a2dc422e1f.jpg",
      "style": 47,
      "patterns": [
        16,
        11,
        12,
        13
      ],
      "types": [
        3
      ],
      "gender": 1,
      "sort": 31
    },
    {
      "id": 31,
      "name": "ワンタック",
      "image": "09031337_5d6dee240fcd2.jpg",
      "detailImage": "08311724_5d6a2eda1243c.jpg",
      "style": 48,
      "patterns": [
        16,
        11,
        12,
        13
      ],
      "types": [
        3
      ],
      "gender": 1,
      "sort": 29
    },
    {
      "id": 32,
      "name": "ツータック",
      "image": "09031338_5d6dee4880e01.jpg",
      "detailImage": "08311729_5d6a2fd6e01d1.jpg",
      "style": 49,
      "patterns": [
        16,
        11,
        12,
        13
      ],
      "types": [
        3
      ],
      "gender": 1,
      "sort": 27
    }
  ]

  function designLog() {
    const designs: Design[] = []
    Object.values(STYLES).forEach((item, index) => {
      designs.push({
        id: index + 1,
        name: item.name,
        image: item.images,
        detailImage: item.detail_images,
        style: Number(item.style_id),
        patterns: item.pattern.map(i => Number(i)),
        types: item.style.map(i => Number(i)),
        gender: item.gender.men == "true" ? 1 : 2,
        sort: Number(item.rank)
      })
    })
  }

  function getItem(id: number) {
    return items.find(item => item.id == id)
  }

  function getItems(course: Course | null): Item[] {
    if (!course) return []
    return course.designs.map(id => (items.find(item => item.id === id)) as Item)
  }

  function getDefaultDesign(gender: number) {
    const id = gender == 1 ? 1 : 3
    return designs.find(item => item.id == id) as Design
  }

  function getDesign(id: number) {
    return designs.find(item => item.id == id)
  }

  function getDesigns(param: Item, type: number) {
    return designs.filter(item => (
      item.gender == param.gender
      && item.patterns.includes(param.pattern)
      && item.types.includes(type)
    )).sort((a, b) => b.sort - a.sort)
  }

  function getTypeName(type: number) {
    const types: Types = {
      1: 'スリムタイプ',
      2: 'レギュラータイプ',
      3: 'リラックスタイプ'
    }

    return types[type];
  }

  return { getItem, getItems, getDefaultDesign, getDesign, getDesigns, getTypeName, designLog }
})