import './AppLayout.scss'
import Sidebar from '../components/Sidebar/Sidebar'
import { useState } from 'react'
import { initialChats } from '../data/chats'
import type { Chat } from '../types/Chat'
import EmptyChatState from '../components/EmptyChatState/EmptyChatState'

function AppLayout() {
  const [chats, setChats] = useState<Chat[]>(initialChats)

  function handleNewChat() {
    const inactiveChats = chats.map((chat) => ({
      ...chat,
      isActive: false
    }))

    const newChat: Chat = {
      id: Date.now(),
      title: 'New Chat',
      isActive: true
    }

    setChats([newChat, ...inactiveChats])
  }

  return (
    <div className="app-layout">
      <aside className="app-layout__sidebar">
        <Sidebar chats={chats} setChats={setChats} onNewChat={handleNewChat} />
      </aside>

      <main className="...">
        {chats.length === 0 ? (
          <EmptyChatState onNewChat={handleNewChat} />
        ) : (
          // Temporary placeholder
          <p>Chat content goes here.</p>
        )}
      </main>
    </div>
  )
}

export default AppLayout
