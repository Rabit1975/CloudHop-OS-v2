import React from 'react'

export function CallOverlay() {
  return (
    <div style={{
      position: 'absolute',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'rgba(0,0,0,0.8)',
      padding: '10px 20px',
      borderRadius: '8px',
      display: 'flex',
      gap: '10px'
    }}>
      <button>Mute</button>
      <button>Video</button>
      <button>Share</button>
      <button style={{ backgroundColor: 'red', color: 'white' }}>Leave</button>
    </div>
  )
}
