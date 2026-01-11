// Context builder for AI conversations
export class ContextBuilder {
  private context: any[] = []

  addMessage(role: 'user' | 'assistant', content: string) {
    this.context.push({ role, content })
  }

  addSystemPrompt(prompt: string) {
    this.context.unshift({ role: 'system', content: prompt })
  }

  addContext(data: any) {
    this.context.push({ role: 'context', content: JSON.stringify(data) })
  }

  build() {
    return this.context
  }

  clear() {
    this.context = []
  }

  getLastN(n: number) {
    return this.context.slice(-n)
  }
}
