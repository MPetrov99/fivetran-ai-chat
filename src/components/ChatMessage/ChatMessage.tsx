import type { Message } from '../../types/Message'
import './ChatMessage.scss'

type ChatMessageProps = {
  message: Message
}

/**
 * Renders a single conversation message with role-specific styling.
 */
function ChatMessage({ message }: ChatMessageProps) {
  const isUserMessage = message.role === 'user'

  return (
    <article
      className={`chat-message ${
        isUserMessage ? 'chat-message--user' : 'chat-message--assistant'
      }`}
    >
      <div className="chat-message__content">
        <p>{message.content}</p>
      </div>
    </article>
  )
}

export default ChatMessage
