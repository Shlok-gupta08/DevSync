import { useState } from 'react'
import { X, GitBranch, Play, ArrowRight } from 'lucide-react'

function RefactorModal({ post, onClose, onSubmit, toast }) {
  const [refactoredCode, setRefactoredCode] = useState(post.code)
  const [showDiff, setShowDiff] = useState(false)
  const [explanation, setExplanation] = useState('')

  const getLanguageColor = (lang) => {
    const colors = {
      python: '#3572A5',
      javascript: '#f7df1e',
      cpp: '#f34b7d',
    }
    return colors[lang] || '#60a5fa'
  }

  const generateDiff = () => {
    const originalLines = post.code.split('\n')
    const refactoredLines = refactoredCode.split('\n')
    const diff = []
    
    const maxLen = Math.max(originalLines.length, refactoredLines.length)
    
    for (let i = 0; i < maxLen; i++) {
      const orig = originalLines[i] || ''
      const refac = refactoredLines[i] || ''
      
      if (orig === refac) {
        diff.push({ type: 'same', line: orig, lineNum: i + 1 })
      } else if (!originalLines[i]) {
        diff.push({ type: 'added', line: refac, lineNum: i + 1 })
      } else if (!refactoredLines[i]) {
        diff.push({ type: 'removed', line: orig, lineNum: i + 1 })
      } else {
        diff.push({ type: 'removed', line: orig, lineNum: i + 1 })
        diff.push({ type: 'added', line: refac, lineNum: i + 1 })
      }
    }
    
    return diff
  }

  const handlePreviewDiff = () => {
    if (refactoredCode === post.code) {
      toast && toast.warning('No changes detected. Modify the code first.')
      return
    }
    setShowDiff(true)
  }

  const handleSubmitRefactor = () => {
    if (refactoredCode === post.code) {
      toast && toast.error('Please make changes to the code before submitting.')
      return
    }
    onSubmit && onSubmit(post.id, refactoredCode, explanation)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="refactor-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-section">
            <GitBranch size={20} />
            <h2 className="modal-title">Refactor Code</h2>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="refactor-body">
          <div className="refactor-original">
            <div className="code-section-header">
              <span className="section-label">ORIGINAL</span>
              <span className="section-user">by {post.user.name}</span>
            </div>
            <div className="code-block mini">
              <div className="code-header">
                <div className="code-lang">
                  <span className="lang-dot" style={{ background: getLanguageColor(post.language) }}></span>
                  {post.language}
                </div>
              </div>
              <pre className="code-content">
                <code>{post.code}</code>
              </pre>
            </div>
          </div>

          {!showDiff ? (
            <div className="refactor-editor">
              <div className="code-section-header">
                <span className="section-label">YOUR REFACTOR</span>
                <span className="section-hint">Optimize, improve, or suggest alternatives</span>
              </div>
              <textarea
                className="refactor-textarea"
                value={refactoredCode}
                onChange={(e) => setRefactoredCode(e.target.value)}
                spellCheck={false}
              />
              <div className="refactor-explanation">
                <label>Explanation (optional)</label>
                <textarea
                  className="explanation-textarea"
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  placeholder="Explain what you changed and why..."
                  rows={2}
                />
              </div>
              <div className="refactor-actions">
                <button className="refactor-cancel-btn" onClick={onClose}>
                  Cancel
                </button>
                <button className="refactor-submit-btn" onClick={handlePreviewDiff}>
                  <GitBranch size={16} />
                  Preview Diff
                </button>
              </div>
            </div>
          ) : (
            <div className="diff-view">
              <div className="code-section-header">
                <span className="section-label">DIFF VIEW</span>
                <button className="edit-again-btn" onClick={() => setShowDiff(false)}>
                  Edit Again
                </button>
              </div>
              <div className="diff-container">
                {generateDiff().map((line, idx) => (
                  <div key={idx} className={`diff-line ${line.type}`}>
                    <span className="diff-line-num">{line.lineNum}</span>
                    <span className="diff-symbol">
                      {line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}
                    </span>
                    <span className="diff-code">{line.line || ' '}</span>
                  </div>
                ))}
              </div>
              {explanation && (
                <div className="diff-explanation">
                  <strong>Your explanation:</strong>
                  <p>{explanation}</p>
                </div>
              )}
              <div className="refactor-actions">
                <button className="refactor-cancel-btn" onClick={() => setShowDiff(false)}>
                  Back to Edit
                </button>
                <button className="refactor-submit-btn final" onClick={handleSubmitRefactor}>
                  <GitBranch size={16} />
                  Submit Refactor
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RefactorModal
