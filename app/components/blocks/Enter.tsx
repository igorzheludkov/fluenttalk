import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View, Text, Modal, Pressable } from 'react-native'
import Avatar from '@/components/UI/Avatar'
import { useAppSelector } from '@/store/hooks'
import { selectUser } from '@/store/auth/authSlice'
import { useSignOutMutation } from '@/store/api/auth/authApi'

export default function UserMenu() {
  const user = useAppSelector(selectUser)
  const [signOut] = useSignOutMutation()
  const [menuVisible, setMenuVisible] = useState(false)

  const handleLogout = () => {
    setMenuVisible(false)
    signOut()
  }

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => setMenuVisible(true)}
      >
        <Avatar />
      </TouchableOpacity>

      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.menuContainer}>
            <View style={styles.menuContent}>
              <Text style={styles.emailText} numberOfLines={1}>
                {user?.email}
              </Text>
              <View style={styles.divider} />
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
              >
                <Text style={styles.logoutText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginRight: 8
  },
  profileButton: {
    padding: 4
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 100,
    paddingRight: 16
  },
  menuContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
    minWidth: 200
  },
  menuContent: {
    padding: 16
  },
  emailText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 12
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginBottom: 12
  },
  logoutButton: {
    paddingVertical: 8
  },
  logoutText: {
    fontSize: 16,
    color: '#ff3b30'
  }
})
