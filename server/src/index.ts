import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { openai } from './config/openai.js'

const app = express()
const PORT = 3001

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
  const { message } = request.body as {
    message?: unknown
  }

  if (typeof message !== 'string' || !message.trim()) {
    response.status(400).json({
      error: 'A valid message is required.'
    })

    return
  }

  try {
    const openAIResponse = await openai.responses.create({
      model: 'gpt-5-mini',
      input: message.trim()
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
