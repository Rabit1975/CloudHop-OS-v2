import { useEffect } from 'react'
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

  useEffect(() => {
    if (!onNotification) return

    if (status === 'playing' && currentTrack) {
      onNotification({
        type: 'track-changed',
        message: `Now playing: ${currentTrack.title} by ${currentTrack.artist}`,
        timestamp: Date.now()
      })
    }
  }, [currentTrack, status, onNotification])

  useEffect(() => {
    if (!onNotification) return

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
  }, [status, onNotification])
}
