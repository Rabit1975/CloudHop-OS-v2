import { useState, useEffect } from 'react'
import { supabase } from '@core/supabase/client'

interface HopSpace {
  id: string
  name: string
  description?: string
  type: string
  is_public: boolean
  created_at: string
}

export function useHopSpaces() {
  const [spaces, setSpaces] = useState<HopSpace[]>([])
  const [loading, setLoading] = useState(true)
  const [currentSpace, setCurrentSpace] = useState<string | null>(null)

  useEffect(() => {
    fetchPublicSpaces()
    
    // Subscribe to realtime updates
    const channel = supabase
      .channel('hop_spaces')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'hop_spaces' },
        () => {
          fetchPublicSpaces()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const fetchPublicSpaces = async () => {
    try {
      const { data, error } = await supabase
        .from('hop_spaces')
        .select('*')
        .eq('is_public', true)
        .order('created_at', { ascending: false })

      if (error) throw error
      
      // Add deterministic galaxy coordinates based on space.id
      const spacesWithCoords = (data || []).map((space: any) => ({
        ...space,
        x: generateCoordinate(space.id, 0),
        y: generateCoordinate(space.id, 1),
        z: generateCoordinate(space.id, 2)
      }))
      
      setSpaces(spacesWithCoords)
    } catch (error) {
      console.error('Error fetching spaces:', error)
    } finally {
      setLoading(false)
    }
  }

  const createSpace = async (name: string, type: string) => {
    try {
      const { data, error } = await supabase
        .from('hop_spaces')
        .insert([{ name, type, is_public: true }])
        .select()

      if (error) throw error
      console.log('Space created:', data)
    } catch (error) {
      console.error('Error creating space:', error)
    }
  }

  const joinSpace = (spaceId: string) => {
    setCurrentSpace(spaceId)
  }

  const leaveSpace = () => {
    setCurrentSpace(null)
  }

  return {
    spaces,
    loading,
    currentSpace,
    createSpace,
    joinSpace,
    leaveSpace
  }
}

// Generate deterministic coordinates from space ID
function generateCoordinate(id: string, index: number): number {
  let hash = 0
  const str = id + index
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i)
    hash = hash & hash
  }
  return (hash % 2000) - 1000
}
