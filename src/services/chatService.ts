import type { Message } from '../types/Message'

const API_URL = 'http://localhost:3001/api/chat'

type ErrorResponse = {
  error?: string
}

export async function streamAssistantResponse(
  messages: Message[],
  onChunk: (chunk: string) => void
): Promise<void> {
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

  if (!response.body) {
    throw new Error('The assistant response could not be streamed.')
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()

  while (true) {
    const { value, done } = await reader.read()

    if (done) {
      break
    }

    const chunk = decoder.decode(value, {
      stream: true
    })

    if (chunk) {
      onChunk(chunk)
    }
  }

  const finalChunk = decoder.decode()

  if (finalChunk) {
    onChunk(finalChunk)
  }
}
