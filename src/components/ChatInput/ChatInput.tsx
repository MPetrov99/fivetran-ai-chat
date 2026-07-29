// -----------------------------------------------------------------------------
// Component: ChatInput
//
// Responsibility:
// Allows the user to compose and submit a chat message.
//
// Receives:
// - onMessageSubmit: called when the user submits a non-empty message
//
// Used by:
// - ChatArea
// -----------------------------------------------------------------------------

import './ChatInput.scss'
import { useRef, useState } from 'react'
import type { ChangeEvent, KeyboardEvent, SubmitEvent } from 'react'

type ChatInputProps = {
  isLoading: boolean
  onMessageSubmit: (message: string) => void
}

function ChatInput({ isLoading, onMessageSubmit }: ChatInputProps) {
  const [message, setMessage] = useState('')
  const trimmedMessage = message.trim()
  const isSubmitDisabled = trimmedMessage.length === 0
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  function resizeTextarea(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto'
    textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`
  }

  function handleMessageChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setMessage(event.target.value)
    resizeTextarea(event.target)
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isSubmitDisabled) {
      return
    }

    onMessageSubmit(trimmedMessage)
    setMessage('')

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      event.currentTarget.form?.requestSubmit()
    }
  }

  return (
    <footer className="chat-input">
      <form className="chat-input__form" onSubmit={handleSubmit}>
        <textarea
          disabled={isLoading}
          ref={textareaRef}
          className="chat-input__textarea"
          value={message}
          onChange={handleMessageChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          aria-label="Message"
          rows={1}
        />

        <button
          className="chat-input__submit-button"
          type="submit"
          disabled={!message.trim() || isLoading}
        >
          Send
        </button>
      </form>
    </footer>
  )
}

export default ChatInput
