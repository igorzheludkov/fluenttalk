import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store'

export interface SerializableUser {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  emailVerified: boolean
  isAnonymous: boolean
}

interface AuthState {
  user: SerializableUser | null
  isAuthLoading: boolean
}

const initialState: AuthState = {
  user: null,
  isAuthLoading: true
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<SerializableUser | null>) => {
      state.user = action.payload
      state.isAuthLoading = false
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isAuthLoading = action.payload
    }
  }
})

export const { setUser, setAuthLoading } = authSlice.actions

export const selectUser = (state: RootState) => state.auth.user
export const selectIsAuthLoading = (state: RootState) => state.auth.isAuthLoading

export default authSlice.reducer
