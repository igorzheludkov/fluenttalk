import React, { FC } from 'react'
import { View, Image, ImageSourcePropType, StyleSheet } from 'react-native'

interface AvatarProps {
  source?: ImageSourcePropType
  placeholderColor?: string
  size?: number
}

const Avatar: FC<AvatarProps> = ({ source, placeholderColor = '#ccc', size = 35 }) => {
  return (
    <View style={[styles.avatarContainer, { width: size, height: size }]}>
      {source ? (
        <Image source={source} style={styles.avatarImage} resizeMode='cover' />
      ) : (
        <View style={[styles.placeholder, { backgroundColor: placeholderColor }]} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  avatarContainer: {
    borderRadius: 50,
    overflow: 'hidden',
    margin: 10
  },
  avatarImage: {
    width: '100%',
    height: '100%'
  },
  placeholder: {
    ...StyleSheet.absoluteFillObject
  }
})

export default Avatar
