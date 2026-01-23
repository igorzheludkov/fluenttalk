import { useState, useCallback } from 'react'
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native'
import { useAppSelector } from '@/store/hooks'
import { selectSamples } from '@/store/samples/samplesSlice'
import SampleItem from '@/components/samples/SampleItem'
import AddSampleModal from '@/components/samples/AddSampleModal'
import ColorTheme from '@/constants/ColorTheme'
import { ILocalSample } from '@/types/ISamples'

export default function SamplesListScreen() {
  const samples = useAppSelector(selectSamples)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const renderItem = useCallback(
    ({ item }: { item: ILocalSample }) => <SampleItem sample={item} />,
    []
  )

  const keyExtractor = useCallback(
    (item: ILocalSample) => item.localId,
    []
  )

  return (
    <View style={styles.container}>
      {samples.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No samples yet</Text>
          <Text style={styles.emptySubtext}>
            Share text from other apps or tap + to add samples
          </Text>
        </View>
      ) : (
        <FlatList
          data={samples}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContent}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setIsModalVisible(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <AddSampleModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorTheme.backgroundDark
  },
  listContent: {
    padding: 16
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: ColorTheme.text
  },
  emptySubtext: {
    fontSize: 14,
    color: ColorTheme.textSecondary,
    marginTop: 8,
    textAlign: 'center'
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: ColorTheme.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  fabText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '300'
  }
})
