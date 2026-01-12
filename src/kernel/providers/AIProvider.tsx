import React, { ReactNode, createContext, useContext } from 'react'
import { rabbitAI } from '../../core/ai/AIClient'

interface AIContextType {
  run: (params: { prompt: string, context?: any }) => Promise<string>
  client: typeof rabbitAI
}

const AIContext = createContext<AIContextType | undefined>(undefined)

export function AIProvider({ children }: { children: ReactNode }) {
  const run = async ({ prompt, context }: { prompt: string, context?: any }): Promise<string> => {
    const messages = [{ role: 'user', content: prompt }]
    return await rabbitAI.chat(messages, context)
  }

  const value = {
    run,
    client: rabbitAI
  }

  return <AIContext.Provider value={value}>{children}</AIContext.Provider>
}

export function useAI() {
  const context = useContext(AIContext)
  if (!context) {
    throw new Error('useAI must be used within AIProvider')
  }
  return context
}
