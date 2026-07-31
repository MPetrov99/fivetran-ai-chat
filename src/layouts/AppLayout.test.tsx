import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AppLayout from './AppLayout'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getAssistantResponse } from '../services/chatService'

vi.mock('../services/chatService', () => ({
  getAssistantResponse: vi.fn()
}))

beforeEach(() => {
  localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
  vi.clearAllMocks()
})

describe('AppLayout', () => {
  it('renders without crashing', () => {
    render(<AppLayout />)

    expect(
      screen.getByRole('heading', {
        name: 'Start your first conversation',
        level: 2
      })
    ).toBeInTheDocument()
  })

  it('loads chats from localStorage', () => {
    const storedChats = [
      {
        id: 1,
        title: 'Saved Chat',
        isActive: true,
        messages: []
      }
    ]

    localStorage.setItem('ai-chat-chats', JSON.stringify(storedChats))

    render(<AppLayout />)

    expect(
      screen.getByRole('heading', {
        name: 'Saved Chat',
        level: 2
      })
    ).toBeInTheDocument()
  })

  it('creates a new chat when the New Chat button is clicked', async () => {
    const user = userEvent.setup()

    render(<AppLayout />)

    const newChatButtons = screen.getAllByRole('button', {
      name: 'New Chat'
    })

    await user.click(newChatButtons[0])

    expect(
      screen.getByRole('heading', {
        name: 'New Chat',
        level: 2
      })
    ).toBeInTheDocument()
  })

  it('toggles the theme when the theme button is clicked', async () => {
    const user = userEvent.setup()

    render(<AppLayout />)

    expect(document.documentElement.dataset.theme).toBe('light')

    const themeButtons = screen.getAllByRole('button', {
      name: 'Switch to dark theme'
    })

    await user.click(themeButtons[0])

    expect(document.documentElement.dataset.theme).toBe('dark')
  })

  it('persists chats to localStorage when a new chat is created', async () => {
    const user = userEvent.setup()

    render(<AppLayout />)

    const newChatButtons = screen.getAllByRole('button', {
      name: 'New Chat'
    })

    await user.click(newChatButtons[0])

    const storedChats = JSON.parse(
      localStorage.getItem('ai-chat-chats') ?? '[]'
    )

    expect(storedChats[0]).toMatchObject({
      title: 'New Chat',
      isActive: true,
      messages: []
    })
  })

  it('sends a message and renders the assistant response', async () => {
    const user = userEvent.setup()

    vi.mocked(getAssistantResponse).mockResolvedValue('Hello from AI')

    render(<AppLayout />)

    const newChatButtons = screen.getAllByRole('button', {
      name: 'New Chat'
    })

    await user.click(newChatButtons[0])

    const messageInput = screen.getByRole('textbox', {
      name: 'Message'
    })

    await user.type(messageInput, 'Hello assistant')

    await user.click(
      screen.getByRole('button', {
        name: 'Send'
      })
    )

    expect(screen.getByText('Hello assistant')).toBeInTheDocument()

    expect(await screen.findByText('Hello from AI')).toBeInTheDocument()

    expect(getAssistantResponse).toHaveBeenCalledTimes(1)

    const sentMessages = vi.mocked(getAssistantResponse).mock.calls[0][0]

    expect(sentMessages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          role: 'user',
          content: 'Hello assistant'
        })
      ])
    )
  })
})
