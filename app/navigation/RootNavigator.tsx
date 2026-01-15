import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import MainTabs from '@/navigation/MainTabs'
import AuthStack from '@/screens/AuthStack'
import { useAppSelector } from '@/store/hooks'
import { selectUser, selectIsAuthLoading } from '@/store/auth/authSlice'

const Stack = createNativeStackNavigator()

export default function RootNavigator() {
  const user = useAppSelector(selectUser)
  const isAuthLoading = useAppSelector(selectIsAuthLoading)

  if (isAuthLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <Stack.Navigator id="RootNavigator" screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name='MainTabs' component={MainTabs} />
      ) : (
        <Stack.Screen name='AuthStack' component={AuthStack} />
      )}
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
