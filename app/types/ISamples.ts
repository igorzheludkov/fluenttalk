import { Timestamp } from 'firebase/firestore'

// Local sample (stored in Redux persist)
export interface ILocalSample {
  localId: string
  text: string
  translation: string
  createdAt: number
  isSynced: boolean
}

// Firestore sample document
export interface IFirestoreSample {
  id: string
  userId: string
  text: string
  translation: string
  createdAt: Timestamp
  localId?: string
}
