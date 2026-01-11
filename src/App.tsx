import React from 'react'
import { AppProviders } from './kernel/providers/AppProviders'
import { Router } from './kernel/routing/Router'
import { ErrorBoundary } from './kernel/errors/ErrorBoundary'
import { AuthGate } from './kernel/auth/AuthGate'

function App() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <AuthGate>
          <Router />
        </AuthGate>
      </AppProviders>
    </ErrorBoundary>
  )
}

export default App
