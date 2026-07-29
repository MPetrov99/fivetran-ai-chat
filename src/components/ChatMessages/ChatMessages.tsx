// -----------------------------------------------------------------------------
// Component: ChatMessages
//
// Responsibility:
// Displays the messages belonging to the active chat.
//
// Receives:
// - chatId: the currently active chat identifier
// - messages: the messages belonging to the active chat
//
// Used by:
// - ChatArea
// -----------------------------------------------------------------------------

import { useEffect, useRef } from 'react'
import type { Message } from '../../types/Message'
import ChatMessage from '../ChatMessage/ChatMessage'
import './ChatMessages.scss'
import ChatLoadingIndicator from '../ChatLoadingIndicator'

type ChatMessagesProps = {
  chatId: number
  messages: Message[]
  isLoading: boolean
}

/**
 * Renders the messages belonging to the active conversation.
 */
function ChatMessages({ chatId, messages, isLoading }: ChatMessagesProps) {
  const messagesRef = useRef<HTMLElement>(null)
  const previousChatIdRef = useRef(chatId)

  useEffect(() => {
    const messagesElement = messagesRef.current

    if (!messagesElement) {
      return
    }

    const didChatChange = previousChatIdRef.current !== chatId

    messagesElement.scrollTo({
      top: messagesElement.scrollHeight,
      behavior: didChatChange ? 'auto' : 'smooth'
    })

    previousChatIdRef.current = chatId
  }, [chatId, messages, isLoading])

  return (
    <section
      ref={messagesRef}
      className="chat-messages"
      aria-label="Conversation messages"
    >
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}

      {isLoading && <ChatLoadingIndicator />}
    </section>
  )
}

export default ChatMessages
