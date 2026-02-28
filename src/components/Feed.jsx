import { useState } from 'react'
import Post from './Post'
import { Bug, AlertTriangle, Zap, X, Code, CheckCircle } from 'lucide-react'

function Feed({ 
  posts, 
  onLike, 
  onRefactor, 
  onBookmark, 
  onComment, 
  onDelete, 
  onReport, 
  onShare, 
  onRunCode, 
  currentUser, 
  comments,
  bugStories = [],
  onSolveBug,
  onDiscussBug,
  feedFilter,
  setFeedFilter 
}) {
  const [selectedBug, setSelectedBug] = useState(null)

  // Filter posts based on selected filter
  const getFilteredPosts = () => {
    switch (feedFilter) {
      case 'top':
        return [...posts].sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0))
      case 'following':
        // For now, show posts from users with high karma (mock "following")
        return posts.filter(p => p.user.karma > 3000)
      case 'latest':
      default:
        return posts
    }
  }

  const filteredPosts = getFilteredPosts()

  return (
    <>
      <header className="page-header">
        <h1 className="page-title">
          <span className="title-icon">~/</span>feed
        </h1>
        <div className="feed-filters">
          <button 
            className={`filter-btn ${feedFilter === 'latest' ? 'active' : ''}`}
            onClick={() => setFeedFilter('latest')}
          >
            Latest
          </button>
          <button 
            className={`filter-btn ${feedFilter === 'top' ? 'active' : ''}`}
            onClick={() => setFeedFilter('top')}
          >
            Top
          </button>
          <button 
            className={`filter-btn ${feedFilter === 'following' ? 'active' : ''}`}
            onClick={() => setFeedFilter('following')}
          >
            Following
          </button>
        </div>
      </header>

      <div className="bug-stories-section">
        <div className="bug-stories-header">
          <Bug size={16} />
          <span>Bug of the Day</span>
          <span className="bug-timer">23:45:12</span>
        </div>
        <div className="bug-stories">
          {bugStories.map(story => (
            <div 
              key={story.id} 
              className={`bug-story ${story.solved ? 'solved' : ''}`}
              onClick={() => setSelectedBug(story)}
            >
              <div className="bug-story-avatar">
                <span>{story.user}</span>
                {story.solved && <Zap className="solved-icon" size={12} />}
              </div>
              <span className="bug-story-error">{story.error}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="feed-container">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <Post 
              key={post.id} 
              post={post} 
              onLike={onLike} 
              onRefactor={onRefactor}
              onBookmark={onBookmark}
              onComment={onComment}
              onDelete={onDelete}
              onReport={onReport}
              onShare={onShare}
              onRunCode={onRunCode}
              currentUser={currentUser}
              comments={comments[post.id] || []}
            />
          ))
        ) : (
          <div className="empty-feed">
            <Code size={48} />
            <h3>No snippets yet</h3>
            <p>Be the first to share some code!</p>
          </div>
        )}
      </div>

      {/* Bug Story Modal */}
      {selectedBug && (
        <div className="modal-overlay" onClick={() => setSelectedBug(null)}>
          <div className="bug-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedBug(null)}>
              <X size={20} />
            </button>
            
            <div className="bug-modal-header">
              <div className={`bug-status ${selectedBug.solved ? 'solved' : 'unsolved'}`}>
                {selectedBug.solved ? (
                  <>
                    <CheckCircle size={18} />
                    <span>Solved</span>
                  </>
                ) : (
                  <>
                    <Bug size={18} />
                    <span>Unsolved</span>
                  </>
                )}
              </div>
              <div className="bug-error-type">
                <span className="error-label">{selectedBug.error}</span>
              </div>
            </div>

            <div className="bug-modal-content">
              <div className="bug-author">
                <div className="bug-author-avatar">{selectedBug.user}</div>
                <div className="bug-author-info">
                  <span className="bug-author-name">{selectedBug.name}</span>
                  <span className="bug-author-desc">{selectedBug.description}</span>
                </div>
              </div>

              {selectedBug.code && (
                <div className="bug-code-block">
                  <div className="code-header">
                    <div className="code-lang">
                      <span className="lang-dot" style={{ background: '#f7df1e' }}></span>
                      {selectedBug.language}
                    </div>
                  </div>
                  <pre className="code-content">
                    <code>{selectedBug.code}</code>
                  </pre>
                </div>
              )}
            </div>

            <div className="bug-modal-actions">
              {!selectedBug.solved && (
                <button 
                  className="solve-bug-btn"
                  onClick={() => {
                    onSolveBug && onSolveBug(selectedBug.id)
                    setSelectedBug({ ...selectedBug, solved: true })
                  }}
                >
                  <Zap size={16} />
                  Mark as Solved (+25 karma)
                </button>
              )}
              <button className="bug-discuss-btn" onClick={() => {
                onDiscussBug && onDiscussBug(selectedBug)
                setSelectedBug(null)
              }}>
                Discuss Solution
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Feed
