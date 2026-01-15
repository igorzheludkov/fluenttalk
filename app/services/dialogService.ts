import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc
} from 'firebase/firestore'
import { app } from '@/firebase/firebaseConfig'
import {
  IDialogCategory,
  IDialogSubCategory,
  IDialogItem,
  IDialogCategoryWithSubs
} from '@/types/IDialogs'

const db = getFirestore(app)

// Fetch all dialog categories
export async function getDialogCategories(): Promise<IDialogCategory[]> {
  const categoriesCol = collection(db, 'dialogCategories')
  const snapshot = await getDocs(categoriesCol)
  return snapshot.docs.map(d => ({
    ...d.data(),
    id: d.id // Use Firestore document ID, not the custom 'id' field
  })) as IDialogCategory[]
}

// Fetch subcategories for a specific category
export async function getDialogSubCategories(categoryId: string): Promise<IDialogSubCategory[]> {
  const subCategoriesCol = collection(db, 'dialogSubCategories')
  const parentRef = doc(db, 'dialogCategories', categoryId)
  const q = query(subCategoriesCol, where('parent', '==', parentRef))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(d => ({
    ...d.data(),
    id: d.id // Use Firestore document ID
  })) as IDialogSubCategory[]
}

// Fetch all categories with their subcategories
export async function getCategoriesWithSubCategories(): Promise<IDialogCategoryWithSubs[]> {
  const categories = await getDialogCategories()
  const categoriesWithSubs = await Promise.all(
    categories.map(async (category) => {
      const subCategories = await getDialogSubCategories(category.id)
      return {
        ...category,
        subCategories
      }
    })
  )
  return categoriesWithSubs
}

// Fetch dialog items for a specific subcategory
export async function getDialogItems(subCategoryId: string): Promise<IDialogItem[]> {
  const itemsCol = collection(db, 'dialogItems')
  const parentRef = doc(db, 'dialogSubCategories', subCategoryId)
  const q = query(itemsCol, where('parent', '==', parentRef))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(d => ({
    ...d.data(),
    id: d.id // Use Firestore document ID
  })) as IDialogItem[]
}

// Fetch a single dialog item by ID
export async function getDialogItem(itemId: string): Promise<IDialogItem | null> {
  const itemRef = doc(db, 'dialogItems', itemId)
  const snapshot = await getDoc(itemRef)
  if (snapshot.exists()) {
    return {
      id: snapshot.id,
      ...snapshot.data()
    } as IDialogItem
  }
  return null
}
