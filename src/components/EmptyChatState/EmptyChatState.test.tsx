import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import EmptyChatState from './EmptyChatState'

describe('EmptyChatState', () => {
  it('renders the empty-state content', () => {
    render(<EmptyChatState onNewChat={vi.fn()} />)

    expect(
      screen.getByRole('heading', {
        name: 'Start your first conversation'
      })
    ).toBeInTheDocument()

    expect(
      screen.getByText(
        'Create a new chat to begin talking with your AI assistant.'
      )
    ).toBeInTheDocument()

    expect(screen.getByRole('button', { name: 'New Chat' })).toBeInTheDocument()
  })

  it('calls onNewChat when the New Chat button is clicked', async () => {
    const user = userEvent.setup()
    const onNewChat = vi.fn()

    render(<EmptyChatState onNewChat={onNewChat} />)

    await user.click(screen.getByRole('button', { name: 'New Chat' }))

    expect(onNewChat).toHaveBeenCalledTimes(1)
  })
})
