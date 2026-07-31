// -----------------------------------------------------------------------------
// Component: ChatArea
//
// Responsibility:
// Coordinates the active chat message area and message input section.
//
// Receives:
// - chat: the currently active chat
// - isLoading: indicates whether the assistant response is loading
// - focusTrigger: changes whenever the textarea should receive focus
// - onMessageSubmit: handles submitted user messages
//
// Used by:
// - AppLayout
// -----------------------------------------------------------------------------

import './ChatArea.scss'
import ChatMessages from '../ChatMessages/ChatMessages'
import ChatInput from '../ChatInput/ChatInput'
import type { Chat } from '../../types/Chat'

type ChatAreaProps = {
  chat: Chat
  isLoading: boolean
  focusTrigger: number
  onMessageSubmit: (message: string) => void
}

function ChatArea({
  chat,
  isLoading,
  focusTrigger,
  onMessageSubmit
}: ChatAreaProps) {
  return (
    <section className="chat-area" aria-label="Active chat">
      <ChatMessages
        chatId={chat.id}
        messages={chat.messages}
        isLoading={isLoading}
      />

      <ChatInput
        key={chat.id}
        isLoading={isLoading}
        focusTrigger={focusTrigger}
        onMessageSubmit={onMessageSubmit}
      />
    </section>
  )
}

export default ChatArea
