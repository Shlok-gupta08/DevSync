// Centralized data store - easily replaceable with database calls
// This file provides mock data and helper functions for testing UI without auth

// ============================================
// MOCK DATA - Replace with API calls when DB is ready
// ============================================

export const mockPosts = [
  {
    id: 1,
    user: { name: 'Arjun Sharma', handle: '@arjunsharma', avatar: 'AS', badge: 'Python Expert', karma: 2840 },
    content: 'Just optimized this sorting algorithm. Can anyone do better? 🚀',
    code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr

# Time Complexity: O(n²)
# Space Complexity: O(1)`,
    language: 'python',
    refactors: 12,
    comments: 42,
    runs: 156,
    time: '2h ago',
    liked: false,
    bookmarked: false,
    upvotes: 89
  },
  {
    id: 2,
    user: { name: 'Priya Patel', handle: '@priyapatel', avatar: 'PP', badge: 'React Pro', karma: 4521 },
    content: 'Clean way to debounce in React hooks. Thoughts? ✨',
    code: `import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
}`,
    language: 'javascript',
    refactors: 8,
    comments: 23,
    runs: 89,
    time: '4h ago',
    liked: true,
    bookmarked: true,
    upvotes: 156
  },
  {
    id: 3,
    user: { name: 'Vikram Reddy', handle: '@vikramreddy', avatar: 'VR', badge: 'DSA Master', karma: 7823 },
    content: 'Binary search but make it recursive 🦉💻',
    code: `int binarySearch(int arr[], int l, int r, int x) {
    if (r >= l) {
        int mid = l + (r - l) / 2;
        
        if (arr[mid] == x)
            return mid;
            
        if (arr[mid] > x)
            return binarySearch(arr, l, mid - 1, x);
            
        return binarySearch(arr, mid + 1, r, x);
    }
    return -1;
}`,
    language: 'cpp',
    refactors: 5,
    comments: 18,
    runs: 234,
    time: '6h ago',
    liked: false,
    bookmarked: false,
    upvotes: 67
  }
]

export const mockNotifications = [
  { id: 1, type: 'refactor', user: 'Arjun Sharma', avatar: 'AS', karma: 4250, action: 'suggested a refactor on your snippet', content: 'useAuth hook optimization', time: '2m ago', unread: true, language: 'typescript' },
  { id: 2, type: 'star', user: 'Priya Patel', avatar: 'PP', karma: 3890, action: 'starred your code snippet', content: 'React Query caching pattern', time: '15m ago', unread: true, stars: 142 },
  { id: 3, type: 'pr_approved', user: 'Vikram Reddy', avatar: 'VR', karma: 2100, action: 'approved your pull request', content: 'feat: add rate limiting', time: '1h ago', unread: true, repo: 'devsync-api' },
  { id: 4, type: 'comment', user: 'Neha Gupta', avatar: 'NG', karma: 1890, action: 'commented on your snippet', content: 'This could use memoization for perf', time: '2h ago', unread: false },
  { id: 5, type: 'follow', user: 'Rahul Verma', avatar: 'RV', karma: 980, action: 'started following you', content: null, time: '3h ago', unread: false, skills: ['Go', 'Rust'] },
  { id: 6, type: 'pr_merged', user: 'DevTeam Bot', avatar: '🤖', karma: null, action: 'merged your pull request', content: 'fix: auth token refresh', time: '5h ago', unread: false, repo: 'auth-service' },
  { id: 7, type: 'mention', user: 'Arjun Sharma', avatar: 'AS', karma: 4250, action: 'mentioned you in a discussion', content: '@you might know the answer to this', time: '1d ago', unread: false },
]

export const mockConversations = [
  { 
    id: 1, 
    name: 'Arjun Sharma', 
    handle: '@arjunsharma', 
    avatar: 'AS', 
    lastMessage: 'Check out this fix for the auth bug',
    time: '2m',
    karma: 4250,
    skills: ['React', 'Node'],
    hasCode: true,
    project: 'auth-service',
    unread: 2
  },
  { 
    id: 2, 
    name: 'Priya Patel', 
    handle: '@priyapatel', 
    avatar: 'PP', 
    lastMessage: 'The PR looks good, merging now 🚀',
    time: '15m',
    karma: 3890,
    skills: ['Python', 'ML'],
    hasCode: false,
    project: null,
    unread: 0
  },
  { 
    id: 3, 
    name: 'DevSquad Alpha', 
    handle: '4 members', 
    avatar: '👥', 
    lastMessage: 'Vikram: Refactored the API layer',
    time: '1h',
    karma: null,
    skills: [],
    hasCode: true,
    project: 'devsync-api',
    isGroup: true,
    unread: 5
  },
]

