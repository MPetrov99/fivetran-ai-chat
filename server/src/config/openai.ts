import OpenAI from 'openai'

const apiKey = process.env.OPENAI_API_KEY

if (!apiKey) {
  throw new Error('OPENAI_API_KEY is missing from the environment.')
}

export const openai = new OpenAI({
  apiKey
})
