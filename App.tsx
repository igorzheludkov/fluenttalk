import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import RootNavigator from '@/navigation/RootNavigator'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { StatusBar } from 'expo-status-bar'
import useAuthStateListener from '@/hooks/useAuthStateListener'

function AppContent() {
  useAuthStateListener()

  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </>
  )
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}

export default App
