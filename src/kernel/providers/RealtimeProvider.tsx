import React, { ReactNode, createContext, useContext } from 'react'

interface RealtimeContextType {
  isConnected: boolean
  subscribe: (channel: string) => void
  unsubscribe: (channel: string) => void
}

const RealtimeContext = createContext<RealtimeContextType | undefined>(undefined)

export function RealtimeProvider({ children }: { children: ReactNode }) {
  const isConnected = false

  const subscribe = (channel: string) => {
    // Implement realtime subscription
    console.log('Subscribe to:', channel)
  }

  const unsubscribe = (channel: string) => {
    // Implement realtime unsubscription
    console.log('Unsubscribe from:', channel)
  }

  const value = {
    isConnected,
    subscribe,
    unsubscribe
  }

  return <RealtimeContext.Provider value={value}>{children}</RealtimeContext.Provider>
}

export function useRealtimeContext() {
  const context = useContext(RealtimeContext)
  if (!context) {
    throw new Error('useRealtimeContext must be used within RealtimeProvider')
  }
  return context
}
