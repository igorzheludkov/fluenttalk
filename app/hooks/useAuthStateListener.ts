import { useEffect } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '@/firebase/firebaseConfig'
import { useAppDispatch } from '@/store/hooks'
import { setUser, SerializableUser } from '@/store/auth/authSlice'
import useSyncSamples from '@/hooks/useSyncSamples'

function serializeUser(user: User): SerializableUser {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
    isAnonymous: user.isAnonymous
  }
}

export default function useAuthStateListener() {
  const dispatch = useAppDispatch()

  useSyncSamples()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user ? serializeUser(user) : null))
    })

    return () => unsubscribe()
  }, [dispatch])
}
