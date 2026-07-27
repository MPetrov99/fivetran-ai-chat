// -----------------------------------------------------------------------------
// Component: ChatItem
//
// Responsibility:
// Represents a single conversation entry inside the sidebar.
//
// Receives:
// - chat: the conversation data displayed by this item
// - onChatClick: notifies Sidebar which chat was selected
//
// Used by:
// - Sidebar
// -----------------------------------------------------------------------------

import './ChatItem.scss'
import type { Chat } from '../../types/Chat'

// Props define the data this component expects from its parent
type ChatItemProps = {
  chat: Chat
  onChatClick: (id: number) => void
}

function ChatItem({ chat, onChatClick }: ChatItemProps) {
  return (
    <button
      className={`chat-item${chat.isActive ? ' chat-item--active' : ''}`}
      type="button"
      onClick={() => onChatClick(chat.id)}
    >
      <span className="chat-item__title">{chat.title}</span>
    </button>
  )
}

export default ChatItem
