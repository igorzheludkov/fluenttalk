import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DialogScreen from '@/screens/DialogStack/DialogScreen'


const Stack = createNativeStackNavigator()

export default function DialogStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen name='Dialog' component={DialogScreen} />
      </Stack.Navigator>
  )
}

