import React from 'react'
import { View, StyleSheet } from 'react-native'
import AuthForm from '@/components/blocks/AuthBlock'

const LoginSignUpScreen = () => {
  return (
    <View style={styles.container}>
      <AuthForm isSignUp={false} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default LoginSignUpScreen
