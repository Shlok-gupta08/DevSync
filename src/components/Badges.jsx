import { useState, useMemo } from 'react'
import { Terminal, Trophy, Zap, Star, TrendingUp, Users, Code, Crown, Medal, Award, ChevronRight, Search, Filter } from 'lucide-react'

// Badge definitions with levels and colors
const badgeDefinitions = [
  {
    id: 'javascript',
    name: 'JavaScript Master',
    icon: '⚡',
    category: 'language',
    description: 'Expertise in JavaScript development',
    color: '#f7df1e',
    levels: [
      { name: 'Beginner', minPoints: 0, color: '#6b7280' },
      { name: 'Intermediate', minPoints: 100, color: '#10b981' },
      { name: 'Advanced', minPoints: 500, color: '#3b82f6' },
      { name: 'Expert', minPoints: 1000, color: '#8b5cf6' },
      { name: 'Master', minPoints: 2500, color: '#f59e0b' },
      { name: 'Legend', minPoints: 5000, color: '#ef4444' },
    ]
  },
  {
    id: 'python',
    name: 'Python Wizard',
    icon: '🐍',
    category: 'language',
    description: 'Mastery of Python programming',
    color: '#3776ab',
    levels: [
      { name: 'Beginner', minPoints: 0, color: '#6b7280' },
      { name: 'Intermediate', minPoints: 100, color: '#10b981' },
      { name: 'Advanced', minPoints: 500, color: '#3b82f6' },
      { name: 'Expert', minPoints: 1000, color: '#8b5cf6' },
      { name: 'Master', minPoints: 2500, color: '#f59e0b' },
      { name: 'Legend', minPoints: 5000, color: '#ef4444' },
    ]
  },
  {
    id: 'react',
    name: 'React Architect',
    icon: '⚛️',
    category: 'framework',
    description: 'Building amazing UIs with React',
    color: '#61dafb',
    levels: [
      { name: 'Beginner', minPoints: 0, color: '#6b7280' },
      { name: 'Intermediate', minPoints: 100, color: '#10b981' },
      { name: 'Advanced', minPoints: 500, color: '#3b82f6' },
      { name: 'Expert', minPoints: 1000, color: '#8b5cf6' },
      { name: 'Master', minPoints: 2500, color: '#f59e0b' },
      { name: 'Legend', minPoints: 5000, color: '#ef4444' },
    ]
  },
  {
    id: 'dsa',
    name: 'DSA Champion',
    icon: '🧮',
    category: 'skill',
    description: 'Data Structures & Algorithms expertise',
    color: '#8b5cf6',
    levels: [
      { name: 'Beginner', minPoints: 0, color: '#6b7280' },
      { name: 'Intermediate', minPoints: 100, color: '#10b981' },
      { name: 'Advanced', minPoints: 500, color: '#3b82f6' },
      { name: 'Expert', minPoints: 1000, color: '#8b5cf6' },
      { name: 'Master', minPoints: 2500, color: '#f59e0b' },
      { name: 'Legend', minPoints: 5000, color: '#ef4444' },
    ]
  },
  {
    id: 'typescript',
    name: 'TypeScript Pro',
    icon: '📘',
    category: 'language',
    description: 'Type-safe coding excellence',
    color: '#3178c6',
    levels: [
      { name: 'Beginner', minPoints: 0, color: '#6b7280' },
      { name: 'Intermediate', minPoints: 100, color: '#10b981' },
      { name: 'Advanced', minPoints: 500, color: '#3b82f6' },
      { name: 'Expert', minPoints: 1000, color: '#8b5cf6' },
      { name: 'Master', minPoints: 2500, color: '#f59e0b' },
      { name: 'Legend', minPoints: 5000, color: '#ef4444' },
    ]
  },
  {
    id: 'rust',
    name: 'Rust Warrior',
    icon: '🦀',
    category: 'language',
    description: 'Systems programming with Rust',
    color: '#dea584',
    levels: [
      { name: 'Beginner', minPoints: 0, color: '#6b7280' },
      { name: 'Intermediate', minPoints: 100, color: '#10b981' },
      { name: 'Advanced', minPoints: 500, color: '#3b82f6' },
      { name: 'Expert', minPoints: 1000, color: '#8b5cf6' },
      { name: 'Master', minPoints: 2500, color: '#f59e0b' },
      { name: 'Legend', minPoints: 5000, color: '#ef4444' },
    ]
  },
  {
    id: 'devops',
    name: 'DevOps Ninja',
    icon: '🐳',
    category: 'skill',
    description: 'CI/CD and infrastructure mastery',
    color: '#0db7ed',
    levels: [
      { name: 'Beginner', minPoints: 0, color: '#6b7280' },
      { name: 'Intermediate', minPoints: 100, color: '#10b981' },
      { name: 'Advanced', minPoints: 500, color: '#3b82f6' },
      { name: 'Expert', minPoints: 1000, color: '#8b5cf6' },
      { name: 'Master', minPoints: 2500, color: '#f59e0b' },
      { name: 'Legend', minPoints: 5000, color: '#ef4444' },
    ]
  },
  {
    id: 'ml',
    name: 'ML Engineer',
    icon: '🤖',
    category: 'skill',
    description: 'Machine Learning & AI expertise',
    color: '#ff6b6b',
    levels: [
      { name: 'Beginner', minPoints: 0, color: '#6b7280' },
      { name: 'Intermediate', minPoints: 100, color: '#10b981' },
      { name: 'Advanced', minPoints: 500, color: '#3b82f6' },
      { name: 'Expert', minPoints: 1000, color: '#8b5cf6' },
      { name: 'Master', minPoints: 2500, color: '#f59e0b' },
      { name: 'Legend', minPoints: 5000, color: '#ef4444' },
    ]
  },
  {
    id: 'helper',
    name: 'Community Helper',
    icon: '🤝',
    category: 'community',
    description: 'Helping others grow',
    color: '#10b981',
    levels: [
      { name: 'Newcomer', minPoints: 0, color: '#6b7280' },
      { name: 'Helper', minPoints: 50, color: '#10b981' },
      { name: 'Mentor', minPoints: 200, color: '#3b82f6' },
      { name: 'Guide', minPoints: 500, color: '#8b5cf6' },
      { name: 'Sage', minPoints: 1000, color: '#f59e0b' },
      { name: 'Guardian', minPoints: 2000, color: '#ef4444' },
    ]
  },
  {
    id: 'bugfixer',
    name: 'Bug Squasher',
    icon: '🐛',
    category: 'community',
    description: 'Fixing bugs across the community',
    color: '#ef4444',
    levels: [
      { name: 'Newbie', minPoints: 0, color: '#6b7280' },
      { name: 'Debugger', minPoints: 25, color: '#10b981' },
      { name: 'Fixer', minPoints: 100, color: '#3b82f6' },
      { name: 'Hunter', minPoints: 250, color: '#8b5cf6' },
      { name: 'Exterminator', minPoints: 500, color: '#f59e0b' },
      { name: 'Legend', minPoints: 1000, color: '#ef4444' },
    ]
  },
  {
    id: 'refactor',
    name: 'Code Refactorer',
    icon: '🔧',
    category: 'community',
    description: 'Improving code quality',
    color: '#f59e0b',
    levels: [
      { name: 'Beginner', minPoints: 0, color: '#6b7280' },
      { name: 'Improver', minPoints: 30, color: '#10b981' },
      { name: 'Optimizer', minPoints: 100, color: '#3b82f6' },
      { name: 'Architect', minPoints: 300, color: '#8b5cf6' },
      { name: 'Master', minPoints: 700, color: '#f59e0b' },
      { name: 'Perfectionist', minPoints: 1500, color: '#ef4444' },
    ]
  },
  {
    id: 'streak',
    name: 'Consistency King',
    icon: '🔥',
    category: 'activity',
    description: 'Maintaining coding streaks',
    color: '#ff6b35',
    levels: [
      { name: 'Starter', minPoints: 0, color: '#6b7280' },
      { name: 'Consistent', minPoints: 7, color: '#10b981' },
      { name: 'Dedicated', minPoints: 30, color: '#3b82f6' },
      { name: 'Committed', minPoints: 100, color: '#8b5cf6' },
      { name: 'Unstoppable', minPoints: 365, color: '#f59e0b' },
      { name: 'Legendary', minPoints: 1000, color: '#ef4444' },
    ]
  },
]

