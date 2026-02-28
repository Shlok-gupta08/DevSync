import { Terminal, ChevronDown, ChevronUp, TrendingUp, Users, Zap, X, Search } from 'lucide-react'
import { useState, useMemo, useCallback } from 'react'

function RightPanel({ collapsed, setCollapsed, toast, onSearchSelect }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [suggestions, setSuggestions] = useState([
    { id: 1, name: 'Satya Nadella', handle: '@satyanadella', avatar: 'SN', skills: ['Cloud', 'AI'], karma: 98500, following: false, role: 'CEO, Microsoft' },
    { id: 2, name: 'Sundar Pichai', handle: '@sundarpichai', avatar: 'SP', skills: ['ML', 'Search'], karma: 87200, following: false, role: 'CEO, Google' },
    { id: 3, name: 'Linus Torvalds', handle: '@torvalds', avatar: 'LT', skills: ['C', 'Linux'], karma: 125000, following: true, role: 'Creator of Linux' },
    { id: 4, name: 'Arvind Krishna', handle: '@arvindkrishna', avatar: 'AK', skills: ['AI', 'Cloud'], karma: 67300, following: false, role: 'CEO, IBM' },
    { id: 5, name: 'Parag Agrawal', handle: '@parikishan', avatar: 'PA', skills: ['ML', 'Scale'], karma: 54100, following: false, role: 'Ex-CTO, Twitter' },
  ])

  const trending = [
    { id: 1, topic: '#DSA', posts: '12.5K', icon: '🧮', lang: 'Algorithm' },
    { id: 2, topic: '#ReactHooks', posts: '8.2K', icon: '⚛️', lang: 'JavaScript' },
    { id: 3, topic: '#RustLang', posts: '5.7K', icon: '🦀', lang: 'Rust' },
    { id: 4, topic: '#DevOps', posts: '3.4K', icon: '🐳', lang: 'Docker' },
    { id: 5, topic: '#MachineLearning', posts: '9.1K', icon: '🤖', lang: 'Python' },
  ]

  // Search results based on query
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return { users: [], topics: [] }
    
    const query = searchQuery.toLowerCase()
    
    const matchedUsers = suggestions.filter(user =>
      user.name.toLowerCase().includes(query) ||
      user.handle.toLowerCase().includes(query) ||
      user.skills.some(s => s.toLowerCase().includes(query)) ||
      (user.role && user.role.toLowerCase().includes(query))
    )
    
    const matchedTopics = trending.filter(t =>
      t.topic.toLowerCase().includes(query) ||
      t.lang.toLowerCase().includes(query)
    )
    
    return { users: matchedUsers, topics: matchedTopics }
  }, [searchQuery, suggestions, trending])

  const toggleFollow = useCallback((id) => {
    let name = ''
    let newFollowState = false
    setSuggestions(prev => prev.map(s => {
      if (s.id === id) {
        name = s.name
        newFollowState = !s.following
        return { ...s, following: newFollowState }
      }
      return s
    }))
    if (name) {
      toast && toast[newFollowState ? 'success' : 'info'](newFollowState ? `Connected with ${name}` : `Disconnected from ${name}`)
    }
  }, [toast])

  const toggleSection = (section) => {
    setCollapsed({ ...collapsed, [section]: !collapsed[section] })
  }

  const handleTrendingClick = useCallback((topic) => {
    if (onSearchSelect) {
      onSearchSelect(topic.topic)
    }
    toast && toast.info(`Searching for ${topic.topic}`)
  }, [onSearchSelect, toast])

  const handleSearchResultClick = useCallback((item, type) => {
    if (type === 'user') {
      toast && toast.info(`Viewing profile: ${item.name}`)
    } else if (type === 'topic') {
      if (onSearchSelect) {
        onSearchSelect(item.topic)
      }
      toast && toast.info(`Searching for ${item.topic}`)
    }
    setSearchQuery('')
    setShowSearchResults(false)
  }, [onSearchSelect, toast])

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      toast && toast.info(`Searching for: ${searchQuery}`)
      if (onSearchSelect) {
        onSearchSelect(searchQuery)
      }
      setShowSearchResults(false)
    }
  }

  return (
    <aside className="right-panel">
      <div className="terminal-search">
        <div className="terminal-header">
          <span className="terminal-title">query.find()</span>
        </div>
        <div className="terminal-input-wrap">
          <span className="terminal-prompt">$</span>
          <input 
            type="text" 
            placeholder='User.find({ skill: "React" })'
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setShowSearchResults(e.target.value.trim().length > 0)
            }}
            onFocus={() => searchQuery.trim() && setShowSearchResults(true)}
            onKeyPress={handleSearchKeyPress}
            className="terminal-input"
          />
          {searchQuery && (
            <button className="input-clear-btn" onClick={() => { setSearchQuery(''); setShowSearchResults(false); }}>
              <X size={16} />
            </button>
          )}
        </div>
        
        {/* Search Results Dropdown */}
        {showSearchResults && (searchResults.users.length > 0 || searchResults.topics.length > 0) && (
          <div className="search-results-dropdown">
            {searchResults.users.length > 0 && (
              <div className="search-results-section">
                <div className="search-section-title"><Users size={12} /> Developers</div>
                {searchResults.users.map(user => (
                  <div 
                    key={user.id} 
                    className="search-result-item"
                    onClick={() => handleSearchResultClick(user, 'user')}
                  >
                    <div className="suggestion-avatar small">{user.avatar}</div>
                    <div className="search-result-info">
                      <span className="search-result-name">{user.name}</span>
                      <span className="search-result-handle">{user.handle}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {searchResults.topics.length > 0 && (
              <div className="search-results-section">
                <div className="search-section-title"><TrendingUp size={12} /> Topics</div>
                {searchResults.topics.map(topic => (
                  <div 
                    key={topic.id} 
                    className="search-result-item"
                    onClick={() => handleSearchResultClick(topic, 'topic')}
                  >
                    <span className="search-result-emoji">{topic.icon}</span>
                    <div className="search-result-info">
                      <span className="search-result-name">{topic.topic}</span>
                      <span className="search-result-handle">{topic.posts} posts</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <section className="panel-section">
        <div className="panel-title clickable" onClick={() => toggleSection('trending')}>
          <span><TrendingUp size={14} /> Trending Topics</span>
          {collapsed.trending ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
        </div>
        {!collapsed.trending && (
          <div className="trending-grid-container">
            <div className="trending-grid">
              {trending.map(item => (
                <div 
                  key={item.id} 
                  className="trending-card dev"
                  onClick={() => handleTrendingClick(item)}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="trending-emoji">{item.icon}</span>
                  <div className="trending-topic-small">{item.topic}</div>
                  <div className="trending-lang">{item.lang}</div>
                  <div className="trending-posts-small">{item.posts}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="panel-section">
        <div className="panel-title clickable" onClick={() => toggleSection('suggestions')}>
          <span><Users size={14} /> StackMates</span>
          {collapsed.suggestions ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
        </div>
        {!collapsed.suggestions && (
          <div className="suggestions-container">
            {suggestions.map(user => (
              <div key={user.id} className="dev-suggestion-item">
                <div className="suggestion-avatar">{user.avatar}</div>
                <div className="suggestion-info">
                  <div className="suggestion-name">
                    {user.name}
                    <span className="suggestion-karma"><Zap size={10} />{user.karma}</span>
                  </div>
                  {user.role && <div className="suggestion-role">{user.role}</div>}
                  <div className="suggestion-skills">
                    {user.skills.map(skill => (
                      <span key={skill} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
                <button 
                  className={`follow-btn ${user.following ? 'following' : ''}`}
                  onClick={() => toggleFollow(user.id)}
                >
                  {user.following ? 'Connected' : 'Connect'}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="panel-footer">
        <div className="online-devs">
          <span className="online-dot"></span>
          <span>2,847 devs online</span>
        </div>
      </div>
    </aside>
  )
}

export default RightPanel
