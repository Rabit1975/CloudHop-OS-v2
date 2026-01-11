import React from 'react'
import { useChatActions } from './useChatActions'

export function ChatWindow() {
  const { messages, sendMessage } = useChatActions()

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        {/* Messages display */}
        {messages.map((msg) => (
          <div key={msg.id}>{msg.content}</div>
        ))}
      </div>
      <div style={{ padding: '10px', borderTop: '1px solid #ccc' }}>
        {/* Message input */}
        <input type="text" placeholder="Type a message..." />
      </div>
    </div>
  )
}
