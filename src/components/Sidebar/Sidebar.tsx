// -----------------------------------------------------------------------------
// Component: Sidebar
//
// Responsibility:
// Displays the application's navigation including recent chats,
// the "New Chat" button and the current user section.
//
// Receives:
// - chats: the application's chat collection
// - onNewChat: requests creation of a new active chat
// - onChatSelect: requests activation of a selected chat
// - onChatRename: requests an update to a chat title
// - onChatDelete: requests deletion of a chat
//
// Used by:
// - AppLayout
// -----------------------------------------------------------------------------

import './Sidebar.scss'
import ChatItem from '../ChatItem/ChatItem'
import DeleteChatModal from '../DeleteChatModal/DeleteChatModal'
import { useState } from 'react'
import type { Chat } from '../../types/Chat'

type SidebarProps = {
  chats: Chat[]
  onNewChat: () => void
  onChatSelect: (id: number) => void
  onChatRename: (id: number, newTitle: string) => void
  onChatDelete: (id: number) => void
}

function Sidebar({
  chats,
  onNewChat,
  onChatSelect,
  onChatRename,
  onChatDelete
}: SidebarProps) {
  const [openMenuChatId, setOpenMenuChatId] = useState<number | null>(null)
  const [renamingChatId, setRenamingChatId] = useState<number | null>(null)
  const [deletingChatId, setDeletingChatId] = useState<number | null>(null)

  function handleChatClick(clickedChatId: number) {
    onChatSelect(clickedChatId)
    setOpenMenuChatId(null)
    setRenamingChatId(null)
  }

  function handleDeleteStart(chatId: number) {
    setDeletingChatId(chatId)
    setOpenMenuChatId(null)
    setRenamingChatId(null)
  }

  function handleDeleteCancel() {
    setDeletingChatId(null)
  }

  function handleDeleteConfirm() {
    if (deletingChatId === null) {
      return
    }

    onChatDelete(deletingChatId)
    setDeletingChatId(null)
  }

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

  return (
    <aside className="sidebar" aria-label="Chat navigation">
      <header className="sidebar__header">
        <h1 className="sidebar__title">AI Chat</h1>
      </header>

      <button
        className="sidebar__new-chat-button"
        type="button"
        onClick={onNewChat}
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
              onChatRename={onChatRename}
              onDeleteStart={handleDeleteStart}
            />
          ))}
        </div>
      </nav>

      <DeleteChatModal
        isOpen={deletingChatId !== null}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />

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
