import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppLayout } from '@ui/layout/AppLayout'

// Modules
import { ChatModule } from '@modules/chat/ChatModule'
import { MeetingsModule } from '@modules/meetings/MeetingsModule'
import { SpacesModule } from '@modules/spaces/SpacesModule'
import { ProfileModule } from '@modules/profile/ProfileModule'
import { SettingsModule } from '@modules/settings/SettingsModule'
import { AIToolsModule } from '@modules/ai-tools/AIToolsModule'

export function Router() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<SpacesModule />} />
          <Route path="/chat" element={<ChatModule />} />
          <Route path="/meetings" element={<MeetingsModule />} />
          <Route path="/profile" element={<ProfileModule />} />
          <Route path="/settings" element={<SettingsModule />} />
          <Route path="/ai-tools" element={<AIToolsModule />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  )
}
