import apiSlice from '../apiSlice'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from 'firebase/auth'
import { auth, app } from '@/firebase/firebaseConfig'
import { setUser } from '@/store/auth/authSlice'
// import {addPost, editPost, removePost, updatePosts} from '../../posts/slice';

export const postsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // signUp: build.query<TPost[], void>({
    //   // providesTags: ['Posts'],
    //   query: () => '/posts/',
    //   // async onQueryStarted(undefined, { dispatch, queryFulfilled }) {
    //   //   try {
    //   //     const result = await queryFulfilled
    //   //     dispatch(updatePosts(result.data))
    //   //   } catch (e) {}
    //   // }
    // }),
    signUp: build.mutation<User, { email: string; password: string }>({
      // invalidatesTags: ['Posts'],
      queryFn: async ({ email, password }, thunkAPI) => {
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
      // async onQueryStarted({payload}, {dispatch, queryFulfilled}) {
      //   try {
      //     const result = await queryFulfilled;
      //     result && dispatch(addPost(payload));
      //   } catch (e) {}
      // },
    }),
    signIn: build.mutation<User, { email: string; password: string }>({
      // invalidatesTags: ['Posts'],
      queryFn: async ({ email, password }, thunkAPI) => {
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
    signOut: build.mutation({
      // invalidatesTags: ['Posts'],
      queryFn: async ({ email, password }, thunkAPI) => {
        try {
          await signOut(auth)
          return { data: 'Signed out successfully!' }
        } catch (error) {
          const errorCode = error.code
          const errorMessage = error.message
          return { error: { data: errorMessage, status: errorCode } }
        }
      },
      async onQueryStarted({}, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(setUser(undefined))
        } catch (e) {}
      }
    })
  }),
  overrideExisting: false
})

export default postsApi

export const { useSignInMutation, useSignUpMutation, useSignOutMutation } = postsApi
