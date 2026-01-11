import { useState } from 'react'

export function useMeetingRoom(roomId: string) {
  const [participants, setParticipants] = useState<any[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)

  const startRecording = () => {
    setIsRecording(true)
    console.log('Recording started')
  }

  const stopRecording = () => {
    setIsRecording(false)
    console.log('Recording stopped')
  }

  const startScreenShare = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true
      })
      setIsScreenSharing(true)
      return stream
    } catch (error) {
      console.error('Error sharing screen:', error)
      return null
    }
  }

  const stopScreenShare = () => {
    setIsScreenSharing(false)
  }

  return {
    participants,
    isRecording,
    isScreenSharing,
    startRecording,
    stopRecording,
    startScreenShare,
    stopScreenShare
  }
}
