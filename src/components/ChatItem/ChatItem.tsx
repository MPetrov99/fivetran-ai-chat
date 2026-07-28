// -----------------------------------------------------------------------------
// Component: ChatItem
//
// Responsibility:
// Represents a single conversation entry and its options menu.
//
// Receives:
// - chat: the conversation data displayed by this item
// - isMenuOpen: whether this item's options menu is visible
// - onChatClick: notifies Sidebar which chat was selected
// - onMenuToggle: asks Sidebar to open or close this item's menu
// - onMenuClose: asks Sidebar to close the currently open menu
//
// Used by:
// - Sidebar
// -----------------------------------------------------------------------------

import { useEffect, useRef } from 'react'
import './ChatItem.scss'
import type { Chat } from '../../types/Chat'

type ChatItemProps = {
  chat: Chat
  isMenuOpen: boolean
  onChatClick: (id: number) => void
  onMenuToggle: (id: number) => void
  onMenuClose: () => void
}

function ChatItem({
  chat,
  isMenuOpen,
  onChatClick,
  onMenuToggle,
  onMenuClose
}: ChatItemProps) {
  const chatItemRef = useRef<HTMLDivElement>(null)

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

  return (
    <div
      ref={chatItemRef}
      className={`chat-item${chat.isActive ? ' chat-item--active' : ''}`}
    >
      <button
        className="chat-item__select-button"
        type="button"
        onClick={() => onChatClick(chat.id)}
      >
        <span className="chat-item__title">{chat.title}</span>
      </button>

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
          <button className="chat-item__menu-item" type="button">
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
