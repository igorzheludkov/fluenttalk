import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginSignUpScreen from '@/screens/AuthStack/LoginSignUp'
import { TAuthStack } from '@/types/INavigation'

const Stack = createNativeStackNavigator<TAuthStack>()

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='LoginSignUp' component={LoginSignUpScreen} />
    </Stack.Navigator>
  )
}
