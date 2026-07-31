// -----------------------------------------------------------------------------
// Component: DeleteChatModal
//
// Responsibility:
// Displays a confirmation dialog before permanently deleting a chat.
//
// Receives:
// - isOpen: whether the modal is visible
// - onCancel: requests closing the modal without deleting the chat
// - onConfirm: requests deleting the selected chat
//
// Used by:
// - Sidebar
// -----------------------------------------------------------------------------

import './DeleteChatModal.scss'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'

type DeleteChatModalProps = {
  isOpen: boolean
  onCancel: () => void
  onConfirm: () => void
}

function DeleteChatModal({
  isOpen,
  onCancel,
  onConfirm
}: DeleteChatModalProps) {
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
      className="delete-chat-modal"
      role="presentation"
      onClick={handleBackdropClick}
    >
      <div
        className="delete-chat-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-chat-modal-title"
        aria-describedby="delete-chat-modal-description"
      >
        <h2 className="delete-chat-modal__title" id="delete-chat-modal-title">
          Delete chat?
        </h2>

        <p
          className="delete-chat-modal__description"
          id="delete-chat-modal-description"
        >
          This action cannot be undone.
        </p>

        <div className="delete-chat-modal__actions">
          <button
            className="delete-chat-modal__button delete-chat-modal__button--cancel"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="delete-chat-modal__button delete-chat-modal__button--delete"
            type="button"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default DeleteChatModal
