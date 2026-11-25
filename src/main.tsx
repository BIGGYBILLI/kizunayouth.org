import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './App'
import { ContentProvider } from './lib/content'
import { Admin } from './pages/Admin'
import './styles.css'

const isAdmin = window.location.pathname.replace(/\/+$/, '') === '/admin'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isAdmin ? (
      <Admin />
    ) : (
      <ContentProvider>
        <App />
      </ContentProvider>
    )}
  </StrictMode>,
)
