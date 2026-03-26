import { useState } from 'react'
import { Code2, GitBranch, Award, Bookmark, Zap, Github, Globe, MapPin, Calendar, Lock, Unlock, Users, X, AlertTriangle, Pencil, Share2, UserPlus, UserMinus, Check } from 'lucide-react'

function Profile({ posts, onLike, currentUser, setCurrentUser, onUpdateProfile, onShareProfile, savedPosts = [], toast }) {
  const [activeTab, setActiveTab] = useState('snippets')
  const [showPrivacyConfirm, setShowPrivacyConfirm] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showFollowersModal, setShowFollowersModal] = useState(false)
  const [showFollowingModal, setShowFollowingModal] = useState(false)
  const [editForm, setEditForm] = useState({
    name: currentUser?.name || '',
    bio: currentUser?.bio || '',
    currentlyLearning: currentUser?.currentlyLearning || '',
    github: currentUser?.github || '',
    website: currentUser?.website || '',
    location: currentUser?.location || '',
  })

  // Mock followers/following data
  const [followers, setFollowers] = useState([
    { id: 1, name: 'Arjun Sharma', handle: '@arjunsharma', avatar: 'AS', karma: 4250, skills: ['React', 'Node'], isFollowingBack: true },
    { id: 2, name: 'Priya Patel', handle: '@priyapatel', avatar: 'PP', karma: 3890, skills: ['Python', 'ML'], isFollowingBack: true },
    { id: 3, name: 'Vikram Reddy', handle: '@vikramreddy', avatar: 'VR', karma: 7823, skills: ['DSA', 'C++'], isFollowingBack: false },
    { id: 4, name: 'Neha Gupta', handle: '@nehagupta', avatar: 'NG', karma: 2150, skills: ['Rust', 'Go'], isFollowingBack: true },
  ])

  const [following, setFollowing] = useState([
    { id: 1, name: 'Dan Abramov', handle: '@dan_abramov', avatar: 'DA', karma: 125000, skills: ['React', 'Redux'], isFollowing: true },
    { id: 2, name: 'Kent C. Dodds', handle: '@kentcdodds', avatar: 'KC', karma: 98000, skills: ['Testing', 'React'], isFollowing: true },
    { id: 3, name: 'Ryan Florence', handle: '@ryanflorence', avatar: 'RF', karma: 87000, skills: ['Remix', 'React'], isFollowing: true },
  ])

  const isDemoUser = ['shlok', 'saksham', 'krrish'].includes(currentUser?.id)

  const skills = isDemoUser ? [
    { name: 'JavaScript', level: 92, color: '#f7df1e' },
    { name: 'Python', level: 85, color: '#3572A5' },
    { name: 'React', level: 88, color: '#61dafb' },
    { name: 'Node.js', level: 78, color: '#68a063' },
    { name: 'TypeScript', level: 72, color: '#3178c6' },
  ] : []

  const badges = isDemoUser ? [
    { id: 1, name: 'Bug Squasher', icon: '🐛', desc: 'Fixed 100+ bugs' },
    { id: 2, name: 'Code Ninja', icon: '🥷', desc: '50 refactors accepted' },
    { id: 3, name: 'Early Adopter', icon: '🚀', desc: 'Joined in beta' },
    { id: 4, name: 'Helpful Hand', icon: '🤝', desc: '200+ karma from helping' },
  ] : []

  const contributionData = Array.from({ length: 52 }, () => 
    Array.from({ length: 7 }, () => isDemoUser ? Math.floor(Math.random() * 5) : 0)
  )

  const formatCount = (num) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num
  }

  const handlePrivacyToggle = () => {
    setShowPrivacyConfirm(true)
  }

  const confirmPrivacyChange = () => {
    setCurrentUser({ ...currentUser, isPrivate: !currentUser.isPrivate })
    setShowPrivacyConfirm(false)
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    onUpdateProfile && onUpdateProfile(editForm)
    setShowEditModal(false)
  }

  const handleFollowBack = (userId) => {
    setFollowers(followers.map(f => 
      f.id === userId ? { ...f, isFollowingBack: !f.isFollowingBack } : f
    ))
    const follower = followers.find(f => f.id === userId)
    if (follower && !follower.isFollowingBack) {
      toast && toast.success(`Following ${follower.name}`)
    }
  }

  const handleUnfollow = (userId) => {
    const user = following.find(f => f.id === userId)
    setFollowing(following.map(f =>
      f.id === userId ? { ...f, isFollowing: !f.isFollowing } : f
    ))
    if (user && user.isFollowing) {
      toast && toast.info(`Unfollowed ${user.name}`)
    } else if (user) {
      toast && toast.success(`Following ${user.name}`)
    }
  }

  const getTabContent = () => {
    switch (activeTab) {
      case 'snippets':
        return posts.length > 0 ? posts : []
      case 'refactors':
        return [] // Mock empty for now
      case 'saved':
        return savedPosts
      default:
        return []
    }
  }

  const tabContent = getTabContent()

  return (
    <div className="profile-page dev">
      <header className="page-header">
        <h1 className="page-title">
          <span className="title-icon">~/</span>profile
        </h1>
      </header>

      <div className="dev-profile-header">
        <div className="profile-left">
          <div className="profile-avatar-large dev">{currentUser?.avatar || 'SG'}</div>
        </div>
        <div className="profile-info">
          <div className="profile-name-row">
            <h2 className="profile-name">{currentUser?.name || 'User'}</h2>
            <span className="profile-badge primary">{currentUser?.badge || 'Developer'}</span>
          </div>
          <p className="profile-handle">{currentUser?.handle || '@user'}</p>
          <p className="profile-bio">
            {currentUser?.bio || '🚀 Developer'} | 
            <span className="bio-highlight"> Currently learning {currentUser?.currentlyLearning || 'new tech'}</span>
          </p>
          
          <div className="profile-links">
            <a className="profile-link" href={`https://github.com/${currentUser?.github}`} target="_blank" rel="noopener noreferrer">
              <Github size={14} /> {currentUser?.github || 'github'}
            </a>
            <a className="profile-link" href={`https://${currentUser?.website}`} target="_blank" rel="noopener noreferrer">
              <Globe size={14} /> {currentUser?.website || 'website.dev'}
            </a>
            <span className="profile-link"><MapPin size={14} /> {currentUser?.location || 'Earth'}</span>
            <span className="profile-link"><Calendar size={14} /> Joined {currentUser?.joinedDate || 'Recently'}</span>
          </div>

          <div className="profile-stats dev">
            <div className="profile-stat">
              <div className="profile-stat-value"><Zap size={16} />{currentUser?.karma?.toLocaleString() || 0}</div>
              <div className="profile-stat-label">Karma</div>
            </div>
            <div className="profile-stat">
              <div className="profile-stat-value">{currentUser?.snippets || 0}</div>
              <div className="profile-stat-label">Snippets</div>
            </div>
            <div className="profile-stat">
              <div className="profile-stat-value">{currentUser?.refactors || 0}</div>
              <div className="profile-stat-label">Refactors</div>
            </div>
            <div className="profile-stat clickable" onClick={() => setShowFollowersModal(true)}>
              <div className="profile-stat-value">{formatCount(currentUser?.followers || 0)}</div>
              <div className="profile-stat-label">Followers</div>
            </div>
            <div className="profile-stat clickable" onClick={() => setShowFollowingModal(true)}>
              <div className="profile-stat-value">{formatCount(currentUser?.following || 0)}</div>
              <div className="profile-stat-label">Following</div>
            </div>
          </div>
        </div>
        <div className="profile-actions-col">
          <div className="privacy-toggle">
            <span className="privacy-label">
              {currentUser?.isPrivate ? <Lock size={14} /> : <Unlock size={14} />}
              {currentUser?.isPrivate ? 'Private' : 'Public'}
            </span>
            <button 
              className={`toggle-switch ${currentUser?.isPrivate ? 'active' : ''}`}
              onClick={handlePrivacyToggle}
            >
              <span className="toggle-knob"></span>
            </button>
          </div>
          <button className="edit-profile-btn" onClick={() => setShowEditModal(true)}>
            <Pencil size={16} />
            <span>Edit Profile</span>
          </button>
          <button className="edit-profile-btn secondary" onClick={onShareProfile}>
            <Share2 size={16} />
            <span>Share</span>
          </button>
        </div>
      </div>

      <div className="profile-section">
        <h3 className="section-title">
          <Award size={16} /> Badges
        </h3>
        <div className="badges-grid">
          {badges.length > 0 ? (
            badges.map(badge => (
              <div key={badge.id} className="badge-card">
                <span className="badge-icon">{badge.icon}</span>
                <div className="badge-info">
                  <span className="badge-name">{badge.name}</span>
                  <span className="badge-desc">{badge.desc}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-tab" style={{ gridColumn: '1 / -1', padding: '2rem 0' }}>
              <p>No badges earned yet</p>
            </div>
          )}
        </div>
      </div>

      <div className="profile-section">
        <h3 className="section-title">
          <Code2 size={16} /> Tech Stack
        </h3>
        <div className="skills-list">
          {skills.length > 0 ? (
            skills.map(skill => (
              <div key={skill.name} className="skill-item">
                <div className="skill-header">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percent">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div 
                    className="skill-progress" 
                    style={{ width: `${skill.level}%`, background: skill.color }}
                  ></div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-tab" style={{ padding: '2rem 0' }}>
              <p>No skills added yet</p>
            </div>
          )}
        </div>
      </div>

      <div className="profile-section">
        <h3 className="section-title">
          <GitBranch size={16} /> Contribution Graph
        </h3>
        <div className="contribution-graph">
          {contributionData.map((week, weekIdx) => (
            <div key={weekIdx} className="contribution-week">
              {week.map((day, dayIdx) => (
                <div 
                  key={dayIdx} 
                  className={`contribution-day level-${day}`}
                  title={`${day} contributions`}
                ></div>
              ))}
            </div>
          ))}
        </div>
        <div className="contribution-legend">
          <span>Less</span>
          <div className="contribution-day level-0"></div>
          <div className="contribution-day level-1"></div>
          <div className="contribution-day level-2"></div>
          <div className="contribution-day level-3"></div>
          <div className="contribution-day level-4"></div>
          <span>More</span>
        </div>
      </div>

      <div className="profile-tabs">
        <button 
          className={`profile-tab ${activeTab === 'snippets' ? 'active' : ''}`}
          onClick={() => setActiveTab('snippets')}
        >
          <Code2 size={16} />
          Snippets
          <span className="tab-count">{posts.length}</span>
        </button>
        <button 
          className={`profile-tab ${activeTab === 'refactors' ? 'active' : ''}`}
          onClick={() => setActiveTab('refactors')}
        >
          <GitBranch size={16} />
          Refactors
        </button>
        <button 
          className={`profile-tab ${activeTab === 'saved' ? 'active' : ''}`}
          onClick={() => setActiveTab('saved')}
        >
          <Bookmark size={16} />
          Saved
          <span className="tab-count">{savedPosts.length}</span>
        </button>
      </div>

      <div className="posts-grid">
        {tabContent.length > 0 ? (
          tabContent.map(item => (
            <div key={item.id} className="grid-post code">
              <div className="grid-post-lang">{item.language?.toUpperCase().slice(0, 2) || 'JS'}</div>
              <pre className="grid-post-preview">{item.code?.slice(0, 50) || 'const x = () => ...'}</pre>
              <div className="grid-post-stats">
                <span><GitBranch size={12} /> {item.refactors || 0}</span>
                <span><Zap size={12} /> {item.upvotes || 0}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-tab">
            <p>No {activeTab} yet</p>
          </div>
        )}
      </div>

      {/* Privacy Confirmation Modal */}
      {showPrivacyConfirm && (
        <div className="modal-overlay" onClick={() => setShowPrivacyConfirm(false)}>
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowPrivacyConfirm(false)}>
              <X size={20} />
            </button>
            <div className="confirm-icon">
              <AlertTriangle size={32} />
            </div>
            <h3 className="confirm-title">
              {currentUser?.isPrivate ? 'Make Account Public?' : 'Make Account Private?'}
            </h3>
            <p className="confirm-message">
              {currentUser?.isPrivate 
                ? 'Your profile, posts, and code snippets will be visible to everyone. Anyone can follow you without approval.'
                : 'Only approved followers will see your posts and code snippets. Pending follow requests will need your approval.'
              }
            </p>
            <div className="confirm-actions">
              <button className="confirm-btn cancel" onClick={() => setShowPrivacyConfirm(false)}>
                Cancel
              </button>
              <button className="confirm-btn confirm" onClick={confirmPrivacyChange}>
                {currentUser?.isPrivate ? 'Yes, Go Public' : 'Yes, Go Private'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="edit-profile-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Edit Profile</h2>
              <button className="modal-close" onClick={() => setShowEditModal(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="edit-form">
              <div className="edit-form-scroll">
                <div className="edit-form-group">
                  <label htmlFor="edit-name">Display Name</label>
                  <input
                    id="edit-name"
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    placeholder="Your name"
                  />
                </div>
                <div className="edit-form-group">
                  <label htmlFor="edit-bio">Bio</label>
                  <textarea
                    id="edit-bio"
                    value={editForm.bio}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    placeholder="Tell us about yourself"
                    rows={3}
                  />
                </div>
                <div className="edit-form-group">
                  <label htmlFor="edit-learning">Currently Learning</label>
                  <input
                    id="edit-learning"
                    type="text"
                    value={editForm.currentlyLearning}
                    onChange={(e) => setEditForm({ ...editForm, currentlyLearning: e.target.value })}
                    placeholder="What are you learning?"
                  />
                </div>
                <div className="edit-form-row">
                  <div className="edit-form-group">
                    <label htmlFor="edit-github">GitHub Username</label>
                    <input
                      id="edit-github"
                      type="text"
                      value={editForm.github}
                      onChange={(e) => setEditForm({ ...editForm, github: e.target.value })}
                      placeholder="username"
                    />
                  </div>
                  <div className="edit-form-group">
                    <label htmlFor="edit-location">Location</label>
                    <input
                      id="edit-location"
                      type="text"
                      value={editForm.location}
                      onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                      placeholder="City, Country"
                    />
                  </div>
                </div>
                <div className="edit-form-group">
                  <label htmlFor="edit-website">Website</label>
                  <input
                    id="edit-website"
                    type="text"
                    value={editForm.website}
                    onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                    placeholder="https://devsync.dev/user/username"
                  />
                </div>
              </div>
              <div className="edit-form-actions">
                <button type="button" className="edit-cancel-btn" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="edit-save-btn">
                  <Check size={16} />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Followers Modal */}
      {showFollowersModal && (
        <div className="modal-overlay" onClick={() => setShowFollowersModal(false)}>
          <div className="follow-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                <Users size={20} />
                Followers
              </h2>
              <button className="modal-close" onClick={() => setShowFollowersModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="follow-list">
              {followers.map(user => (
                <div key={user.id} className="follow-item">
                  <div className="follow-avatar">{user.avatar}</div>
                  <div className="follow-info">
                    <span className="follow-name">{user.name}</span>
                    <span className="follow-handle">{user.handle}</span>
                    <div className="follow-skills">
                      {user.skills.map(skill => (
                        <span key={skill} className="skill-tag mini">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div className="follow-karma">
                    <Zap size={12} />
                    {user.karma.toLocaleString()}
                  </div>
                  <button 
                    className={`follow-btn ${user.isFollowingBack ? 'following' : ''}`}
                    onClick={() => handleFollowBack(user.id)}
                  >
                    {user.isFollowingBack ? (
                      <>
                        <UserMinus size={14} />
                        Following
                      </>
                    ) : (
                      <>
                        <UserPlus size={14} />
                        Follow Back
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Following Modal */}
      {showFollowingModal && (
        <div className="modal-overlay" onClick={() => setShowFollowingModal(false)}>
          <div className="follow-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                <Users size={20} />
                Following
              </h2>
              <button className="modal-close" onClick={() => setShowFollowingModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="follow-list">
              {following.map(user => (
                <div key={user.id} className="follow-item">
                  <div className="follow-avatar">{user.avatar}</div>
                  <div className="follow-info">
                    <span className="follow-name">{user.name}</span>
                    <span className="follow-handle">{user.handle}</span>
                    <div className="follow-skills">
                      {user.skills.map(skill => (
                        <span key={skill} className="skill-tag mini">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div className="follow-karma">
                    <Zap size={12} />
                    {(user.karma / 1000).toFixed(0)}K
                  </div>
                  <button 
                    className={`follow-btn ${user.isFollowing ? 'following' : ''}`}
                    onClick={() => handleUnfollow(user.id)}
                  >
                    {user.isFollowing ? (
                      <>
                        <UserMinus size={14} />
                        Unfollow
                      </>
                    ) : (
                      <>
                        <UserPlus size={14} />
                        Follow
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
