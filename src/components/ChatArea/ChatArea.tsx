// -----------------------------------------------------------------------------
// Component: ChatArea
//
// Responsibility:
// Coordinates the active chat header, message area and message input section.
//
// Receives:
// - chat: the currently active chat
//
// Used by:
// - AppLayout
// -----------------------------------------------------------------------------

import './ChatArea.scss'
import ChatHeader from '../ChatHeader/ChatHeader'
import ChatMessages from '../ChatMessages/ChatMessages'
import ChatInput from '../ChatInput/ChatInput'
import type { Chat } from '../../types/Chat'

type ChatAreaProps = {
  chat: Chat | undefined
}

function ChatArea({ chat }: ChatAreaProps) {
  function handleMessageSubmit(message: string) {
    console.log('Submitted message:', message)
  }

  return (
    <section className="chat-area" aria-label="Active chat">
      <ChatHeader title={chat?.title ?? 'Untitled Chat'} />
      <ChatMessages />
      <ChatInput onMessageSubmit={handleMessageSubmit} />
    </section>
  )
}

export default ChatArea
