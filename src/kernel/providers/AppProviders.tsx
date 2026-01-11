import React, { ReactNode } from 'react'
import { ThemeProvider } from './ThemeProvider'
import { AuthProvider } from './AuthProvider'
import { SessionProvider } from './SessionProvider'
import { SettingsProvider } from './SettingsProvider'
import { RealtimeProvider } from './RealtimeProvider'
import { AIProvider } from './AIProvider'

interface AppProvidersProps {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SessionProvider>
          <SettingsProvider>
            <RealtimeProvider>
              <AIProvider>
                {children}
              </AIProvider>
            </RealtimeProvider>
          </SettingsProvider>
        </SessionProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
