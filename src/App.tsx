import { MotionConfig } from 'motion/react'
import { useEffect } from 'react'

import { Nav } from './components/Nav'
import { currentRoute, titleFor } from './lib/router'
import { Home } from './pages/Home'
import { ServicesPage } from './pages/Services'
import { WorkshopPage } from './pages/Workshop'

export function App() {
  const route = currentRoute()

  useEffect(() => {
    document.title = titleFor(route)

    // Links from an inner page back to `/#story` land on a section that only
    // exists after React renders, so the browser's own hash jump misses it.
    const id = window.location.hash.slice(1)
    if (!id) return
    const timer = window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }), 80)
    return () => window.clearTimeout(timer)
  }, [route])

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only z-[100] rounded-full bg-moss-deep px-5 py-3 text-washi focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        {route === 'services' ? <ServicesPage /> : route === 'workshop' ? <WorkshopPage /> : <Home />}
      </main>
    </MotionConfig>
  )
}
