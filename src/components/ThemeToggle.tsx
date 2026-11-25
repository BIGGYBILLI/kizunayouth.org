import { useEffect, useState } from 'react'

import { cx } from '../lib/cx'

const STORAGE_KEY = 'kizuna-theme'
type Theme = 'light' | 'dark'

const THEME_COLOR: Record<Theme, string> = { light: '#f4eee1', dark: '#02110c' }

/**
 * Light/dark switch. The class itself is applied before paint by a small
 * inline script in index.html, so this only mirrors and updates that state.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light',
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme])
  }, [theme])

  const next: Theme = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      onClick={() => {
        setTheme(next)
        try {
          localStorage.setItem(STORAGE_KEY, next)
        } catch {
          /* storage can be blocked; the session still switches */
        }
      }}
      aria-label={`Switch to ${next} mode`}
      aria-pressed={theme === 'dark'}
      title={`Switch to ${next} mode`}
      className={cx(
        'group relative grid size-10 shrink-0 place-items-center rounded-full border border-line-strong text-ink-soft',
        'transition-colors duration-300 hover:border-moss hover:text-moss',
        className,
      )}
    >
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className={cx(
          'absolute size-[18px] transition-all duration-500 ease-[var(--ease-soft)]',
          theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0',
        )}
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
      </svg>
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cx(
          'absolute size-[18px] transition-all duration-500 ease-[var(--ease-soft)]',
          theme === 'dark' ? 'rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100',
        )}
      >
        <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
      </svg>
    </button>
  )
}