// Mock leaderboard data for each badge
const mockLeaderboards = {
  javascript: [
    { rank: 1, name: 'Dan Abramov', handle: '@dan_abramov', avatar: 'DA', points: 8420, level: 'Legend' },
    { rank: 2, name: 'Kent C. Dodds', handle: '@kentcdodds', avatar: 'KC', points: 6890, level: 'Legend' },
    { rank: 3, name: 'Priya Patel', handle: '@priyapatel', avatar: 'PP', points: 4521, level: 'Master' },
    { rank: 4, name: 'Arjun Sharma', handle: '@arjunsharma', avatar: 'AS', points: 2840, level: 'Master' },
    { rank: 5, name: 'Shlok Gupta', handle: '@shlok_gupta08', avatar: 'SG', points: 1850, level: 'Expert', isCurrentUser: true },
    { rank: 6, name: 'Neha Gupta', handle: '@nehagupta', avatar: 'NG', points: 1420, level: 'Expert' },
    { rank: 7, name: 'Rahul Verma', handle: '@rahulverma', avatar: 'RV', points: 980, level: 'Advanced' },
    { rank: 8, name: 'Vikram Singh', handle: '@vikramsingh', avatar: 'VS', points: 750, level: 'Advanced' },
    { rank: 9, name: 'Riya Mehta', handle: '@riyamehta', avatar: 'RM', points: 520, level: 'Advanced' },
    { rank: 10, name: 'Karan Kumar', handle: '@karankumar', avatar: 'KK', points: 340, level: 'Intermediate' },
  ],
  python: [
    { rank: 1, name: 'Arjun Sharma', handle: '@arjunsharma', avatar: 'AS', points: 5840, level: 'Legend' },
    { rank: 2, name: 'Priya Patel', handle: '@priyapatel', avatar: 'PP', points: 4200, level: 'Master' },
    { rank: 3, name: 'Shlok Gupta', handle: '@shlok_gupta08', avatar: 'SG', points: 2100, level: 'Master', isCurrentUser: true },
    { rank: 4, name: 'Vikram Reddy', handle: '@vikramreddy', avatar: 'VR', points: 1650, level: 'Expert' },
    { rank: 5, name: 'Neha Gupta', handle: '@nehagupta', avatar: 'NG', points: 890, level: 'Advanced' },
  ],
  react: [
    { rank: 1, name: 'Dan Abramov', handle: '@dan_abramov', avatar: 'DA', points: 12500, level: 'Legend' },
    { rank: 2, name: 'Kent C. Dodds', handle: '@kentcdodds', avatar: 'KC', points: 9800, level: 'Legend' },
    { rank: 3, name: 'Ryan Florence', handle: '@ryanflorence', avatar: 'RF', points: 8700, level: 'Legend' },
    { rank: 4, name: 'Priya Patel', handle: '@priyapatel', avatar: 'PP', points: 3200, level: 'Master' },
    { rank: 5, name: 'Shlok Gupta', handle: '@shlok_gupta08', avatar: 'SG', points: 2400, level: 'Master', isCurrentUser: true },
  ],
  dsa: [
    { rank: 1, name: 'Vikram Reddy', handle: '@vikramreddy', avatar: 'VR', points: 7823, level: 'Legend' },
    { rank: 2, name: 'Arjun Sharma', handle: '@arjunsharma', avatar: 'AS', points: 4500, level: 'Master' },
    { rank: 3, name: 'Shlok Gupta', handle: '@shlok_gupta08', avatar: 'SG', points: 1200, level: 'Expert', isCurrentUser: true },
  ],
  typescript: [
    { rank: 1, name: 'Matt Pocock', handle: '@mattpocockuk', avatar: 'MP', points: 9500, level: 'Legend' },
    { rank: 2, name: 'Shlok Gupta', handle: '@shlok_gupta08', avatar: 'SG', points: 1650, level: 'Expert', isCurrentUser: true },
  ],
  rust: [
    { rank: 1, name: 'Neha Gupta', handle: '@nehagupta', avatar: 'NG', points: 3200, level: 'Master' },
    { rank: 2, name: 'Shlok Gupta', handle: '@shlok_gupta08', avatar: 'SG', points: 450, level: 'Intermediate', isCurrentUser: true },
  ],
  devops: [
    { rank: 1, name: 'Vikram Singh', handle: '@vikramsingh', avatar: 'VS', points: 4200, level: 'Master' },
    { rank: 2, name: 'Shlok Gupta', handle: '@shlok_gupta08', avatar: 'SG', points: 320, level: 'Intermediate', isCurrentUser: true },
  ],
  ml: [
    { rank: 1, name: 'Priya Patel', handle: '@priyapatel', avatar: 'PP', points: 5600, level: 'Legend' },
    { rank: 2, name: 'Shlok Gupta', handle: '@shlok_gupta08', avatar: 'SG', points: 180, level: 'Intermediate', isCurrentUser: true },
  ],
  helper: [
    { rank: 1, name: 'Kent C. Dodds', handle: '@kentcdodds', avatar: 'KC', points: 2500, level: 'Guardian' },
    { rank: 2, name: 'Shlok Gupta', handle: '@shlok_gupta08', avatar: 'SG', points: 420, level: 'Mentor', isCurrentUser: true },
  ],
  bugfixer: [
    { rank: 1, name: 'Arjun Sharma', handle: '@arjunsharma', avatar: 'AS', points: 890, level: 'Exterminator' },
    { rank: 2, name: 'Shlok Gupta', handle: '@shlok_gupta08', avatar: 'SG', points: 156, level: 'Fixer', isCurrentUser: true },
  ],
  refactor: [
    { rank: 1, name: 'Priya Patel', handle: '@priyapatel', avatar: 'PP', points: 1200, level: 'Master' },
    { rank: 2, name: 'Shlok Gupta', handle: '@shlok_gupta08', avatar: 'SG', points: 89, level: 'Improver', isCurrentUser: true },
  ],
  streak: [
    { rank: 1, name: 'Alex Nova', handle: '@alexnova', avatar: 'AN', points: 365, level: 'Unstoppable' },
    { rank: 2, name: 'Shlok Gupta', handle: '@shlok_gupta08', avatar: 'SG', points: 45, level: 'Dedicated', isCurrentUser: true },
  ],
}

