import { GitBranch, MessageCircle, Play, Bookmark, MoreHorizontal, Copy, Check, Award, Share2, Trash2, Flag, X, BookmarkCheck, ThumbsUp, Send } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

function Post({ post, onLike, onRefactor, onBookmark, onComment, onDelete, onReport, onShare, onRunCode, currentUser, comments = [] }) {
  const [copied, setCopied] = useState(false)
  const [showOutput, setShowOutput] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const menuRef = useRef(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const copyCode = () => {
    navigator.clipboard.writeText(post.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getLanguageColor = (lang) => {
    const colors = {
      python: '#3572A5',
      javascript: '#f7df1e',
      cpp: '#f34b7d',
      java: '#b07219',
      rust: '#dea584',
      go: '#00ADD8',
      typescript: '#3178c6'
    }
    return colors[lang] || '#f0c040'
  }

  const mockOutputs = {
    python: '>>> [1, 2, 3, 4, 5, 6, 7, 8, 9]\nSorted in 0.0023ms',
    javascript: 'useDebounce initialized\nValue updated after 300ms delay',
    cpp: '> Element found at index: 4\n> Execution time: 0.001ms'
  }

  const handleRunCode = async () => {
    if (showOutput && output) {
      setShowOutput(false)
      return
    }
    
    setShowOutput(true)
    setIsRunning(true)
    
    if (onRunCode) {
      onRunCode(post.id)
    }
    
    const langMap = {
      python: { language: 'python', version: '3.10' },
      javascript: { language: 'javascript', version: '18.15.0' },
      cpp: { language: 'c++', version: '10.2.0' },
      java: { language: 'java', version: '15.0.2' },
      rust: { language: 'rust', version: '1.68.2' },
      go: { language: 'go', version: '1.16.2' },
      typescript: { language: 'typescript', version: '5.0.3' },
    }
    
    const lang = langMap[post.language] || langMap.javascript
    
    try {
      const response = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: lang.language,
          version: lang.version,
          files: [{ content: post.code }]
        })
      })
      
      const data = await response.json()
      
      if (data.run) {
        const result = data.run.stdout || data.run.stderr || 'No output'
        setOutput(result.trim())
      } else {
        setOutput(data.message || 'Execution failed')
      }
    } catch (err) {
      // Fallback to mock output if API is unreachable
      setOutput(mockOutputs[post.language] || '> Execution complete')
    } finally {
      setIsRunning(false)
    }
  }

  const handleSubmitComment = (e) => {
    e.preventDefault()
    if (newComment.trim() && onComment) {
      onComment(post.id, newComment.trim())
      setNewComment('')
    }
  }

  const isOwnPost = currentUser?.handle === post.user.handle

  return (
    <article className="code-post">
      <div className="post-header">
        <div className="post-avatar">{post.user.avatar}</div>
        <div className="post-user-info">
          <div className="post-username">
            {post.user.name}
            <span className="user-badge">{post.user.badge}</span>
          </div>
          <div className="post-meta">
            <span className="post-handle">{post.user.handle}</span>
            <span className="post-dot">•</span>
            <span className="post-time">{post.time}</span>
            <span className="post-dot">•</span>
            <span className="karma-display">⚡{post.user.karma}</span>
          </div>
        </div>
        <div className="post-menu-container" ref={menuRef}>
          <button className="post-menu-btn" onClick={() => setShowMenu(!showMenu)}>
            <MoreHorizontal size={20} />
          </button>
          {showMenu && (
            <div className="post-menu-dropdown">
              <button className="menu-item" onClick={() => { onShare && onShare(post); setShowMenu(false); }}>
                <Share2 size={16} />
                <span>Share</span>
              </button>
              <button className="menu-item" onClick={() => { onBookmark && onBookmark(post.id); setShowMenu(false); }}>
                {post.bookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                <span>{post.bookmarked ? 'Unsave' : 'Save'}</span>
              </button>
              {isOwnPost ? (
                <button className="menu-item danger" onClick={() => { setShowDeleteConfirm(true); setShowMenu(false); }}>
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
              ) : (
                <button className="menu-item danger" onClick={() => { onReport && onReport(post.id); setShowMenu(false); }}>
                  <Flag size={16} />
                  <span>Report</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="post-content">
        <p className="post-text">{post.content}</p>
        
        <div className="code-block">
          <div className="code-header">
            <div className="code-lang">
              <span className="lang-dot" style={{ background: getLanguageColor(post.language) }}></span>
              {post.language}
            </div>
            <div className="code-actions">
              <button className="code-action-btn" onClick={copyCode}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button 
                className={`code-action-btn run-btn ${showOutput ? 'active' : ''}`}
                onClick={handleRunCode}
              >
                <Play size={14} />
                Run
              </button>
            </div>
          </div>
          <pre className="code-content">
            <code>{post.code}</code>
          </pre>
          {showOutput && (
            <div className="code-output">
              <div className="output-header">
                <span className="output-label">{isRunning ? 'RUNNING...' : 'OUTPUT'}</span>
              </div>
              <pre className="output-content">{isRunning ? '> Executing...' : output}</pre>
            </div>
          )}
        </div>
      </div>

      <div className="post-stats">
        <span className="stat-item">
          <GitBranch size={14} />
          <span className="stat-count">{post.refactors}</span> refactors
        </span>
        <span className={`stat-item clickable ${showComments ? 'active' : ''}`} onClick={() => setShowComments(!showComments)}>
          <MessageCircle size={14} className={showComments ? 'icon-active' : ''} />
          <span className="stat-count">{post.comments}</span> comments
        </span>
        <span className="stat-item">
          <Play size={14} />
          <span className="stat-count">{post.runs}</span> runs
        </span>
        {post.upvotes > 0 && (
          <span className="stat-item">
            <ThumbsUp size={14} />
            <span className="stat-count">{post.upvotes}</span>
          </span>
        )}
      </div>

      <div className="post-actions">
        <button 
          className="action-btn refactor-btn"
          onClick={() => onRefactor && onRefactor(post.id)}
        >
          <GitBranch className="action-btn-icon" />
          <span>Refactor</span>
        </button>
        <button 
          className={`action-btn comment-btn ${showComments ? 'active expanded' : ''}`}
          onClick={() => setShowComments(!showComments)}
        >
          <MessageCircle className={`action-btn-icon ${showComments ? 'icon-expanded' : ''}`} />
          <span>{showComments ? 'Hide' : 'Comment'}</span>
        </button>
        <button 
          className={`action-btn ${post.liked ? 'active liked' : ''}`}
          onClick={() => onLike && onLike(post.id)}
        >
          <Award className={`action-btn-icon ${post.liked ? 'filled' : ''}`} />
          <span>{post.liked ? 'Upvoted' : 'Upvote'}</span>
        </button>
        <button 
          className={`action-btn bookmark-btn ${post.bookmarked ? 'active' : ''}`}
          style={{ marginLeft: 'auto' }}
          onClick={() => onBookmark && onBookmark(post.id)}
        >
          {post.bookmarked ? <BookmarkCheck className="action-btn-icon" /> : <Bookmark className="action-btn-icon" />}
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="comments-section">
          <form className="comment-form" onSubmit={handleSubmitComment}>
            <div className="comment-avatar">{currentUser?.avatar || 'U'}</div>
            <input
              type="text"
              className="comment-input"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button type="submit" className="comment-submit" disabled={!newComment.trim()}>
              <Send size={16} />
            </button>
          </form>
          
          {comments.length > 0 ? (
            <div className="comments-list">
              {comments.map(comment => (
                <div key={comment.id} className="comment-item">
                  <div className="comment-avatar small">{comment.user.avatar}</div>
                  <div className="comment-body">
                    <div className="comment-header">
                      <span className="comment-author">{comment.user.name}</span>
                      <span className="comment-time">{comment.time}</span>
                    </div>
                    <p className="comment-text">{comment.text}</p>
                    <div className="comment-actions">
                      <button className="comment-action-btn">
                        <ThumbsUp size={12} />
                        <span>{comment.likes || 0}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-comments">
              <MessageCircle size={24} />
              <span>No comments yet. Be the first!</span>
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="confirm-modal small" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowDeleteConfirm(false)}>
              <X size={20} />
            </button>
            <div className="confirm-icon danger">
              <Trash2 size={32} />
            </div>
            <h3 className="confirm-title">Delete Snippet?</h3>
            <p className="confirm-message">
              This action cannot be undone. Your snippet and all its refactors will be permanently deleted.
            </p>
            <div className="confirm-actions">
              <button className="confirm-btn cancel" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </button>
              <button 
                className="confirm-btn confirm danger" 
                onClick={() => { 
                  onDelete && onDelete(post.id); 
                  setShowDeleteConfirm(false); 
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  )
}

export default Post
