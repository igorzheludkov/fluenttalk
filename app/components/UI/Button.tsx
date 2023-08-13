import React from 'react'
import {
  DimensionValue,
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
  View
} from 'react-native'
import ColorTheme from 'app/constants/ColorTheme'

interface ButtonProps extends TouchableOpacityProps {
  bgColor?: string
  borderRadius?: number
  borderWidth?: number
  borderColor?: string
  width?: DimensionValue
  height?: DimensionValue
  fontSize?: number
  fontColor?: string
  icon?: React.ReactNode
  disabled?: boolean // Add a new prop for disabled state
}

export default function Button(props: ButtonProps) {
  const {
    bgColor = ColorTheme.buttonPrimaryBackground,
    borderRadius = 5,
    borderWidth = 1,
    borderColor = ColorTheme.buttonPrimaryBackground,
    width = 'auto',
    height = 40,
    fontSize = 16,
    fontColor = ColorTheme.buttonPrimaryText,
    icon,
    children,
    onPress,
    disabled, // Destructure the disabled prop
    ...restProps
  } = props

  // Define color styles for both enabled and disabled states
  const buttonStyles: ViewStyle = {
    backgroundColor: disabled ? ColorTheme.buttonDisabledBackground : bgColor,
    borderColor: disabled ? ColorTheme.buttonDisabledBackground : borderColor,
    opacity: disabled ? 0.5 : 1, // Reduce opacity for disabled state
    borderRadius,
    borderWidth,
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    ...restProps
  }

  const textStyles: TextStyle = {
    fontSize,
    color: disabled ? ColorTheme.buttonDisabledText : fontColor
  }

  return (
    <TouchableOpacity
      style={[styles.wrapper, buttonStyles]}
      onPress={onPress}
      disabled={disabled} // Set the disabled state of the TouchableOpacity
    >
      {icon && <View style={{ marginRight: 5 }}>{icon}</View>}
      <Text style={textStyles}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    // alignSelf: 'center' // Align button text in the middle horizontally and vertically
  }
})
