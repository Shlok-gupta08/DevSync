import { useState, useCallback, useEffect } from 'react'
import { Send, Code, GitBranch, Play, Copy, Check, Terminal, MoreVertical, Users, Plus, ChevronDown, ChevronRight, Zap, Bookmark, MessageCircle, X, FileCode, Image, Search, UserPlus, Trash2 } from 'lucide-react'

function Messages({ currentUser, conversations: propConversations, onMarkRead, toast, initialChatId }) {
  const [conversations, setConversations] = useState(propConversations || [
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
      project: 'auth-service'
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
      project: null
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
      isGroup: true
    },
    { 
      id: 4, 
      name: 'Neha Gupta', 
      handle: '@nehagupta', 
      avatar: 'NG', 
      lastMessage: 'Thanks for the code review!',
      time: '3h',
      karma: 2150,
      skills: ['Rust', 'Go'],
      hasCode: false,
      project: null
    },
  ])

  // Saved posts/problems that can be attached to messages
  const [savedPosts] = useState([
    {
      id: 'sp1',
      title: 'Bubble Sort Optimization',
      author: 'Arjun Sharma',
      type: 'code',
      language: 'python',
      preview: 'def bubble_sort(arr): ...',
      code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr`,
      savedAt: '2h ago'
    },
    {
      id: 'sp2',
      title: 'React useDebounce Hook',
      author: 'Priya Patel',
      type: 'code',
      language: 'javascript',
      preview: 'function useDebounce(value, delay) ...',
      code: `function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}`,
      savedAt: '1d ago'
    },
    {
      id: 'sp3',
      title: 'Auth Token Bug Fix',
      author: 'You',
      type: 'story',
      preview: 'Discussion about token refresh logic...',
      savedAt: '3d ago'
    }
  ])

  const [selectedChat, setSelectedChat] = useState(conversations[0] || null)
  const [showSavedPicker, setShowSavedPicker] = useState(false)
  const [expandedBubbles, setExpandedBubbles] = useState({})
  const [showNewChatModal, setShowNewChatModal] = useState(false)
  const [newChatSearch, setNewChatSearch] = useState('')
  const [showChatMenu, setShowChatMenu] = useState(false)
  const [threadReplies, setThreadReplies] = useState({})

  // Handle initial chat selection from bug discussion
  useEffect(() => {
    if (initialChatId && propConversations) {
      const target = propConversations.find(c => c.id === initialChatId)
      if (target) {
        // Add conversation if not already in local state
        if (!conversations.find(c => c.id === initialChatId)) {
          setConversations(propConversations)
        }
        setSelectedChat(target)
        // Set an initial message about the bug discussion
        setMessages(prev => {
          if (prev.length === 0 || prev[prev.length - 1]?.text !== target.lastMessage) {
            return [...prev, {
              id: Date.now(),
              text: target.lastMessage,
              sent: true,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]
          }
          return prev
        })
      }
    }
  }, [initialChatId])
  
  // Available users to start chat with
  const [availableUsers] = useState([
    { id: 101, name: 'Vikram Singh', handle: '@vikramsingh', avatar: 'VS', karma: 5200, skills: ['Go', 'Kubernetes'] },
    { id: 102, name: 'Riya Mehta', handle: '@riyamehta', avatar: 'RM', karma: 3100, skills: ['Vue', 'Firebase'] },
    { id: 103, name: 'Karan Kumar', handle: '@karankumar', avatar: 'KK', karma: 2800, skills: ['Java', 'Spring'] },
    { id: 104, name: 'Ananya Reddy', handle: '@ananyareddy', avatar: 'AR', karma: 4500, skills: ['Swift', 'iOS'] },
    { id: 105, name: 'Rahul Verma', handle: '@rahulverma', avatar: 'RV', karma: 1900, skills: ['PHP', 'Laravel'] },
  ])
  
  // Messages grouped by context (post/story bubbles like iMessage)
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: 'Hey! Found that auth bug we discussed',
      sent: false,
      time: '10:32 AM'
    },
    {
      // This is a grouped bubble - like iMessage topic clusters
      id: 'bubble-1',
      type: 'context-bubble',
      contextType: 'code',
      contextTitle: 'Auth Token Refresh Bug',
      contextAuthor: 'Arjun Sharma',
      language: 'javascript',
      code: `async function refreshToken(token) {
  // Bug was here - wasn't checking expiry
  if (isExpired(token)) {
    return await fetchNewToken();
  }
  return token;
}`,
      time: '10:32 AM',
      messageCount: 4,
      messages: [
        { id: 'b1m1', text: 'The issue was in the token refresh logic', sent: false, time: '10:32 AM' },
        { id: 'b1m2', text: 'What about edge cases?', sent: true, time: '10:33 AM' },
        { id: 'b1m3', text: 'Added null check in the updated version', sent: false, time: '10:34 AM' },
        { id: 'b1m4', text: 'Perfect, LGTM 👍', sent: true, time: '10:34 AM' },
      ]
    },
    { 
      id: 3, 
      text: 'Nice catch! Let me check the implementation',
      sent: true,
      time: '10:35 AM'
    },
    {
      id: 'bubble-2',
      type: 'context-bubble',
      contextType: 'code',
      contextTitle: 'Fixed Auth Token Refresh',
      contextAuthor: 'Arjun Sharma',
      language: 'javascript',
      code: `async function refreshToken(token) {
  const decoded = jwt.decode(token);
  const buffer = 60 * 1000; // 1 min buffer
  
  if (Date.now() >= decoded.exp * 1000 - buffer) {
    return await fetchNewToken();
  }
  return token;
}`,
      time: '10:40 AM',
      messageCount: 2,
      messages: [
        { id: 'b2m1', text: 'Check out this fix for the auth bug', sent: false, time: '10:40 AM' },
        { id: 'b2m2', text: 'This looks much better! 🚀', sent: true, time: '10:41 AM' },
      ]
    },
  ])
  const [newMessage, setNewMessage] = useState('')
  const [showCodeInput, setShowCodeInput] = useState(false)
  const [codeInput, setCodeInput] = useState('')
  const [codeLang, setCodeLang] = useState('javascript')
  const [copiedId, setCopiedId] = useState(null)
  const [attachedPost, setAttachedPost] = useState(null)

  const languages = [
    { name: 'JavaScript', value: 'javascript', color: '#f7df1e' },
    { name: 'Python', value: 'python', color: '#3776ab' },
    { name: 'TypeScript', value: 'typescript', color: '#3178c6' },
    { name: 'Rust', value: 'rust', color: '#ce412b' },
  ]

  const toggleBubble = (bubbleId) => {
    setExpandedBubbles(prev => ({
      ...prev,
      [bubbleId]: !prev[bubbleId]
    }))
  }

  const attachSavedPost = (post) => {
    setAttachedPost(post)
    setShowSavedPicker(false)
  }

  const removeAttachment = () => {
    setAttachedPost(null)
  }

  const handleSelectChat = useCallback((conv) => {
    setSelectedChat(conv)
    if (conv.unread && onMarkRead) {
      onMarkRead(conv.id)
    }
  }, [onMarkRead])

  const handleStartNewChat = useCallback((user) => {
    // Check if conversation already exists
    const existing = conversations.find(c => c.handle === user.handle)
    if (existing) {
      setSelectedChat(existing)
      setShowNewChatModal(false)
      setNewChatSearch('')
      return
    }

    // Create new conversation
    const newConv = {
      id: Date.now(),
      name: user.name,
      handle: user.handle,
      avatar: user.avatar,
      lastMessage: 'Start a conversation...',
      time: 'now',
      karma: user.karma,
      skills: user.skills,
      hasCode: false,
      project: null,
      unread: false
    }
    
    setConversations(prev => [newConv, ...prev])
    setSelectedChat(newConv)
    setMessages([])
    setShowNewChatModal(false)
    setNewChatSearch('')
    toast && toast.success(`Started chat with ${user.name}`)
  }, [conversations, toast])

  const handleDeleteConversation = useCallback(() => {
    if (!selectedChat) return
    
    setConversations(prev => prev.filter(c => c.id !== selectedChat.id))
    setSelectedChat(conversations.find(c => c.id !== selectedChat.id) || null)
    setShowChatMenu(false)
    toast && toast.info('Conversation deleted')
  }, [selectedChat, conversations, toast])

  const handleThreadReply = useCallback((bubbleId, replyText) => {
    if (!replyText.trim()) return
    
    setMessages(prev => prev.map(msg => {
      if (msg.id === bubbleId && msg.type === 'context-bubble') {
        const newReply = {
          id: `reply-${Date.now()}`,
          text: replyText.trim(),
          sent: true,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
        return {
          ...msg,
          messageCount: msg.messageCount + 1,
          messages: [...msg.messages, newReply]
        }
      }
      return msg
    }))
    
    setThreadReplies(prev => ({ ...prev, [bubbleId]: '' }))
  }, [])

  const handleRunCode = useCallback((code, language) => {
    // Mock code execution
    const mockOutputs = {
      javascript: '> Output: Hello, World!\n> Execution time: 0.002s',
      python: '>>> Output: Hello, World!\n>>> Execution time: 0.001s',
      typescript: '> Output: Hello, World!\n> Compiled successfully',
      rust: '> Output: Hello, World!\n> Compiled in 0.5s'
    }
    toast && toast.info(mockOutputs[language] || 'Code executed successfully!')
  }, [toast])

  const filteredUsers = availableUsers.filter(user => 
    user.name.toLowerCase().includes(newChatSearch.toLowerCase()) ||
    user.handle.toLowerCase().includes(newChatSearch.toLowerCase()) ||
    user.skills.some(s => s.toLowerCase().includes(newChatSearch.toLowerCase()))
  )

  const sendMessage = () => {
    if (newMessage.trim() || (showCodeInput && codeInput.trim()) || attachedPost) {
      if (attachedPost) {
        // Create a new context bubble with the attached post
        const newBubble = {
          id: `bubble-${Date.now()}`,
          type: 'context-bubble',
          contextType: attachedPost.type,
          contextTitle: attachedPost.title,
          contextAuthor: attachedPost.author,
          language: attachedPost.language,
          code: attachedPost.code,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          messageCount: 1,
          messages: [
            { 
              id: `m-${Date.now()}`, 
              text: newMessage.trim() || `Shared: ${attachedPost.title}`, 
              sent: true, 
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
            }
          ]
        }
        setMessages([...messages, newBubble])
        setAttachedPost(null)
      } else {
        const msg = {
          id: Date.now(),
          text: newMessage.trim(),
          sent: true,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
        if (showCodeInput && codeInput.trim()) {
          msg.code = codeInput
          msg.language = codeLang
        }
        setMessages([...messages, msg])
      }
      setNewMessage('')
      setCodeInput('')
      setShowCodeInput(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !showCodeInput) {
      e.preventDefault()
      sendMessage()
    }
  }

  const copyCode = (code, id) => {
    navigator.clipboard.writeText(code)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const getLangColor = (lang) => {
    const l = languages.find(x => x.value === lang)
    return l ? l.color : '#888'
  }

  return (
    <div className="messages-page dev-messages">
      <header className="page-header">
        <h1 className="page-title">
          <Terminal size={24} className="title-icon" />
          DevChat
        </h1>
        <button className="new-chat-btn" onClick={() => setShowNewChatModal(true)}>
          <Plus size={18} />
          New Chat
        </button>
      </header>

      {/* New Chat Modal */}
      {showNewChatModal && (
        <div className="modal-overlay" onClick={() => setShowNewChatModal(false)}>
          <div className="new-chat-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                <UserPlus size={20} />
                Start New Chat
              </h2>
              <button className="modal-close" onClick={() => setShowNewChatModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="new-chat-search">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search developers by name, handle, or skill..."
                value={newChatSearch}
                onChange={(e) => setNewChatSearch(e.target.value)}
                autoFocus
              />
            </div>
            <div className="new-chat-users">
              {filteredUsers.length === 0 ? (
                <div className="no-users-found">
                  <p>No developers found matching "{newChatSearch}"</p>
                </div>
              ) : (
                filteredUsers.map(user => (
                  <div 
                    key={user.id} 
                    className="new-chat-user-item"
                    onClick={() => handleStartNewChat(user)}
                  >
                    <div className="message-avatar">{user.avatar}</div>
                    <div className="message-info">
                      <div className="message-name-row">
                        <span className="message-name">{user.name}</span>
                        <span className="msg-karma"><Zap size={10} />{user.karma}</span>
                      </div>
                      <div className="message-preview">{user.handle}</div>
                      <div className="user-skills">
                        {user.skills.map(skill => (
                          <span key={skill} className="skill-mini">{skill}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      <div className="messages-container">
        <div className="messages-list">
          <div className="messages-list-header">
            <span>Conversations</span>
            <span className="conv-count">{conversations.length}</span>
          </div>
          
          {conversations.map(conv => (
            <div 
              key={conv.id} 
              className={`message-item dev ${selectedChat?.id === conv.id ? 'active' : ''} ${conv.unread ? 'unread' : ''}`}
              onClick={() => handleSelectChat(conv)}
            >
              <div className={`message-avatar ${conv.isGroup ? 'group' : ''}`}>
                {conv.avatar}
                {conv.unread && <span className="unread-indicator" />}
              </div>
              <div className="message-info">
                <div className="message-name-row">
                  <span className="message-name">{conv.name}</span>
                  {conv.karma && (
                    <span className="msg-karma"><Zap size={10} />{conv.karma}</span>
                  )}
                </div>
                <div className="message-preview">
                  {conv.hasCode && <Code size={12} className="code-indicator" />}
                  {conv.lastMessage}
                </div>
                {conv.project && (
                  <div className="message-project">
                    <GitBranch size={10} />
                    {conv.project}
                  </div>
                )}
              </div>
              <div className="message-meta">
                <span className="message-time">{conv.time}</span>
                {conv.hasCode && <div className="has-code-dot" />}
              </div>
            </div>
          ))}
        </div>

        <div className="chat-area dev">
          <div className="chat-header dev">
            <div className={`message-avatar ${selectedChat.isGroup ? 'group' : ''}`}>
              {selectedChat.avatar}
            </div>
            <div className="message-info">
              <div className="message-name-row">
                <span className="message-name">{selectedChat.name}</span>
                {selectedChat.skills?.map(skill => (
                  <span key={skill} className="skill-mini">{skill}</span>
                ))}
              </div>
              <div className="message-preview" style={{ color: 'var(--success)' }}>
                {selectedChat.isGroup ? `${selectedChat.handle} • Active` : 'Online'}
              </div>
            </div>
            {selectedChat?.project && (
              <div className="chat-project-badge">
                <GitBranch size={14} />
                <span>{selectedChat.project}</span>
              </div>
            )}
            <div className="chat-header-actions">
              <button className="chat-action-btn" title="View members"><Users size={18} /></button>
              <div className="chat-menu-wrapper">
                <button 
                  className="chat-action-btn" 
                  onClick={() => setShowChatMenu(!showChatMenu)}
                >
                  <MoreVertical size={18} />
                </button>
                {showChatMenu && (
                  <div className="chat-menu-dropdown">
                    <button onClick={() => { setShowChatMenu(false); toast && toast.info('Notifications muted'); }}>
                      Mute notifications
                    </button>
                    <button onClick={() => { setShowChatMenu(false); toast && toast.info('Conversation archived'); }}>
                      Archive chat
                    </button>
                    <button className="danger" onClick={handleDeleteConversation}>
                      <Trash2 size={14} />
                      Delete conversation
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="chat-messages dev">
            {messages.map(msg => {
              // Render context bubble (grouped messages like iMessage)
              if (msg.type === 'context-bubble') {
                const isExpanded = expandedBubbles[msg.id]
                return (
                  <div key={msg.id} className="context-bubble-wrapper">
                    <div 
                      className={`context-bubble ${isExpanded ? 'expanded' : ''}`}
                      onClick={() => toggleBubble(msg.id)}
                    >
                      <div className="context-bubble-header">
                        <div className="context-bubble-icon">
                          {msg.contextType === 'code' ? <FileCode size={16} /> : <Image size={16} />}
                        </div>
                        <div className="context-bubble-info">
                          <span className="context-bubble-title">{msg.contextTitle}</span>
                          <span className="context-bubble-meta">
                            by {msg.contextAuthor} • {msg.messageCount} messages
                          </span>
                        </div>
                        <div className="context-bubble-expand">
                          {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                        </div>
                      </div>
                      
                      {msg.code && (
                        <div className="context-bubble-code-preview">
                          <div className="code-lang">
                            <span className="lang-dot" style={{ background: getLangColor(msg.language) }} />
                            {msg.language}
                          </div>
                          <pre className="context-code-snippet"><code>{msg.code.slice(0, 100)}...</code></pre>
                        </div>
                      )}
                      
                      {!isExpanded && (
                        <div className="context-bubble-preview">
                          <MessageCircle size={12} />
                          <span>Click to expand {msg.messageCount} messages</span>
                        </div>
                      )}
                    </div>
                    
                    {isExpanded && (
                      <div className="context-bubble-messages">
                        {msg.code && (
                          <div className="chat-code-block full">
                            <div className="chat-code-header">
                              <div className="code-lang">
                                <span className="lang-dot" style={{ background: getLangColor(msg.language) }} />
                                {msg.language}
                              </div>
                              <div className="chat-code-actions">
                                <button 
                                  className="chat-code-btn"
                                  onClick={(e) => { e.stopPropagation(); copyCode(msg.code, msg.id); }}
                                >
                                  {copiedId === msg.id ? <Check size={14} /> : <Copy size={14} />}
                                </button>
                                <button 
                                  className="chat-code-btn run"
                                  onClick={(e) => { e.stopPropagation(); handleRunCode(msg.code, msg.language); }}
                                >
                                  <Play size={14} />
                                </button>
                              </div>
                            </div>
                            <pre className="chat-code-content"><code>{msg.code}</code></pre>
                          </div>
                        )}
                        
                        {msg.messages.map(innerMsg => (
                          <div key={innerMsg.id} className={`bubble-inner-message ${innerMsg.sent ? 'sent' : 'received'}`}>
                            <div className="bubble-msg-bubble">{innerMsg.text}</div>
                            <span className="bubble-msg-time">{innerMsg.time}</span>
                          </div>
                        ))}
                        
                        <div className="bubble-reply-input">
                          <input 
                            type="text" 
                            placeholder="Reply in this thread..." 
                            value={threadReplies[msg.id] || ''}
                            onChange={(e) => setThreadReplies(prev => ({ ...prev, [msg.id]: e.target.value }))}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleThreadReply(msg.id, threadReplies[msg.id] || '')
                              }
                            }}
                          />
                          <button onClick={() => handleThreadReply(msg.id, threadReplies[msg.id] || '')}>
                            <Send size={14} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )
              }
              
              // Regular message rendering
              return (
                <div key={msg.id} className={`chat-message ${msg.sent ? 'sent' : 'received'}`}>
                  {!msg.sent && (
                    <div className="chat-msg-avatar">{selectedChat.avatar}</div>
                  )}
                  <div className="chat-msg-content">
                    {msg.text && <div className="chat-bubble">{msg.text}</div>}
                    
                    {msg.code && (
                      <div className="chat-code-block">
                        <div className="chat-code-header">
                          <div className="code-lang">
                            <span className="lang-dot" style={{ background: getLangColor(msg.language) }} />
                            {msg.language}
                          </div>
                          <div className="chat-code-actions">
                            <button 
                              className="chat-code-btn"
                              onClick={() => copyCode(msg.code, msg.id)}
                            >
                              {copiedId === msg.id ? <Check size={14} /> : <Copy size={14} />}
                            </button>
                            <button 
                              className="chat-code-btn run"
                              onClick={() => handleRunCode(msg.code, msg.language)}
                            >
                              <Play size={14} />
                            </button>
                          </div>
                        </div>
                        <pre className="chat-code-content"><code>{msg.code}</code></pre>
                      </div>
                    )}
                    
                    <span className="chat-msg-time">{msg.time}</span>
                  </div>
                </div>
              )
            })}
          </div>

          {showCodeInput && (
            <div className="code-input-panel">
              <div className="code-input-header">
                <span>Share Code Snippet</span>
                <div className="code-lang-select">
                  {languages.map(lang => (
                    <button
                      key={lang.value}
                      className={`lang-option ${codeLang === lang.value ? 'active' : ''}`}
                      onClick={() => setCodeLang(lang.value)}
                    >
                      <span className="lang-dot" style={{ background: lang.color }} />
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                className="code-input-area"
                placeholder="Paste your code here..."
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
              />
            </div>
          )}

          {showSavedPicker && (
            <div className="saved-posts-picker">
              <div className="saved-picker-header">
                <Bookmark size={16} />
                <span>Attach from Saved</span>
                <button className="close-picker" onClick={() => setShowSavedPicker(false)}>
                  <X size={16} />
                </button>
              </div>
              <div className="saved-posts-list">
                {savedPosts.map(post => (
                  <div 
                    key={post.id} 
                    className="saved-post-item"
                    onClick={() => attachSavedPost(post)}
                  >
                    <div className="saved-post-icon">
                      {post.type === 'code' ? <FileCode size={18} /> : <MessageCircle size={18} />}
                    </div>
                    <div className="saved-post-info">
                      <span className="saved-post-title">{post.title}</span>
                      <span className="saved-post-meta">by {post.author} • {post.savedAt}</span>
                    </div>
                    {post.language && (
                      <span className="saved-post-lang">
                        <span className="lang-dot" style={{ background: getLangColor(post.language) }} />
                        {post.language}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {attachedPost && (
            <div className="attached-post-preview">
              <div className="attached-post-content">
                <FileCode size={16} />
                <span>{attachedPost.title}</span>
              </div>
              <button className="remove-attachment" onClick={removeAttachment}>
                <X size={14} />
              </button>
            </div>
          )}

          <div className="chat-input-area dev">
            <button 
              className={`code-toggle-btn ${showSavedPicker ? 'active' : ''}`}
              onClick={() => { setShowSavedPicker(!showSavedPicker); setShowCodeInput(false); }}
              title="Attach from saved"
            >
              <Bookmark size={20} />
            </button>
            <button 
              className={`code-toggle-btn ${showCodeInput ? 'active' : ''}`}
              onClick={() => { setShowCodeInput(!showCodeInput); setShowSavedPicker(false); }}
              title="Share code"
            >
              <Code size={20} />
            </button>
            <input 
              type="text" 
              className="chat-input" 
              placeholder={attachedPost ? `Send with "${attachedPost.title}"...` : showCodeInput ? "Add a message with your code..." : "Type a message..."}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className="send-btn" onClick={sendMessage}>
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Messages
