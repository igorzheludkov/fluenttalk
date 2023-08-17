// In App.js in a new project

import CardsBlock from '@/components/blocks/CardsBlock'
import * as React from 'react'
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native'
import { dialogCategories } from '@/data/testData'
import ColorTheme from '@/constants/ColorTheme'
import LoginSignUpScreen from '@/screens/AuthStack/LoginSignUp'

export default function CategoriesScreen() {
  return (
    <ScrollView style={styles.wrapper}>
      <View style={{ gap: 16 }}>
        {dialogCategories.map((t) => (
          <CardsBlock
            key={t.id}
            items={t}
            title={t.title}
            onPressMore={(item) => console.log(item)}
            onPressItem={(item) => console.log(item)}
          />
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: ColorTheme.background
  }
})
