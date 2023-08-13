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
}

export default function PressableCard(props: PressableCardProps) {
  const {
    bgColor = ColorTheme.buttonPrimaryBackground,
    borderRadius = 5,
    borderWidth = 1,
    borderColor = ColorTheme.buttonPrimaryBackground,
    width = 'auto',
    height = 120,
    fontSize = 16,
    fontColor = ColorTheme.buttonPrimaryText,
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
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingHorizontal: 10,
    paddingVertical: 5,
    ...restProps
  }

  const textStyles: TextStyle = {
    fontSize,
    color: disabled ? ColorTheme.buttonDisabledText : fontColor
  }

  return (
    <TouchableOpacity style={[styles.wrapper, buttonStyles]} onPress={onPress} disabled={disabled}>
      {imageSource ? (
        <Image source={{ uri: imageSource }} style={{ width: imageSize, height: imageSize }} />
      ) : (
        <View style={{ width: imageSize, height: imageSize, backgroundColor: 'lightgray' }} />
      )}
      <Text style={textStyles}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    // alignSelf: 'center'
  }
})
