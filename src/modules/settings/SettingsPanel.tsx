import React from 'react'
import { useSettings } from '@core/settings/useSettings'

export function SettingsPanel() {
  const { settings, updateSettings } = useSettings()

  return (
    <div style={{ maxWidth: '600px' }}>
      <div style={{ marginBottom: '20px' }}>
        <label>
          <strong>Theme:</strong>
          <select 
            value={settings.theme} 
            onChange={(e) => updateSettings({ theme: e.target.value as 'light' | 'dark' })}
            style={{ marginLeft: '10px' }}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label>
          <input 
            type="checkbox" 
            checked={settings.notifications}
            onChange={(e) => updateSettings({ notifications: e.target.checked })}
          />
          {' '}Enable Notifications
        </label>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label>
          <strong>Language:</strong>
          <input 
            type="text" 
            value={settings.language}
            onChange={(e) => updateSettings({ language: e.target.value })}
            style={{ marginLeft: '10px' }}
          />
        </label>
      </div>
    </div>
  )
}
