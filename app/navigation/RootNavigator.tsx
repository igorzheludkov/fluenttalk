import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MainBottomTabs } from '@/types/INavigation'
import DialogStack from '@/screens/DialogStack'

const Tab = createBottomTabNavigator<MainBottomTabs>()

export default function Tabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name='DayStack'
        component={DialogStack}
        options={{
          tabBarLabel: 'Dialogs',
          headerPressColor: 'blue',
        }}
      />
    
    </Tab.Navigator>
  )
}
