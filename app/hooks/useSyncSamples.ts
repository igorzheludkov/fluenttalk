import { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectPendingSync, markAllSynced } from '@/store/samples/samplesSlice'
import { selectUser } from '@/store/auth/authSlice'
import { syncSamplesToFirestore } from '@/services/samplesService'

export default function useSyncSamples() {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const pendingSamples = useAppSelector(selectPendingSync)
  const isSyncing = useRef(false)

  useEffect(() => {
    if (user?.uid && pendingSamples.length > 0 && !isSyncing.current) {
      syncPendingSamples()
    }
  }, [user?.uid, pendingSamples.length])

  const syncPendingSamples = async () => {
    if (!user?.uid || pendingSamples.length === 0 || isSyncing.current) return

    isSyncing.current = true

    try {
      await syncSamplesToFirestore(user.uid, pendingSamples)
      dispatch(markAllSynced())
      console.log(`Synced ${pendingSamples.length} samples to Firestore`)
    } catch (error) {
      console.error('Failed to sync pending samples:', error)
    } finally {
      isSyncing.current = false
    }
  }
}
