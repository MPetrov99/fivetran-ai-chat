// -----------------------------------------------------------------------------
// Component: ChatLoadingIndicator
//
// Responsibility:
// Shows that the assistant is preparing a response.
//
// Receives:
// None
//
// Used by:
// - ChatMessages
// -----------------------------------------------------------------------------

import './ChatLoadingIndicator.scss'

function ChatLoadingIndicator() {
  return (
    <div
      className="chat-loading-indicator"
      role="status"
      aria-label="Assistant is responding"
    >
      <span className="chat-loading-indicator__dot" />
      <span className="chat-loading-indicator__dot" />
      <span className="chat-loading-indicator__dot" />
    </div>
  )
}

export default ChatLoadingIndicator
