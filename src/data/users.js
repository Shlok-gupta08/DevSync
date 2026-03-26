// ============================================
// USER REGISTRY — Central user credentials & profiles
// Data Decoupling: UI components never import this directly.
// The store.js hydrates state from these data files.
// ============================================

const users = {
  shlok: {
    id: 'shlok',
    name: 'Shlok Gupta',
    handle: '@shlok_gupta',
    username: 'shlok_gupta',
    password: 'shlok123',
    avatar: 'SG',
    badge: 'Full Stack Dev',
    karma: 4521,
    bio: '🚀 Full-stack developer | React & Node.js enthusiast | Building the future one commit at a time',
    currentlyLearning: 'Rust',
    github: 'shlok-gupta',
    website: 'https://devsync.dev/user/shlok_gupta',
    location: 'Delhi, India',
    joinedDate: 'Jan 2024',
    snippets: 156,
    refactors: 89,
    followers: 1200,
    following: 342,
    isPrivate: false,
  },
  saksham: {
    id: 'saksham',
    name: 'Saksham Gupta',
    handle: '@saksham_gupta',
    username: 'saksham_gupta',
    password: 'saksham123',
    avatar: 'SG',
    badge: 'Backend Architect',
    karma: 3845,
    bio: '☕ Java & Spring Boot | Microservices wizard | Clean code advocate | Open-source contributor',
    currentlyLearning: 'Go',
    github: 'saksham-gupta',
    website: 'https://devsync.dev/user/saksham_gupta',
    location: 'Lucknow, India',
    joinedDate: 'Mar 2024',
    snippets: 132,
    refactors: 67,
    followers: 890,
    following: 215,
    isPrivate: false,
  },
  krrish: {
    id: 'krrish',
    name: 'Krrish Gautam',
    handle: '@krrish_gautam',
    username: 'krrish_gautam',
    password: 'krrish123',
    avatar: 'KG',
    badge: 'Systems Hacker',
    karma: 5210,
    bio: '⚙️ C++ & Rust | Systems programming | Competitive programmer | Low-level performance junkie',
    currentlyLearning: 'Zig',
    github: 'krrish-gautam',
    website: 'https://devsync.dev/user/krrish_gautam',
    location: 'Pune, India',
    joinedDate: 'Feb 2024',
    snippets: 203,
    refactors: 124,
    followers: 1560,
    following: 178,
    isPrivate: false,
  },
}

// Authenticate user — returns user profile or null
export const authenticateUser = (username, password) => {
  const user = Object.values(users).find(
    u => u.username === username && u.password === password
  )
  if (!user) return null
  // Return profile without password
  const { password: _, ...profile } = user
  return profile
}

// Check if username exists
export const usernameExists = (username) => {
  return Object.values(users).some(u => u.username === username)
}

// Register a new user — returns user profile or null if username taken
export const registerUser = (username, password) => {
  if (usernameExists(username)) return null

  const id = username.toLowerCase().replace(/[^a-z0-9_]/g, '')
  const initials = username.split('_').map(w => w[0]?.toUpperCase() || '').join('').slice(0, 3) || 'U'
  const now = new Date()
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const newUser = {
    id,
    name: username.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    handle: `@${username}`,
    username,
    password,
    avatar: initials,
    badge: 'Newcomer',
    karma: 0,
    bio: '',
    currentlyLearning: '',
    github: '',
    website: `https://devsync.dev/user/${username}`,
    location: '',
    joinedDate: `${monthNames[now.getMonth()]} ${now.getFullYear()}`,
    snippets: 0,
    refactors: 0,
    followers: 0,
    following: 0,
    isPrivate: false,
  }

  users[id] = newUser
  const { password: _, ...profile } = newUser
  return profile
}

// Get user profile by ID
export const getUserById = (userId) => {
  const user = users[userId]
  if (!user) return null
  const { password: _, ...profile } = user
  return profile
}

// Get all saved/preset users (for display, no passwords)
export const getSavedProfiles = () => {
  const presetIds = ['shlok', 'saksham', 'krrish']
  return presetIds
    .filter(id => users[id])
    .map(id => {
      const { password: _, ...profile } = users[id]
      return profile
    })
}

// Get all users (for display, no passwords)
export const getAllUsers = () => {
  return Object.values(users).map(({ password: _, ...profile }) => profile)
}

export default users
