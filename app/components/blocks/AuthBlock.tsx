import useFirebaseAuth from '@/hooks/useFirebaseAuth'
import { useSignInMutation, useSignOutMutation, useSignUpMutation } from '@/store/api/auth/authApi'
import { useAppSelector } from '@/store/hooks'
import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Button } from 'react-native'

const AuthForm = ({ isSignUp }) => {
  const auth = useFirebaseAuth()
  const [signIn, signInState] = useSignInMutation()
  const [signUp, signUpState] = useSignUpMutation()
  const [signOut, signOutState] = useSignOutMutation()
  const user = useAppSelector((state) => state.auth.user)

  const [email, setEmail] = useState('500griven@gmail.com')
  const [password, setPassword] = useState('energystar5520')

  const handleSubmit = () => {
    signIn({ email, password })
    console.log('Email:', email)
    console.log('Password:', password)
  }

  console.log('~~~~~~~~~~~~~~ auth redux user', user)
  console.log('~~~~~~~~~~~~~~ signInState', signInState.error)
  console.log('~~~~~~~~~~~~~~ error', auth?.error)

  return (
    <View style={styles.container}>
      <TextInput placeholder='Email' onChangeText={(text) => setEmail(text)} value={email} />
      <TextInput
        placeholder='Password'
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <Button title={isSignUp ? 'Sign Up' : 'Log In'} onPress={handleSubmit} />
      <Button title={'SignOut'} onPress={signOut} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  button: {
    marginTop: 20,
    backgroundColor: 'blue'
  }
})

export default AuthForm
