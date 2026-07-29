import type { Message } from './Message'

export type Chat = {
  id: number
  title: string
  isActive: boolean
  messages: Message[]
}
