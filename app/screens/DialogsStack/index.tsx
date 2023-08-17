import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CategoriesScreen from '@/screens/DialogsStack/CategoriesScreen'
import TalkScreen from '@/screens/DialogsStack/TalkScreen'
import SubCategoryScreen from '@/screens/DialogsStack/SubCategoryScreen'


const Stack = createNativeStackNavigator()

export default function DialogStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen name='Dialogs' component={CategoriesScreen} />
        <Stack.Screen name='Subcategory' component={SubCategoryScreen} />
        <Stack.Screen name='Talk' component={TalkScreen} />
      </Stack.Navigator>
  )
}

