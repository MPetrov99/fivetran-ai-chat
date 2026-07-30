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
import { initialChats } from '../data/chats'
import type { Chat } from '../types/Chat'
import EmptyChatState from '../components/EmptyChatState/EmptyChatState'
import ChatArea from '../components/ChatArea/ChatArea'
import type { Message } from '../types/Message'
import { getAssistantResponse } from '../services/chatService'
import type { Theme } from '../types/Theme'

const CHATS_STORAGE_KEY = 'ai-chat-chats'
const THEME_STORAGE_KEY = 'ai-chat-theme'

function AppLayout() {
  const [chats, setChats] = useState<Chat[]>(() => {
    const storedChats = localStorage.getItem(CHATS_STORAGE_KEY)

    if (!storedChats) {
      return initialChats
    }

    try {
      return JSON.parse(storedChats) as Chat[]
    } catch {
      return initialChats
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
      const assistantContent = await getAssistantResponse(conversationForAI)

      const assistantMessage: Message = {
        id: Date.now(),
        role: 'assistant',
        content: assistantContent
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
    } catch (error) {
      console.error('Failed to get assistant response:', error)

      const errorMessage: Message = {
        id: Date.now(),
        role: 'assistant',
        content: 'Something went wrong. Please try again.'
      }

      setChats((currentChats) =>
        currentChats.map((chat) =>
          chat.id === submittedChatId
            ? {
                ...chat,
                messages: [...chat.messages, errorMessage]
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
      <aside className="app-layout__sidebar">
        <Sidebar
          chats={chats}
          theme={theme}
          onNewChat={handleNewChat}
          onChatSelect={handleChatSelect}
          onChatRename={handleChatRename}
          onChatDelete={handleChatDelete}
          onThemeToggle={handleThemeToggle}
        />
      </aside>

      <main className="app-layout__main">
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
    </div>
  )
}

export default AppLayout
