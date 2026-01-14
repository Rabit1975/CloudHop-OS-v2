import { contextBridge, ipcRenderer } from 'electron'
import { IPC_CHANNELS } from './ipcChannels'

contextBridge.exposeInMainWorld('cloudhop', {
  // Music Engine APIs
  music: {
    play: () => ipcRenderer.invoke(IPC_CHANNELS.MUSIC_PLAY),
    pause: () => ipcRenderer.invoke(IPC_CHANNELS.MUSIC_PAUSE),
    stop: () => ipcRenderer.invoke(IPC_CHANNELS.MUSIC_STOP),
    next: () => ipcRenderer.invoke(IPC_CHANNELS.MUSIC_NEXT),
    previous: () => ipcRenderer.invoke(IPC_CHANNELS.MUSIC_PREVIOUS),
    setVolume: (volume: number) => ipcRenderer.invoke(IPC_CHANNELS.MUSIC_SET_VOLUME, volume),
    getState: () => ipcRenderer.invoke(IPC_CHANNELS.MUSIC_GET_STATE),
    loadTrack: (track: any) => ipcRenderer.invoke(IPC_CHANNELS.MUSIC_LOAD_TRACK, track)
  },

  // GFN APIs
  gfn: {
    connect: () => ipcRenderer.invoke(IPC_CHANNELS.GFN_CONNECT),
    disconnect: () => ipcRenderer.invoke(IPC_CHANNELS.GFN_DISCONNECT),
    getStatus: () => ipcRenderer.invoke(IPC_CHANNELS.GFN_GET_STATUS),
    startStream: (gameId: string) => ipcRenderer.invoke(IPC_CHANNELS.GFN_START_STREAM, gameId),
    stopStream: () => ipcRenderer.invoke(IPC_CHANNELS.GFN_STOP_STREAM),
    setQuality: (quality: string) => ipcRenderer.invoke(IPC_CHANNELS.GFN_SET_QUALITY, quality)
  },

  // System APIs
  system: {
    getInfo: () => ipcRenderer.invoke(IPC_CHANNELS.SYSTEM_GET_INFO),
    minimize: () => ipcRenderer.invoke(IPC_CHANNELS.SYSTEM_MINIMIZE),
    maximize: () => ipcRenderer.invoke(IPC_CHANNELS.SYSTEM_MAXIMIZE),
    close: () => ipcRenderer.invoke(IPC_CHANNELS.SYSTEM_CLOSE)
  },

  // Audio Analysis APIs
  audio: {
    startAnalysis: () => ipcRenderer.invoke(IPC_CHANNELS.AUDIO_START_ANALYSIS),
    stopAnalysis: () => ipcRenderer.invoke(IPC_CHANNELS.AUDIO_STOP_ANALYSIS),
    getFeatures: () => ipcRenderer.invoke(IPC_CHANNELS.AUDIO_GET_FEATURES)
  }
})
