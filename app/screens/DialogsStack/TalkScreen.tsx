import { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import { useRoute, RouteProp } from '@react-navigation/native'
import ColorTheme from '@/constants/ColorTheme'
import { getDialogItem } from '@/services/dialogService'
import { IDialogItem, IDialogPart } from '@/types/IDialogs'
import { TDialogStack } from '@/types/INavigation'

type ScreenRouteProp = RouteProp<TDialogStack, 'Talk'>

type DifficultyLevel = 'levelOne' | 'levelTwo' | 'levelThree'

export default function TalkScreen() {
  const route = useRoute<ScreenRouteProp>()
  const { dialogItemId } = route.params

  const [dialogItem, setDialogItem] = useState<IDialogItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel>('levelOne')

  useEffect(() => {
    loadDialogItem()
  }, [dialogItemId])

  const loadDialogItem = async () => {
    try {
      setLoading(true)
      setError(null)
      const item = await getDialogItem(dialogItemId)
      setDialogItem(item)
    } catch (err) {
      console.error('Failed to load dialog item:', err)
      setError('Failed to load dialog. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getLevelLabel = (level: DifficultyLevel): string => {
    switch (level) {
      case 'levelOne':
        return 'Easy'
      case 'levelTwo':
        return 'Medium'
      case 'levelThree':
        return 'Hard'
    }
  }

  const getSentenceForLevel = (part: IDialogPart): string => {
    const sentences = part[selectedLevel]
    if (Array.isArray(sentences) && sentences.length > 0) {
      return sentences[0].sentense || ''
    }
    return ''
  }

  const renderDialogPart = (part: IDialogPart, index: number) => {
    const isMe = part.side === 'ME'
    const sentence = getSentenceForLevel(part)

    if (!sentence) return null

    return (
      <View
        key={part.id || index}
        style={[
          styles.messageContainer,
          isMe ? styles.messageContainerMe : styles.messageContainerOther
        ]}
      >
        <View
          style={[
            styles.messageBubble,
            isMe ? styles.messageBubbleMe : styles.messageBubbleOther
          ]}
        >
          <Text
            style={[
              styles.messageText,
              isMe ? styles.messageTextMe : styles.messageTextOther
            ]}
          >
            {sentence}
          </Text>
        </View>
        <Text style={styles.sideLabel}>{isMe ? 'You' : 'Other'}</Text>
      </View>
    )
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={ColorTheme.primary} />
      </View>
    )
  }

  if (error || !dialogItem) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error || 'Dialog not found'}</Text>
      </View>
    )
  }

  const dialogParts = dialogItem.dialogParts || []

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.description}>{dialogItem.description}</Text>
        <View style={styles.levelSelector}>
          {(['levelOne', 'levelTwo', 'levelThree'] as DifficultyLevel[]).map(
            (level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.levelButton,
                  selectedLevel === level && styles.levelButtonActive
                ]}
                onPress={() => setSelectedLevel(level)}
              >
                <Text
                  style={[
                    styles.levelButtonText,
                    selectedLevel === level && styles.levelButtonTextActive
                  ]}
                >
                  {getLevelLabel(level)}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>
      </View>

      <ScrollView
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContent}
      >
        {dialogParts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No dialog parts available</Text>
          </View>
        ) : (
          dialogParts.map((part, index) => renderDialogPart(part, index))
        )}
      </ScrollView>
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
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: ColorTheme.backgroundDark
  },
  description: {
    fontSize: 16,
    color: ColorTheme.text,
    marginBottom: 12,
    textAlign: 'center'
  },
  levelSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8
  },
  levelButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: ColorTheme.backgroundDark
  },
  levelButtonActive: {
    backgroundColor: ColorTheme.primary
  },
  levelButtonText: {
    fontSize: 14,
    color: ColorTheme.textSecondary
  },
  levelButtonTextActive: {
    color: ColorTheme.buttonPrimaryText
  },
  chatContainer: {
    flex: 1
  },
  chatContent: {
    padding: 16,
    gap: 12
  },
  messageContainer: {
    maxWidth: '80%'
  },
  messageContainerMe: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end'
  },
  messageContainerOther: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start'
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16
  },
  messageBubbleMe: {
    backgroundColor: ColorTheme.primary,
    borderBottomRightRadius: 4
  },
  messageBubbleOther: {
    backgroundColor: ColorTheme.backgroundDark,
    borderBottomLeftRadius: 4
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22
  },
  messageTextMe: {
    color: ColorTheme.buttonPrimaryText
  },
  messageTextOther: {
    color: ColorTheme.text
  },
  sideLabel: {
    fontSize: 10,
    color: ColorTheme.textSecondary,
    marginTop: 4
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40
  },
  emptyText: {
    color: ColorTheme.textSecondary,
    fontSize: 16
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    padding: 20
  }
})
