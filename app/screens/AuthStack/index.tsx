import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginSignUpScreen from '@/screens/AuthStack/LoginSignUp'

const Stack = createNativeStackNavigator()

export default function AuthStack() {
  return (
    <Stack.Navigator id="AuthStack">
      <Stack.Screen name='LoginSignUp' component={LoginSignUpScreen} />
    </Stack.Navigator>
  )
}
