import { useState } from 'react'
import { Code2, Eye, EyeOff, LogIn, AlertCircle, Zap, UserPlus } from 'lucide-react'

function LoginPage({ onLogin, onSignUp, savedProfiles = [] }) {
  const [activeTab, setActiveTab] = useState('login')
  
  // Login state
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSavedProfiles, setShowSavedProfiles] = useState(false)

  // Sign up state
  const [signUpUsername, setSignUpUsername] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')
  const [signUpConfirm, setSignUpConfirm] = useState('')
  const [showSignUpPassword, setShowSignUpPassword] = useState(false)
  const [signUpError, setSignUpError] = useState('')
  const [isSigningUp, setIsSigningUp] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password')
      return
    }

    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const result = onLogin(username.trim(), password.trim())
    if (!result) {
      setError('Invalid username or password')
      setIsLoading(false)
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    setSignUpError('')
    
    if (!signUpUsername.trim() || !signUpPassword.trim() || !signUpConfirm.trim()) {
      setSignUpError('Please fill in all fields')
      return
    }
    
    if (signUpPassword !== signUpConfirm) {
      setSignUpError('Passwords do not match')
      return
    }
    
    if (signUpPassword.length < 4) {
      setSignUpError('Password must be at least 4 characters')
      return
    }

    setIsSigningUp(true)
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const result = onSignUp(signUpUsername.trim(), signUpPassword.trim())
    if (!result) {
      setSignUpError('Username already exists. Try a different one.')
      setIsSigningUp(false)
    }
  }

  const handleProfileClick = async (profile) => {
    setIsLoading(true)
    setError('')
    await new Promise(resolve => setTimeout(resolve, 600))
    const result = onLogin(profile.username, null, profile.id)
    if (!result) {
      setError('Failed to load profile')
      setIsLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container-v2">
        {/* Top Branding Section — ~35-40% of page */}
        <div className="login-hero">
          <div className="login-logo">
            <div className="login-logo-icon">
              <Code2 size={40} />
            </div>
            <h1 className="login-logo-text">DevSync</h1>
            <span className="login-logo-tag">dev</span>
          </div>
          <p className="login-tagline">Where developers share, refactor, and evolve code together</p>
          <div className="login-features-row">
            <div className="login-feature-chip"><Zap size={14} />Share Snippets</div>
            <div className="login-feature-chip"><Zap size={14} />Run Code Live</div>
            <div className="login-feature-chip"><Zap size={14} />Earn Karma</div>
          </div>
        </div>

        {/* Login Card */}
        <div className="login-card-v2">
          {/* Tab Switcher */}
          <div className="login-tabs">
            <button
              className={`login-tab ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => { setActiveTab('login'); setError(''); setSignUpError('') }}
            >
              <LogIn size={16} />
              Login
            </button>
            <button
              className={`login-tab ${activeTab === 'signup' ? 'active' : ''}`}
              onClick={() => { setActiveTab('signup'); setError(''); setSignUpError('') }}
            >
              <UserPlus size={16} />
              Sign Up
            </button>
          </div>

          {/* Login Form */}
          {activeTab === 'login' && (
            <div className="login-tab-content">
              {!showSavedProfiles ? (
                <>
                  <form className="login-form" onSubmit={handleLogin}>
                <div className="login-field">
                  <label htmlFor="login-username">Username</label>
                  <div className="login-input-wrapper">
                    <span className="login-input-prefix">@</span>
                    <input
                      id="login-username"
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => { setUsername(e.target.value); setError('') }}
                      autoComplete="username"
                      autoFocus
                    />
                  </div>
                </div>

                <div className="login-field">
                  <label htmlFor="login-password">Password</label>
                  <div className="login-input-wrapper">
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setError('') }}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="login-eye-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="login-error">
                    <AlertCircle size={16} />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className={`login-submit-btn ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="login-spinner"></span>
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <LogIn size={18} />
                      Sign In
                    </>
                  )}
                </button>
              </form>

              {/* Saved Profiles Toggle */}
              {savedProfiles.length > 0 && (
                <>
                  <div className="login-divider">
                    <span>Or</span>
                  </div>
                  <button
                    className="login-submit-btn"
                    type="button"
                    onClick={() => setShowSavedProfiles(true)}
                    style={{ width: '100%', background: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
                  >
                    View Saved Profiles
                  </button>
                </>
              )}
            </>
          ) : (
            <>
              <div className="login-divider" style={{ marginTop: 0, marginBottom: '24px' }}>
                <span>Select a Profile</span>
              </div>
              <div className="login-saved-profiles">
                    {savedProfiles.map(profile => (
                      <button
                        key={profile.id}
                        className="saved-profile-btn"
                        onClick={() => handleProfileClick(profile)}
                        disabled={isLoading}
                      >
                        <div className={`saved-profile-avatar ${profile.id === 'saksham' ? 'sa' : profile.id === 'krrish' ? 'kg' : ''}`}>
                          {profile.avatar}
                        </div>
                        <div className="saved-profile-info">
                          <span className="saved-profile-name">{profile.name}</span>
                          <span className="saved-profile-badge">{profile.badge}</span>
                        </div>
                        <div className="saved-profile-karma">
                          <Zap size={12} />
                          {profile.karma?.toLocaleString()}
                        </div>
                      </button>
                    ))}
                  </div>
                  <button
                    className="login-submit-btn"
                    type="button"
                    onClick={() => setShowSavedProfiles(false)}
                    style={{ marginTop: '24px', width: '100%', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
                    disabled={isLoading}
                  >
                    Back to Login
                  </button>
                </>
              )}
            </div>
          )}

          {/* Sign Up Form */}
          {activeTab === 'signup' && (
            <div className="login-tab-content">
              <form className="login-form" onSubmit={handleSignUp}>
                <div className="login-field">
                  <label htmlFor="signup-username">Username</label>
                  <div className="login-input-wrapper">
                    <span className="login-input-prefix">@</span>
                    <input
                      id="signup-username"
                      type="text"
                      placeholder="Choose a username"
                      value={signUpUsername}
                      onChange={(e) => { setSignUpUsername(e.target.value); setSignUpError('') }}
                      autoComplete="off"
                      autoFocus
                    />
                  </div>
                </div>

                <div className="login-field">
                  <label htmlFor="signup-password">Set Password</label>
                  <div className="login-input-wrapper">
                    <input
                      id="signup-password"
                      type={showSignUpPassword ? 'text' : 'password'}
                      placeholder="Create a password"
                      value={signUpPassword}
                      onChange={(e) => { setSignUpPassword(e.target.value); setSignUpError('') }}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      className="login-eye-btn"
                      onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                      tabIndex={-1}
                    >
                      {showSignUpPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="login-field">
                  <label htmlFor="signup-confirm">Re-enter Password</label>
                  <div className="login-input-wrapper">
                    <input
                      id="signup-confirm"
                      type={showSignUpPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={signUpConfirm}
                      onChange={(e) => { setSignUpConfirm(e.target.value); setSignUpError('') }}
                      autoComplete="new-password"
                    />
                  </div>
                </div>

                {signUpError && (
                  <div className="login-error">
                    <AlertCircle size={16} />
                    <span>{signUpError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className={`login-submit-btn ${isSigningUp ? 'loading' : ''}`}
                  disabled={isSigningUp}
                >
                  {isSigningUp ? (
                    <>
                      <span className="login-spinner"></span>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <UserPlus size={18} />
                      Create Account
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginPage
