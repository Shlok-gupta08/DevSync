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
    return colors[lang] || '#d4a017'
  }

  // Execute JavaScript code in-browser with console.log capture
  const executeJavaScript = (code) => {
    const logs = []
    const mockConsole = {
      log: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ')),
      error: (...args) => logs.push('Error: ' + args.map(a => String(a)).join(' ')),
      warn: (...args) => logs.push('Warning: ' + args.map(a => String(a)).join(' ')),
      info: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ')),
      table: (data) => logs.push(JSON.stringify(data, null, 2)),
    }
    try {
      const wrappedCode = `
        const console = arguments[0];
        ${code}
      `
      const fn = new Function(wrappedCode)
      const result = fn(mockConsole)
      if (logs.length === 0 && result !== undefined) {
        logs.push(String(result))
      }
      return logs.length > 0 ? logs.join('\n') : '> Execution complete (no output)'
    } catch (err) {
      return `Error: ${err.message}`
    }
  }

  // Generate smart mock output based on code content for non-JS languages
  const generateMockOutput = (code, language) => {
    const codeLC = code.toLowerCase()
    const mockMap = {
      python: () => {
        if (codeLC.includes('print')) {
          const printMatch = code.match(/print\s*\((.+?)\)/s)
          if (printMatch) {
            const arg = printMatch[1].trim()
            if (arg.startsWith("'") || arg.startsWith('"') || arg.startsWith('f"') || arg.startsWith("f'")) return `>>> ${arg.replace(/^f?['"]|['"]$/g, '')}`
            if (arg.startsWith('[')) return `>>> ${arg}`
          }
        }
        if (codeLC.includes('sort')) return '>>> [1, 2, 3, 4, 5, 6, 7, 8, 9]\nSorted in 0.0023ms'
        if (codeLC.includes('def ')) return '>>> Function defined successfully\n>>> Output: OK'
        if (codeLC.includes('class ')) return '>>> Class initialized\n>>> Instance created successfully'
        if (codeLC.includes('import')) return '>>> Module loaded\n>>> Execution complete'
        return '>>> Execution complete\n>>> Process exited with code 0'
      },
      cpp: () => {
        if (codeLC.includes('cout')) return '> Hello, World!\n> Program exited with code 0'
        if (codeLC.includes('sort')) return '> Array sorted: [1, 2, 3, 4, 5]\n> Time: 0.001ms'
        if (codeLC.includes('binary_search') || codeLC.includes('search')) return '> Element found at index: 4\n> Execution time: 0.001ms'
        if (codeLC.includes('vector')) return '> Vector size: 5\n> Elements: [10, 20, 30, 40, 50]'
        return '> Compilation successful\n> Execution time: 0.002ms'
      },
      java: () => {
        if (codeLC.includes('system.out')) return '> Hello, World!\n> Process finished with exit code 0'
        if (codeLC.includes('arraylist') || codeLC.includes('list')) return '> [1, 2, 3, 4, 5]\n> Size: 5'
        if (codeLC.includes('hashmap') || codeLC.includes('map')) return '> {key1=value1, key2=value2}\n> Entries: 2'
        return '> Build successful\n> Process finished with exit code 0'
      },
      rust: () => {
        if (codeLC.includes('println!')) return '  Compiling playground v0.0.1\n  Finished dev [unoptimized + debuginfo]\n  Running `target/debug/playground`\nHello, World!'
        if (codeLC.includes('vec!') || codeLC.includes('vec')) return '  Compiling playground v0.0.1\n  Running `target/debug/playground`\n[1, 2, 3, 4, 5]'
        return '  Compiling playground v0.0.1\n  Finished dev [unoptimized + debuginfo]\n  Running `target/debug/playground`'
      },
      go: () => {
        if (codeLC.includes('fmt.print')) return 'Hello, World!\n\nProgram exited.'
        if (codeLC.includes('goroutine') || codeLC.includes('go func')) return 'goroutine 1 started\ngoroutine 2 started\nAll goroutines finished.'
        return 'Build successful.\nProgram exited.'
      },
      typescript: () => {
        // TypeScript can also run in browser after simple transpilation
        return executeJavaScript(code.replace(/:\s*\w+(\[\])?/g, '').replace(/interface\s+\w+\s*\{[^}]*\}/g, '').replace(/<\w+>/g, ''))
      },
    }
    
    const generator = mockMap[language]
    return generator ? generator() : '> Execution complete'
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
    
    // Small delay to show "Running..." state for visual feedback
    await new Promise(resolve => setTimeout(resolve, 600))
    
    try {
      if (post.language === 'javascript' || post.language === 'typescript') {
        // Execute JS/TS directly in the browser
        const cleanCode = post.language === 'typescript' 
          ? post.code.replace(/:\s*\w+(\[\])?(\s*\|?\s*\w+)*/g, '').replace(/interface\s+\w+\s*\{[^}]*\}/g, '').replace(/<\w+>/g, '')
          : post.code
        const result = executeJavaScript(cleanCode)
        setOutput(result)
      } else {
        // Use smart mock outputs for other languages
        const result = generateMockOutput(post.code, post.language)
        setOutput(result)
      }
    } catch (err) {
      setOutput(`> Execution complete`)
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
