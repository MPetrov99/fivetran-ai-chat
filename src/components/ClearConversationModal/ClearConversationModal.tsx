// -----------------------------------------------------------------------------
// Component: ClearConversationModal
//
// Responsibility:
// Displays a confirmation dialog before permanently clearing all messages
// from the active conversation.
//
// Receives:
// - isOpen: whether the modal is visible
// - onCancel: requests closing the modal without clearing the conversation
// - onConfirm: requests clearing the active conversation
//
// Used by:
// - AppLayout
// -----------------------------------------------------------------------------

import './ClearConversationModal.scss'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'

type ClearConversationModalProps = {
  isOpen: boolean
  onCancel: () => void
  onConfirm: () => void
}

function ClearConversationModal({
  isOpen,
  onCancel,
  onConfirm
}: ClearConversationModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.repeat) {
        return
      }

      if (event.key === 'Escape') {
        onCancel()
      }

      if (event.key === 'Enter') {
        onConfirm()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onCancel, onConfirm])

  function handleBackdropClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onCancel()
    }
  }

  if (!isOpen) {
    return null
  }

  return createPortal(
    <div
      className="clear-conversation-modal"
      role="presentation"
      onClick={handleBackdropClick}
    >
      <div
        className="clear-conversation-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="clear-conversation-modal-title"
        aria-describedby="clear-conversation-modal-description"
      >
        <h2
          className="clear-conversation-modal__title"
          id="clear-conversation-modal-title"
        >
          Clear conversation?
        </h2>

        <p
          className="clear-conversation-modal__description"
          id="clear-conversation-modal-description"
        >
          This will permanently remove all messages from this conversation.
        </p>

        <div className="clear-conversation-modal__actions">
          <button
            className="clear-conversation-modal__button clear-conversation-modal__button--cancel"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="clear-conversation-modal__button clear-conversation-modal__button--clear"
            type="button"
            onClick={onConfirm}
          >
            Clear
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default ClearConversationModal
