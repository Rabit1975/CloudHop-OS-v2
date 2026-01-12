import React, { useState } from 'react'
import { useAI } from '../../kernel/providers/AIProvider'

export default function AIPanel() {
  const ai = useAI()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)

  async function runAI() {
    if (!input.trim()) return
    
    setLoading(true)
    try {
      const result = await ai.run({ prompt: input })
      setOutput(result || '')
    } catch (err) {
      setOutput('Error: Unable to process request.')
    }
    setLoading(false)
  }

  return (
    <div className="ai-panel" style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      padding: '1.5rem',
      height: '100%',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      {/* Header */}
      <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>
        🐇 rabbit.ai
      </div>

      {/* Input Box */}
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask rabbit.ai something..."
        style={{
          width: '100%',
          minHeight: '120px',
          padding: '0.75rem',
          fontSize: '1rem',
          borderRadius: '8px',
          border: '1px solid #ccc',
          resize: 'vertical'
        }}
      />

      {/* Run Button */}
      <button
        onClick={runAI}
        disabled={loading || !input.trim()}
        style={{
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          fontWeight: '500',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: loading || !input.trim() ? '#ccc' : '#007bff',
          color: 'white',
          cursor: loading || !input.trim() ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Thinking…' : 'Run'}
      </button>

      {/* Output Box */}
      <div style={{
        flex: 1,
        padding: '1rem',
        borderRadius: '8px',
        border: '1px solid #ddd',
        backgroundColor: '#f9f9f9',
        minHeight: '200px',
        overflowY: 'auto'
      }}>
        {output ? (
          <pre style={{
            margin: 0,
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            {output}
          </pre>
        ) : (
          <div style={{ color: '#999', fontStyle: 'italic' }}>
            Output will appear here.
          </div>
        )}
      </div>
    </div>
  )
}
