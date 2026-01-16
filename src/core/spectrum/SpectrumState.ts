// SpectrumState - Centralized state management for the Spectrum visualization

export interface SpectrumState {
  // Audio features
  bass: number
  mid: number
  high: number
  energy: number
  bpm: number

  // Emotional state
  valence: number
  arousal: number
  dominance: number

  // Visual state
  nebulaIntensity: number
  particleCount: number
  orbitSpeed: number
  glyphResonance: number
  
  // Colors from mood fusion
  primaryColor: string
  secondaryColor: string
  accentColor: string
  glowColor: string

  // Time
  timestamp: number
}

export const defaultSpectrumState: SpectrumState = {
  bass: 0,
  mid: 0,
  high: 0,
  energy: 0,
  bpm: 120,
  
  valence: 0.5,
  arousal: 0.5,
  dominance: 0.5,
  
  nebulaIntensity: 0.5,
  particleCount: 1000,
  orbitSpeed: 1,
  glyphResonance: 0,
  
  primaryColor: '#6366f1',
  secondaryColor: '#8b5cf6',
  accentColor: '#ec4899',
  glowColor: '#7dd3fc',
  
  timestamp: Date.now()
}

export class SpectrumStateManager {
  private state: SpectrumState = { ...defaultSpectrumState }
  private listeners: Array<(state: SpectrumState) => void> = []

  getState(): SpectrumState {
    return { ...this.state }
  }

  setState(updates: Partial<SpectrumState>): void {
    this.state = {
      ...this.state,
      ...updates,
      timestamp: Date.now()
    }
    this.notifyListeners()
  }

  updateAudioFeatures(features: {
    bass: number
    mid: number
    high: number
    energy: number
    bpm: number
  }): void {
    this.setState(features)
  }

  updateEmotionalState(emotional: {
    valence: number
    arousal: number
    dominance: number
  }): void {
    this.setState(emotional)
  }

  updateColors(colors: {
    primaryColor: string
    secondaryColor: string
    accentColor: string
    glowColor: string
  }): void {
    this.setState(colors)
  }

  subscribe(listener: (state: SpectrumState) => void): () => void {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener)
    }
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => {
      listener(this.getState())
    })
  }

  reset(): void {
    this.state = { ...defaultSpectrumState }
    this.notifyListeners()
  }
}

export const spectrumStateManager = new SpectrumStateManager()
