import { createUserWithEmailAndPassword, User } from 'firebase/auth'
import { auth, app } from '@/firebase/firebaseConfig'
import { useState } from 'react'

export default function useFirebaseAuth() {
  const [authState, setAuthState] = useState<User>()
  const [error, setError] = useState<string>()

  function signUp(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        setAuthState(user)
        setError('')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        setError(errorMessage)
      })
  }

  return { signUp, authState, error }
}
