import apiSlice from '../apiSlice'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from 'firebase/auth'
import { auth } from '@/firebase/firebaseConfig'
import { setUser } from '@/store/auth/authSlice'

export const authApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation<User, { email: string; password: string }>({
      queryFn: async ({ email, password }) => {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password)
          const user: User = userCredential.user
          return { data: user as User }
        } catch (error) {
          const errorCode = error.code
          const errorMessage = error.message
          return { error: { data: errorMessage, status: errorCode } }
        }
      }
    }),
    signIn: build.mutation<User, { email: string; password: string }>({
      queryFn: async ({ email, password }) => {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password)
          const user: User = userCredential.user
          return { data: user as User }
        } catch (error) {
          const errorCode = error.code
          const errorMessage = error.message
          return { error: { data: errorMessage, status: errorCode } }
        }
      },
      async onQueryStarted({}, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          data && dispatch(setUser(data))
        } catch (e) {}
      }
    }),
    signOut: build.mutation<string, void>({
      queryFn: async () => {
        try {
          await signOut(auth)
          return { data: 'Signed out successfully!' }
        } catch (error) {
          const errorCode = error.code
          const errorMessage = error.message
          return { error: { data: errorMessage, status: errorCode } }
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(setUser(null))
        } catch (e) {}
      }
    })
  }),
  overrideExisting: true
})

export const { useSignInMutation, useSignUpMutation, useSignOutMutation } = authApi
