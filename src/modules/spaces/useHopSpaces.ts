import { useState, useEffect } from 'react'
import { usePresence } from '@core/presence/usePresence'

export function useHopSpaces() {
  const [spaces, setSpaces] = useState<any[]>([])
  const [currentSpace, setCurrentSpace] = useState<string | null>(null)
  const { onlineUsers } = usePresence(currentSpace || '')

  const createSpace = (name: string, type: string) => {
    console.log('Creating space:', name, type)
  }

  const joinSpace = (spaceId: string) => {
    setCurrentSpace(spaceId)
    console.log('Joining space:', spaceId)
  }

  const leaveSpace = () => {
    setCurrentSpace(null)
    console.log('Leaving space')
  }

  return {
    spaces,
    currentSpace,
    onlineUsers,
    createSpace,
    joinSpace,
    leaveSpace
  }
}
