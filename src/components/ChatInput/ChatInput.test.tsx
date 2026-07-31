import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ChatInput from './ChatInput'

describe('ChatInput', () => {
  it('calls onMessageSubmit when a valid message is submitted', async () => {
    const onMessageSubmit = vi.fn()

    render(
      <ChatInput
        isLoading={false}
        focusTrigger={0}
        onMessageSubmit={onMessageSubmit}
      />
    )

    const user = userEvent.setup()
    const textarea = screen.getByLabelText('Message')
    const sendButton = screen.getByRole('button', { name: /send/i })

    await user.type(textarea, 'Hello AI')
    await user.click(sendButton)

    expect(onMessageSubmit).toHaveBeenCalledTimes(1)
    expect(onMessageSubmit).toHaveBeenCalledWith('Hello AI')
  })

  it('trims whitespace before submitting the message', async () => {
    const onMessageSubmit = vi.fn()

    render(
      <ChatInput
        isLoading={false}
        focusTrigger={0}
        onMessageSubmit={onMessageSubmit}
      />
    )

    const user = userEvent.setup()
    const textarea = screen.getByLabelText('Message')
    const sendButton = screen.getByRole('button', { name: /send/i })

    await user.type(textarea, '   Hello AI   ')
    await user.click(sendButton)

    expect(onMessageSubmit).toHaveBeenCalledWith('Hello AI')
  })

  it('submits the message when Enter is pressed', async () => {
    const onMessageSubmit = vi.fn()

    render(
      <ChatInput
        isLoading={false}
        focusTrigger={0}
        onMessageSubmit={onMessageSubmit}
      />
    )

    const user = userEvent.setup()
    const textarea = screen.getByLabelText('Message')

    await user.type(textarea, 'Hello AI')
    await user.keyboard('{Enter}')

    expect(onMessageSubmit).toHaveBeenCalledTimes(1)
    expect(onMessageSubmit).toHaveBeenCalledWith('Hello AI')
  })

  it('clears the textarea after submitting a message', async () => {
    const onMessageSubmit = vi.fn()

    render(
      <ChatInput
        isLoading={false}
        focusTrigger={0}
        onMessageSubmit={onMessageSubmit}
      />
    )

    const user = userEvent.setup()
    const textarea = screen.getByLabelText('Message')
    const sendButton = screen.getByRole('button', { name: /send/i })

    await user.type(textarea, 'Hello AI')
    await user.click(sendButton)

    expect(textarea).toHaveValue('')
  })

  it('disables the textarea and send button while loading', () => {
    const onMessageSubmit = vi.fn()

    render(
      <ChatInput
        isLoading={true}
        focusTrigger={0}
        onMessageSubmit={onMessageSubmit}
      />
    )

    const textarea = screen.getByLabelText('Message')
    const sendButton = screen.getByRole('button', { name: /send/i })

    expect(textarea).toBeDisabled()
    expect(sendButton).toBeDisabled()
  })

  it('keeps the send button disabled for whitespace-only input', async () => {
    const onMessageSubmit = vi.fn()

    render(
      <ChatInput
        isLoading={false}
        focusTrigger={0}
        onMessageSubmit={onMessageSubmit}
      />
    )

    const user = userEvent.setup()
    const textarea = screen.getByLabelText('Message')
    const sendButton = screen.getByRole('button', { name: /send/i })

    await user.type(textarea, '   ')

    expect(sendButton).toBeDisabled()
    expect(onMessageSubmit).not.toHaveBeenCalled()
  })

  it('focuses the textarea when focusTrigger changes', () => {
    const onMessageSubmit = vi.fn()

    const { rerender } = render(
      <ChatInput
        isLoading={true}
        focusTrigger={0}
        onMessageSubmit={onMessageSubmit}
      />
    )

    const textarea = screen.getByLabelText('Message')

    expect(textarea).not.toHaveFocus()

    rerender(
      <ChatInput
        isLoading={false}
        focusTrigger={1}
        onMessageSubmit={onMessageSubmit}
      />
    )

    expect(textarea).toHaveFocus()
  })
})
