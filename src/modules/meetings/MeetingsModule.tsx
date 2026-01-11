import React from 'react'
import { useWebRTC } from './useWebRTC'
import { CallOverlay } from './CallOverlay'

export function MeetingsModule() {
  const { isConnected, localStream } = useWebRTC('default-room')

  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <div>Meetings Module</div>
      <div>Status: {isConnected ? 'Connected' : 'Disconnected'}</div>
      <CallOverlay />
    </div>
  )
}
