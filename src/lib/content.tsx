import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

import { defaultContent, normalizeContent, type SiteContent } from './contentTypes'

const FALLBACK = defaultContent()
const ContentContext = createContext<SiteContent>(FALLBACK)

async function readContent(): Promise<SiteContent | null> {
  try {
    const res = await fetch('/api/content', { headers: { accept: 'application/json' } })
    if (!res.ok) return null
    const data = (await res.json()) as { content?: unknown }
    return normalizeContent(data.content)
  } catch {
    return null
  }
}

/** Loads the edited content once and shares it with every section. The shipped
 *  defaults render first, so the page never waits on the network to appear. */
export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(FALLBACK)

  useEffect(() => {
    let alive = true
    readContent().then((next) => {
      if (alive && next) setContent(next)
    })
    return () => {
      alive = false
    }
  }, [])

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>
}

export function useContent(): SiteContent {
  return useContext(ContentContext)
}
