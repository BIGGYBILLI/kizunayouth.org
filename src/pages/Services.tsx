import { ArrowLink, Eyebrow, Reveal } from '../components/Chrome'
import { CONTAINER, PageCta, PageMark, Point } from '../components/Page'
import { SERVICES_PAGE, SITE } from '../data'
import { cx } from '../lib/cx'

function Header() {
  return (
    <section className="relative overflow-hidden">
      <span aria-hidden className="jp pointer-events-none absolute -right-14 top-24 hidden select-none text-[26rem] leading-none text-moss/[0.045] lg:block">
        奉仕
      </span>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] bg-[radial-gradient(60%_60%_at_75%_35%,var(--hero-glow),transparent_70%)]" />

      <div className={cx(CONTAINER, 'relative pt-32 pb-14 md:pt-40 md:pb-20')}>
        <Reveal>
          <Eyebrow>{SERVICES_PAGE.eyebrow}</Eyebrow>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="serif mt-6 max-w-[22ch] text-[clamp(2.6rem,6.2vw,4.9rem)] leading-[0.98]">
            {SERVICES_PAGE.titleBefore} <span className="text-moss italic">{SERVICES_PAGE.titleAccent}</span>
          </h1>
        </Reveal>

        <div className="mt-9 grid gap-9 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <Reveal delay={0.1}>
            <p className="max-w-[37rem] text-[1.02rem] leading-[1.75] text-ink-soft">{SERVICES_PAGE.lead}</p>
          </Reveal>

          <Reveal delay={0.16} className="lg:justify-self-end">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-5 lg:justify-end">
              {SERVICES_PAGE.chips.map((chip) => (
                <li key={chip} className="flex items-center gap-2 text-[0.82rem] text-muted">
                  <span aria-hidden className="size-1.5 rounded-full bg-vermilion/70" />
                  {chip}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-6 lg:justify-end">
              <a
                href={SERVICES_PAGE.cta.href}
                className="group inline-flex items-center gap-3 rounded-full bg-cta px-6 py-3.5 text-[0.92rem] font-medium text-washi transition-colors duration-300 hover:bg-cta-hover"
              >
                {SERVICES_PAGE.cta.label}
                <span aria-hidden className="transition-transform duration-500 ease-[var(--ease-soft)] group-hover:translate-x-1">
                  →
                </span>
              </a>
              <ArrowLink href={SITE.instagram.href}>{SITE.instagram.handle}</ArrowLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Why() {
  return (
    <section className="border-t border-line bg-surface-raised">
      <div className={cx(CONTAINER, 'py-16 md:py-24')}>
        <PageMark number="01" jp="信頼" label="Why Kizuna" />

        <div className="mt-10 grid items-end gap-8 lg:grid-cols-[1fr_auto] lg:gap-16">
          <Reveal>
            <h2 className="serif max-w-[18ch] text-[clamp(2rem,4vw,3.3rem)] leading-[1.03]">
              {SERVICES_PAGE.why.titleBefore} <span className="text-moss italic">{SERVICES_PAGE.why.titleAccent}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-[22rem] text-sm leading-relaxed text-muted lg:text-right">{SERVICES_PAGE.note}</p>
          </Reveal>
        </div>

        <dl className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-3">
          {SERVICES_PAGE.why.items.map((item, i) => (
            <Reveal key={item.key} delay={i * 0.07} className="bg-surface">
              <div className="h-full p-6 sm:p-8">
                <dt className="serif text-[1.35rem] leading-tight">{item.key}</dt>
                <dd className="mt-2.5 text-sm leading-relaxed text-muted">{item.body}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}

function Glance() {
  return (
    <section className="border-t border-line bg-surface">
      <div className={cx(CONTAINER, 'py-16 md:py-24')}>
        <Reveal>
          <Eyebrow>{SERVICES_PAGE.glance.eyebrow}</Eyebrow>
          <h2 className="serif mt-5 max-w-[20ch] text-[clamp(2rem,4vw,3.1rem)] leading-[1.04]">{SERVICES_PAGE.glance.title}</h2>
          <p className="mt-4 max-w-[32rem] text-sm leading-relaxed text-muted">{SERVICES_PAGE.glance.intro}</p>
        </Reveal>

        <ul className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES_PAGE.services.map((service, i) => (
            <li key={service.index} className="bg-surface">
              <Reveal delay={(i % 4) * 0.05}>
                <div className="flex h-full flex-col p-6">
                  <span className="caps text-muted">{service.index}</span>
                  <h3 className="serif mt-5 text-[1.3rem] leading-[1.15]">{service.title}</h3>
                  <p className="caps mt-4 text-[0.56rem] text-moss">{service.bestFor.replace(/^Best for /, '')}</p>
                </div>
              </Reveal>
            </li>
          ))}
          <li className="bg-surface">
            <div className="flex h-full flex-col p-6">
              <span className="caps text-vermilion">Unsure</span>
              <p className="mt-5 text-[0.85rem] leading-relaxed text-muted">{SERVICES_PAGE.note}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  )
}

function Detail() {
  return (
    <section className="border-t border-line bg-surface-raised">
      <div className={cx(CONTAINER, 'py-16 md:py-24')}>
        <PageMark number="02" jp="内容" label="Services in detail" />

        <ol className="mt-10 border-t border-line-strong">
          {SERVICES_PAGE.services.map((service) => (
            <li key={service.index} className="border-b border-line">
              <Reveal>
                <article className="grid gap-6 py-9 md:grid-cols-[0.9fr_1.1fr] md:gap-12 md:py-11">
                  <div>
                    <div className="flex items-baseline gap-4">
                      <span className="serif text-[1.5rem] leading-none text-vermilion">{service.index}</span>
                      <span aria-hidden className="jp text-base text-moss">
                        {service.jp}
                      </span>
                    </div>
                    <h3 className="serif mt-4 text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.1]">{service.title}</h3>
                    <p className="caps mt-4 text-[0.56rem] text-muted">{service.bestFor}</p>
                  </div>

                  <div>
                    <p className="text-[0.98rem] leading-[1.75] text-ink-soft">{service.body}</p>
                    <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                      {service.points.map((point) => (
                        <Point key={point}>{point}</Point>
                      ))}
                    </ul>
                    {service.note && <p className="mt-5 max-w-[34rem] text-xs leading-relaxed text-muted">{service.note}</p>}
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Refund() {
  return (
    <section className="relative overflow-hidden border-t border-night-line bg-moss-deep text-washi">
      <span aria-hidden className="jp vertical pointer-events-none absolute right-5 top-24 hidden text-3xl text-washi/15 lg:block">
        返金の約束
      </span>

      <div className={cx(CONTAINER, 'relative py-16 md:py-24')}>
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div>
            <Eyebrow tone="light">{SERVICES_PAGE.refund.eyebrow}</Eyebrow>
            <p className="serif mt-7 text-[clamp(4rem,10vw,6.5rem)] leading-[0.8] text-blush">100%</p>
            <h2 className="serif mt-7 max-w-[20ch] text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.12]">
              {SERVICES_PAGE.refund.title}
            </h2>
          </div>

          <div className="lg:pt-14">
            <p className="caps text-washi/55">{SERVICES_PAGE.refund.lead}</p>
            <ul className="mt-5 border-t border-night-line">
              {SERVICES_PAGE.refund.conditions.map((condition, i) => (
                <li key={condition} className="flex items-baseline gap-5 border-b border-night-line py-4">
                  <span className="caps tabular-nums text-blush/80">0{i + 1}</span>
                  <span className="text-[0.95rem] leading-relaxed text-washi/85">{condition}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-[30rem] text-sm leading-relaxed text-washi/55">{SERVICES_PAGE.refund.note}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Start() {
  return (
    <section className="border-t border-line bg-surface">
      <div className={cx(CONTAINER, 'py-16 md:py-24')}>
        <PageMark number="03" jp="始め方" label="How to get started" />

        <Reveal>
          <h2 className="serif mt-10 max-w-[18ch] text-[clamp(2rem,4vw,3.1rem)] leading-[1.04]">{SERVICES_PAGE.start.title}</h2>
        </Reveal>

        <ol className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES_PAGE.start.steps.map((step, i) => (
            <li key={step.index}>
              <Reveal delay={i * 0.06}>
                <div className="border-t border-line-strong pt-5">
                  <span className="serif text-[1.5rem] leading-none text-vermilion">{step.index}</span>
                  <h3 className="serif mt-4 text-[1.25rem] leading-tight">{step.title}</h3>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-muted">{step.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Know() {
  return (
    <section className="border-t border-line bg-surface-raised">
      <div className={cx(CONTAINER, 'py-16 md:py-24')}>
        <PageMark number="04" jp="詳細" label="Good to know" />

        <dl className="mt-10 grid gap-x-14 gap-y-8 md:grid-cols-2">
          {SERVICES_PAGE.know.items.map((item, i) => (
            <Reveal key={item.q} delay={(i % 2) * 0.06}>
              <div className="border-t border-line pt-5">
                <dt className="serif text-[1.25rem] leading-tight">{item.q}</dt>
                <dd className="mt-2.5 text-[0.92rem] leading-[1.7] text-muted">{item.a}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}

export function ServicesPage() {
  return (
    <>
      <Header />
      <Why />
      <Glance />
      <Detail />
      <Refund />
      <Start />
      <Know />
      <PageCta
        eyebrow="Student services"
        title="Ready to begin your"
        accent="path to Japan?"
        body="Write to us with the service you are interested in, where you are based and what you hope to do. We will reply with how it works, the timings and the pricing."
      />
    </>
  )
}
