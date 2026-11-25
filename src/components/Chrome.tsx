import { motion } from 'motion/react'
import type { ReactNode } from 'react'

import { cx } from '../lib/cx'

/** Fades and lifts its children the first time they reach the viewport. */
export function Reveal({ children, delay = 0, y = 26, className }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -70px 0px' }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** The round moss seal with 絆 inside, used as the brand mark. */
export function Seal({ className, kanji = '絆' }: { className?: string; kanji?: string }) {
  return (
    <span
      aria-hidden
      className={cx(
        'relative grid shrink-0 place-items-center rounded-full bg-seal text-washi',
        'shadow-[inset_0_0_0_1px_rgba(251,247,238,0.35),inset_0_0_0_6px_var(--color-seal),inset_0_0_0_7px_rgba(251,247,238,0.28)]',
        className,
      )}
    >
      <span className="jp text-[1.4em] leading-none">{kanji}</span>
    </span>
  )
}

/** The vermilion hanko stamp. */
export function Stamp({ className, kanji = '絆' }: { className?: string; kanji?: string }) {
  return (
    <span
      aria-hidden
      className={cx(
        'relative grid size-12 shrink-0 place-items-center bg-stamp text-washi',
        'shadow-[inset_0_0_0_3px_var(--color-stamp),inset_0_0_0_4px_rgba(251,247,238,0.55)]',
        className,
      )}
    >
      <span className="jp text-[1.15rem] leading-none">{kanji}</span>
    </span>
  )
}

export function Eyebrow({ children, tone = 'moss', className }: { children: ReactNode; tone?: 'moss' | 'light' | 'vermilion'; className?: string }) {
  return (
    <p className={cx('caps flex items-center gap-3', tone === 'moss' && 'text-moss', tone === 'light' && 'text-washi/70', tone === 'vermilion' && 'text-vermilion', className)}>
      <span aria-hidden className={cx('h-px w-8', tone === 'light' ? 'bg-washi/40' : 'bg-current opacity-50')} />
      {children}
    </p>
  )
}

/** Arrow link with a hairline that draws in on hover. */
export function ArrowLink({
  href,
  children,
  tone = 'ink',
  className,
  onClick,
}: {
  href: string
  children: ReactNode
  tone?: 'ink' | 'light' | 'moss'
  className?: string
  onClick?: () => void
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cx(
        'group inline-flex items-center gap-2 pb-1 text-[0.95rem] font-medium tracking-[-0.01em]',
        'bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat',
        'transition-[background-size,color] duration-500 ease-[var(--ease-soft)] hover:bg-[length:100%_1px]',
        tone === 'ink' && 'text-ink hover:text-moss',
        tone === 'light' && 'text-washi hover:text-blush',
        tone === 'moss' && 'text-moss hover:text-ink',
        className,
      )}
    >
      {children}
      <span aria-hidden className="transition-transform duration-500 ease-[var(--ease-soft)] group-hover:translate-x-1">
        ↗
      </span>
    </a>
  )
}

/** Small kanji + label caption used beside rules and section numbers. */
export function SectionMark({ number, jp, label, tone = 'moss' }: { number: string; jp: string; label: string; tone?: 'moss' | 'light' }) {
  return (
    <div className={cx('flex items-center gap-4', tone === 'light' ? 'text-washi/70' : 'text-moss')}>
      <span className="caps tabular-nums opacity-70">{number}</span>
      <span aria-hidden className={cx('h-px flex-1', tone === 'light' ? 'bg-washi/20' : 'bg-line-strong')} />
      <span className="jp text-lg leading-none">{jp}</span>
      <span className="caps">{label}</span>
    </div>
  )
}
