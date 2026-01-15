import { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import ColorTheme from '@/constants/ColorTheme'
import { getDialogItems } from '@/services/dialogService'
import { IDialogItem } from '@/types/IDialogs'
import { TDialogStack } from '@/types/INavigation'

type NavigationProp = NativeStackNavigationProp<TDialogStack, 'Subcategory'>
type ScreenRouteProp = RouteProp<TDialogStack, 'Subcategory'>

export default function SubCategoryScreen() {
  const navigation = useNavigation<NavigationProp>()
  const route = useRoute<ScreenRouteProp>()
  const { subCategory } = route.params

  const [dialogItems, setDialogItems] = useState<IDialogItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadDialogItems()
  }, [subCategory.id])

  const loadDialogItems = async () => {
    try {
      setLoading(true)
      setError(null)
      const items = await getDialogItems(subCategory.id)
      setDialogItems(items)
    } catch (err) {
      console.error('Failed to load dialog items:', err)
      setError('Failed to load dialogs. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handlePressItem = (item: IDialogItem) => {
    navigation.navigate('Talk', {
      dialogItemId: item.id,
      title: item.title
    })
  }

  const renderItem = ({ item }: { item: IDialogItem }) => (
    <TouchableOpacity style={styles.card} onPress={() => handlePressItem(item)}>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.partsCount}>
          {item.dialogParts?.length || 0} dialog parts
        </Text>
      </View>
      <Text style={styles.chevron}>{'>'}</Text>
    </TouchableOpacity>
  )

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

  if (dialogItems.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>No dialogs available</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {subCategory.description ? (
        <Text style={styles.description}>{subCategory.description}</Text>
      ) : null}
      <FlatList
        data={dialogItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorTheme.background
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorTheme.background
  },
  description: {
    fontSize: 14,
    color: ColorTheme.textSecondary,
    padding: 16,
    paddingBottom: 8
  },
  list: {
    padding: 16
  },
  card: {
    backgroundColor: ColorTheme.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  cardContent: {
    flex: 1
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: ColorTheme.text,
    marginBottom: 4
  },
  cardDescription: {
    fontSize: 14,
    color: ColorTheme.textSecondary,
    marginBottom: 8
  },
  partsCount: {
    fontSize: 12,
    color: ColorTheme.primary
  },
  chevron: {
    fontSize: 20,
    color: ColorTheme.textSecondary,
    marginLeft: 8
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    padding: 20
  },
  emptyText: {
    color: ColorTheme.textSecondary,
    fontSize: 16,
    textAlign: 'center'
  }
})
