// -----------------------------------------------------------------------------
// Component: ChatItem
//
// Responsibility:
// Represents a single conversation entry inside the sidebar.
// Handles temporary UI interactions such as opening the options menu
// and editing the chat title, while delegating persistent state changes
// back to Sidebar.
//
// Receives:
// - chat: the conversation data displayed by this item
// - isMenuOpen: whether this item's options menu is visible
// - isRenaming: whether this chat is currently in rename mode
// - onChatClick: notifies Sidebar which chat was selected
// - onMenuToggle: asks Sidebar to open or close this item's options menu
// - onMenuClose: asks Sidebar to close the currently open menu
// - onRenameStart: notifies Sidebar that this chat entered rename mode
// - onRenameEnd: notifies Sidebar that rename mode finished
// - onChatRename: requests a title update for this chat
//
// Used by:
// - Sidebar
// -----------------------------------------------------------------------------

import { useEffect, useRef, useState } from 'react'
import './ChatItem.scss'
import type { Chat } from '../../types/Chat'

type ChatItemProps = {
  chat: Chat
  isMenuOpen: boolean
  isRenaming: boolean
  onChatClick: (id: number) => void
  onMenuToggle: (id: number) => void
  onMenuClose: () => void
  onRenameStart: (id: number) => void
  onRenameEnd: () => void
  onChatRename: (id: number, newTitle: string) => void
}

function ChatItem({
  chat,
  isMenuOpen,
  isRenaming,
  onChatClick,
  onMenuToggle,
  onMenuClose,
  onRenameStart,
  onRenameEnd,
  onChatRename
}: ChatItemProps) {
  const chatItemRef = useRef<HTMLDivElement>(null)
  const [draftTitle, setDraftTitle] = useState(chat.title)
  const renameInputRef = useRef<HTMLInputElement>(null)

  function handleRenameClick() {
    setDraftTitle(chat.title)
    onRenameStart(chat.id)
  }

  function handleRenameSave() {
    const trimmedTitle = draftTitle.trim()

    if (trimmedTitle) {
      onChatRename(chat.id, trimmedTitle)
    }

    onRenameEnd()
  }

  function handleRenameCancel() {
    setDraftTitle(chat.title)
    onRenameEnd()
  }

  function handleRenameKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      handleRenameSave()
    }

    if (event.key === 'Escape') {
      handleRenameCancel()
    }
  }

  useEffect(() => {
    if (!isMenuOpen) {
      return
    }

    function handleDocumentClick(event: MouseEvent) {
      const clickedElement = event.target as Node

      if (
        chatItemRef.current &&
        !chatItemRef.current.contains(clickedElement)
      ) {
        onMenuClose()
      }
    }

    document.addEventListener('click', handleDocumentClick)

    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [isMenuOpen, onMenuClose])

  useEffect(() => {
    if (!isRenaming) {
      return
    }

    renameInputRef.current?.focus()
    renameInputRef.current?.select()
  }, [isRenaming])

  return (
    <div
      ref={chatItemRef}
      className={`chat-item${chat.isActive ? ' chat-item--active' : ''}`}
    >
      {isRenaming ? (
        <input
          ref={renameInputRef}
          className="chat-item__rename-input"
          type="text"
          value={draftTitle}
          onChange={(event) => setDraftTitle(event.target.value)}
          onKeyDown={handleRenameKeyDown}
          onBlur={handleRenameSave}
          aria-label={`Rename ${chat.title}`}
        />
      ) : (
        <button
          className="chat-item__select-button"
          type="button"
          onClick={() => onChatClick(chat.id)}
        >
          <span className="chat-item__title">{chat.title}</span>
        </button>
      )}

      <button
        className="chat-item__options-button"
        type="button"
        aria-label={`Open options for ${chat.title}`}
        aria-expanded={isMenuOpen}
        onClick={() => onMenuToggle(chat.id)}
      >
        ⋯
      </button>

      {isMenuOpen && (
        <div className="chat-item__menu">
          <button
            className="chat-item__menu-item"
            type="button"
            onClick={handleRenameClick}
          >
            Rename Chat
          </button>

          <button className="chat-item__menu-item" type="button">
            Delete Chat
          </button>
        </div>
      )}
    </div>
  )
}

export default ChatItem
