import React from 'react'
import { useHopSpaces } from './useHopSpaces'

interface SpaceInteriorProps {
  spaceId: string
  onBack: () => void
}

export function SpaceInterior({ spaceId, onBack }: SpaceInteriorProps) {
  const { onlineUsers } = useHopSpaces()

  return (
    <div style={{ height: '100%', padding: '20px' }}>
      <button onClick={onBack}>← Back to Galaxy</button>
      <h2>Space Interior: {spaceId}</h2>
      <div>
        <h3>Online Users ({onlineUsers.length})</h3>
        {/* Render online users */}
      </div>
    </div>
  )
}
