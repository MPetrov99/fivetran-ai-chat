const API_URL = 'http://localhost:3001/api/chat'

type ChatResponse = {
  message: string
}

type ErrorResponse = {
  error?: string
}

export async function getAssistantResponse(
  userMessage: string
): Promise<string> {
  const trimmedMessage = userMessage.trim()

  if (!trimmedMessage) {
    throw new Error('A user message is required.')
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: trimmedMessage
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
