import React from 'react'

interface GalaxyViewProps {
  onSelectSpace: (spaceId: string) => void
}

export function GalaxyView({ onSelectSpace }: GalaxyViewProps) {
  return (
    <div style={{ 
      height: '100%', 
      background: 'linear-gradient(to bottom, #000033, #000011)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white'
    }}>
      <div>
        <h2>Galaxy View</h2>
        <p>Your spaces appear here as stars in the galaxy</p>
        {/* Render space nodes as stars */}
      </div>
    </div>
  )
}
