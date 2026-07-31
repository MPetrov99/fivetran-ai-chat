// -----------------------------------------------------------------------------
// Component: ClearAllConversationsModal
//
// Responsibility:
// Displays a confirmation dialog before permanently removing all chats
// and their messages.
//
// Receives:
// - isOpen: whether the modal is visible
// - onCancel: requests closing the modal without clearing conversations
// - onConfirm: requests clearing all conversations
//
// Used by:
// - AppLayout
// -----------------------------------------------------------------------------

import './ClearAllConversationsModal.scss'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'

type ClearAllConversationsModalProps = {
  isOpen: boolean
  onCancel: () => void
  onConfirm: () => void
}

function ClearAllConversationsModal({
  isOpen,
  onCancel,
  onConfirm
}: ClearAllConversationsModalProps) {
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
      className="clear-all-conversations-modal"
      role="presentation"
      onClick={handleBackdropClick}
    >
      <div
        className="clear-all-conversations-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="clear-all-conversations-modal-title"
        aria-describedby="clear-all-conversations-modal-description"
      >
        <h2
          className="clear-all-conversations-modal__title"
          id="clear-all-conversations-modal-title"
        >
          Clear all conversations?
        </h2>

        <p
          className="clear-all-conversations-modal__description"
          id="clear-all-conversations-modal-description"
        >
          This will permanently remove all chats and messages. This action
          cannot be undone.
        </p>

        <div className="clear-all-conversations-modal__actions">
          <button
            className="clear-all-conversations-modal__button clear-all-conversations-modal__button--cancel"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="clear-all-conversations-modal__button clear-all-conversations-modal__button--clear"
            type="button"
            onClick={onConfirm}
          >
            Clear All
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default ClearAllConversationsModal
