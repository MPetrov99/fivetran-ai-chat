import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import type { Message } from '../../types/Message'
import './ChatMessage.scss'

type ChatMessageProps = {
  message: Message
}

/**
 * Renders a single conversation message with role-specific styling.
 */
function ChatMessage({ message }: ChatMessageProps) {
  const isUserMessage = message.role === 'user'

  return (
    <article
      className={`chat-message ${
        isUserMessage ? 'chat-message--user' : 'chat-message--assistant'
      }`}
    >
      <div className="chat-message__content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ className, children }) {
              const match = /language-(\w+)/.exec(className || '')

              if (!match) {
                return <code>{children}</code>
              }

              return (
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              )
            }
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </article>
  )
}

export default ChatMessage
