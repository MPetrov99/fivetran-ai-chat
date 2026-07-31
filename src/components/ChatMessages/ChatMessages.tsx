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
  const previousMessageCountRef = useRef(messages.length)

  useEffect(() => {
    const messagesElement = messagesRef.current

    if (!messagesElement) {
      return
    }

    const didChatChange = previousChatIdRef.current !== chatId
    const didMessageCountChange =
      previousMessageCountRef.current !== messages.length

    messagesElement.scrollTo({
      top: messagesElement.scrollHeight,
      behavior: didChatChange || !didMessageCountChange ? 'auto' : 'smooth'
    })

    previousChatIdRef.current = chatId
    previousMessageCountRef.current = messages.length
  }, [chatId, messages, isLoading])

  const lastMessage = messages[messages.length - 1]

  const isWaitingForFirstChunk =
    isLoading &&
    lastMessage?.role === 'assistant' &&
    lastMessage.content.length === 0

  return (
    <section
      ref={messagesRef}
      className="chat-messages"
      aria-label="Conversation messages"
    >
      {messages.map((message) =>
        message.role === 'assistant' && message.content.length === 0 ? null : (
          <ChatMessage
            key={message.id}
            message={message}
            isStreaming={
              isLoading &&
              message.role === 'assistant' &&
              message.id === lastMessage?.id
            }
          />
        )
      )}

      {isWaitingForFirstChunk && <ChatLoadingIndicator />}
    </section>
  )
}

export default ChatMessages
