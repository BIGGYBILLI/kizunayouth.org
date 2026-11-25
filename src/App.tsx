import { MotionConfig } from 'motion/react'

import { Nav } from './components/Nav'
import { Home } from './pages/Home'

export function App() {
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
        <Home />
      </main>
    </MotionConfig>
  )
}
