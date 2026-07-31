import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Sidebar from './Sidebar'
import type { Chat } from '../../types/Chat'

const chats: Chat[] = [
  {
    id: 1,
    title: 'First conversation',
    isActive: true,
    messages: []
  },
  {
    id: 2,
    title: 'Second conversation',
    isActive: false,
    messages: []
  }
]

function renderSidebar(
  overrides: Partial<React.ComponentProps<typeof Sidebar>> = {}
) {
  const props: React.ComponentProps<typeof Sidebar> = {
    chats,
    theme: 'light',
    isOpen: false,
    canCreateNewChat: true,
    onNewChat: vi.fn(),
    onChatSelect: vi.fn(),
    onChatRename: vi.fn(),
    onChatDelete: vi.fn(),
    onThemeToggle: vi.fn(),
    onClose: vi.fn(),
    ...overrides
  }

  render(<Sidebar {...props} />)

  return props
}

describe('Sidebar', () => {
  it('renders the provided chats', () => {
    renderSidebar()

    expect(screen.getByText('First conversation')).toBeInTheDocument()
    expect(screen.getByText('Second conversation')).toBeInTheDocument()
  })

  it('calls onNewChat when the New Chat button is clicked', async () => {
    const user = userEvent.setup()

    const props = renderSidebar()

    await user.click(
      screen.getByRole('button', {
        name: 'New Chat'
      })
    )

    expect(props.onNewChat).toHaveBeenCalledTimes(1)
  })

  it('calls onChatSelect when a chat is clicked', async () => {
    const user = userEvent.setup()

    const props = renderSidebar()

    await user.click(screen.getByText('Second conversation'))

    expect(props.onChatSelect).toHaveBeenCalledWith(2)
    expect(props.onChatSelect).toHaveBeenCalledTimes(1)
  })

  it('calls onThemeToggle when the theme button is clicked', async () => {
    const user = userEvent.setup()

    const props = renderSidebar()

    await user.click(
      screen.getByRole('button', {
        name: 'Switch to dark theme'
      })
    )

    expect(props.onThemeToggle).toHaveBeenCalledTimes(1)
  })

  it('renders the light theme option when the current theme is dark', () => {
    renderSidebar({
      theme: 'dark'
    })

    expect(
      screen.getByRole('button', {
        name: 'Switch to light theme'
      })
    ).toBeInTheDocument()

    expect(screen.getByText('☀')).toBeInTheDocument()
    expect(screen.getByText('Light')).toBeInTheDocument()
  })

  it('renames a chat through the options menu', async () => {
    const user = userEvent.setup()
    const props = renderSidebar()

    await user.click(
      screen.getByRole('button', {
        name: 'Open options for First conversation'
      })
    )

    await user.click(
      screen.getByRole('button', {
        name: 'Rename Chat'
      })
    )

    const renameInput = screen.getByRole('textbox', {
      name: 'Rename First conversation'
    })

    await user.clear(renameInput)
    await user.type(renameInput, 'Updated conversation')
    await user.keyboard('{Enter}')

    expect(props.onChatRename).toHaveBeenCalledWith(1, 'Updated conversation')

    expect(props.onChatRename).toHaveBeenCalledTimes(1)
  })

  it('deletes a chat after confirmation', async () => {
    const user = userEvent.setup()
    const props = renderSidebar()

    await user.click(
      screen.getByRole('button', {
        name: 'Open options for Second conversation'
      })
    )

    await user.click(
      screen.getByRole('button', {
        name: 'Delete Chat'
      })
    )

    expect(
      screen.getByRole('dialog', {
        name: 'Delete chat?'
      })
    ).toBeInTheDocument()

    await user.click(
      screen.getByRole('button', {
        name: 'Delete'
      })
    )

    expect(props.onChatDelete).toHaveBeenCalledWith(2)
    expect(props.onChatDelete).toHaveBeenCalledTimes(1)

    expect(
      screen.queryByRole('dialog', {
        name: 'Delete chat?'
      })
    ).not.toBeInTheDocument()
  })

  it('disables the New Chat button when creation is not allowed', () => {
    renderSidebar({
      canCreateNewChat: false
    })

    expect(
      screen.getByRole('button', {
        name: 'New Chat'
      })
    ).toBeDisabled()
  })
})
