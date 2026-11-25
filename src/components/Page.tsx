import type { ReactNode } from 'react'

import { FOOTER, homeHref, SITE } from '../data'
import { cx } from '../lib/cx'
import { ArrowLink, Eyebrow, Reveal, Seal } from './Chrome'

export const CONTAINER = 'mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12'

/** The closing band every inner page shares: one clear way to talk to us. */
export function PageCta({
  eyebrow,
  title,
  accent,
  body,
}: {
  eyebrow: string
  title: string
  accent: string
  body: string
}) {
  return (
    <section className="relative overflow-hidden border-t border-night-line bg-night text-washi">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_80%_10%,var(--contact-glow),transparent_70%)]"
      />
      <span aria-hidden className="jp pointer-events-none absolute -right-10 -bottom-20 select-none text-[22rem] leading-none text-washi/[0.03]">
        絆
      </span>

      <div className={cx(CONTAINER, 'relative py-20 md:py-24')}>
        <Eyebrow tone="light">{eyebrow}</Eyebrow>

        <div className="mt-6 grid items-end gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <Reveal>
            <h2 className="serif text-[clamp(2.4rem,5.6vw,4.6rem)] leading-[0.99]">
              {title}
              <br />
              <span className="text-blush italic">{accent}</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="max-w-[30rem] text-[0.96rem] leading-[1.75] text-washi/70">{body}</p>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href={`mailto:${SITE.email}`}
                className="group inline-flex items-center gap-3 rounded-full bg-washi px-6 py-3.5 text-[0.92rem] font-medium text-night transition-colors duration-300 hover:bg-blush"
              >
                {SITE.email}
                <span aria-hidden className="transition-transform duration-500 ease-[var(--ease-soft)] group-hover:translate-x-1">
                  ↗
                </span>
              </a>
              <ArrowLink href={SITE.instagram.href} tone="light">
                {SITE.instagram.handle}
              </ArrowLink>
              <ArrowLink href={homeHref('#contact')} tone="light">
                All contact options
              </ArrowLink>
            </div>
          </Reveal>
        </div>
      </div>

      <footer className="relative border-t border-night-line">
        <div className={cx(CONTAINER, 'grid items-center gap-8 py-10 md:grid-cols-[1fr_auto_1fr]')}>
          <a href={homeHref()} className="flex items-center gap-4">
            <Seal className="size-11 text-[0.8rem]" />
            <div>
              <p className="text-sm font-medium">{SITE.name}</p>
              <p className="text-xs text-washi/45">{FOOTER.statement}</p>
            </div>
          </a>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-7 gap-y-2 md:justify-center">
            {FOOTER.columns[0].links.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-washi/60 transition-colors hover:text-washi">
                {link.label}
              </a>
            ))}
            <a href={homeHref('#contact')} className="text-sm text-washi/60 transition-colors hover:text-washi">
              Contact
            </a>
          </nav>

          <p className="text-xs text-washi/35 md:text-right">
            {FOOTER.legal}
            <span aria-hidden className="mx-2">
              ·
            </span>
            <span className="jp">絆</span>
          </p>
        </div>
      </footer>
    </section>
  )
}

/** Small kanji-labelled marker used to open a section on the inner pages. */
export function PageMark({ number, jp, label, tone = 'moss' }: { number: string; jp: string; label: string; tone?: 'moss' | 'light' }) {
  return (
    <div className={cx('flex items-center gap-4', tone === 'light' ? 'text-washi/70' : 'text-moss')}>
      <span className="caps tabular-nums opacity-70">{number}</span>
      <span aria-hidden className={cx('h-px flex-1', tone === 'light' ? 'bg-washi/20' : 'bg-line-strong')} />
      <span className="jp text-lg leading-none">{jp}</span>
      <span className="caps">{label}</span>
    </div>
  )
}

/** The bullet used across the service and workshop lists. */
export function Point({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-2.5 text-[0.88rem] leading-relaxed text-muted">
      <span aria-hidden className="mt-[0.5em] size-1 shrink-0 rounded-full bg-vermilion" />
      {children}
    </li>
  )
}

