import { NavigationContainer } from '@react-navigation/native'
import { PersistGate } from 'redux-persist/integration/react'
import RootNavigator from '@/navigation/RootNavigator'
import { Provider } from 'react-redux'
import { store, persistor } from '@/store'
import { StatusBar } from 'expo-status-bar'
import useAuthStateListener from '@/hooks/useAuthStateListener'
import useShareIntentHandler from '@/hooks/useShareIntent'

function AppContent() {
  useAuthStateListener()
  useShareIntentHandler()

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
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  )
}

export default App
