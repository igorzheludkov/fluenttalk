import { useState } from 'react'
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform
} from 'react-native'
import * as Crypto from 'expo-crypto'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { addSample, markSampleSynced } from '@/store/samples/samplesSlice'
import { selectUser } from '@/store/auth/authSlice'
import { addSampleToFirestore } from '@/services/samplesService'
import { ILocalSample } from '@/types/ISamples'
import ColorTheme from '@/constants/ColorTheme'

interface Props {
  visible: boolean
  onClose: () => void
}

export default function AddSampleModal({ visible, onClose }: Props) {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const [text, setText] = useState('')
  const [translation, setTranslation] = useState('')

  const handleSave = async () => {
    if (!text.trim()) return

    const localId = Crypto.randomUUID()
    const newSample: ILocalSample = {
      localId,
      text: text.trim(),
      translation: translation.trim(),
      createdAt: Date.now(),
      isSynced: false
    }

    dispatch(addSample(newSample))

    if (user?.uid) {
      try {
        await addSampleToFirestore(user.uid, newSample)
        dispatch(markSampleSynced(localId))
      } catch (error) {
        console.error('Failed to sync sample to Firestore:', error)
      }
    }

    setText('')
    setTranslation('')
    onClose()
  }

  const handleClose = () => {
    setText('')
    setTranslation('')
    onClose()
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Add Sample</Text>
            <TouchableOpacity onPress={handleClose}>
              <Text style={styles.closeButton}>Cancel</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Word or Phrase</Text>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Enter word or phrase..."
            placeholderTextColor={ColorTheme.textSecondary}
            multiline
            autoFocus
          />

          <Text style={styles.label}>Translation (optional)</Text>
          <TextInput
            style={styles.input}
            value={translation}
            onChangeText={setTranslation}
            placeholder="Enter translation..."
            placeholderTextColor={ColorTheme.textSecondary}
            multiline
          />

          <TouchableOpacity
            style={[styles.saveButton, !text.trim() && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={!text.trim()}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end'
  },
  container: {
    backgroundColor: ColorTheme.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: ColorTheme.text
  },
  closeButton: {
    fontSize: 16,
    color: ColorTheme.primary
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: ColorTheme.text,
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 60,
    marginBottom: 16,
    color: ColorTheme.text
  },
  saveButton: {
    backgroundColor: ColorTheme.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center'
  },
  saveButtonDisabled: {
    backgroundColor: ColorTheme.buttonDisabledBackground
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
})
