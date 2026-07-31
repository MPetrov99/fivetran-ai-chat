// -----------------------------------------------------------------------------
// Component: EmptyChatState
//
// Responsibility:
// Displays the application's initial empty state when no chats exist.
//
// Receives:
// - onNewChat: requests creation of a new chat
//
// Used by:
// - AppLayout
// -----------------------------------------------------------------------------

import './EmptyChatState.scss'

type EmptyChatStateProps = {
  onNewChat: () => void
}

function EmptyChatState({ onNewChat }: EmptyChatStateProps) {
  return (
    <section
      className="empty-chat-state"
      aria-labelledby="empty-chat-state-title"
    >
      <div className="empty-chat-state__content">
        <h2 className="empty-chat-state__title" id="empty-chat-state-title">
          Start your first conversation
        </h2>

        <p className="empty-chat-state__description">
          Create a new chat to begin talking with your AI assistant.
        </p>

        <button
          className="empty-chat-state__button"
          type="button"
          onClick={onNewChat}
        >
          New Chat
        </button>
      </div>
    </section>
  )
}

export default EmptyChatState
