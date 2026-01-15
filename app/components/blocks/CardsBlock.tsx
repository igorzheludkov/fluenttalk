import Button from '@/components/UI/Button'
import PressableCard from '@/components/UI/PressableCard'
import ColorTheme from '@/constants/ColorTheme'
import { IDialogCategoryWithSubs, IDialogSubCategory } from '@/types/IDialogs'
import { StyleSheet, View, Text, ScrollView } from 'react-native'

interface IProps {
  title: string
  category: IDialogCategoryWithSubs
  onPressMore: (categoryId: string) => void
  onPressItem: (subCategory: IDialogSubCategory) => void
}

export default function CardsBlock(props: IProps) {
  const { category, title, onPressMore, onPressItem } = props

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Button
          bgColor={ColorTheme.background}
          borderColor={ColorTheme.buttonSecondaryBackground}
          fontColor={ColorTheme.buttonSecondaryText}
          fontSize={12}
          borderRadius={15}
          height={20}
          borderWidth={1}
          onPress={() => onPressMore(category.id)}
        >
          More
        </Button>
      </View>
      <ScrollView horizontal contentContainerStyle={styles.cards}>
        {category.subCategories.map((subCategory) => (
          <PressableCard
            key={subCategory.id}
            onPress={() => onPressItem(subCategory)}
            width={125}
            height={180}
            imageSize={115}
            bgColor="lightgray"
          >
            <Text>{subCategory.name}</Text>
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
