export type MessageRole = 'user' | 'assistant'

export type Message = {
  id: number
  role: MessageRole
  content: string
}
