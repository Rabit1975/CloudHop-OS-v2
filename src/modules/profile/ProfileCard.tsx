import React from 'react'
import { useUser } from '@core/user/useUser'

export function ProfileCard() {
  const { user, updateProfile } = useUser()

  return (
    <div style={{ 
      border: '1px solid #ccc', 
      borderRadius: '8px', 
      padding: '20px',
      maxWidth: '400px'
    }}>
      <div style={{ marginBottom: '10px' }}>
        <strong>Name:</strong> {user?.name || 'Not set'}
      </div>
      <div style={{ marginBottom: '10px' }}>
        <strong>Email:</strong> {user?.email || 'Not set'}
      </div>
      <button onClick={() => updateProfile({ name: 'New Name' })}>
        Edit Profile
      </button>
    </div>
  )
}
