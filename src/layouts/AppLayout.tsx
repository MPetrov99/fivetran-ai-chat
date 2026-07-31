// -----------------------------------------------------------------------------
// Component: AppLayout
//
// Responsibility:
// Coordinates the application's overall layout and shared chat state.
// Renders the sidebar alongside the main content area and delegates
// chat-related actions to child components through callback props.
//
// Receives:
// None
//
// Used by:
// - App
// -----------------------------------------------------------------------------

import './AppLayout.scss'
import Sidebar from '../components/Sidebar/Sidebar'
import { useEffect, useState } from 'react'
import type { Chat } from '../types/Chat'
import EmptyChatState from '../components/EmptyChatState/EmptyChatState'
import ChatArea from '../components/ChatArea/ChatArea'
import type { Message } from '../types/Message'
import { streamAssistantResponse } from '../services/chatService'
import type { Theme } from '../types/Theme'
import ChatHeader from '../components/ChatHeader/ChatHeader'
import ClearConversationModal from '../components/ClearConversationModal/ClearConversationModal'

const CHATS_STORAGE_KEY = 'ai-chat-chats'
const THEME_STORAGE_KEY = 'ai-chat-theme'

function AppLayout() {
  const [chats, setChats] = useState<Chat[]>(() => {
    const storedChats = localStorage.getItem(CHATS_STORAGE_KEY)

    if (!storedChats) {
      return []
    }

    try {
      return JSON.parse(storedChats) as Chat[]
    } catch {
      return []
    }
  })
  const activeChat = chats.find((chat) => chat.isActive)
  const [loadingChatIds, setLoadingChatIds] = useState<number[]>([])
  const isActiveChatLoading = activeChat
    ? loadingChatIds.includes(activeChat.id)
    : false
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY)

    return storedTheme === 'dark' ? 'dark' : 'light'
  })
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isClearConversationModalOpen, setIsClearConversationModalOpen] =
    useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem(CHATS_STORAGE_KEY, JSON.stringify(chats))
  }, [chats])

  async function handleMessageSubmit(content: string) {
    if (!activeChat) {
      return
    }

    const submittedChatId = activeChat.id

    const newMessage: Message = {
      id: Date.now(),
      role: 'user',
      content
    }

    const conversationForAI = [...activeChat.messages, newMessage]

    const assistantMessageId = Date.now() + 1

    setLoadingChatIds((currentLoadingChatIds) =>
      currentLoadingChatIds.includes(submittedChatId)
        ? currentLoadingChatIds
        : [...currentLoadingChatIds, submittedChatId]
    )

    setChats((currentChats) =>
      currentChats.map((chat) =>
        chat.id === submittedChatId
          ? {
              ...chat,
              messages: conversationForAI
            }
          : chat
      )
    )

    try {
      const assistantMessage: Message = {
        id: assistantMessageId,
        role: 'assistant',
        content: ''
      }

      setChats((currentChats) =>
        currentChats.map((chat) =>
          chat.id === submittedChatId
            ? {
                ...chat,
                messages: [...chat.messages, assistantMessage]
              }
            : chat
        )
      )

      await streamAssistantResponse(conversationForAI, (chunk) => {
        setChats((currentChats) =>
          currentChats.map((chat) =>
            chat.id === submittedChatId
              ? {
                  ...chat,
                  messages: chat.messages.map((message) =>
                    message.id === assistantMessageId
                      ? {
                          ...message,
                          content: message.content + chunk
                        }
                      : message
                  )
                }
              : chat
          )
        )
      })
    } catch (error) {
      console.error('Failed to get assistant response:', error)

      setChats((currentChats) =>
        currentChats.map((chat) =>
          chat.id === submittedChatId
            ? {
                ...chat,
                messages: chat.messages.map((message) =>
                  message.id === assistantMessageId
                    ? {
                        ...message,
                        content: 'Something went wrong. Please try again.'
                      }
                    : message
                )
              }
            : chat
        )
      )
    } finally {
      setLoadingChatIds((currentLoadingChatIds) =>
        currentLoadingChatIds.filter((chatId) => chatId !== submittedChatId)
      )
    }
  }

  function handleClearConversationClick() {
    setIsClearConversationModalOpen(true)
  }

  function handleClearConversationCancel() {
    setIsClearConversationModalOpen(false)
  }

  function handleClearConversationConfirm() {
    if (!activeChat) {
      return
    }

    setChats((currentChats) =>
      currentChats.map((chat) =>
        chat.id === activeChat.id
          ? {
              ...chat,
              messages: []
            }
          : chat
      )
    )

    setIsClearConversationModalOpen(false)
  }

  function handleSidebarClose() {
    setIsSidebarOpen(false)
  }

  function handleSidebarToggle() {
    setIsSidebarOpen((currentState) => !currentState)
  }

  function handleThemeToggle() {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))
  }

  function handleChatDelete(chatId: number) {
    setChats((currentChats) => {
      const deletedChat = currentChats.find((chat) => chat.id === chatId)
      const remainingChats = currentChats.filter((chat) => chat.id !== chatId)

      if (deletedChat?.isActive && remainingChats.length > 0) {
        return remainingChats.map((chat, index) => ({
          ...chat,
          isActive: index === 0
        }))
      }

      return remainingChats
    })
  }

  function handleChatRename(chatId: number, newTitle: string) {
    setChats((currentChats) =>
      currentChats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              title: newTitle
            }
          : chat
      )
    )
  }

  function handleChatSelect(clickedChatId: number) {
    setChats((currentChats) =>
      currentChats.map((chat) => ({
        ...chat,
        isActive: chat.id === clickedChatId
      }))
    )
  }

  function handleNewChat() {
    const newChat: Chat = {
      id: Date.now(),
      title: 'New Chat',
      isActive: true,
      messages: []
    }

    setChats((currentChats) => {
      const inactiveChats = currentChats.map((chat) => ({
        ...chat,
        isActive: false
      }))

      return [newChat, ...inactiveChats]
    })
  }

  return (
    <div className="app-layout">
      <aside
        className={`app-layout__sidebar ${
          isSidebarOpen ? 'app-layout__sidebar--open' : ''
        }`}
      >
        <Sidebar
          chats={chats}
          theme={theme}
          isOpen={isSidebarOpen}
          onNewChat={handleNewChat}
          onChatSelect={handleChatSelect}
          onChatRename={handleChatRename}
          onChatDelete={handleChatDelete}
          onThemeToggle={handleThemeToggle}
          onClose={handleSidebarClose}
        />
      </aside>

      <button
        className={`app-layout__backdrop ${
          isSidebarOpen ? 'app-layout__backdrop--visible' : ''
        }`}
        type="button"
        aria-label="Close navigation"
        onClick={handleSidebarClose}
      />

      <nav className="app-layout__mobile-rail" aria-label="Mobile navigation">
        <button
          className="app-layout__rail-button"
          type="button"
          aria-label="Open navigation"
          onClick={handleSidebarToggle}
        >
          <span aria-hidden="true">☰</span>
        </button>

        <div className="app-layout__rail-footer">
          <button
            className="app-layout__rail-button"
            type="button"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            onClick={handleThemeToggle}
          >
            <span aria-hidden="true">{theme === 'light' ? '☾' : '☀'}</span>
          </button>

          <div className="app-layout__rail-user" aria-label="Guest user">
            U
          </div>
        </div>
      </nav>

      <main className="app-layout__main">
        {activeChat && (
          <ChatHeader
            title={activeChat.title}
            canClearConversation={Boolean(activeChat.messages.length)}
            isLoading={isActiveChatLoading}
            onClearConversation={handleClearConversationClick}
          />
        )}

        {activeChat ? (
          <ChatArea
            chat={activeChat}
            isLoading={isActiveChatLoading}
            onMessageSubmit={handleMessageSubmit}
          />
        ) : (
          <EmptyChatState onNewChat={handleNewChat} />
        )}
      </main>
      <ClearConversationModal
        isOpen={isClearConversationModalOpen}
        onCancel={handleClearConversationCancel}
        onConfirm={handleClearConversationConfirm}
      />
    </div>
  )
}

export default AppLayout
