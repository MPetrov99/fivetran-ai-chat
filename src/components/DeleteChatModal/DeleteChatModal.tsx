// -----------------------------------------------------------------------------
// Component: DeleteChatModal
//
// Responsibility:
// Displays a confirmation dialog before permanently deleting a chat.
//
// Receives:
// - isOpen: whether the modal should be visible
// - onCancel: called when the user cancels deletion
// - onConfirm: called when the user confirms deletion
//
// Used by:
// - Sidebar
// -----------------------------------------------------------------------------

import './DeleteChatModal.scss'

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
  if (!isOpen) {
    return null
  }

  return (
    <div className="delete-chat-modal">
      <div
        className="delete-chat-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-chat-modal-title"
        aria-describedby="delete-chat-modal-description"
      >
        <h2 className="delete-chat-modal__title" id="delete-chat-modal-title">
          Delete Chat
        </h2>

        <p
          className="delete-chat-modal__description"
          id="delete-chat-modal-description"
        >
          This action cannot be undone. The chat and all of its messages will be
          permanently deleted.
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
    </div>
  )
}

export default DeleteChatModal
