// AI tools available to the assistant
export const tools = [
  {
    name: 'search',
    description: 'Search the web for information',
    parameters: {
      query: 'string'
    }
  },
  {
    name: 'calculate',
    description: 'Perform mathematical calculations',
    parameters: {
      expression: 'string'
    }
  },
  {
    name: 'schedule',
    description: 'Schedule a meeting or reminder',
    parameters: {
      title: 'string',
      time: 'string',
      attendees: 'string[]'
    }
  }
]

export type Tool = typeof tools[number]
