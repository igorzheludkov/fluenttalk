import Button from '@/components/UI/Button'
import PressableCard from '@/components/UI/PressableCard'
import ColorTheme from '@/constants/ColorTheme'
import { IDialogCategory } from '@/types/IDialogs'
import React from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'

interface IProps {
  title: string
  items: IDialogCategory
  onPressMore: (item: any) => void
  onPressItem: (item: any) => void
}

export default function CardsBlock(props: IProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.title}>{props.title}</Text>
        <Button
          bgColor={ColorTheme.background}
          borderColor={ColorTheme.buttonSecondaryBackground}
          fontColor={ColorTheme.buttonSecondaryText}
          fontSize={12}
          borderRadius={15}
          height={20}
          borderWidth={1}
          onPress={() => props.onPressMore(props.items.id)}
        >
          More
        </Button>
      </View>
      <ScrollView horizontal contentContainerStyle={styles.cards}>
        {props.items.data.map((item) => (
          <PressableCard
            key={item.id}
            onPress={() => props.onPressItem(item)}
            imageSource={item.imageSource}
            width={125}
            height={180}
            imageSize={115}
            bgColor='lightgray'
          >
            <Text>{item.title}</Text>
          </PressableCard>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {},
  header: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: { fontSize: 20, fontWeight: 'bold' },
  cards: { paddingLeft: 10, gap: 10 }
})
