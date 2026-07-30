import { render, screen } from '@testing-library/react'
import ChatMessage from './ChatMessage'
import type { Message } from '../../types/Message'

describe('ChatMessage', () => {
  it('renders a user message with the user modifier class', () => {
    const message: Message = {
      id: 1,
      role: 'user',
      content: 'Hello AI'
    }

    render(<ChatMessage message={message} />)

    const messageText = screen.getByText('Hello AI')
    const article = messageText.closest('article')

    expect(messageText).toBeInTheDocument()
    expect(article).toHaveClass('chat-message--user')
  })

  it('renders markdown formatting correctly', () => {
    const message: Message = {
      id: 2,
      role: 'assistant',
      content: 'Hello **World**'
    }

    render(<ChatMessage message={message} />)

    const boldText = screen.getByText('World')

    expect(boldText).toBeInTheDocument()
    expect(boldText.tagName).toBe('STRONG')
  })

  it('renders inline code correctly', () => {
    const message: Message = {
      id: 3,
      role: 'assistant',
      content: 'Use `npm install`'
    }

    render(<ChatMessage message={message} />)

    const code = screen.getByText('npm install')

    expect(code.tagName).toBe('CODE')
  })

  it('renders fenced code blocks correctly', () => {
    const message: Message = {
      id: 4,
      role: 'assistant',
      content: '```ts\nconst x = 1\n```'
    }

    const { container } = render(<ChatMessage message={message} />)
    const codeBlock = container.querySelector('code.language-ts')

    expect(codeBlock).not.toBeNull()
    expect(codeBlock).toHaveTextContent('const x = 1')
  })
})
