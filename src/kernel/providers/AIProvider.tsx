import React, { ReactNode, createContext, useContext } from 'react'

interface AIContextType {
  sendMessage: (message: string) => Promise<string>
  isProcessing: boolean
}

const AIContext = createContext<AIContextType | undefined>(undefined)

export function AIProvider({ children }: { children: ReactNode }) {
  const isProcessing = false

  const sendMessage = async (message: string): Promise<string> => {
    // Implement AI message sending
    console.log('AI Message:', message)
    return 'AI response'
  }

  const value = {
    sendMessage,
    isProcessing
  }

  return <AIContext.Provider value={value}>{children}</AIContext.Provider>
}

export function useAIContext() {
  const context = useContext(AIContext)
  if (!context) {
    throw new Error('useAIContext must be used within AIProvider')
  }
  return context
}
