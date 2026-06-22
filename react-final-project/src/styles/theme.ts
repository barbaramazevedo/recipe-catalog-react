export const theme = {
  colors: {
    primary: '#e67e22',
    primaryDark: '#cf6d17',
    background: '#fafafa',
    surface: '#ffffff',
    text: '#1a1a1a',
    textMuted: '#888888',
    border: '#e0e0e0',
    error: '#c0392b',
  },
  radii: {
    sm: '6px',
    md: '10px',
    lg: '16px',
    full: '9999px',
  },
  shadows: {
    card: '0 2px 8px rgba(0,0,0,0.10)',
    cardHover: '0 6px 20px rgba(230,126,34,0.18)',
  },
  fonts: {
    base: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
}

export type Theme = typeof theme
