import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

import appSlice from '@/store/app/appSlice'
import authSlice from '@/store/auth/authSlice'
import samplesSlice from '@/store/samples/samplesSlice'
import apiSlice from '@/store/api/apiSlice'

const rootReducer = combineReducers({
  app: appSlice,
  auth: authSlice,
  samples: samplesSlice,
  [apiSlice.reducerPath]: apiSlice.reducer
})

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['samples']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(apiSlice.middleware as ReturnType<typeof getDefaultMiddleware>[number])
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
