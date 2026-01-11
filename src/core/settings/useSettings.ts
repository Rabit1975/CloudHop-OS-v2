import { useState, useEffect } from 'react'
import { settingsStore } from './settingsStore'

export function useSettings() {
  const [settings, setSettings] = useState(settingsStore.getSettings())

  useEffect(() => {
    const unsubscribe = settingsStore.subscribe(setSettings)
    return unsubscribe
  }, [])

  const updateSettings = (updates: any) => {
    settingsStore.updateSettings(updates)
  }

  return {
    settings,
    updateSettings
  }
}
