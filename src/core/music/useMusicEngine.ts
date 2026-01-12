import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../../lib/supabase'
import { Track, Playlist, PlaybackState } from './types'

export function useMusicEngine(channelId: string) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null)
  const [playbackState, setPlaybackState] = useState<PlaybackState>('stopped')
  const [volume, setVolumeState] = useState(50)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  // Sync state with other users via Supabase
  useEffect(() => {
    if (!channelId) return

    const channel = supabase
      .channel(`music:${channelId}`)
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'music_sessions',
          filter: `channel_id=eq.${channelId}`
        },
        (payload) => {
          if (payload.new) {
            const session = payload.new
            if (session.current_track) {
              setCurrentTrack({
                id: session.current_track,
                title: session.track_title || 'Unknown',
                artist: session.track_artist || 'Unknown',
                duration: session.track_duration || 0,
                thumbnail: session.track_thumbnail || ''
              })
            }
            setPlaybackState(session.is_playing ? 'playing' : 'paused')
            setCurrentTime(session.current_time || 0)
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [channelId])

  const play = useCallback(() => {
    const player = (window as any).musicPlayer
    if (player) {
      player.play()
      setPlaybackState('playing')
      updateSession({ is_playing: true })
    }
  }, [])

  const pause = useCallback(() => {
    const player = (window as any).musicPlayer
    if (player) {
      player.pause()
      setPlaybackState('paused')
      updateSession({ is_playing: false })
    }
  }, [])

  const skip = useCallback(() => {
    const player = (window as any).musicPlayer
    if (player) {
      player.nextTrack()
    }
  }, [])

  const seek = useCallback((seconds: number) => {
    const player = (window as any).musicPlayer
    if (player) {
      player.seek(seconds)
      setCurrentTime(seconds)
      updateSession({ current_time: seconds })
    }
  }, [])

  const setVolume = useCallback((vol: number) => {
    const player = (window as any).musicPlayer
    if (player) {
      player.setVolume(vol)
      setVolumeState(vol)
    }
  }, [])

  const loadTrack = useCallback(async (track: Track) => {
    const player = (window as any).musicPlayer
    if (player) {
      player.loadTrack(track.id)
      setCurrentTrack(track)
      await updateSession({
        current_track: track.id,
        track_title: track.title,
        track_artist: track.artist,
        track_duration: track.duration,
        track_thumbnail: track.thumbnail
      })
    }
  }, [])

  const loadPlaylist = useCallback(async (playlist: Playlist) => {
    const player = (window as any).musicPlayer
    if (player) {
      player.loadPlaylist(playlist.id)
      setCurrentPlaylist(playlist)
      if (playlist.tracks && playlist.tracks.length > 0) {
        setCurrentTrack(playlist.tracks[0])
      }
      await updateSession({
        playlist_id: playlist.id,
        current_track: playlist.tracks?.[0]?.id
      })
    }
  }, [])

  const updateSession = async (data: any) => {
    if (!channelId) return

    await supabase
      .from('music_sessions')
      .upsert({
        channel_id: channelId,
        ...data,
        updated_at: new Date().toISOString()
      })
  }

  return {
    currentTrack,
    currentPlaylist,
    playbackState,
    isPlaying: playbackState === 'playing',
    volume,
    currentTime,
    duration,
    play,
    pause,
    skip,
    seek,
    setVolume,
    loadTrack,
    loadPlaylist
  }
}
