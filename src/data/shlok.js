// ============================================
// SHLOK GUPTA — User-specific data
// Full-stack / React-focused developer feed
// ============================================

export const posts = [
  {
    id: 's1',
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
    id: 's2',
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
    id: 's3',
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

export const notifications = [
  { id: 'sn1', type: 'refactor', user: 'Arjun Sharma', avatar: 'AS', karma: 4250, action: 'suggested a refactor on your snippet', content: 'useAuth hook optimization', time: '2m ago', unread: true, language: 'typescript' },
  { id: 'sn2', type: 'star', user: 'Priya Patel', avatar: 'PP', karma: 3890, action: 'starred your code snippet', content: 'React Query caching pattern', time: '15m ago', unread: true, stars: 142 },
  { id: 'sn3', type: 'pr_approved', user: 'Vikram Reddy', avatar: 'VR', karma: 2100, action: 'approved your pull request', content: 'feat: add rate limiting', time: '1h ago', unread: true, repo: 'devsync-api' },
  { id: 'sn4', type: 'comment', user: 'Neha Gupta', avatar: 'NG', karma: 1890, action: 'commented on your snippet', content: 'This could use memoization for perf', time: '2h ago', unread: false },
  { id: 'sn5', type: 'follow', user: 'Rahul Verma', avatar: 'RV', karma: 980, action: 'started following you', content: null, time: '3h ago', unread: false, skills: ['Go', 'Rust'] },
  { id: 'sn6', type: 'pr_merged', user: 'DevTeam Bot', avatar: '🤖', karma: null, action: 'merged your pull request', content: 'fix: auth token refresh', time: '5h ago', unread: false, repo: 'auth-service' },
  { id: 'sn7', type: 'mention', user: 'Arjun Sharma', avatar: 'AS', karma: 4250, action: 'mentioned you in a discussion', content: '@you might know the answer to this', time: '1d ago', unread: false },
]

export const conversations = [
  { 
    id: 'sc1', 
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
    id: 'sc2', 
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
    id: 'sc3', 
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

export const comments = {
  's1': [
    { id: 'sc1a', user: { name: 'Neha Gupta', avatar: 'NG', handle: '@nehagupta' }, text: 'Try using insertion sort for small arrays!', time: '1h ago', likes: 12 },
    { id: 'sc1b', user: { name: 'Rahul Verma', avatar: 'RV', handle: '@rahulverma' }, text: 'The time complexity could be improved with merge sort', time: '45m ago', likes: 8 },
  ],
  's2': [
    { id: 'sc2a', user: { name: 'Arjun Sharma', avatar: 'AS', handle: '@arjunsharma' }, text: 'Great pattern! I use this all the time', time: '2h ago', likes: 24 },
  ],
  's3': []
}

export const bugStories = [
  { id: 'sb1', user: 'AS', name: 'Arjun', error: 'TypeError', solved: false, description: 'Getting undefined when accessing nested properties', code: 'const value = obj?.nested?.deep?.value', language: 'javascript' },
  { id: 'sb2', user: 'PP', name: 'Priya', error: 'CORS', solved: true, description: 'Cross-origin request blocked', code: 'fetch(url, { mode: "cors" })', language: 'javascript' },
  { id: 'sb3', user: 'VR', name: 'Vikram', error: 'Segfault', solved: false, description: 'Segmentation fault in pointer arithmetic', code: 'int* ptr = arr + n;', language: 'cpp' },
  { id: 'sb4', user: 'NG', name: 'Neha', error: 'NPE', solved: false, description: 'Null pointer exception in stream', code: 'list.stream().filter(Objects::nonNull)', language: 'java' },
  { id: 'sb5', user: 'RV', name: 'Rahul', error: '404', solved: true, description: 'Route not found in API', code: 'router.get("/api/v2/users")', language: 'javascript' },
]
