import { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, ActivityIndicator, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import CardsBlock from '@/components/blocks/CardsBlock'
import ColorTheme from '@/constants/ColorTheme'
import { getCategoriesWithSubCategories } from '@/services/dialogService'
import { IDialogCategoryWithSubs, IDialogSubCategory } from '@/types/IDialogs'
import { TDialogStack } from '@/types/INavigation'

type NavigationProp = NativeStackNavigationProp<TDialogStack, 'Dialogs'>

export default function CategoriesScreen() {
  const navigation = useNavigation<NavigationProp>()
  const [categories, setCategories] = useState<IDialogCategoryWithSubs[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getCategoriesWithSubCategories()
      setCategories(data)
    } catch (err) {
      console.error('Failed to load categories:', err)
      setError('Failed to load categories. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handlePressMore = (categoryId: string) => {
    // TODO: Navigate to a screen showing all subcategories for this category
    console.log('More pressed for category:', categoryId)
  }

  const handlePressItem = (subCategory: IDialogSubCategory) => {
    navigation.navigate('Subcategory', {
      subCategory: {
        id: subCategory.id,
        name: subCategory.name,
        description: subCategory.description
      }
    })
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={ColorTheme.primary} />
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.content}>
        {categories.map((category) => (
          <CardsBlock
            key={category.id}
            category={category}
            title={category.name}
            onPressMore={handlePressMore}
            onPressItem={handlePressItem}
          />
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: ColorTheme.background
  },
  content: {
    gap: 16
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorTheme.background
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    padding: 20
  }
})