// Current user's badge progress (mock data)
const mockBadgeProgress = {
  javascript: { points: 1850, totalContributions: 156 },
  python: { points: 2100, totalContributions: 89 },
  react: { points: 2400, totalContributions: 112 },
  dsa: { points: 1200, totalContributions: 67 },
  typescript: { points: 1650, totalContributions: 78 },
  rust: { points: 450, totalContributions: 23 },
  devops: { points: 320, totalContributions: 18 },
  ml: { points: 180, totalContributions: 12 },
  helper: { points: 420, totalContributions: 245 },
  bugfixer: { points: 156, totalContributions: 156 },
  refactor: { points: 89, totalContributions: 89 },
  streak: { points: 45, totalContributions: 45 },
}

function Badges({ currentUser, toast }) {
  const [selectedBadge, setSelectedBadge] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const isDemoUser = ['shlok', 'saksham', 'krrish'].includes(currentUser?.id)
  const userBadgeProgress = isDemoUser ? mockBadgeProgress : {}

  const categories = [
    { id: 'all', label: 'All Badges' },
    { id: 'language', label: 'Languages' },
    { id: 'framework', label: 'Frameworks' },
    { id: 'skill', label: 'Skills' },
    { id: 'community', label: 'Community' },
    { id: 'activity', label: 'Activity' },
  ]

  const getUserLevel = (badgeId) => {
    const badge = badgeDefinitions.find(b => b.id === badgeId)
    const progress = userBadgeProgress[badgeId] || { points: 0 }
    if (!badge) return null
    if (!progress) return badge.levels[0]
    
    let currentLevel = badge.levels[0]
    for (const level of badge.levels) {
      if (progress.points >= level.minPoints) {
        currentLevel = level
      }
    }
    return currentLevel
  }

  const getNextLevel = (badgeId) => {
    const badge = badgeDefinitions.find(b => b.id === badgeId)
    const progress = userBadgeProgress[badgeId] || { points: 0 }
    if (!badge) return null
    if (!progress) return badge.levels.length > 1 ? badge.levels[1] : null
    
    for (const level of badge.levels) {
      if (progress.points < level.minPoints) {
        return level
      }
    }
    return null // Already at max level
  }

  const getProgressPercentage = (badgeId) => {
    const progress = userBadgeProgress[badgeId] || { points: 0 }
    const currentLevel = getUserLevel(badgeId)
    const nextLevel = getNextLevel(badgeId)
    
    if (!nextLevel) return 100
    if (!progress) return 0
    
    const pointsInLevel = progress.points - currentLevel.minPoints
    const levelRange = nextLevel.minPoints - currentLevel.minPoints
    return Math.min((pointsInLevel / levelRange) * 100, 100)
  }

  const filteredBadges = useMemo(() => {
    return badgeDefinitions.filter(badge => {
      const matchesSearch = badge.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           badge.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = categoryFilter === 'all' || badge.category === categoryFilter
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, categoryFilter])

  const getRankIcon = (rank) => {
    switch(rank) {
      case 1: return <Crown size={16} style={{ color: '#ffd700' }} />
      case 2: return <Medal size={16} style={{ color: '#c0c0c0' }} />
      case 3: return <Medal size={16} style={{ color: '#cd7f32' }} />
      default: return <span className="rank-number">#{rank}</span>
    }
  }

  const selectedBadgeData = selectedBadge ? badgeDefinitions.find(b => b.id === selectedBadge) : null
  const leaderboard = selectedBadge ? (mockLeaderboards[selectedBadge] || []).map(entry => ({
    ...entry,
    isCurrentUser: entry.handle === currentUser?.handle || (entry.isCurrentUser && isDemoUser)
  })) : []

  return (
    <div className="badges-page">
      <header className="page-header">
        <h1 className="page-title">
          <Trophy size={24} className="title-icon" />
          Badges & Achievements
        </h1>
      </header>

      <div className="badges-search">
        <div className="terminal-input-wrap">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search badges..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="badge-search-input"
          />
        </div>
      </div>

      <div className="badge-categories">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`category-btn ${categoryFilter === cat.id ? 'active' : ''}`}
            onClick={() => setCategoryFilter(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="badges-layout">
        <div className="badges-grid-section">
          <h2 className="section-subtitle">Your Badges</h2>
          <div className="badges-grid-large">
            {filteredBadges.map(badge => {
              const userLevel = getUserLevel(badge.id)
              const progress = userBadgeProgress[badge.id]
              const progressPercent = getProgressPercentage(badge.id)
              const nextLevel = getNextLevel(badge.id)
              
              return (
                <div
                  key={badge.id}
                  className={`badge-card-large ${selectedBadge === badge.id ? 'selected' : ''}`}
                  onClick={() => setSelectedBadge(badge.id)}
                >
                  <div className="badge-card-header">
                    <span className="badge-icon-large" style={{ background: `${badge.color}20` }}>
                      {badge.icon}
                    </span>
                    <div className="badge-level-indicator" style={{ background: userLevel.color }}>
                      {userLevel.name}
                    </div>
                  </div>
                  <h3 className="badge-name-large">{badge.name}</h3>
                  <p className="badge-desc">{badge.description}</p>
                  <div className="badge-progress-section">
                    <div className="badge-progress-bar">
                      <div 
                        className="badge-progress-fill"
                        style={{ width: `${progressPercent}%`, background: userLevel.color }}
                      />
                    </div>
                    <div className="badge-progress-text">
                      <span>{progress?.points || 0} pts</span>
                      {nextLevel && <span>{nextLevel.minPoints} pts to {nextLevel.name}</span>}
                    </div>
                  </div>
                  <div className="badge-card-footer">
                    <span className="badge-contributions">
                      <Code size={14} />
                      {progress?.totalContributions || 0} contributions
                    </span>
                    <ChevronRight size={16} className="badge-arrow" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {selectedBadgeData && (
          <div className="badge-leaderboard-section">
            <div className="leaderboard-header">
              <div className="leaderboard-badge-info">
                <span className="leaderboard-icon" style={{ background: `${selectedBadgeData.color}20` }}>
                  {selectedBadgeData.icon}
                </span>
                <div>
                  <h2 className="leaderboard-title">{selectedBadgeData.name}</h2>
                  <p className="leaderboard-subtitle">Leaderboard</p>
                </div>
              </div>
              <button className="close-leaderboard" onClick={() => setSelectedBadge(null)}>
                ✕
              </button>
            </div>

            <div className="level-legend">
              {selectedBadgeData.levels.map(level => (
                <div key={level.name} className="level-item">
                  <span className="level-dot" style={{ background: level.color }} />
                  <span className="level-name">{level.name}</span>
                  <span className="level-points">{level.minPoints}+</span>
                </div>
              ))}
            </div>

            <div className="leaderboard-list">
              {leaderboard.map(entry => {
                const levelData = selectedBadgeData.levels.find(l => l.name === entry.level) || selectedBadgeData.levels[0]
                return (
                  <div 
                    key={entry.rank} 
                    className={`leaderboard-entry ${entry.isCurrentUser ? 'current-user' : ''} ${entry.rank <= 3 ? 'top-three' : ''}`}
                  >
                    <div className="entry-rank">
                      {getRankIcon(entry.rank)}
                    </div>
                    <div className="entry-avatar" style={{ borderColor: levelData.color }}>
                      {entry.avatar}
                    </div>
                    <div className="entry-info">
                      <div className="entry-name">
                        {entry.name}
                        {entry.isCurrentUser && <span className="you-badge">You</span>}
                      </div>
                      <div className="entry-handle">{entry.handle}</div>
                    </div>
                    <div className="entry-stats">
                      <div className="entry-points">
                        <Zap size={14} />
                        {entry.points.toLocaleString()}
                      </div>
                      <div className="entry-level" style={{ color: levelData.color }}>
                        {entry.level}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="leaderboard-tip">
              <TrendingUp size={16} />
              <span>Earn points by posting snippets, refactoring code, and helping others in this category!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Badges
