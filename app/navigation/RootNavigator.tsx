import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MainBottomTabs } from '@/types/INavigation'
import DialogsStack from '@/screens/DialogsStack'

const Tab = createBottomTabNavigator<MainBottomTabs>()

export default function Tabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name='DayStack'
        component={DialogsStack}
        options={{
          tabBarLabel: 'Dialogs',
          headerPressColor: 'blue',
        }}
      />
    
    </Tab.Navigator>
  )
}
