import './Sidebar.scss'

function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Chat navigation">
      <header className="sidebar__header">
        <h1 className="sidebar__title">AI Chat</h1>
      </header>

      <button className="sidebar__new-chat-button" type="button">
        New Chat
      </button>

      <nav className="sidebar__navigation" aria-label="Previous chats">
        <h2 className="sidebar__section-title">Recent Chats</h2>

        <p className="sidebar__empty-state">No previous chats yet.</p>
      </nav>

      <footer className="sidebar__footer">
        <span className="sidebar__avatar" aria-hidden="true">
          U
        </span>

        <span className="sidebar__user-label">Guest</span>
      </footer>
    </aside>
  )
}

export default Sidebar