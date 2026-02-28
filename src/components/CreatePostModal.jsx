import { useState } from 'react'
import { X, Code2, Play, FileCode } from 'lucide-react'

function CreatePostModal({ onClose, onSubmit }) {
  const [content, setContent] = useState('')
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('javascript')

  const languages = [
    { id: 'javascript', name: 'JavaScript', color: '#f7df1e' },
    { id: 'python', name: 'Python', color: '#3572A5' },
    { id: 'cpp', name: 'C++', color: '#f34b7d' },
    { id: 'java', name: 'Java', color: '#b07219' },
    { id: 'rust', name: 'Rust', color: '#dea584' },
    { id: 'go', name: 'Go', color: '#00ADD8' },
    { id: 'typescript', name: 'TypeScript', color: '#3178c6' },
  ]

  const handleSubmit = () => {
    if (content.trim() && code.trim()) {
      onSubmit(content, code, language)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="create-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-section">
            <Code2 size={20} />
            <h2 className="modal-title">New Code Snippet</h2>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="create-post-form">
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea 
                className="post-input"
                placeholder="What does this code do? Any challenges you faced?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Language</label>
              <div className="language-selector">
                {languages.map(lang => (
                  <button
                    key={lang.id}
                    className={`lang-btn ${language === lang.id ? 'active' : ''}`}
                    onClick={() => setLanguage(lang.id)}
                  >
                    <span className="lang-dot" style={{ background: lang.color }}></span>
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                <FileCode size={14} />
                Code
              </label>
              <textarea 
                className="code-input"
                placeholder="// Paste your code here..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
              />
            </div>

            <button 
              className="submit-post-btn" 
              onClick={handleSubmit}
              disabled={!content.trim() || !code.trim()}
            >
              <Code2 size={16} />
              Post Snippet
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePostModal
