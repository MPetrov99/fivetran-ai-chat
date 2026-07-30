import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { openai } from './config/openai.js'

const app = express()
const PORT = 3001

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

type ChatRequestBody = {
  messages?: unknown
}

console.log('OpenAI API key loaded:', process.env.OPENAI_API_KEY ? 'Yes' : 'No')

app.use(
  cors({
    origin: 'http://localhost:5173'
  })
)

app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    message: 'Server is running.'
  })
})

app.post('/api/chat', async (request, response) => {
  const { messages } = request.body as ChatRequestBody

  if (!Array.isArray(messages) || messages.length === 0) {
    response.status(400).json({
      error: 'At least one message is required.'
    })

    return
  }

  const hasInvalidMessage = messages.some((message) => {
    if (typeof message !== 'object' || message === null) {
      return true
    }

    if (!('role' in message) || !('content' in message)) {
      return true
    }

    if (message.role !== 'user' && message.role !== 'assistant') {
      return true
    }

    if (typeof message.content !== 'string') {
      return true
    }

    return !message.content.trim()
  })

  if (hasInvalidMessage) {
    response.status(400).json({
      error: 'Every message must have a valid role and content.'
    })

    return
  }

  const conversation = messages as ChatMessage[]

  try {
    const openAIResponse = await openai.responses.create({
      model: 'gpt-5-mini',
      input: conversation.map(({ role, content }) => ({
        role,
        content: content.trim()
      }))
    })

    response.json({
      message: openAIResponse.output_text
    })
  } catch (error) {
    console.error('OpenAI request failed:', error)

    response.status(500).json({
      error: 'The assistant could not generate a response.'
    })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
