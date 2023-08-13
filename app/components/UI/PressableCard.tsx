import React from 'react'
import {
  DimensionValue,
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
  View,
  Image
} from 'react-native'
import ColorTheme from 'app/constants/ColorTheme'

interface PressableCardProps extends TouchableOpacityProps {
  bgColor?: string
  borderRadius?: number
  borderWidth?: number
  borderColor?: string
  width?: DimensionValue
  height?: DimensionValue
  fontSize?: number
  fontColor?: string
  imageSource?: string
  imageSize?: DimensionValue
  disabled?: boolean
  onPress?: () => void
}

export default function PressableCard(props: PressableCardProps) {
  const {
    bgColor,
    borderRadius = 5,
    borderWidth = 0,
    borderColor,
    width = 'auto',
    height = 120,
    fontSize = 16,
    fontColor = ColorTheme.text,
    imageSource,
    imageSize = 50,
    children,
    onPress,
    disabled,
    ...restProps
  } = props

  const buttonStyles: ViewStyle = {
    backgroundColor: disabled ? ColorTheme.buttonDisabledBackground : bgColor,
    borderColor: disabled ? ColorTheme.buttonDisabledBackground : borderColor,
    opacity: disabled ? 0.5 : 1,
    borderRadius,
    borderWidth,
    width,
    height,
    alignItems: 'center',
    flexDirection: 'column',
    paddingVertical: 5,
    ...restProps
  }

  const textStyles: TextStyle = {
    fontSize,
    color: disabled ? ColorTheme.buttonDisabledText : fontColor
  }

  return (
    <TouchableOpacity style={[buttonStyles, styles.wrapper]} onPress={onPress} disabled={disabled}>
      <View style={{ width: imageSize }}>
        {imageSource ? (
          <Image
            source={{ uri: imageSource }}
            style={[{ width: imageSize, height: imageSize }, styles.image]}
          />
        ) : (
          <View style={[{ width: imageSize, height: imageSize, backgroundColor: 'gray' }, styles.image]} />
        )}
        <Text style={[textStyles, styles.text]}>{children}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrapper: {},
  image: {
    borderRadius: 5,
    marginBottom: 8
  },
  text: {}
})
