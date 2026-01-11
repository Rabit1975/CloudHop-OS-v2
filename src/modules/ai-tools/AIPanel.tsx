import React, { useState } from 'react'
import { aiClient } from '@core/ai/AIClient'

export function AIPanel() {
  const [input, setInput] = useState('')
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const result = await aiClient.chat(input)
      setResponse(result)
    } catch (error) {
      console.error('AI error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '800px' }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <textarea 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI anything..."
          style={{ width: '100%', minHeight: '100px', padding: '10px' }}
        />
        <button type="submit" disabled={isLoading} style={{ marginTop: '10px' }}>
          {isLoading ? 'Processing...' : 'Send'}
        </button>
      </form>
      {response && (
        <div style={{ 
          border: '1px solid #ccc', 
          borderRadius: '8px', 
          padding: '15px',
          backgroundColor: '#f5f5f5'
        }}>
          <strong>AI Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  )
}
