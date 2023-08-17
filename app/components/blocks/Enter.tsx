import Avatar from '@/components/UI/Avatar'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'


export default function Enter() {
  const navigation = useNavigation<any>()

  return (
    <TouchableOpacity
      style={styles.wrapper}
      onPress={() =>
        navigation.navigate('AuthStack', {
          screen: 'LoginSignUp'
        })
      }
    >
      <Avatar />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    // flex: 1
  }
})
