// -----------------------------------------------------------------------------
// Component: ChatMessages
//
// Responsibility:
// Displays the messages belonging to the active chat.
//
// Receives:
// None
//
// Used by:
// - ChatArea
// -----------------------------------------------------------------------------

import './ChatMessages.scss'

function ChatMessages() {
  return (
    <div className="chat-messages">
      <p className="chat-messages__placeholder">Messages will appear here.</p>
    </div>
  )
}

export default ChatMessages
