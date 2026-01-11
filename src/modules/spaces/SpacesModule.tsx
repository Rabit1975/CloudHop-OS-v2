import React, { useState } from 'react'
import { GalaxyView } from './GalaxyView'
import { SpaceInterior } from './SpaceInterior'

export function SpacesModule() {
  const [selectedSpace, setSelectedSpace] = useState<string | null>(null)

  return (
    <div style={{ height: '100%' }}>
      {selectedSpace ? (
        <SpaceInterior spaceId={selectedSpace} onBack={() => setSelectedSpace(null)} />
      ) : (
        <GalaxyView onSelectSpace={setSelectedSpace} />
      )}
    </div>
  )
}
