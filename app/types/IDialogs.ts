import { Timestamp } from 'firebase/firestore'

// Firebase collection types
export interface IDialogCategory {
  id: string
  name: string
  description: string
  createdAt: Timestamp
}

export interface IDialogSubCategory {
  id: string
  name: string
  description: string
  parent: string // Reference path to dialogCategories
  createdAt: Timestamp
}

export interface IDialogItem {
  id: string
  title: string
  description: string
  parent: string // Reference path to dialogSubCategories
  dialogParts: IDialogPart[]
}

export interface IDialogPart {
  id: string
  createdAt: Timestamp
  levelOne: IDialogSentence[]
  levelTwo: IDialogSentence[]
  levelThree: IDialogSentence[]
  side: 'ME' | 'OTHER'
}

export interface IDialogSentence {
  id: string
  createdAt: Timestamp
  dialogPartId: string
  level: 'levelOne' | 'levelTwo' | 'levelThree'
  sentense: string // Note: keeping the typo from Firebase data
}

// UI display types (with subcategories loaded)
export interface IDialogCategoryWithSubs extends IDialogCategory {
  subCategories: IDialogSubCategory[]
}
