import { useState } from 'react'
import { GitPullRequest, GitMerge, Star, MessageSquare, UserPlus, AtSign, Bell, Users, Layers, ChevronDown, ChevronRight, Code, Zap, GitBranch, CheckCircle, XCircle, Terminal, Check, X, Trash2, Clock, Eye, EyeOff } from 'lucide-react'

function Notifications({ currentUser, notifications = [], onMarkRead, onMarkAllRead, onClear, onWatchLater, toast }) {
  const [activeTab, setActiveTab] = useState('all')
  const [viewMode, setViewMode] = useState('list')
  const [expandedGroups, setExpandedGroups] = useState({})
  const [watchLaterItems, setWatchLaterItems] = useState([]) // IDs of watch later items

  const tabs = [
    { id: 'all', label: 'All', icon: Bell },
    { id: 'star', label: 'Stars', icon: Star },
    { id: 'refactor', label: 'Refactors', icon: Code },
    { id: 'pr', label: 'PRs', icon: GitPullRequest },
    { id: 'follow', label: 'Follows', icon: UserPlus },
    { id: 'mention', label: 'Mentions', icon: AtSign },
  ]

  const viewModes = [
    { id: 'list', label: 'List', icon: Layers },
    { id: 'byType', label: 'By Type', icon: Layers },
    { id: 'byUser', label: 'By User', icon: Users },
  ]

  const getIcon = (type) => {
    switch (type) {
      case 'star': return <Star size={18} />
      case 'follow': return <UserPlus size={18} />
      case 'comment': return <MessageSquare size={18} />
      case 'mention': return <AtSign size={18} />
      case 'refactor': return <Code size={18} />
      case 'pr_approved': return <CheckCircle size={18} />
      case 'pr_rejected': return <XCircle size={18} />
      case 'pr_merged': return <GitMerge size={18} />
      case 'karma': return <Zap size={18} />
      case 'challenge': return <Terminal size={18} />
      default: return <Bell size={18} />
    }
  }

  const getTypeLabel = (type) => {
    const labels = { 
      star: 'Stars', 
      follow: 'New Followers', 
      comment: 'Comments', 
      mention: 'Mentions', 
      refactor: 'Refactor Suggestions',
      pr_approved: 'PR Approved',
      pr_rejected: 'Changes Requested',
      pr_merged: 'PR Merged',
      karma: 'Karma Awards',
      challenge: 'Challenges'
    }
    return labels[type] || type
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'star': return 'var(--warning)'
      case 'pr_approved': 
      case 'pr_merged': return 'var(--success)'
      case 'pr_rejected': return 'var(--error)'
      case 'refactor': return 'var(--accent-primary)'
      case 'karma': return 'var(--warning)'
      case 'challenge': return 'var(--accent-secondary)'
      default: return 'var(--text-muted)'
    }
  }

  const filterNotifications = () => {
    if (activeTab === 'all') return notifications
    if (activeTab === 'pr') return notifications.filter(n => n.type.startsWith('pr_'))
    return notifications.filter(n => n.type === activeTab)
  }

  const filteredNotifications = filterNotifications()

  const unreadCount = notifications.filter(n => n.unread).length

  const groupByType = () => {
    const groups = {}
    filteredNotifications.forEach(n => {
      const key = n.type.startsWith('pr_') ? 'pr' : n.type
      if (!groups[key]) groups[key] = []
      groups[key].push(n)
    })
    return groups
  }

  const groupByUser = () => {
    const groups = {}
    filteredNotifications.forEach(n => {
      if (!groups[n.user]) groups[n.user] = { avatar: n.avatar, karma: n.karma, notifications: [] }
      groups[n.user].notifications.push(n)
    })
    return groups
  }

  const toggleGroup = (key) => {
    setExpandedGroups(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleNotificationClick = (notif) => {
    if (notif.unread && onMarkRead) {
      onMarkRead(notif.id)
    }
  }

  const handleWatchLater = (e, notifId) => {
    e.stopPropagation()
    if (watchLaterItems.includes(notifId)) {
      setWatchLaterItems(prev => prev.filter(id => id !== notifId))
      toast && toast.info('Removed from Watch Later')
    } else {
      setWatchLaterItems(prev => [...prev, notifId])
      toast && toast.success('Added to Watch Later')
    }
  }

  const renderNotification = (notif, compact = false) => (
    <div 
      key={notif.id} 
      className={`notif-card dev ${notif.unread ? 'unread' : 'read'} ${compact ? 'compact' : ''} ${watchLaterItems.includes(notif.id) ? 'watch-later' : ''}`}
      onClick={() => handleNotificationClick(notif)}
    >
      <div className="notif-avatar">{notif.avatar}</div>
      <div className="notif-body">
        <div className="notif-header">
          <span className="notif-user">{notif.user}</span>
          {notif.karma && (
            <span className="notif-karma"><Zap size={10} />{notif.karma}</span>
          )}
          <span className="notif-action">{notif.action}</span>
        </div>
        {notif.content && (
          <p className="notif-content dev">
            {notif.language && <span className="notif-lang">{notif.language}</span>}
            {notif.repo && (
              <span className="notif-repo"><GitBranch size={12} />{notif.repo}</span>
            )}
            "{notif.content}"
          </p>
        )}
        {notif.skills && (
          <div className="notif-skills">
            {notif.skills.map(skill => (
              <span key={skill} className="skill-tag mini">{skill}</span>
            ))}
          </div>
        )}
        <span className="notif-time">{notif.time}</span>
      </div>
      <div className="notif-actions-col">
        <div className={`notif-type-badge ${notif.type}`} style={{ color: getTypeColor(notif.type) }}>
          {getIcon(notif.type)}
        </div>
        <div className="notif-action-buttons">
          <button 
            className={`notif-action-btn watch-later-btn ${watchLaterItems.includes(notif.id) ? 'active' : ''}`}
            onClick={(e) => handleWatchLater(e, notif.id)}
            title={watchLaterItems.includes(notif.id) ? 'Remove from Watch Later' : 'Watch Later'}
          >
            <Clock size={14} />
          </button>
          {notif.unread ? (
            <button 
              className="notif-action-btn mark-read-btn"
              onClick={(e) => { e.stopPropagation(); onMarkRead && onMarkRead(notif.id); }}
              title="Mark as read"
            >
              <Eye size={14} />
            </button>
          ) : (
            <button 
              className="notif-action-btn marked-read"
              title="Already read"
            >
              <EyeOff size={14} />
            </button>
          )}
          <button 
            className="notif-action-btn clear-btn"
            onClick={(e) => { e.stopPropagation(); onClear && onClear(notif.id); }}
            title="Remove"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  )

  const renderListView = () => (
    <div className="notif-list">
      {filteredNotifications.map(notif => renderNotification(notif))}
    </div>
  )

  const renderByTypeView = () => {
    const groups = groupByType()
    return (
      <div className="notif-groups">
        {Object.entries(groups).map(([type, items]) => (
          <div key={type} className="notif-group">
            <div className="notif-group-header" onClick={() => toggleGroup(type)}>
              <div className="notif-group-left">
                <div className={`notif-group-icon ${type}`} style={{ color: getTypeColor(type) }}>
                  {getIcon(type)}
                </div>
                <span className="notif-group-title">{getTypeLabel(type)}</span>
                <span className="notif-group-count">{items.length}</span>
                {items.some(n => n.unread) && <span className="unread-dot"></span>}
              </div>
              {expandedGroups[type] ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </div>
            {expandedGroups[type] && (
              <div className="notif-group-items">
                {items.map(notif => renderNotification(notif, true))}
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  const renderByUserView = () => {
    const groups = groupByUser()
    return (
      <div className="notif-groups">
        {Object.entries(groups).map(([user, data]) => (
          <div key={user} className="notif-group user-group">
            <div className="notif-group-header" onClick={() => toggleGroup(user)}>
              <div className="notif-group-left">
                <div className="notif-user-avatar">{data.avatar}</div>
                <span className="notif-group-title">{user}</span>
                {data.karma && (
                  <span className="notif-user-karma"><Zap size={12} />{data.karma}</span>
                )}
                <span className="notif-group-count">{data.notifications.length} interactions</span>
                {data.notifications.some(n => n.unread) && <span className="unread-dot"></span>}
              </div>
              {expandedGroups[user] ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </div>
            {expandedGroups[user] && (
              <div className="notif-group-items">
                {data.notifications.map(notif => (
                  <div 
                    key={notif.id} 
                    className={`notif-mini ${notif.unread ? 'unread' : ''}`}
                    onClick={() => handleNotificationClick(notif)}
                  >
                    <div className={`notif-mini-icon ${notif.type}`} style={{ color: getTypeColor(notif.type) }}>
                      {getIcon(notif.type)}
                    </div>
                    <span className="notif-mini-action">{notif.action}</span>
                    <span className="notif-mini-time">{notif.time}</span>
                    {notif.unread && <span className="unread-indicator"></span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="notifications-page dev-notifications">
      <header className="page-header">
        <h1 className="page-title">
          <Terminal size={24} className="title-icon" />
          Activity
          {unreadCount > 0 && <span className="title-badge">{unreadCount}</span>}
        </h1>
        <div className="header-actions">
          {unreadCount > 0 && (
            <button className="mark-all-read-btn" onClick={onMarkAllRead}>
              <Check size={16} />
              Mark all read
            </button>
          )}
          <div className="notif-view-toggle">
            {viewModes.map(mode => (
              <button
                key={mode.id}
                className={`view-mode-btn ${viewMode === mode.id ? 'active' : ''}`}
                onClick={() => setViewMode(mode.id)}
              >
                <mode.icon size={16} />
                {mode.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="notif-tabs dev">
        {tabs.map(tab => {
          const count = tab.id === 'all' 
            ? notifications.length 
            : tab.id === 'pr'
              ? notifications.filter(n => n.type.startsWith('pr_')).length
              : notifications.filter(n => n.type === tab.id).length
          const unread = tab.id === 'all'
            ? notifications.filter(n => n.unread).length
            : tab.id === 'pr'
              ? notifications.filter(n => n.type.startsWith('pr_') && n.unread).length
              : notifications.filter(n => n.type === tab.id && n.unread).length

          return (
            <button
              key={tab.id}
              className={`notif-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
              {count > 0 && (
                <span className={`notif-tab-count ${unread > 0 ? 'has-unread' : ''}`}>
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      <div className="notif-container">
        {filteredNotifications.length === 0 ? (
          <div className="notif-empty">
            <Terminal size={48} />
            <p>No activity yet</p>
            <span>Start coding and sharing to see activity here!</span>
          </div>
        ) : (
          <>
            {viewMode === 'list' && renderListView()}
            {viewMode === 'byType' && renderByTypeView()}
            {viewMode === 'byUser' && renderByUserView()}
          </>
        )}
      </div>
    </div>
  )
}

export default Notifications
