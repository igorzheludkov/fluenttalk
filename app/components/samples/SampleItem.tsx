import { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from 'react-native'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  updateSampleTranslation,
  markSampleSynced
} from '@/store/samples/samplesSlice'
import { selectUser } from '@/store/auth/authSlice'
import { addSampleToFirestore } from '@/services/samplesService'
import { ILocalSample } from '@/types/ISamples'
import ColorTheme from '@/constants/ColorTheme'

interface Props {
  sample: ILocalSample
}

export default function SampleItem({ sample }: Props) {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const [isEditing, setIsEditing] = useState(false)
  const [translation, setTranslation] = useState(sample.translation)

  const formattedDate = new Date(sample.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  const handleSaveTranslation = async () => {
    dispatch(updateSampleTranslation({
      localId: sample.localId,
      translation
    }))
    setIsEditing(false)

    if (user?.uid && !sample.isSynced) {
      try {
        await addSampleToFirestore(user.uid, { ...sample, translation })
        dispatch(markSampleSynced(sample.localId))
      } catch (error) {
        console.error('Failed to sync sample:', error)
      }
    }
  }

  const handleDismiss = () => {
    setTranslation(sample.translation)
    setIsEditing(false)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.date}>{formattedDate}</Text>
        {!sample.isSynced && (
          <View style={styles.syncBadge}>
            <Text style={styles.syncText}>Not synced</Text>
          </View>
        )}
      </View>

      <Text style={styles.text}>{sample.text}</Text>

      {isEditing ? (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.input}
            value={translation}
            onChangeText={setTranslation}
            placeholder="Enter translation..."
            placeholderTextColor={ColorTheme.textSecondary}
            multiline
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.dismissButton}
              onPress={handleDismiss}
            >
              <Text style={styles.dismissButtonText}>Dismiss</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveTranslation}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity onPress={() => setIsEditing(true)}>
          <Text
            style={[
              styles.translation,
              !sample.translation && styles.placeholder
            ]}
          >
            {sample.translation || 'Tap to add translation...'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorTheme.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  date: {
    fontSize: 12,
    color: ColorTheme.textSecondary
  },
  syncBadge: {
    backgroundColor: '#FFF3CD',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4
  },
  syncText: {
    fontSize: 10,
    color: '#856404'
  },
  text: {
    fontSize: 16,
    color: ColorTheme.text,
    marginBottom: 12
  },
  translation: {
    fontSize: 14,
    color: ColorTheme.primary,
    fontStyle: 'italic'
  },
  placeholder: {
    color: ColorTheme.textSecondary
  },
  editContainer: {
    marginTop: 8
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    minHeight: 60,
    color: ColorTheme.text
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8
  },
  dismissButton: {
    flex: 1,
    backgroundColor: ColorTheme.buttonSecondaryBackground,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  dismissButtonText: {
    color: ColorTheme.buttonSecondaryText,
    fontWeight: '600'
  },
  saveButton: {
    flex: 1,
    backgroundColor: ColorTheme.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600'
  }
})
