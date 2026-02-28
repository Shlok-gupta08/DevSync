import { Home, Compass, MessageCircle, Bell, User, Code2, Settings, Terminal, GitBranch, Bug, PanelLeftClose, PanelLeft, Trophy } from 'lucide-react'

function Sidebar({ currentPage, setCurrentPage, onCreateClick, isCollapsed, setIsCollapsed, currentUser, unreadNotifications = 0, unreadMessages = 0 }) {
  const navItems = [
    { id: 'home', label: 'Feed', icon: Home, badge: 0 },
    { id: 'explore', label: 'Explore', icon: Compass, badge: 0 },
    { id: 'messages', label: 'DMs', icon: MessageCircle, badge: unreadMessages },
    { id: 'notifications', label: 'Activity', icon: Bell, badge: unreadNotifications },
    { id: 'badges', label: 'Badges', icon: Trophy, badge: 0 },
  ]

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-toggle" onClick={() => setIsCollapsed(!isCollapsed)}>
        {isCollapsed ? <PanelLeft size={20} /> : <PanelLeftClose size={20} />}
      </div>
      
      <div className="logo">
        <div className="logo-icon">
          <Terminal size={18} />
        </div>
        {!isCollapsed && (
          <>
            <span className="logo-text">DevSync</span>
            <span className="logo-tag">dev</span>
          </>
        )}
      </div>

      <nav className="nav-menu">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => setCurrentPage(item.id)}
            title={isCollapsed ? item.label : ''}
          >
            <div className="nav-icon-wrapper">
              <item.icon className="nav-icon" />
              {item.badge > 0 && (
                <span className="nav-badge">{item.badge > 99 ? '99+' : item.badge}</span>
              )}
            </div>
            {!isCollapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      <button className="create-btn" onClick={onCreateClick} title={isCollapsed ? 'New Snippet' : ''}>
        <Code2 size={20} />
        {!isCollapsed && 'New Snippet'}
      </button>

      <div className="user-profile" onClick={() => setCurrentPage('profile')}>
        <div className="user-avatar">{currentUser?.avatar || 'SG'}</div>
        {!isCollapsed && (
          <>
            <div className="user-info">
              <div className="user-name">{currentUser?.name || 'User'}</div>
              <div className="user-karma">⚡ {currentUser?.karma?.toLocaleString() || 0} karma</div>
            </div>
            <Settings size={18} style={{ color: 'var(--text-muted)' }} />
          </>
        )}
      </div>
    </aside>
  )
}

export default Sidebar
