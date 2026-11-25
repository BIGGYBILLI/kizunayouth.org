import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import { useRef, useState } from 'react'

import { ArrowLink, Eyebrow, Reveal, Seal, SectionMark, Stamp } from '../components/Chrome'
import { CONTAINER } from '../components/Page'
import { TeamGrid } from '../components/Team'
import { CONTACT, FOOTER, GUIDANCE, HERO, HERO_PANEL, MEANING, PILLARS, SITE, STORY, TEAM } from '../data'
import { useContent } from '../lib/content'
import { cx } from '../lib/cx'

/** Where the interlocking rings used to sit: the same idea, told in facts. */
function HeroPanel() {
  return (
    <Reveal delay={0.3} className="relative">
      <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface-raised">
        <span aria-hidden className="jp pointer-events-none absolute -top-12 -right-8 select-none text-[12rem] leading-none text-moss/[0.07]">
          絆
        </span>

        <div className="relative p-6 sm:p-8 lg:p-9">
          <Eyebrow>{HERO_PANEL.eyebrow}</Eyebrow>

          <p className="serif mt-5 max-w-[16ch] text-[clamp(1.55rem,2.4vw,2.15rem)] leading-[1.16]">
            {HERO_PANEL.title} <span className="text-moss italic">{HERO_PANEL.titleAccent}</span>
          </p>
          <p className="mt-3 text-[0.78rem] tracking-wide text-muted">{HERO_PANEL.jp}</p>

          <ul className="mt-7 border-t border-line">
            {HERO_PANEL.stats.map((stat) => (
              <li key={stat.label} className="flex gap-5 border-b border-line py-4">
                <span className="serif w-9 shrink-0 text-[2rem] leading-none text-moss">{stat.value}</span>
                <span>
                  <span className="caps block text-ink">{stat.label}</span>
                  <span className="mt-1.5 block text-[0.83rem] leading-relaxed text-muted">{stat.note}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <p className="caps text-vermilion">{HERO_PANEL.footnote.label}</p>
            <p className="mt-2 text-[0.83rem] leading-relaxed text-muted">{HERO_PANEL.footnote.body}</p>
            <ArrowLink href={HERO_PANEL.link.href} className="mt-4 text-[0.85rem]">
              {HERO_PANEL.link.label}
            </ArrowLink>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <span aria-hidden className="jp pointer-events-none absolute -right-16 top-20 hidden select-none text-[30rem] leading-none text-moss/[0.045] lg:block">
        絆
      </span>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] bg-[radial-gradient(60%_60%_at_75%_35%,var(--hero-glow),transparent_70%)]" />

      <div
        className={cx(
          CONTAINER,
          'relative grid min-h-[100svh] items-center gap-10 pt-28 pb-10 lg:grid-cols-[1.04fr_0.96fr] lg:gap-6 lg:pt-24',
        )}
      >
        <div className="relative z-10 max-w-[38rem]">
          <Reveal>
            <Eyebrow className="mb-7">{HERO.kicker}</Eyebrow>
          </Reveal>

          <h1 aria-label={`${HERO.titleBefore} ${HERO.titleAccent} ${HERO.titleAfter}`} className="serif text-[clamp(3rem,7vw,5.7rem)] leading-[0.94]">
            {[HERO.titleBefore, HERO.titleAccent, HERO.titleAfter].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  initial={{ y: '108%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.05, delay: 0.12 + i * 0.11, ease: [0.22, 1, 0.36, 1] }}
                  className={cx('block', i === 1 && 'italic text-moss')}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <Reveal delay={0.35}>
            <p className="mt-8 max-w-[33rem] text-[1.02rem] leading-[1.7] text-ink-soft">{HERO.lead}</p>
          </Reveal>

          <Reveal delay={0.45}>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
              <a
                href={HERO.primary.href}
                className="group inline-flex items-center gap-3 rounded-full bg-cta px-7 py-4 text-[0.95rem] font-medium text-washi transition-colors duration-300 hover:bg-cta-hover"
              >
                {HERO.primary.label}
                <span aria-hidden className="transition-transform duration-500 ease-[var(--ease-soft)] group-hover:translate-x-1">
                  →
                </span>
              </a>
              <ArrowLink href={HERO.secondary.href}>{HERO.secondary.label}</ArrowLink>
            </div>
          </Reveal>

          <Reveal delay={0.55}>
            <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6">
              {HERO.chips.map((chip) => (
                <li key={chip} className="flex items-center gap-2 text-[0.82rem] text-muted">
                  <span aria-hidden className="size-1.5 rounded-full bg-vermilion/70" />
                  {chip}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <HeroPanel />
      </div>
    </section>
  )
}

function Story() {
  const kanji = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: kanji, offset: ['start end', 'end start'] })
  const drift = useTransform(scrollYProgress, [0, 1], [46, -46])

  return (
    <>
      <section id="story" className="scroll-mt-24 border-t border-line bg-surface-raised">
        <div className={cx(CONTAINER, 'py-20 md:py-28')}>
          <SectionMark number="01" jp="物語" label="Why we exist" />

          <div className="mt-12 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div ref={kanji}>
              <motion.div style={{ y: drift }}>
                <div className="flex items-start gap-5 sm:gap-7">
                  <span aria-hidden className="jp block text-[clamp(8rem,17vw,14rem)] leading-[0.78] text-moss">
                    絆
                  </span>
                  <div className="pt-3 sm:pt-6">
                    <p className="caps text-vermilion">The word</p>
                    <p className="serif mt-2 text-[2.3rem] leading-none italic sm:text-[2.8rem]">kizuna</p>
                    <p className="mt-3 text-[0.82rem] tracking-wide text-muted">{MEANING.reading}</p>
                  </div>
                </div>
                <p className="mt-6 max-w-[24rem] text-sm leading-relaxed text-muted">{MEANING.gloss}</p>
              </motion.div>
            </div>

            <div>
              <Reveal>
                <h2 className="serif max-w-[18ch] text-[clamp(2rem,4vw,3.5rem)] leading-[1.04]">{MEANING.title}</h2>
              </Reveal>
              <div className="mt-7 space-y-5 text-[1rem] leading-[1.75] text-ink-soft">
                {MEANING.lines.map((line, i) => (
                  <Reveal key={line.slice(0, 18)} delay={0.08 * i}>
                    <p>{line}</p>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.16}>
                <blockquote className="mt-9 flex items-start gap-5 border-t border-line pt-7">
                  <Stamp className="mt-1" />
                  <div>
                    <p className="serif text-[clamp(1.4rem,2.3vw,1.95rem)] leading-[1.25]">“{MEANING.quote}”</p>
                    <p className="caps mt-4 text-muted">{MEANING.quoteAttribution}</p>
                  </div>
                </blockquote>
              </Reveal>
            </div>
          </div>

          <dl className="mt-16 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:mt-20 sm:grid-cols-3">
            {MEANING.facts.map((fact, i) => (
              <Reveal key={fact.key} delay={i * 0.07} className="bg-surface">
                <div className="h-full p-6 sm:p-8">
                  <dt className="serif text-[1.45rem] leading-tight">{fact.key}</dt>
                  <dd className="mt-2.5 text-sm leading-relaxed text-muted">{fact.body}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className={cx(CONTAINER, 'py-20 md:py-28')}>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Eyebrow>{STORY.eyebrow}</Eyebrow>
              <h2 className="serif mt-5 max-w-[20ch] text-[clamp(2.1rem,4.4vw,3.9rem)] leading-[1.03]">
                {STORY.titleBefore} <span className="text-moss italic">{STORY.titleAccent}</span>
              </h2>
            </div>
            <p className="max-w-[22rem] text-sm leading-relaxed text-muted md:text-right">
              Four notes on how a classroom project turned into something that crosses borders.
            </p>
          </div>

          <div className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-2">
            {STORY.blocks.map((block, i) => (
              <Reveal key={block.label} delay={(i % 2) * 0.08}>
                <article className="border-t border-line pt-6">
                  <p className="caps text-vermilion">{block.label}</p>
                  <p className="mt-4 text-[1.04rem] leading-[1.75] text-ink-soft">{block.body}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="relative mt-16 grid items-center gap-8 overflow-hidden rounded-[var(--radius-card)] bg-moss-deep p-7 text-washi sm:p-10 md:grid-cols-[auto_1fr] md:p-14">
              <span aria-hidden className="jp hidden text-[5rem] leading-none text-washi/15 md:block">
                絆
              </span>
              <div>
                <p className="serif text-[clamp(1.6rem,3.4vw,2.7rem)] leading-[1.18] italic">“{STORY.pullQuote}”</p>
                <p className="caps mt-5 text-washi/55">{STORY.pullQuoteBy}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

function Guidance() {
  return (
    <>
      <section id="guidance" className="scroll-mt-24 border-t border-line bg-surface-raised">
        <div className={cx(CONTAINER, 'py-20 md:py-28')}>
          <SectionMark number="02" jp="指針" label="How we guide" />

          <div className="mt-12 grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <h2 className="serif max-w-[16ch] text-[clamp(2.2rem,5vw,4.4rem)] leading-[1.02]">
                {GUIDANCE.titleBefore} <span className="text-moss italic">{GUIDANCE.titleAccent}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-[30rem] text-[0.98rem] leading-[1.75] text-muted lg:pb-2">{GUIDANCE.intro}</p>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-3">
            {PILLARS.map((pillar, i) => (
              <Reveal key={pillar.index} delay={i * 0.08}>
                <article className="group flex h-full flex-col border-t border-line-strong pt-6">
                  <div className="flex items-baseline justify-between">
                    <span className="caps text-muted">{pillar.index}</span>
                    <span className="jp text-xl text-moss">{pillar.jp}</span>
                  </div>
                  <h3 className="serif mt-6 text-[1.85rem] leading-[1.1]">{pillar.title}</h3>
                  <p className="mt-4 text-[0.93rem] leading-[1.7] text-ink-soft">{pillar.body}</p>
                  <ul className="mt-6 space-y-2 border-t border-line pt-4 text-[0.85rem] text-muted">
                    {pillar.points.map((point) => (
                      <li key={point} className="flex gap-2.5">
                        <span aria-hidden className="mt-[0.45em] size-1 shrink-0 rounded-full bg-vermilion" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-line bg-moss-deep text-washi">
        <span aria-hidden className="jp vertical absolute right-4 top-20 hidden text-3xl text-washi/15 lg:block">
          留学の道
        </span>
        <div className={cx(CONTAINER, 'py-20 md:py-28')}>
          <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Eyebrow tone="light">The process</Eyebrow>
              <h2 className="serif mt-5 max-w-[12ch] text-[clamp(2.2rem,4.6vw,3.9rem)] leading-[1.03]">Five steps, taken one at a time.</h2>
              <p className="mt-6 max-w-[26rem] text-sm leading-relaxed text-washi/65">
                Every step ends with something in writing — a plan, a shortlist, a reviewed document — so progress is never a feeling.
              </p>
              <ArrowLink href="#contact" tone="light" className="mt-8">
                Start with step one
              </ArrowLink>
            </div>

            <ol className="border-t border-night-line">
              {GUIDANCE.steps.map((step) => (
                <li key={step.index} className="border-b border-night-line">
                  <Reveal>
                    <div className="group grid grid-cols-[auto_1fr] gap-5 py-7 transition-colors duration-300 sm:gap-9 sm:py-8">
                      <div className="flex w-12 flex-col items-center gap-2 sm:w-16">
                        <span className="serif text-[1.9rem] leading-none text-blush sm:text-[2.3rem]">{step.index}</span>
                        <span className="jp text-[0.62rem] tracking-widest text-washi/40">{step.jp}</span>
                      </div>
                      <div>
                        <h3 className="serif text-[1.5rem] leading-tight sm:text-[1.75rem]">{step.title}</h3>
                        <p className="mt-2.5 max-w-[34rem] text-[0.92rem] leading-[1.7] text-washi/72">{step.body}</p>
                        <p className="caps mt-3 text-[0.58rem] text-washi/35">{step.detail}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  )
}

function Regions() {
  return (
    <section aria-label="Where we work" className="band-edge border-y bg-surface-sunk">
      <div className={cx(CONTAINER, 'flex flex-col gap-6 py-9 md:flex-row md:items-center md:justify-between md:gap-10')}>
        <p className="caps shrink-0 text-muted">Now connecting</p>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {SITE.regions.map((region, i) => (
            <li key={region} className="flex items-center gap-6">
              <span className="grotesk text-[clamp(1.5rem,2.8vw,2.3rem)]">{region}</span>
              {i < SITE.regions.length - 1 && (
                <span aria-hidden className="jp text-base text-vermilion/70">
                  絆
                </span>
              )}
            </li>
          ))}
        </ul>
        <p className="shrink-0 text-sm text-muted">…and more to come.</p>
      </div>
    </section>
  )
}

function TeamSection() {
  return (
    <section id="team" className="scroll-mt-24 bg-surface-raised">
      <div className={cx(CONTAINER, 'py-20 md:py-28')}>
        <SectionMark number="03" jp="仲間" label="The people" />

        <div className="mt-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <h2 className="serif text-[clamp(2.2rem,4.8vw,4.2rem)] leading-[1.02]">
              {TEAM.titleBefore} <span className="text-moss italic">{TEAM.titleAccent}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-[24rem] text-sm leading-relaxed text-muted md:text-right">{TEAM.intro}</p>
          </Reveal>
        </div>

        <TeamGrid />
      </div>
    </section>
  )
}

function Faq() {
  const { faq } = useContent()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="scroll-mt-24 border-t border-line bg-surface">
      <div className={cx(CONTAINER, 'py-20 md:py-28')}>
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionMark number="04" jp="質問" label="Questions" />
            <h2 className="serif mt-8 text-[clamp(2.2rem,4.4vw,3.7rem)] leading-[1.03]">Before you ask.</h2>
            <p className="mt-5 max-w-[24rem] text-sm leading-relaxed text-muted">
              The things students, parents and teachers ask us most. If your question is not here, ask it directly — we answer every message.
            </p>
            <ArrowLink href={`mailto:${SITE.email}`} tone="moss" className="mt-7">
              Ask us anything
            </ArrowLink>
          </div>

          <div className="border-t border-line-strong">
            {faq.map((item, i) => {
              const expanded = open === i
              return (
                <div key={item.id} className="border-b border-line">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(expanded ? null : i)}
                      aria-expanded={expanded}
                      aria-controls={`faq-panel-${i}`}
                      className="flex w-full items-start justify-between gap-6 py-6 text-left"
                    >
                      <span className="serif text-[1.22rem] leading-[1.35] sm:text-[1.35rem]">{item.q}</span>
                      <span
                        aria-hidden
                        className={cx(
                          'mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border text-lg leading-none transition-[transform,color,border-color] duration-400',
                          expanded ? 'rotate-45 border-vermilion text-vermilion' : 'border-line-strong text-muted',
                        )}
                      >
                        +
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {expanded && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        role="region"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[42rem] pr-8 pb-7 text-[0.94rem] leading-[1.75] text-muted">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const { contacts } = useContent()

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden border-t border-night-line bg-night text-washi">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_80%_10%,var(--contact-glow),transparent_70%)]"
      />
      <span aria-hidden className="jp pointer-events-none absolute -right-10 -bottom-16 select-none text-[24rem] leading-none text-washi/[0.03]">
        絆
      </span>

      <div className={cx(CONTAINER, 'relative pt-20 md:pt-28')}>
        <SectionMark number="05" jp="連絡" label="Say hello" tone="light" />

        <div className="mt-12 grid items-end gap-12 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-24">
          <Reveal>
            <h2 className="serif text-[clamp(2.5rem,6.6vw,5.4rem)] leading-[0.98]">
              Let’s start with
              <br />
              <span className="text-blush italic">one conversation.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="max-w-[30rem] text-[0.96rem] leading-[1.75] text-washi/70">{CONTACT.body}</p>

            <div className="mt-9">
              {contacts.map((item, index) => {
                const external = !item.href.startsWith('mailto:') && !item.href.startsWith('tel:')
                return (
                  <a
                    key={item.id}
                    href={item.href || '#contact'}
                    {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    className={cx(
                      'group flex items-center justify-between gap-6 border-b border-night-line py-5 transition-colors hover:border-washi/40',
                      index === 0 && 'border-t',
                    )}
                  >
                    <span>
                      <span className="caps block text-[0.6rem] text-washi/45">{item.label}</span>
                      <span className="serif mt-1.5 block text-[clamp(1.1rem,2.4vw,1.75rem)] transition-colors group-hover:text-blush">
                        {item.value}
                      </span>
                    </span>
                    <span aria-hidden className="text-xl text-washi/60 transition-transform duration-500 ease-[var(--ease-soft)] group-hover:translate-x-1 group-hover:text-blush">
                      ↗
                    </span>
                  </a>
                )
              })}
            </div>

            <p className="mt-5 max-w-[30rem] text-xs leading-relaxed text-washi/55">{CONTACT.note}</p>
          </Reveal>
        </div>
      </div>

      <footer className="relative border-t border-night-line">
        <div className={cx(CONTAINER, 'grid items-center gap-8 py-10 md:grid-cols-[1fr_auto_1fr]')}>
          <div className="flex items-center gap-4">
            <Seal className="size-11 text-[0.8rem]" />
            <div>
              <p className="text-sm font-medium">{SITE.name}</p>
              <p className="text-xs text-washi/45">{FOOTER.statement}</p>
            </div>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-7 gap-y-2 md:justify-center">
            {FOOTER.columns[0].links.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-washi/60 transition-colors hover:text-washi">
                {link.label}
              </a>
            ))}
            <a href="#contact" className="text-sm text-washi/60 transition-colors hover:text-washi">
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

export function Home() {
  return (
    <>
      <Hero />
      <Story />
      <Guidance />
      <Regions />
      <TeamSection />
      <Faq />
      <Contact />
    </>
  )
}
