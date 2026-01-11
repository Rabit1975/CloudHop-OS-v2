import React from 'react'
import { ChatSidebar } from './ChatSidebar'
import { ChatWindow } from './ChatWindow'

export function ChatModule() {
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <ChatSidebar />
      <ChatWindow />
    </div>
  )
}
