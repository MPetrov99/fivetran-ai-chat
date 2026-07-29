export async function getAssistantResponse(
  userMessage: string
): Promise<string> {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000)
  })

  return `This is a temporary response to: "${userMessage}"`
}
