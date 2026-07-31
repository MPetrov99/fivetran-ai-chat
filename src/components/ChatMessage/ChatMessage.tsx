import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import type { Message } from '../../types/Message'
import { Check, Copy } from 'lucide-react'
import './ChatMessage.scss'

type ChatMessageProps = {
  message: Message
}

/**
 * Renders a single conversation message with role-specific styling.
 */
function ChatMessage({ message }: ChatMessageProps) {
  const isUserMessage = message.role === 'user'
  const [isCopied, setIsCopied] = useState(false)
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content)

      setIsCopied(true)

      window.setTimeout(() => {
        setIsCopied(false)
      }, 2000)
    } catch (error) {
      console.error('Failed to copy message:', error)
    }
  }

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
        {!isUserMessage && (
          <button
            type="button"
            className="chat-message__copy-button"
            onClick={handleCopy}
          >
            <>
              {isCopied ? <Check size={16} /> : <Copy size={16} />}
              <span className="chat-message__copy-label">
                {isCopied ? 'Copied!' : 'Copy'}
              </span>
            </>
          </button>
        )}
      </div>
    </article>
  )
}

export default ChatMessage
