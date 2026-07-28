// -----------------------------------------------------------------------------
// Component: Sidebar
//
// Responsibility:
// Displays the application's navigation including recent chats,
// the "New Chat" button and the current user section.
//
// Receives:
// None
//
// Used by:
// AppLayout
// -----------------------------------------------------------------------------

import { useState } from 'react'
import './Sidebar.scss'
import ChatItem from '../ChatItem/ChatItem'
import { initialChats } from '../../data/chats'

function Sidebar() {
  const [chats, setChats] = useState(initialChats)
  const [openMenuChatId, setOpenMenuChatId] = useState<number | null>(null)
  const [renamingChatId, setRenamingChatId] = useState<number | null>(null)

  function handleRenameStart(chatId: number) {
    setRenamingChatId(chatId)
    setOpenMenuChatId(null)
  }

  function handleRenameEnd() {
    setRenamingChatId(null)
  }

  function handleMenuClose() {
    setOpenMenuChatId(null)
  }

  function handleMenuToggle(chatId: number) {
    setOpenMenuChatId((currentOpenMenuChatId) =>
      currentOpenMenuChatId === chatId ? null : chatId
    )
  }

  function handleChatClick(clickedChatId: number) {
    const updatedChats = chats.map((chat) => ({
      ...chat,
      isActive: chat.id === clickedChatId
    }))

    setChats(updatedChats)
    setOpenMenuChatId(null)
    setRenamingChatId(null)
  }

  function handleChatRename(chatId: number, newTitle: string) {
    const updatedChats = chats.map((chat) =>
      chat.id === chatId
        ? {
            ...chat,
            title: newTitle
          }
        : chat
    )

    setChats(updatedChats)
  }

  function handleNewChat() {
    const inactiveChats = chats.map((chat) => ({
      ...chat,
      isActive: false
    }))

    const newChat = {
      id: Date.now(),
      title: 'New Chat',
      isActive: true
    }

    setChats([newChat, ...inactiveChats])
  }

  return (
    <aside className="sidebar" aria-label="Chat navigation">
      <header className="sidebar__header">
        <h1 className="sidebar__title">AI Chat</h1>
      </header>

      <button
        className="sidebar__new-chat-button"
        type="button"
        onClick={handleNewChat}
      >
        New Chat
      </button>

      <nav className="sidebar__navigation" aria-label="Previous chats">
        <h2 className="sidebar__section-title">Recent Chats</h2>

        <div className="sidebar__chat-list">
          {chats.map((chat) => (
            <ChatItem
              key={chat.id}
              chat={chat}
              isMenuOpen={openMenuChatId === chat.id}
              isRenaming={renamingChatId === chat.id}
              onChatClick={handleChatClick}
              onMenuToggle={handleMenuToggle}
              onMenuClose={handleMenuClose}
              onRenameStart={handleRenameStart}
              onRenameEnd={handleRenameEnd}
              onChatRename={handleChatRename}
            />
          ))}
        </div>
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
