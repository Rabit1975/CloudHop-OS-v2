// CSS transition and animation utilities
export const transitions = {
  fast: '0.1s ease',
  normal: '0.2s ease',
  slow: '0.3s ease',
  spring: '0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
}

export const animations = {
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 }
  },
  slideIn: {
    from: { transform: 'translateY(-20px)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 }
  },
  slideUp: {
    from: { transform: 'translateY(20px)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 }
  },
  scaleIn: {
    from: { transform: 'scale(0.9)', opacity: 0 },
    to: { transform: 'scale(1)', opacity: 1 }
  },
  pulse: {
    '0%, 100%': { opacity: 1 },
    '50%': { opacity: 0.5 }
  }
}

export const easings = {
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
}
