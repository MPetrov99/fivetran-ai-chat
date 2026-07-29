import type { Chat } from '../types/Chat'

export const initialChats: Chat[] = [
  {
    id: 1,
    title: 'React Interview Preparation',
    isActive: true,
    messages: [
      {
        id: 1,
        role: 'user',
        content: 'Can you explain React component composition?'
      },
      {
        id: 2,
        role: 'assistant',
        content:
          'Component composition means building larger interfaces by combining smaller, focused components.'
      }
    ]
  },
  {
    id: 2,
    title: 'Workout Plan',
    isActive: false,
    messages: [
      {
        id: 1,
        role: 'user',
        content: 'Can you explain React component composition?'
      },
      {
        id: 2,
        role: 'assistant',
        content:
          'Component composition means building larger interfaces by combining smaller, focused components.'
      }
    ]
  },
  {
    id: 3,
    title: 'Shopping List',
    isActive: false,
    messages: []
  },
  {
    id: 4,
    title: 'Vacation Ideas',
    isActive: false,
    messages: []
  }
]
