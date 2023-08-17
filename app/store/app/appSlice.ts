import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store'

// Define a type for the slice state
interface InitialState {
  value: number
}

// Define the initial state using that type
const initialState: InitialState = {
  value: 0
}

export const counterSlice = createSlice({
  name: 'app',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {}
})

export const {} = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type

export default counterSlice.reducer
