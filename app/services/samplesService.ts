import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
  doc,
  Timestamp,
  writeBatch
} from 'firebase/firestore'
import { app } from '@/firebase/firebaseConfig'
import { ILocalSample, IFirestoreSample } from '@/types/ISamples'

const db = getFirestore(app)
const COLLECTION_NAME = 'samples'

export async function addSampleToFirestore(
  userId: string,
  sample: ILocalSample
): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    userId,
    text: sample.text,
    translation: sample.translation,
    createdAt: Timestamp.fromMillis(sample.createdAt),
    localId: sample.localId
  })
  return docRef.id
}

export async function syncSamplesToFirestore(
  userId: string,
  samples: ILocalSample[]
): Promise<void> {
  const batch = writeBatch(db)

  for (const sample of samples) {
    const docRef = doc(collection(db, COLLECTION_NAME))
    batch.set(docRef, {
      userId,
      text: sample.text,
      translation: sample.translation,
      createdAt: Timestamp.fromMillis(sample.createdAt),
      localId: sample.localId
    })
  }

  await batch.commit()
}

export async function getUserSamples(userId: string): Promise<IFirestoreSample[]> {
  const samplesCol = collection(db, COLLECTION_NAME)
  const q = query(
    samplesCol,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(d => ({
    id: d.id,
    ...d.data()
  })) as IFirestoreSample[]
}

export async function deleteSampleFromFirestore(docId: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION_NAME, docId))
}
