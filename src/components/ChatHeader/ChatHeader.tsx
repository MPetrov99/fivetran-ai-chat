// -----------------------------------------------------------------------------
// Component: ChatHeader
//
// Responsibility:
// Displays the active chat title and conversation-level actions.
//
// Receives:
// - title: the active chat title
// - canClearConversation: whether the active conversation contains messages
// - isLoading: indicates whether the assistant response is loading
// - onClearConversation: requests clearing the active conversation
//
// Used by:
// - AppLayout
// -----------------------------------------------------------------------------

import { Trash2 } from 'lucide-react'
import './ChatHeader.scss'

type ChatHeaderProps = {
  title: string
  canClearConversation: boolean
  isLoading: boolean
  onClearConversation: () => void
}

function ChatHeader({
  title,
  canClearConversation,
  isLoading,
  onClearConversation
}: ChatHeaderProps) {
  return (
    <header className="chat-header">
      <h2 className="chat-header__title">{title}</h2>

      <button
        className="chat-header__clear-button"
        type="button"
        aria-label="Clear conversation"
        disabled={!canClearConversation || isLoading}
        onClick={onClearConversation}
      >
        <Trash2
          className="chat-header__clear-icon"
          size={16}
          aria-hidden="true"
        />

        <span className="chat-header__clear-label">Clear conversation</span>
      </button>
    </header>
  )
}

export default ChatHeader
