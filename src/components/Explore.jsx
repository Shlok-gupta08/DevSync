import { useState, useMemo } from 'react'
import { Search, TrendingUp, Code, Zap, Trophy, Users, GitBranch, Play, Star, Clock, Filter, Flame, Terminal, Award, X, Check, UserPlus, UserMinus } from 'lucide-react'

function Explore({ toast }) {
  const [activeTab, setActiveTab] = useState('trending')
  const [activeLang, setActiveLang] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [joinedChallenges, setJoinedChallenges] = useState([2])
  const [followedDevs, setFollowedDevs] = useState([])
  const [starredSnippets, setStarredSnippets] = useState([])

  const tabs = [
    { id: 'trending', label: 'Trending', icon: Flame },
    { id: 'challenges', label: 'Challenges', icon: Trophy },
    { id: 'repos', label: 'Hot Repos', icon: GitBranch },
    { id: 'devs', label: 'Top Devs', icon: Users },
  ]

  const languages = [
    { id: 'all', name: 'All', color: '#888' },
    { id: 'javascript', name: 'JavaScript', color: '#f7df1e' },
    { id: 'python', name: 'Python', color: '#3776ab' },
    { id: 'typescript', name: 'TypeScript', color: '#3178c6' },
    { id: 'rust', name: 'Rust', color: '#ce412b' },
    { id: 'go', name: 'Go', color: '#00add8' },
  ]

  const trendingSnippets = [
    {
      id: 1,
      title: 'React Server Components Pattern',
      author: 'dan_abramov',
      avatar: 'DA',
      language: 'typescript',
      stars: 2847,
      runs: 1.2,
      preview: 'async function ServerComponent() {\n  const data = await fetchData();\n  return <Client data={data} />;\n}',
      tags: ['React', 'RSC', 'Next.js']
    },
    {
      id: 2,
      title: 'Blazingly Fast Sorting in Rust',
      author: 'rust_wizard',
      avatar: 'RW',
      language: 'rust',
      stars: 1923,
      runs: 0.8,
      preview: 'fn quicksort<T: Ord>(arr: &mut [T]) {\n  if arr.len() <= 1 { return; }\n  let pivot = partition(arr);\n}',
      tags: ['Rust', 'Algorithms', 'Performance']
    },
    {
      id: 3,
      title: 'Python One-Liner Magic',
      author: 'py_ninja',
      avatar: 'PN',
      language: 'python',
      stars: 1456,
      runs: 2.1,
      preview: 'flatten = lambda l: [i for s in l for i in (flatten(s) if isinstance(s, list) else [s])]',
      tags: ['Python', 'One-liner', 'Functional']
    },
  ]

  const challenges = [
    {
      id: 1,
      title: 'Binary Tree Max Path Sum',
      difficulty: 'Hard',
      participants: 3420,
      prize: '500 Karma',
      timeLeft: '2d 14h',
      tags: ['Trees', 'DFS', 'Dynamic Programming']
    },
    {
      id: 2,
      title: 'Rate Limiter Design',
      difficulty: 'Medium',
      participants: 2156,
      prize: '300 Karma',
      timeLeft: '5d 8h',
      tags: ['System Design', 'Redis', 'Algorithms']
    },
    {
      id: 3,
      title: 'CSS Grid Art Challenge',
      difficulty: 'Easy',
      participants: 4892,
      prize: '100 Karma',
      timeLeft: '1d 2h',
      tags: ['CSS', 'Creative', 'Frontend']
    },
  ]

  const hotRepos = [
    {
      id: 1,
      name: 'devsync/neural-engine',
      description: 'High-performance ML inference engine written in Rust',
      stars: 12400,
      forks: 890,
      language: 'rust',
      trending: '+2.4k this week'
    },
    {
      id: 2,
      name: 'devtools/react-perf-kit',
      description: 'Performance monitoring toolkit for React applications',
      stars: 8920,
      forks: 445,
      language: 'typescript',
      trending: '+1.8k this week'
    },
    {
      id: 3,
      name: 'algo-masters/dsa-visualizer',
      description: 'Interactive data structure and algorithm visualizations',
      stars: 15600,
      forks: 1230,
      language: 'javascript',
      trending: '+3.1k this week'
    },
  ]

  const topDevs = [
    {
      id: 1,
      name: 'Alex Nova',
      handle: '@alexnova',
      avatar: 'AN',
      karma: 45200,
      badge: 'Legend',
      skills: ['React', 'Node', 'TypeScript'],
      followers: '12.4k',
      streak: 365
    },
    {
      id: 2,
      name: 'Sarah Chen',
      handle: '@sarahc',
      avatar: 'SC',
      karma: 38900,
      badge: 'ML Expert',
      skills: ['Python', 'TensorFlow', 'PyTorch'],
      followers: '9.8k',
      streak: 248
    },
    {
      id: 3,
      name: 'Marcus Webb',
      handle: '@marcuswebb',
      avatar: 'MW',
      karma: 32100,
      badge: 'Open Source Hero',
      skills: ['Rust', 'Go', 'Systems'],
      followers: '7.2k',
      streak: 180
    },
  ]

  const getLangColor = (lang) => {
    const l = languages.find(x => x.id === lang)
    return l ? l.color : '#888'
  }

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'Easy': return 'var(--success)'
      case 'Medium': return 'var(--warning)'
      case 'Hard': return 'var(--error)'
      default: return 'var(--text-muted)'
    }
  }

  // Filter by language
  const filteredSnippets = useMemo(() => {
    let snippets = trendingSnippets
    if (activeLang !== 'all') {
      snippets = snippets.filter(s => s.language === activeLang)
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      snippets = snippets.filter(s =>
        s.title.toLowerCase().includes(query) ||
        s.author.toLowerCase().includes(query) ||
        s.tags.some(t => t.toLowerCase().includes(query))
      )
    }
    return snippets
  }, [activeLang, searchQuery])

  const filteredRepos = useMemo(() => {
    let repos = hotRepos
    if (activeLang !== 'all') {
      repos = repos.filter(r => r.language === activeLang)
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      repos = repos.filter(r =>
        r.name.toLowerCase().includes(query) ||
        r.description.toLowerCase().includes(query)
      )
    }
    return repos
  }, [activeLang, searchQuery])

  const filteredDevs = useMemo(() => {
    if (!searchQuery) return topDevs
    const query = searchQuery.toLowerCase()
    return topDevs.filter(d =>
      d.name.toLowerCase().includes(query) ||
      d.handle.toLowerCase().includes(query) ||
      d.skills.some(s => s.toLowerCase().includes(query))
    )
  }, [searchQuery])

  const filteredChallenges = useMemo(() => {
    if (!searchQuery) return challenges
    const query = searchQuery.toLowerCase()
    return challenges.filter(c =>
      c.title.toLowerCase().includes(query) ||
      c.tags.some(t => t.toLowerCase().includes(query))
    )
  }, [searchQuery])

  const handleJoinChallenge = (challengeId) => {
    if (joinedChallenges.includes(challengeId)) {
      setJoinedChallenges(joinedChallenges.filter(id => id !== challengeId))
      toast && toast.info('Left challenge')
    } else {
      setJoinedChallenges([...joinedChallenges, challengeId])
      toast && toast.success('🏆 Joined challenge! Good luck!')
    }
  }

  const handleFollowDev = (devId) => {
    const dev = topDevs.find(d => d.id === devId)
    if (followedDevs.includes(devId)) {
      setFollowedDevs(followedDevs.filter(id => id !== devId))
      toast && toast.info(`Unfollowed ${dev?.name}`)
    } else {
      setFollowedDevs([...followedDevs, devId])
      toast && toast.success(`Following ${dev?.name}!`)
    }
  }

  const handleStarSnippet = (snippetId) => {
    if (starredSnippets.includes(snippetId)) {
      setStarredSnippets(starredSnippets.filter(id => id !== snippetId))
    } else {
      setStarredSnippets([...starredSnippets, snippetId])
      toast && toast.success('Added to stars!')
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    // Search is already reactive via useMemo
    if (searchQuery.trim()) {
      toast && toast.info(`Searching for "${searchQuery}"...`)
    }
  }

  return (
    <div className="explore-page dev-explore">
      <header className="page-header">
        <h1 className="page-title">
          <Terminal size={24} className="title-icon" />
          Explore
        </h1>
      </header>

      <form className="terminal-search explore-search" onSubmit={handleSearch}>
        <div className="terminal-header">
          <span className="terminal-title">search</span>
        </div>
        <div className="terminal-input-wrap">
          <span className="terminal-prompt">$</span>
          <input
            type="text"
            className="terminal-input"
            placeholder="grep -r 'your query' --include='*.{js,py,rs}'"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button type="button" className="input-clear-btn" onClick={() => setSearchQuery('')}>
              <X size={16} />
            </button>
          )}
          <button type="submit" className="search-submit">
            <Search size={16} />
          </button>
        </div>
      </form>

      <div className="explore-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`explore-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="lang-filter">
        {languages.map(lang => (
          <button
            key={lang.id}
            className={`lang-filter-btn ${activeLang === lang.id ? 'active' : ''}`}
            onClick={() => setActiveLang(lang.id)}
          >
            {lang.id !== 'all' && (
              <span className="lang-dot" style={{ background: lang.color }} />
            )}
            {lang.name}
          </button>
        ))}
      </div>

      <div className="explore-content">
        {activeTab === 'trending' && (
          <div className="trending-snippets">
            {filteredSnippets.length > 0 ? filteredSnippets.map(snippet => (
              <div key={snippet.id} className="snippet-card">
                <div className="snippet-header">
                  <div className="snippet-author">
                    <div className="snippet-avatar">{snippet.avatar}</div>
                    <div className="snippet-meta">
                      <span className="snippet-title">{snippet.title}</span>
                      <span className="snippet-by">by @{snippet.author}</span>
                    </div>
                  </div>
                  <div className="snippet-stats">
                    <button
                      className={`snippet-stat star-btn ${starredSnippets.includes(snippet.id) ? 'active' : ''}`}
                      onClick={() => handleStarSnippet(snippet.id)}
                    >
                      <Star size={14} className={starredSnippets.includes(snippet.id) ? 'filled' : ''} />
                      {snippet.stars + (starredSnippets.includes(snippet.id) ? 1 : 0)}
                    </button>
                    <span className="snippet-stat runs">
                      <Play size={14} />
                      {snippet.runs}k
                    </span>
                  </div>
                </div>
                <div className="snippet-code">
                  <div className="code-lang">
                    <span className="lang-dot" style={{ background: getLangColor(snippet.language) }} />
                    {snippet.language}
                  </div>
                  <pre className="snippet-preview"><code>{snippet.preview}</code></pre>
                </div>
                <div className="snippet-tags">
                  {snippet.tags.map(tag => (
                    <span
                      key={tag}
                      className="snippet-tag"
                      onClick={() => setSearchQuery(tag)}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )) : (
              <div className="no-results">
                <Search size={48} />
                <p>No snippets found</p>
                <span>Try a different search or filter</span>
              </div>
            )}
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="challenges-grid">
            {filteredChallenges.length > 0 ? filteredChallenges.map(challenge => (
              <div key={challenge.id} className="challenge-card">
                <div className="challenge-header">
                  <Trophy size={20} className="challenge-icon" />
                  <span
                    className="challenge-difficulty"
                    style={{ color: getDifficultyColor(challenge.difficulty) }}
                  >
                    {challenge.difficulty}
                  </span>
                </div>
                <h3 className="challenge-title">{challenge.title}</h3>
                <div className="challenge-tags">
                  {challenge.tags.map(tag => (
                    <span key={tag} className="challenge-tag">{tag}</span>
                  ))}
                </div>
                <div className="challenge-footer">
                  <div className="challenge-info">
                    <span className="challenge-participants">
                      <Users size={14} />
                      {challenge.participants + (joinedChallenges.includes(challenge.id) ? 1 : 0)}
                    </span>
                    <span className="challenge-prize">
                      <Zap size={14} />
                      {challenge.prize}
                    </span>
                  </div>
                  <div className="challenge-timer">
                    <Clock size={14} />
                    {challenge.timeLeft}
                  </div>
                </div>
                <button
                  className={`challenge-join-btn ${joinedChallenges.includes(challenge.id) ? 'joined' : ''}`}
                  onClick={() => handleJoinChallenge(challenge.id)}
                >
                  {joinedChallenges.includes(challenge.id) ? (
                    <>
                      <Check size={16} />
                      Joined
                    </>
                  ) : (
                    'Join Challenge'
                  )}
                </button>
              </div>
            )) : (
              <div className="no-results">
                <Trophy size={48} />
                <p>No challenges found</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'repos' && (
          <div className="repos-list">
            {filteredRepos.length > 0 ? filteredRepos.map(repo => (
              <div key={repo.id} className="repo-card">
                <div className="repo-main">
                  <GitBranch size={20} className="repo-icon" />
                  <div className="repo-info">
                    <h3 className="repo-name">{repo.name}</h3>
                    <p className="repo-desc">{repo.description}</p>
                    <div className="repo-meta">
                      <span className="repo-lang">
                        <span className="lang-dot" style={{ background: getLangColor(repo.language) }} />
                        {repo.language}
                      </span>
                      <span className="repo-stat">
                        <Star size={14} />
                        {(repo.stars / 1000).toFixed(1)}k
                      </span>
                      <span className="repo-stat">
                        <GitBranch size={14} />
                        {repo.forks}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="repo-trending">
                  <TrendingUp size={14} />
                  {repo.trending}
                </div>
              </div>
            )) : (
              <div className="no-results">
                <GitBranch size={48} />
                <p>No repos found</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'devs' && (
          <div className="top-devs-list">
            {filteredDevs.length > 0 ? filteredDevs.map((dev, index) => (
              <div key={dev.id} className="top-dev-card">
                <div className="dev-rank">#{index + 1}</div>
                <div className="dev-avatar-large">{dev.avatar}</div>
                <div className="dev-main-info">
                  <div className="dev-name-row">
                    <h3 className="dev-name">{dev.name}</h3>
                    <span className="dev-badge-featured">{dev.badge}</span>
                  </div>
                  <span className="dev-handle">{dev.handle}</span>
                  <div className="dev-skills-row">
                    {dev.skills.map(skill => (
                      <span key={skill} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
                <div className="dev-stats-col">
                  <div className="dev-stat-item">
                    <Zap size={16} className="karma-icon" />
                    <span className="dev-stat-value">{(dev.karma / 1000).toFixed(1)}k</span>
                    <span className="dev-stat-label">karma</span>
                  </div>
                  <div className="dev-stat-item">
                    <Users size={16} />
                    <span className="dev-stat-value">{dev.followers}</span>
                    <span className="dev-stat-label">followers</span>
                  </div>
                  <div className="dev-stat-item">
                    <Flame size={16} className="streak-icon" />
                    <span className="dev-stat-value">{dev.streak}</span>
                    <span className="dev-stat-label">day streak</span>
                  </div>
                </div>
                <button
                  className={`follow-dev-btn ${followedDevs.includes(dev.id) ? 'following' : ''}`}
                  onClick={() => handleFollowDev(dev.id)}
                >
                  {followedDevs.includes(dev.id) ? (
                    <>
                      <UserMinus size={16} />
                      Following
                    </>
                  ) : (
                    <>
                      <UserPlus size={16} />
                      Follow
                    </>
                  )}
                </button>
              </div>
            )) : (
              <div className="no-results">
                <Users size={48} />
                <p>No developers found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Explore
