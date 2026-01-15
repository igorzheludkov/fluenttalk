import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Button, Text } from 'react-native'
import { useSignInMutation, useSignUpMutation } from '@/store/api/auth/authApi'

interface AuthFormProps {
  isSignUp?: boolean
}

const AuthForm = ({ isSignUp = false }: AuthFormProps) => {
  const [signIn, signInState] = useSignInMutation()
  const [signUp, signUpState] = useSignUpMutation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    if (isSignUp) {
      signUp({ email, password })
    } else {
      signIn({ email, password })
    }
  }

  const isLoading = signInState.isLoading || signUpState.isLoading
  const error = signInState.error || signUpState.error

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Email'
        onChangeText={setEmail}
        value={email}
        autoCapitalize='none'
        keyboardType='email-address'
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      {error && (
        <Text style={styles.errorText}>
          {(error as any)?.data || 'An error occurred'}
        </Text>
      )}
      <Button
        title={isLoading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Log In'}
        onPress={handleSubmit}
        disabled={isLoading}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16
  },
  errorText: {
    color: '#ff3b30',
    marginBottom: 16,
    textAlign: 'center'
  }
})

export default AuthForm
