import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/firebaseConfig'
import { useAppDispatch } from '@/store/hooks'
import { setUser } from '@/store/auth/authSlice'

export default function useAuthStateListener() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user))
    })

    return () => unsubscribe()
  }, [dispatch])
}
