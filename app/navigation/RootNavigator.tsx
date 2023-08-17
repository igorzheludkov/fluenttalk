import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainTabs from '@/navigation/MainTabs'
import AuthStack from '@/screens/AuthStack'
import { TRootNavigator } from '@/types/INavigation'

const Stack = createNativeStackNavigator<TRootNavigator>()

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='MainTabs' component={MainTabs} />
      <Stack.Screen name='AuthStack' component={AuthStack} />
    </Stack.Navigator>
  )
}
