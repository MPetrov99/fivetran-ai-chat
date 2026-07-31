// -----------------------------------------------------------------------------
// Component: ConversationHelper
//
// Responsibility:
// Displays a short prompt encouraging the user to start a new conversation
// when the active chat contains no messages.
//
// Receives:
// - None
//
// Used by:
// - ChatArea
// -----------------------------------------------------------------------------

import './ConversationHelper.scss'

function ConversationHelper() {
  return (
    <section className="conversation-helper" aria-label="Conversation helper">
      <h2 className="conversation-helper__title">Start a conversation</h2>

      <p className="conversation-helper__description">
        Ask a question, explore an idea, or get help with a task. Type your
        first message below.
      </p>
    </section>
  )
}

export default ConversationHelper
