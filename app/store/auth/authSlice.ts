import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store'
import { User } from 'firebase/auth'

// Define a type for the slice state
interface InitialState {
  user: User | undefined
}

// Define the initial state using that type
const initialState: InitialState = {
  user: undefined
}

export const counterSlice = createSlice({
  name: 'app',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    }
  }
})

export const { setUser } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type

export default counterSlice.reducer
