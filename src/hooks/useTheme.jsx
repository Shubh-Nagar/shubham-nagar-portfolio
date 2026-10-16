import { createContext, useCallback, useContext, useEffect, useState } from 'react'

/**
 * Theme context — light by default, remembers the visitor's choice.
 * The inline script in index.html applies the saved theme before first
 * paint; this keeps React in sync with it.
 */
const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} })

function readInitialTheme() {
  try {
    return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0E1119' : '#F3F4F1')
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* storage unavailable (private mode) — theme still works for this visit */
    }
  }, [theme])

  const toggleTheme = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
