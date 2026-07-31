// -----------------------------------------------------------------------------
// Component: ChatInput
//
// Responsibility:
// Allows the user to compose and submit chat messages while managing the
// textarea's size and focus behavior.
//
// Receives:
// - isLoading: disables input while the assistant response is loading
// - focusTrigger: changes whenever the message input should receive focus
// - onMessageSubmit: requests submission of a non-empty user message
//
// Used by:
// - ChatArea
// -----------------------------------------------------------------------------

import './ChatInput.scss'
import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, KeyboardEvent, SubmitEvent } from 'react'

type ChatInputProps = {
  isLoading: boolean
  focusTrigger: number
  onMessageSubmit: (message: string) => void
}

function ChatInput({
  isLoading,
  focusTrigger,
  onMessageSubmit
}: ChatInputProps) {
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

  useEffect(() => {
    if (!isLoading) {
      textareaRef.current?.focus()
    }
  }, [focusTrigger, isLoading])

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
