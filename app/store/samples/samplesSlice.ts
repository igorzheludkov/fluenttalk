import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store'
import { ILocalSample } from '@/types/ISamples'

interface SamplesState {
  samples: ILocalSample[]
  pendingSync: ILocalSample[]
}

const initialState: SamplesState = {
  samples: [],
  pendingSync: []
}

export const samplesSlice = createSlice({
  name: 'samples',
  initialState,
  reducers: {
    addSample: (state, action: PayloadAction<ILocalSample>) => {
      state.samples.unshift(action.payload)
      if (!action.payload.isSynced) {
        state.pendingSync.push(action.payload)
      }
    },
    updateSampleTranslation: (
      state,
      action: PayloadAction<{ localId: string; translation: string }>
    ) => {
      const sample = state.samples.find(s => s.localId === action.payload.localId)
      if (sample) {
        sample.translation = action.payload.translation
      }
      const pendingSample = state.pendingSync.find(
        s => s.localId === action.payload.localId
      )
      if (pendingSample) {
        pendingSample.translation = action.payload.translation
      }
    },
    markSampleSynced: (state, action: PayloadAction<string>) => {
      const sample = state.samples.find(s => s.localId === action.payload)
      if (sample) {
        sample.isSynced = true
      }
      state.pendingSync = state.pendingSync.filter(
        s => s.localId !== action.payload
      )
    },
    markAllSynced: (state) => {
      state.samples.forEach(s => (s.isSynced = true))
      state.pendingSync = []
    },
    removeSample: (state, action: PayloadAction<string>) => {
      state.samples = state.samples.filter(s => s.localId !== action.payload)
      state.pendingSync = state.pendingSync.filter(
        s => s.localId !== action.payload
      )
    },
    setSamples: (state, action: PayloadAction<ILocalSample[]>) => {
      state.samples = action.payload
    },
    clearPendingSync: (state) => {
      state.pendingSync = []
    }
  }
})

export const {
  addSample,
  updateSampleTranslation,
  markSampleSynced,
  markAllSynced,
  removeSample,
  setSamples,
  clearPendingSync
} = samplesSlice.actions

export const selectSamples = (state: RootState) => state.samples.samples
export const selectPendingSync = (state: RootState) => state.samples.pendingSync

export default samplesSlice.reducer
