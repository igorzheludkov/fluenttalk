import { useEffect } from 'react'
import { useShareIntent } from 'expo-share-intent'
import * as Crypto from 'expo-crypto'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { addSample, markSampleSynced } from '@/store/samples/samplesSlice'
import { selectUser } from '@/store/auth/authSlice'
import { addSampleToFirestore } from '@/services/samplesService'
import { ILocalSample } from '@/types/ISamples'

export default function useShareIntentHandler() {
  const { hasShareIntent, shareIntent, resetShareIntent } = useShareIntent()
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)

  useEffect(() => {
    if (hasShareIntent && shareIntent?.text) {
      handleSharedText(shareIntent.text)
      resetShareIntent()
    }
  }, [hasShareIntent, shareIntent])

  const handleSharedText = async (text: string) => {
    const localId = Crypto.randomUUID()
    const newSample: ILocalSample = {
      localId,
      text,
      translation: '',
      createdAt: Date.now(),
      isSynced: false
    }

    dispatch(addSample(newSample))

    if (user?.uid) {
      try {
        await addSampleToFirestore(user.uid, newSample)
        dispatch(markSampleSynced(localId))
      } catch (error) {
        console.error('Failed to sync sample to Firestore:', error)
      }
    }
  }
}
