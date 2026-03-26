import { useState, useCallback } from 'react'
import Sidebar from './components/Sidebar'
import RightPanel from './components/RightPanel'
import Feed from './components/Feed'
import Profile from './components/Profile'
import Explore from './components/Explore'
import Messages from './components/Messages'
import Notifications from './components/Notifications'
import Badges from './components/Badges'
import CreatePostModal from './components/CreatePostModal'
import RefactorModal from './components/RefactorModal'
import LoginPage from './components/LoginPage'
import { ToastProvider, useToast } from './components/Toast'
import { authenticateUser, getUserData, generateId, sharePost, shareProfile, registerUser, getSavedProfiles, getUserById } from './store'

function AppContent() {
  const toast = useToast()

  // ============================================
  // AUTH STATE — Security Simulation
  // ============================================
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  // Page navigation
  const [currentPage, setCurrentPage] = useState('home')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showRefactorModal, setShowRefactorModal] = useState(null)
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState({ stories: false, trending: false, suggestions: false })
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // ============================================
  // DATA STATE — Hydrated on login from per-user files.
  // ============================================
  const [posts, setPosts] = useState([])
  const [comments, setComments] = useState({})
  const [notifications, setNotifications] = useState([])
  const [conversations, setConversations] = useState([])
  const [bugStories, setBugStories] = useState([])

  // Navigation helpers
  const [initialChatId, setInitialChatId] = useState(null)
  const [feedFilter, setFeedFilter] = useState('latest')

  // ============================================
  // LOGIN HANDLER — State Hydration
  // ============================================
  const handleLogin = useCallback((username, password, directId) => {
    let user
    if (directId) {
      // Direct login from saved profiles — bypass password check
      user = getUserById(directId)
    } else {
      user = authenticateUser(username, password)
    }
    if (!user) return false

    // Hydrate state with user-specific data
    const data = getUserData(user.id)

    setCurrentUser(user)
    // If no data file exists (new user), use empty arrays
    setPosts(data?.posts || [])
    setComments(data?.comments || {})
    setNotifications(data?.notifications || [])
    setConversations(data?.conversations || [])
    setBugStories(data?.bugStories || [])
    setIsLoggedIn(true)
    setCurrentPage('home')
    setFeedFilter('latest')

    return true
  }, [])

  // ============================================
  // SIGNUP HANDLER — Creates new user account
  // ============================================
  const handleSignUp = useCallback((username, password) => {
    const user = registerUser(username, password)
    if (!user) return false

    // New user — empty data
    setCurrentUser(user)
    setPosts([])
    setComments({})
    setNotifications([])
    setConversations([])
    setBugStories([])
    setIsLoggedIn(true)
    setCurrentPage('home')
    setFeedFilter('latest')

    return true
  }, [])

  // ============================================
  // LOGOUT HANDLER — Clears all state
  // Returns to login page, all data is wiped.
  // ============================================
  const handleLogout = useCallback(() => {
    setIsLoggedIn(false)
    setCurrentUser(null)
    setPosts([])
    setComments({})
    setNotifications([])
    setConversations([])
    setBugStories([])
    setCurrentPage('home')
    setFeedFilter('latest')
    setInitialChatId(null)
    setShowCreateModal(false)
    setShowRefactorModal(null)
  }, [])

  // ============================================
  // PROTECTED ROUTE PATTERN
  // If not logged in, ONLY the login page renders.
  // Feed, Sidebar, Profile are physically unreachable.
  // ============================================
  if (!isLoggedIn) {
    return (
      <LoginPage
        onLogin={handleLogin}
        onSignUp={handleSignUp}
        savedProfiles={getSavedProfiles()}
      />
    )
  }

  // ============================================
  // Below here: user IS authenticated.
  // All handlers work with hydrated state.
  // ============================================

  // Create new post
  const handleCreatePost = (content, code, language) => {
    const newPost = {
      id: generateId(),
      user: {
        name: currentUser.name,
        handle: currentUser.handle,
        avatar: currentUser.avatar,
        badge: currentUser.badge,
        karma: currentUser.karma
      },
      content,
      code,
      language,
      refactors: 0,
      comments: 0,
      runs: 0,
      time: 'Just now',
      liked: false,
      bookmarked: false,
      upvotes: 0
    }
    setPosts([newPost, ...posts])
    setComments({ ...comments, [newPost.id]: [] })
    setShowCreateModal(false)
    toast.success('Snippet posted successfully!')
  }

  // Upvote/Like a post
  const handleLike = (postId) => {
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          upvotes: post.liked ? post.upvotes - 1 : post.upvotes + 1
        }
      }
      return post
    }))
  }

  // Bookmark a post
  const handleBookmark = (postId) => {
    let toastMessage = ''
    let toastType = 'info'
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        const newBookmarked = !post.bookmarked
        toastMessage = newBookmarked ? 'Saved to bookmarks' : 'Removed from bookmarks'
        toastType = newBookmarked ? 'success' : 'info'
        return { ...post, bookmarked: newBookmarked }
      }
      return post
    }))
    if (toastMessage) {
      toastType === 'success' ? toast.success(toastMessage) : toast.info(toastMessage)
    }
  }

  // Open refactor modal
  const handleRefactor = (postId) => {
    const post = posts.find(p => p.id === postId)
    setShowRefactorModal(post)
  }

  // Submit refactor
  const handleSubmitRefactor = (postId, refactoredCode, explanation) => {
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        return { ...post, refactors: post.refactors + 1 }
      }
      return post
    }))
    // Add notification to post author
    const post = posts.find(p => p.id === postId)
    if (post) {
      const newNotification = {
        id: generateId(),
        type: 'refactor',
        user: { name: currentUser.name, handle: currentUser.handle, avatar: currentUser.avatar },
        content: explanation ? `suggested a refactor: "${explanation.slice(0, 50)}..."` : 'submitted a refactor for your code',
        time: 'Just now',
        unread: true
      }
      setNotifications(prev => [newNotification, ...prev])
    }
    setShowRefactorModal(null)
    toast.success('Refactor submitted! The author will be notified.')
  }

  // Add comment
  const handleAddComment = (postId, text) => {
    const newComment = {
      id: generateId(),
      user: { name: currentUser.name, avatar: currentUser.avatar, handle: currentUser.handle },
      text,
      time: 'Just now',
      likes: 0
    }
    setComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment]
    }))
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        return { ...post, comments: post.comments + 1 }
      }
      return post
    }))
    toast.success('Comment added!')
  }

  // Delete post
  const handleDeletePost = (postId) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId))
    toast.info('Snippet deleted')
  }

  // Report post
  const handleReportPost = (postId) => {
    toast.success('Report submitted. We\'ll review it shortly.')
  }

  // Share post
  const handleSharePost = async (post) => {
    const result = await sharePost(post)
    if (result.success) {
      if (result.method === 'clipboard') {
        toast.success('Link copied to clipboard!')
      } else {
        toast.success('Shared successfully!')
      }
    } else {
      toast.error('Failed to share')
    }
  }

  // Run code (mock)
  const handleRunCode = (postId) => {
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        return { ...post, runs: post.runs + 1 }
      }
      return post
    }))
  }

  // Mark notification as read
  const handleMarkNotificationRead = (notificationId) => {
    setNotifications(prev => prev.map(n =>
      n.id === notificationId ? { ...n, unread: false } : n
    ))
  }

  // Mark all notifications as read
  const handleMarkAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })))
    toast.success('All notifications marked as read')
  }

  // Clear notification
  const handleClearNotification = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId))
  }

  // Mark conversation as read
  const handleMarkConversationRead = (conversationId) => {
    setConversations(prev => prev.map(c =>
      c.id === conversationId ? { ...c, unread: 0 } : c
    ))
  }

  // Solve bug story
  const handleSolveBug = (bugId) => {
    setBugStories(prev => prev.map(bug =>
      bug.id === bugId ? { ...bug, solved: true } : bug
    ))
    toast.success('🎉 Bug marked as solved! +25 karma')
    setCurrentUser(prev => ({ ...prev, karma: prev.karma + 25 }))
  }

  // Discuss bug solution - opens DM with the bug author
  const handleDiscussBug = (bug) => {
    // Find existing conversation matching the bug author's avatar
    let conv = conversations.find(c => c.avatar === bug.user)

    if (!conv) {
      // Create new conversation for this bug author
      conv = {
        id: Date.now(),
        name: bug.name || 'Developer',
        handle: `@${(bug.name || 'dev').toLowerCase().replace(/\s/g, '')}`,
        avatar: bug.user,
        lastMessage: `Let's discuss: ${bug.error} - ${bug.description}`,
        time: 'now',
        karma: null,
        skills: [],
        hasCode: true,
        project: null,
        unread: 0
      }
      setConversations(prev => [conv, ...prev])
    }

    setInitialChatId(conv.id)
    setCurrentPage('messages')
    toast.info(`Opening chat about ${bug.error} bug with ${bug.name}...`)
  }

  // Update profile
  const handleUpdateProfile = (updates) => {
    setCurrentUser(prev => ({ ...prev, ...updates }))
    toast.success('Profile updated!')
  }

  // Share profile
  const handleShareProfile = async () => {
    const result = await shareProfile(currentUser)
    if (result.success) {
      if (result.method === 'clipboard') {
        toast.success('Profile link copied!')
      }
    }
  }

  // Get counts for badges
  const unreadNotifications = notifications.filter(n => n.unread).length
  const unreadMessages = conversations.reduce((acc, c) => acc + (c.unread || 0), 0)

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Feed
            posts={posts}
            onLike={handleLike}
            onRefactor={handleRefactor}
            onBookmark={handleBookmark}
            onComment={handleAddComment}
            onDelete={handleDeletePost}
            onReport={handleReportPost}
            onShare={handleSharePost}
            onRunCode={handleRunCode}
            currentUser={currentUser}
            comments={comments}
            bugStories={bugStories}
            onSolveBug={handleSolveBug}
            onDiscussBug={handleDiscussBug}
            feedFilter={feedFilter}
            setFeedFilter={setFeedFilter}
          />
        )
      case 'explore':
        return <Explore toast={toast} />
      case 'messages':
        return (
          <Messages
            currentUser={currentUser}
            conversations={conversations}
            onMarkRead={handleMarkConversationRead}
            toast={toast}
            initialChatId={initialChatId}
          />
        )
      case 'notifications':
        return (
          <Notifications
            currentUser={currentUser}
            notifications={notifications}
            onMarkRead={handleMarkNotificationRead}
            onMarkAllRead={handleMarkAllNotificationsRead}
            onClear={handleClearNotification}
            toast={toast}
          />
        )
      case 'profile':
        return (
          <Profile
            posts={posts.filter(p => p.user.handle === currentUser.handle)}
            onLike={handleLike}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            onUpdateProfile={handleUpdateProfile}
            onShareProfile={handleShareProfile}
            savedPosts={posts.filter(p => p.bookmarked)}
            toast={toast}
          />
        )
      case 'badges':
        return (
          <Badges
            currentUser={currentUser}
            toast={toast}
          />
        )
      default:
        return (
          <Feed
            posts={posts}
            onLike={handleLike}
            onRefactor={handleRefactor}
            onBookmark={handleBookmark}
            onComment={handleAddComment}
            onDelete={handleDeletePost}
            onReport={handleReportPost}
            onShare={handleSharePost}
            onRunCode={handleRunCode}
            currentUser={currentUser}
            comments={comments}
            bugStories={bugStories}
            onSolveBug={handleSolveBug}
            onDiscussBug={handleDiscussBug}
            feedFilter={feedFilter}
            setFeedFilter={setFeedFilter}
          />
        )
    }
  }

  const showRightPanel = currentPage === 'home'

  return (
    <div className={`app-container ${!showRightPanel ? 'no-right-panel' : ''} ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onCreateClick={() => setShowCreateModal(true)}
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
        currentUser={currentUser}
        unreadNotifications={unreadNotifications}
        unreadMessages={unreadMessages}
        onLogout={handleLogout}
      />
      <main className={`main-content ${!showRightPanel ? 'full-width' : ''}`}>
        {renderPage()}
      </main>
      {showRightPanel && (
        <RightPanel
          collapsed={rightPanelCollapsed}
          setCollapsed={setRightPanelCollapsed}
          toast={toast}
        />
      )}
      {showCreateModal && (
        <CreatePostModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreatePost}
        />
      )}
      {showRefactorModal && (
        <RefactorModal
          post={showRefactorModal}
          onClose={() => setShowRefactorModal(null)}
          onSubmit={handleSubmitRefactor}
          toast={toast}
        />
      )}
    </div>
  )
}

function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  )
}

export default App
