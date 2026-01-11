import { useState } from 'react'

type ChatUpdate = Partial<{
  title: string
  description: string
  is_archived: boolean
}>

export function useChatActions(onChatUpdated?: () => void) {
  const [loading, setLoading] = useState(false)

  const updateChat = async (id: string, updates: ChatUpdate) => {
    setLoading(true)
    try {
      // Update chat in database
      console.log('Updating chat:', id, updates)
      onChatUpdated?.()
    } catch (error) {
      console.error('Error updating chat:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteChat = async (id: string) => {
    setLoading(true)
    try {
      // Delete chat from database
      console.log('Deleting chat:', id)
      onChatUpdated?.()
    } catch (error) {
      console.error('Error deleting chat:', error)
    } finally {
      setLoading(false)
    }
  }

  return {
    updateChat,
    deleteChat,
    loading
  }
}
