// -----------------------------------------------------------------------------
// Component: ChatHeader
//
// Responsibility:
// Displays the title of the currently active chat.
//
// Receives:
// - title: the active chat title
//
// Used by:
// - ChatArea
// -----------------------------------------------------------------------------

import './ChatHeader.scss'

type ChatHeaderProps = {
  title: string
}

function ChatHeader({ title }: ChatHeaderProps) {
  return (
    <header className="chat-header">
      <h2 className="chat-header__title">{title}</h2>
    </header>
  )
}

export default ChatHeader
