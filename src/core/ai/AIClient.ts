import { createOpenAI } from 'ai'

const apiKey = import.meta.env.VITE_AI_GATEWAY_API_KEY!

export const openai = createOpenAI({
  baseURL: 'https://gateway.ai.vercel.dev/openai/v1',
  apiKey,
})
