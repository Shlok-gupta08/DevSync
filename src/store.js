// ============================================
// CENTRALIZED DATA STORE
// ============================================

import { authenticateUser, getUserById, getAllUsers, registerUser, usernameExists, getSavedProfiles } from './data/users'
import * as shlokData from './data/shlok'
import * as sakshamData from './data/saksham'
import * as krrishData from './data/krrish'

// ============================================
// USER DATA REGISTRY — Maps user IDs to their data modules
// ============================================

const userDataMap = {
  shlok: shlokData,
  saksham: sakshamData,
  krrish: krrishData,
}

// ============================================
// STATE HYDRATION FUNCTION
// ============================================

export const getUserData = (userId) => {
  const data = userDataMap[userId]
  if (!data) return null
  return {
    posts: data.posts || [],
    notifications: data.notifications || [],
    conversations: data.conversations || [],
    comments: data.comments || {},
    bugStories: data.bugStories || [],
  }
}

// Re-export auth functions
export { authenticateUser, getUserById, getAllUsers, registerUser, usernameExists, getSavedProfiles }

// ============================================
// HELPER FUNCTIONS — Replace internals with API calls
// ============================================

// Generate unique IDs
export const generateId = () => Date.now() + Math.random().toString(36).substr(2, 9)

// Format time ago
export const formatTimeAgo = (date) => {
  const now = new Date()
  const diff = now - date
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}

// Count unread items
export const getUnreadCount = (notifications) => {
  return notifications.filter(n => n.unread).length
}

export const getUnreadMessageCount = (conversations) => {
  return conversations.reduce((acc, conv) => acc + (conv.unread || 0), 0)
}

// Mock code outputs for "Run" functionality  
export const mockOutputs = {
  python: '>>> [1, 2, 3, 4, 5, 6, 7, 8, 9]\nSorted in 0.0023ms',
  javascript: 'useDebounce initialized\nValue updated after 300ms delay',
  cpp: '> Element found at index: 4\n> Execution time: 0.001ms',
  java: '> Compiled successfully\n> Output: Hello World',
  rust: '> Compiled in 0.2s\n> Running...\n> Done!',
  go: '> go run main.go\n> Output: Success',
  typescript: '> tsc compiled\n> Output: Types checked'
}

// Share functionality
export const sharePost = async (post) => {
  const shareUrl = `https://devsync.dev/snippet/${post.id}`
  const shareText = `Check out this ${post.language} snippet by ${post.user.name}: "${post.content}"`

  if (navigator.share) {
    try {
      await navigator.share({
        title: 'DevSync Code Snippet',
        text: shareText,
        url: shareUrl
      })
      return { success: true, method: 'native' }
    } catch (err) {
      // User cancelled or share failed
    }
  }

  // Fallback to clipboard
  try {
    await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`)
    return { success: true, method: 'clipboard' }
  } catch (err) {
    return { success: false }
  }
}

// Share profile
export const shareProfile = async (user) => {
  const shareUrl = `https://devsync.dev/user/${user.handle.replace('@', '')}`
  const shareText = `Check out ${user.name}'s profile on DevSync - ${user.karma} karma!`

  if (navigator.share) {
    try {
      await navigator.share({
        title: `${user.name} on DevSync`,
        text: shareText,
        url: shareUrl
      })
      return { success: true, method: 'native' }
    } catch (err) {
      // User cancelled
    }
  }

  try {
    await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`)
    return { success: true, method: 'clipboard' }
  } catch (err) {
    return { success: false }
  }
}
