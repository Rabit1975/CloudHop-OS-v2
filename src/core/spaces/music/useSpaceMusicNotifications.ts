import { useEffect, useRef } from 'react'
import { useMusicState, selectStatus } from '../../music/MusicState'

export type NotificationType = 'track-changed' | 'playback-started' | 'playback-stopped' | 'queue-updated'

export interface MusicNotification {
  type: NotificationType
  message: string
  timestamp: number
}

export function useSpaceMusicNotifications(
  onNotification?: (notification: MusicNotification) => void
) {
  const status = useMusicState(selectStatus)
  const currentTrack = useMusicState((state) => state.currentTrack)
  const prevTrackIdRef = useRef<string | null>(null)
  const prevStatusRef = useRef<string>(status)

  useEffect(() => {
    if (!onNotification) return

    // Only notify on actual track changes
    if (currentTrack && currentTrack.id !== prevTrackIdRef.current) {
      prevTrackIdRef.current = currentTrack.id
      if (status === 'playing') {
        onNotification({
          type: 'track-changed',
          message: `Now playing: ${currentTrack.title} by ${currentTrack.artist}`,
          timestamp: Date.now()
        })
      }
    }
  }, [currentTrack, status, onNotification])

  useEffect(() => {
    if (!onNotification) return

    // Only notify on status changes
    if (status !== prevStatusRef.current) {
      prevStatusRef.current = status
      
      if (status === 'playing') {
        onNotification({
          type: 'playback-started',
          message: 'Playback started',
          timestamp: Date.now()
        })
      } else if (status === 'stopped') {
        onNotification({
          type: 'playback-stopped',
          message: 'Playback stopped',
          timestamp: Date.now()
        })
      }
    }
  }, [status, onNotification])
}
