import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import DialogStack from '@/screens/DialogsStack'
import SamplesStack from '@/screens/SamplesStack'
import UserMenu from '@/components/blocks/Enter'

const Tab = createBottomTabNavigator()

export default function MainTabs() {
  return (
    <Tab.Navigator
      id="MainTabs"
      screenOptions={{
        headerShown: true,
        headerRight: () => <UserMenu />
      }}
    >
      <Tab.Screen
        name="SamplesStack"
        component={SamplesStack}
        options={{
          tabBarLabel: 'Samples',
          headerTitle: 'My Samples'
        }}
      />
      <Tab.Screen
        name="DialogStack"
        component={DialogStack}
        options={{
          tabBarLabel: 'Dialogs',
          headerPressColor: 'blue'
        }}
      />
    </Tab.Navigator>
  )
}
