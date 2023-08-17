import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import RootNavigator from '@/navigation/RootNavigator'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { StatusBar } from 'expo-status-bar'

function App() {
  return (
    <Provider store={store}>
      <StatusBar />
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  )
}

export default App
