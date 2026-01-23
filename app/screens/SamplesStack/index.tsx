import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SamplesListScreen from '@/screens/SamplesStack/SamplesListScreen'
import { TSamplesStack } from '@/types/INavigation'

const Stack = createNativeStackNavigator<TSamplesStack>()

export default function SamplesStack() {
  return (
    <Stack.Navigator id="SamplesStack" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SamplesList" component={SamplesListScreen} />
    </Stack.Navigator>
  )
}
