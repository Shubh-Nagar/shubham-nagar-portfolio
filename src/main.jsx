import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './hooks/useTheme'
import App from './App'
// Self-hosted variable fonts (no Google Fonts request needed). The display
// font is a trimmed copy declared in index.css — see scripts/subset-display-font.py
import '@fontsource-variable/instrument-sans'
import './index.css'

const app = (
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)

// Production pages arrive prerendered (scripts/prerender.mjs) — attach to that
// HTML instead of rebuilding it. `npm run dev` serves an empty #root.
const container = document.getElementById('root')
if (container.hasChildNodes()) hydrateRoot(container, app)
else createRoot(container).render(app)