export const mockComments = {
  1: [
    { id: 'c1', user: { name: 'Neha Gupta', avatar: 'NG', handle: '@nehagupta' }, text: 'Try using insertion sort for small arrays!', time: '1h ago', likes: 12 },
    { id: 'c2', user: { name: 'Rahul Verma', avatar: 'RV', handle: '@rahulverma' }, text: 'The time complexity could be improved with merge sort', time: '45m ago', likes: 8 },
  ],
  2: [
    { id: 'c3', user: { name: 'Arjun Sharma', avatar: 'AS', handle: '@arjunsharma' }, text: 'Great pattern! I use this all the time', time: '2h ago', likes: 24 },
  ],
  3: []
}

export const mockBugStories = [
  { id: 1, user: 'AS', name: 'Arjun', error: 'TypeError', solved: false, description: 'Getting undefined when accessing nested properties', code: 'const value = obj?.nested?.deep?.value', language: 'javascript' },
  { id: 2, user: 'PP', name: 'Priya', error: 'CORS', solved: true, description: 'Cross-origin request blocked', code: 'fetch(url, { mode: "cors" })', language: 'javascript' },
  { id: 3, user: 'VR', name: 'Vikram', error: 'Segfault', solved: false, description: 'Segmentation fault in pointer arithmetic', code: 'int* ptr = arr + n;', language: 'cpp' },
  { id: 4, user: 'NG', name: 'Neha', error: 'NPE', solved: false, description: 'Null pointer exception in stream', code: 'list.stream().filter(Objects::nonNull)', language: 'java' },
  { id: 5, user: 'RV', name: 'Rahul', error: '404', solved: true, description: 'Route not found in API', code: 'router.get("/api/v2/users")', language: 'javascript' },
]

export const mockChallenges = [
  {
    id: 1,
    title: 'Binary Tree Max Path Sum',
    difficulty: 'Hard',
    participants: 3420,
    prize: '500 Karma',
    timeLeft: '2d 14h',
    tags: ['Trees', 'DFS', 'Dynamic Programming'],
    joined: false,
    description: 'Find the maximum path sum in a binary tree. The path may start and end at any node.'
  },
  {
    id: 2,
    title: 'Rate Limiter Design',
    difficulty: 'Medium',
    participants: 2156,
    prize: '300 Karma',
    timeLeft: '5d 8h',
    tags: ['System Design', 'Redis', 'Algorithms'],
    joined: true,
    description: 'Design a rate limiter that limits requests based on IP address.'
  },
  {
    id: 3,
    title: 'CSS Grid Art Challenge',
    difficulty: 'Easy',
    participants: 4892,
    prize: '100 Karma',
    timeLeft: '1d 2h',
    tags: ['CSS', 'Creative', 'Frontend'],
    joined: false,
    description: 'Create an artistic design using only CSS Grid.'
  },
]

export const mockFollowers = [
  { id: 1, name: 'Arjun Sharma', handle: '@arjunsharma', avatar: 'AS', karma: 4250, skills: ['React', 'Node'], following: true },
  { id: 2, name: 'Priya Patel', handle: '@priyapatel', avatar: 'PP', karma: 3890, skills: ['Python', 'ML'], following: true },
  { id: 3, name: 'Vikram Reddy', handle: '@vikramreddy', avatar: 'VR', karma: 7823, skills: ['DSA', 'C++'], following: false },
  { id: 4, name: 'Neha Gupta', handle: '@nehagupta', avatar: 'NG', karma: 2150, skills: ['Rust', 'Go'], following: true },
]

export const mockFollowing = [
  { id: 1, name: 'Dan Abramov', handle: '@dan_abramov', avatar: 'DA', karma: 125000, skills: ['React', 'Redux'], following: true },
  { id: 2, name: 'Kent C. Dodds', handle: '@kentcdodds', avatar: 'KC', karma: 98000, skills: ['Testing', 'React'], following: true },
  { id: 3, name: 'Ryan Florence', handle: '@ryanflorence', avatar: 'RF', karma: 87000, skills: ['Remix', 'React'], following: true },
]

// ============================================
// HELPER FUNCTIONS - Replace internals with API calls
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
