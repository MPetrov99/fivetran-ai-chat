import type { Message } from '../types/Message'

const API_URL = 'http://localhost:3001/api/chat'

type ChatResponse = {
  message: string
}

type ErrorResponse = {
  error?: string
}

export async function getAssistantResponse(
  messages: Message[]
): Promise<string> {
  if (messages.length === 0) {
    throw new Error('At least one message is required.')
  }

  const conversation = messages.map(({ role, content }) => ({
    role,
    content: content.trim()
  }))

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messages: conversation
    })
  })

  if (!response.ok) {
    const errorData = (await response.json()) as ErrorResponse

    throw new Error(
      errorData.error ?? 'The assistant could not generate a response.'
    )
  }

  const data = (await response.json()) as ChatResponse

  return data.message
}
