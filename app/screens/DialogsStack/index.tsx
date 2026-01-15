import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CategoriesScreen from '@/screens/DialogsStack/CategoriesScreen'
import TalkScreen from '@/screens/DialogsStack/TalkScreen'
import SubCategoryScreen from '@/screens/DialogsStack/SubCategoryScreen'
import { TDialogStack } from '@/types/INavigation'

const Stack = createNativeStackNavigator<TDialogStack>()

export default function DialogStack() {
  return (
    <Stack.Navigator id="DialogStack">
      <Stack.Screen name="Dialogs" component={CategoriesScreen} />
      <Stack.Screen
        name="Subcategory"
        component={SubCategoryScreen}
        options={({ route }) => ({
          title: route.params.subCategory.name
        })}
      />
      <Stack.Screen
        name="Talk"
        component={TalkScreen}
        options={({ route }) => ({
          title: route.params.title
        })}
      />
    </Stack.Navigator>
  )
}
