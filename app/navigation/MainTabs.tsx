import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { TMainTabs } from '@/types/INavigation'
import DialogStack from '@/screens/DialogsStack'
import Enter from '@/components/blocks/Enter'

const Tab = createBottomTabNavigator<TMainTabs>()

export default function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: true, headerRight: () => <Enter /> }}>
      <Tab.Screen
        name='DialogStack'
        component={DialogStack}
        options={{
          tabBarLabel: 'Dialogs',
          headerPressColor: 'blue'
        }}
      />
    </Tab.Navigator>
  )
}
