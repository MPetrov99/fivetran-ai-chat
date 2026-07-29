const RESPONSE_DELAY_MS = 1000

export async function getAssistantResponse(
  userMessage: string
): Promise<string> {
  const trimmedMessage = userMessage.trim()

  if (!trimmedMessage) {
    throw new Error('A user message is required.')
  }

  await new Promise<void>((resolve) => {
    setTimeout(resolve, RESPONSE_DELAY_MS)
  })

  return `This is a temporary response to: "${trimmedMessage}"`
}
