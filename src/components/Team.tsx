import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { useContent } from '../lib/content'
import type { Person } from '../lib/contentTypes'
import { Eyebrow, Reveal, Stamp } from './Chrome'

function TiltCard({ member, onOpen }: { member: Person; onOpen: () => void }) {
  const frame = useRef<HTMLDivElement | null>(null)

  const move = (event: React.PointerEvent<HTMLButtonElement>) => {
    const node = frame.current
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = node.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    node.style.transform = `perspective(1000px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg)`
  }

  const reset = () => {
    const node = frame.current
    if (!node) return
    node.style.transform = ''
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      onPointerMove={move}
      onPointerLeave={reset}
      aria-haspopup="dialog"
      className="group block w-full text-left outline-offset-8"
    >
      <div>
        <div
          ref={frame}
          className="arch relative aspect-[3/4] w-full bg-moss-deep transition-transform duration-500 ease-[var(--ease-soft)] group-hover:-translate-y-1"
        >
          {member.photo ? (
            <img
              src={member.photo}
              alt={member.photoAlt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 size-full object-cover transition-transform duration-[900ms] ease-[var(--ease-soft)] group-hover:scale-[1.04]"
            />
          ) : (
            <span aria-hidden className="jp absolute inset-0 grid place-items-center text-5xl text-washi/40">
              絆
            </span>
          )}
          <span aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,rgba(19,24,17,0.72),rgba(19,24,17,0.05)_45%,transparent)]" />
          {member.jp && (
            <span aria-hidden className="jp absolute left-4 top-4 grid size-10 place-items-center rounded-full bg-washi/15 text-sm text-washi backdrop-blur-sm">
              {member.jp}
            </span>
          )}
          <span
            aria-hidden
            className="absolute right-4 bottom-4 grid size-11 place-items-center rounded-full bg-washi text-night opacity-0 transition-all duration-500 ease-[var(--ease-soft)] group-hover:translate-y-0 group-hover:opacity-100 translate-y-1"
          >
            ↗
          </span>
          <span className="absolute inset-x-4 bottom-5 max-w-[80%]">
            <span className="caps block text-washi/70">{member.role}</span>
          </span>
        </div>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="serif text-[1.65rem] leading-tight">
            {member.name}
            {member.nickname && <span className="ml-1.5 text-[0.8em] text-muted">{member.nickname}</span>}
          </h3>
          <p className="mt-1 text-sm text-moss">{member.role}</p>
        </div>
        <span className="caps mt-2 shrink-0 text-muted transition-colors group-hover:text-vermilion">Read profile</span>
      </div>
      <p className="mt-3 line-clamp-2 max-w-[34ch] text-sm leading-relaxed text-muted">{member.summary}</p>
    </button>
  )
}

function ProfileDialog({ member, onClose }: { member: Person; onClose: () => void }) {
  const panel = useRef<HTMLDivElement | null>(null)
  const closeButton = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    document.body.classList.add('no-scroll')
    const previous = document.activeElement as HTMLElement | null
    closeButton.current?.focus()

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
      if (event.key === 'Tab' && panel.current) {
        const focusable = panel.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        )
        if (!focusable.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('no-scroll')
      window.removeEventListener('keydown', onKey)
      previous?.focus()
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[80] overflow-y-auto bg-night/70 p-3 backdrop-blur-sm sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <motion.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`profile-${member.id}`}
        initial={{ opacity: 0, y: 28, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.99 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
        className="relative mx-auto my-2 grid w-full max-w-[1000px] overflow-hidden rounded-[var(--radius-card)] bg-surface-raised shadow-[0_40px_120px_-40px_rgba(19,24,17,0.6)] sm:my-6 md:grid-cols-[0.78fr_1.22fr]"
      >
        <div className="relative min-h-[260px] bg-moss-deep md:min-h-full">
          {member.photo && (
            <img src={member.photo} alt={member.photoAlt} className="absolute inset-0 size-full object-cover" />
          )}
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,rgba(19,24,17,0.85),transparent_60%)]" />
          <div className="absolute inset-x-6 bottom-6 text-washi">
            <p className="jp text-3xl leading-none opacity-80">{member.jp}</p>
            <p className="caps mt-3 text-washi/70">{member.role}</p>
          </div>
        </div>

        <div className="relative max-h-[82svh] overflow-y-auto px-6 py-9 sm:px-10 sm:py-11">
          <button
            ref={closeButton}
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 grid size-10 place-items-center rounded-full border border-line-strong bg-surface-raised/80 text-ink transition-colors hover:border-vermilion hover:text-vermilion"
          >
            <span className="sr-only">Close profile</span>
            <span aria-hidden className="text-lg leading-none">
              ×
            </span>
          </button>

          <Eyebrow className="pr-14">Profile · {member.jp}</Eyebrow>
          <h2 id={`profile-${member.id}`} className="serif mt-4 text-[clamp(2rem,3.6vw,3rem)] leading-[1.02]">
            {member.name}
            {member.nickname && <span className="block text-[0.55em] text-muted">{member.nickname}</span>}
          </h2>
          <p className="mt-3 text-[0.95rem] text-moss">{member.role}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {member.tags.map((tag) => (
              <li key={tag} className="rounded-full border border-line-strong px-3 py-1 text-[0.78rem] text-ink-soft">
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-7 space-y-4 border-t border-line pt-6 text-[0.98rem] leading-relaxed text-ink-soft">
            {member.bio.length > 0 ? (
              member.bio.map((paragraph) => <p key={paragraph.slice(0, 24)}>{paragraph}</p>)
            ) : (
              <>
                <p>{member.summary}</p>
                <div className="flex items-start gap-4 rounded-[var(--radius-frame)] border border-line bg-surface p-4">
                  <Stamp className="size-9 text-[0.6rem]" />
                  <p className="text-sm text-muted">
                    A fuller profile for {member.name.split(' ')[0]} is being written and will appear here soon.
                  </p>
                </div>
              </>
            )}
          </div>

          {member.quote && (
            <blockquote className="mt-8 border-l-2 border-vermilion pl-5">
              <p className="serif text-[1.35rem] leading-snug text-ink">“{member.quote}”</p>
            </blockquote>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export function TeamGrid() {
  const { members } = useContent()
  const [openId, setOpenId] = useState<string | null>(null)
  const open = members.find((member) => member.id === openId) ?? null
  const close = useCallback(() => setOpenId(null), [])

  return (
    <>
      <ul className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member, index) => (
          <li key={member.id}>
            <Reveal delay={index * 0.08}>
              <TiltCard member={member} onOpen={() => setOpenId(member.id)} />
            </Reveal>
          </li>
        ))}
      </ul>

      <AnimatePresence>{open && <ProfileDialog key={open.id} member={open} onClose={close} />}</AnimatePresence>
    </>
  )
}
