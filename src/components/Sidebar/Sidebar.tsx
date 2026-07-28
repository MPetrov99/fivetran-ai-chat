// -----------------------------------------------------------------------------
// Component: Sidebar
//
// Responsibility:
// Displays the application's navigation including recent chats,
// the "New Chat" button and the current user section.
//
// Receives:
// - chats: the application's chat collection
// - setChats: updates the application's chat collection
// - onNewChat: requests creation of a new active chat
//
// Used by:
// - AppLayout
// -----------------------------------------------------------------------------

import './Sidebar.scss'
import ChatItem from '../ChatItem/ChatItem'
import DeleteChatModal from '../DeleteChatModal/DeleteChatModal'
import { useState } from 'react'
import type { Chat } from '../../types/Chat'
import type { Dispatch, SetStateAction } from 'react'

type SidebarProps = {
  chats: Chat[]
  setChats: Dispatch<SetStateAction<Chat[]>>
  onNewChat: () => void
}

function Sidebar({ chats, setChats, onNewChat }: SidebarProps) {
  const [openMenuChatId, setOpenMenuChatId] = useState<number | null>(null)
  const [renamingChatId, setRenamingChatId] = useState<number | null>(null)
  const [deletingChatId, setDeletingChatId] = useState<number | null>(null)

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

    const deletedChat = chats.find((chat) => chat.id === deletingChatId)
    const remainingChats = chats.filter((chat) => chat.id !== deletingChatId)

    if (deletedChat?.isActive && remainingChats.length > 0) {
      const updatedChats = remainingChats.map((chat, index) => ({
        ...chat,
        isActive: index === 0
      }))

      setChats(updatedChats)
    } else {
      setChats(remainingChats)
    }

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
              onChatRename={handleChatRename}
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
