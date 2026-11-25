import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'

import { homeHref, NAV, SITE } from '../data'
import { cx } from '../lib/cx'
import { Seal } from './Chrome'
import { ThemeToggle } from './ThemeToggle'

function Progress() {
  const { scrollYProgress } = useScroll()
  const width = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 })
  return <motion.div aria-hidden style={{ scaleX: width }} className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-vermilion" />
}

/** True when a nav link points at the page we are already on. */
function isCurrent(href: string) {
  if (href.includes('#')) return false
  const trim = (value: string) => value.replace(/\/+$/, '')
  return trim(href) === trim(window.location.pathname)
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('no-scroll', open)
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('no-scroll')
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <Progress />
      <header
        className={cx(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500',
          scrolled || open ? 'border-b border-line bg-surface/88 backdrop-blur-md' : 'border-b border-transparent bg-transparent',
        )}
      >
        <div className="mx-auto flex h-[76px] w-full max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
          <a href={homeHref()} className="group flex items-center gap-3" aria-label={`${SITE.name} — home`}>
            <Seal className="size-11 text-[0.85rem] transition-transform duration-700 ease-[var(--ease-soft)] group-hover:rotate-[18deg]" />
            <span className="leading-tight">
              <span className="block text-[0.95rem] font-medium tracking-[-0.01em]">Kizuna</span>
              <span className="caps block text-[0.55rem] text-muted">Youth Project</span>
            </span>
          </a>

          <nav aria-label="Sections" className="hidden items-center gap-6 lg:flex xl:gap-8">
            {NAV.map((item) => {
              const active = isCurrent(item.href)
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cx(
                    'group relative py-2 text-[0.92rem] transition-colors hover:text-moss',
                    active ? 'text-moss' : 'text-ink-soft',
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={cx(
                      'absolute inset-x-0 bottom-0 h-px origin-left bg-moss transition-transform duration-500 ease-[var(--ease-soft)] group-hover:scale-x-100',
                      active ? 'scale-x-100' : 'scale-x-0',
                    )}
                  />
                </a>
              )
            })}
            <a
              href={homeHref('#contact')}
              className="ml-2 inline-flex items-center gap-2 rounded-full bg-cta px-5 py-2.5 text-[0.9rem] font-medium text-washi transition-colors hover:bg-cta-hover"
            >
              Talk to us
              <span aria-hidden>↗</span>
            </a>
          </nav>

          <div className="flex items-center gap-2.5 md:gap-4">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex size-11 items-center justify-center rounded-full border border-line-strong text-ink lg:hidden"
            >
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
              <span aria-hidden className="relative block h-3 w-5">
                <span className={cx('absolute left-0 h-px w-full bg-ink transition-all duration-300', open ? 'top-1.5 rotate-45' : 'top-0')} />
                <span className={cx('absolute left-0 h-px w-full bg-ink transition-all duration-300', open ? 'top-1.5 -rotate-45' : 'bottom-0')} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-surface px-6 pt-28 pb-10 lg:hidden"
          >
            <nav aria-label="Sections" className="flex flex-col">
              {[...NAV, { label: 'Contact', href: homeHref('#contact') }].map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="serif flex items-baseline justify-between border-b border-line py-4 text-[2.2rem] leading-none"
                >
                  {item.label}
                  <span aria-hidden className="caps text-[0.6rem] text-muted">
                    0{i + 1}
                  </span>
                </motion.a>
              ))}
            </nav>
            <div className="mt-auto space-y-1 pt-10 text-sm text-muted">
              <p className="caps text-moss">{SITE.tagline}</p>
              <a href={`mailto:${SITE.email}`} className="block text-ink underline-offset-4 hover:underline">
                {SITE.email}
              </a>
              <a href={SITE.instagram.href} target="_blank" rel="noreferrer" className="block text-ink underline-offset-4 hover:underline">
                {SITE.instagram.handle}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
