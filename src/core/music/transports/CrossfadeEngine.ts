import { MusicTransport } from './MusicTransport'

export interface CrossfadeSettings {
  duration: number // milliseconds
  curve?: 'linear' | 'exponential'
}

export class CrossfadeEngine {
  private activeTransport: MusicTransport | null = null
  private nextTransport: MusicTransport | null = null
  private isCrossfading = false

  async crossfade(
    from: MusicTransport | null,
    to: MusicTransport,
    settings: CrossfadeSettings
  ): Promise<void> {
    if (this.isCrossfading) {
      throw new Error('Crossfade already in progress')
    }

    this.isCrossfading = true
    this.activeTransport = from
    this.nextTransport = to

    try {
      if (!from) {
        // Simple fade in
        await this.fadeIn(to, settings.duration)
      } else {
        // Crossfade between tracks
        await Promise.all([
          this.fadeOut(from, settings.duration),
          this.fadeIn(to, settings.duration)
        ])
      }

      this.activeTransport = to
      this.nextTransport = null
    } finally {
      this.isCrossfading = false
    }
  }

  private async fadeOut(transport: MusicTransport, duration: number): Promise<void> {
    const startVolume = await transport.getCurrentTime().then(() => 1) // Assume full volume
    const steps = Math.ceil(duration / 16) // ~60fps
    const volumeStep = startVolume / steps

    for (let i = 0; i < steps; i++) {
      const newVolume = Math.max(0, startVolume - volumeStep * i)
      await transport.setVolume(newVolume)
      await this.wait(duration / steps)
    }

    await transport.pause()
  }

  private async fadeIn(transport: MusicTransport, duration: number): Promise<void> {
    const targetVolume = 1 // Assume full volume target
    const steps = Math.ceil(duration / 16) // ~60fps
    const volumeStep = targetVolume / steps

    await transport.setVolume(0)
    await transport.play()

    return new Promise((resolve) => {
      let currentStep = 0
      let animationFrame: number

      const fade = async () => {
        if (currentStep >= steps) {
          await transport.setVolume(targetVolume)
          resolve()
          return
        }

        const newVolume = Math.min(targetVolume, volumeStep * currentStep)
        await transport.setVolume(newVolume)
        currentStep++

        animationFrame = requestAnimationFrame(fade)
      }

      animationFrame = requestAnimationFrame(fade)
    })
  }

  private wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  isActive(): boolean {
    return this.isCrossfading
  }

  stop(): void {
    this.isCrossfading = false
    this.activeTransport = null
    this.nextTransport = null
  }
}
