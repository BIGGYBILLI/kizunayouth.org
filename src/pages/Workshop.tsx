import { useState, type FormEvent } from 'react'

import { ArrowLink, Eyebrow, Reveal, Seal } from '../components/Chrome'
import { CONTAINER, PageCta, PageMark, Point } from '../components/Page'
import { SITE, WORKSHOP_PAGE } from '../data'
import { cx } from '../lib/cx'

const { eyebrow, titleBefore, titleAccent, lead, cta, facts, letter, promise, gains, modules, formats, bring, ask, safety, work, process, form: FORM } = WORKSHOP_PAGE

function Header() {
  return (
    <section className="relative overflow-hidden">
      <span aria-hidden className="jp pointer-events-none absolute -right-14 top-24 hidden select-none text-[26rem] leading-none text-moss/[0.045] lg:block">
        学校
      </span>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] bg-[radial-gradient(60%_60%_at_75%_35%,var(--hero-glow),transparent_70%)]" />

      <div className={cx(CONTAINER, 'relative pt-32 pb-14 md:pt-40 md:pb-20')}>
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="serif mt-6 max-w-[20ch] text-[clamp(2.6rem,6.2vw,4.9rem)] leading-[0.98]">
            {titleBefore} <span className="text-moss italic">{titleAccent}</span>
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-7 max-w-[38rem] text-[1.02rem] leading-[1.75] text-ink-soft">{lead}</p>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href={cta.href}
              className="group inline-flex items-center gap-3 rounded-full bg-cta px-6 py-3.5 text-[0.92rem] font-medium text-washi transition-colors duration-300 hover:bg-cta-hover"
            >
              {cta.label}
              <span aria-hidden className="transition-transform duration-500 ease-[var(--ease-soft)] group-hover:translate-x-1">
                →
              </span>
            </a>
            <ArrowLink href={SITE.instagram.href}>{SITE.instagram.handle}</ArrowLink>
          </div>
        </Reveal>

        <dl className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact, i) => (
            <Reveal key={fact.key} delay={i * 0.05} className="bg-surface-raised">
              <div className="h-full p-6">
                <dt className="serif text-[1.35rem] leading-tight">{fact.key}</dt>
                <dd className="mt-2 text-[0.85rem] leading-relaxed text-muted">{fact.body}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}

function Letter() {
  return (
    <section className="border-t border-line bg-surface">
      <div className={cx(CONTAINER, 'py-16 md:py-24')}>
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <PageMark number="01" jp="ご挨拶" label="For principals and teachers" />

            <Reveal>
              <h2 className="serif mt-9 max-w-[18ch] text-[clamp(2rem,4vw,3.2rem)] leading-[1.04]">{letter.title}</h2>
            </Reveal>

            <div className="mt-7 space-y-4 text-[1rem] leading-[1.78] text-ink-soft">
              {letter.paragraphs.map((paragraph, i) => (
                <Reveal key={paragraph.slice(0, 20)} delay={0.05 * i}>
                  <p>{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap gap-x-12 gap-y-4 border-t border-line pt-6">
              {letter.signoff.map((person) => (
                <div key={person.name}>
                  <p className="serif text-[1.15rem] leading-tight">{person.name}</p>
                  <p className="caps mt-1.5 text-[0.56rem] text-muted">{person.role}</p>
                </div>
              ))}
            </div>
          </div>

          <Reveal delay={0.1} className="lg:pt-16">
            <div className="rounded-[var(--radius-card)] border border-line bg-surface-raised p-7 sm:p-8">
              <div className="flex items-center gap-3">
                <Seal className="size-9 text-[0.7rem]" />
                <p className="caps text-moss">Our promise</p>
              </div>
              <h3 className="serif mt-5 text-[1.5rem] leading-tight">{promise.title}</h3>
              <ul className="mt-5 space-y-3 border-t border-line pt-5">
                {promise.items.map((item) => (
                  <Point key={item}>{item}</Point>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Gains() {
  return (
    <section className="border-t border-line bg-surface-raised">
      <div className={cx(CONTAINER, 'py-16 md:py-24')}>
        <PageMark number="02" jp="学び" label="What students gain" />

        <div className="mt-10 grid items-end gap-8 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal>
            <h2 className="serif max-w-[16ch] text-[clamp(2rem,4vw,3.2rem)] leading-[1.04]">{gains.title}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-[34rem] text-[0.95rem] leading-[1.75] text-muted">{gains.intro}</p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {gains.items.map((item, i) => (
            <Reveal key={item.index} delay={i * 0.06}>
              <article className="border-t border-line-strong pt-5">
                <span className="serif text-[1.4rem] leading-none text-vermilion">{item.index}</span>
                <h3 className="serif mt-4 text-[1.3rem] leading-[1.15]">{item.title}</h3>
                <p className="mt-2.5 text-[0.9rem] leading-[1.7] text-muted">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Modules() {
  return (
    <section className="border-t border-line bg-surface">
      <div className={cx(CONTAINER, 'py-16 md:py-24')}>
        <PageMark number="03" jp="講座" label="The four modules" />

        <div className="mt-10 grid items-end gap-8 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal>
            <h2 className="serif max-w-[18ch] text-[clamp(2rem,4vw,3.2rem)] leading-[1.04]">{modules.title}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-[34rem] text-[0.95rem] leading-[1.75] text-muted">{modules.intro}</p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line md:grid-cols-2">
          {modules.items.map((module) => (
            <Reveal key={module.index} className="bg-surface-raised">
              <article className="h-full p-6 sm:p-8">
                <div className="flex items-baseline justify-between">
                  <span className="caps text-muted">{module.index}</span>
                  <span className="jp text-lg text-moss">{module.jp}</span>
                </div>
                <h3 className="serif mt-5 text-[1.5rem] leading-tight">{module.title}</h3>
                <p className="caps mt-4 text-[0.56rem] text-muted">{module.body}</p>
                <ul className="mt-3 space-y-2">
                  {module.points.map((point) => (
                    <Point key={point}>{point}</Point>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Logistics() {
  return (
    <section className="border-t border-line bg-surface-raised">
      <div className={cx(CONTAINER, 'py-16 md:py-24')}>
        <PageMark number="04" jp="形式" label="Formats and rehearsals" />

        <Reveal>
          <h2 className="serif mt-10 max-w-[22ch] text-[clamp(2rem,4vw,3.2rem)] leading-[1.04]">{formats.title}</h2>
        </Reveal>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className="border-y border-line-strong">
                <th scope="col" className="caps w-[30%] py-3 pr-6 text-muted">
                  Format
                </th>
                <th scope="col" className="caps w-[20%] py-3 pr-6 text-muted">
                  Length
                </th>
                <th scope="col" className="caps py-3 text-muted">
                  Best for
                </th>
              </tr>
            </thead>
            <tbody>
              {formats.rows.map((row) => (
                <tr key={row.format} className="border-b border-line align-top">
                  <td className="serif py-4 pr-6 text-[1.2rem] leading-tight">{row.format}</td>
                  <td className="py-4 pr-6 text-sm text-muted">{row.length}</td>
                  <td className="py-4 text-[0.92rem] leading-relaxed text-ink-soft">{row.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-muted">{formats.note}</p>

        <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
          <div>
            <h3 className="serif text-[1.4rem]">{bring.title}</h3>
            <ul className="mt-4 space-y-2 border-t border-line pt-4">
              {bring.items.map((item) => (
                <Point key={item}>{item}</Point>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="serif text-[1.4rem]">{ask.title}</h3>
            <ul className="mt-4 space-y-2 border-t border-line pt-4">
              {ask.items.map((item) => (
                <Point key={item}>{item}</Point>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 rounded-[var(--radius-card)] border border-line bg-surface p-6 sm:p-8">
          <h3 className="serif text-[1.4rem]">{safety.title}</h3>
          <ul className="mt-4 grid gap-3 border-t border-line pt-4 sm:grid-cols-3">
            {safety.items.map((item) => (
              <Point key={item}>{item}</Point>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Work() {
  return (
    <section id="work" className="scroll-mt-24 border-t border-line bg-surface">
      <div className={cx(CONTAINER, 'py-16 md:py-24')}>
        <PageMark number="05" jp="実績" label="Our work so far" />

        <div className="mt-10 grid items-end gap-8 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal>
            <h2 className="serif max-w-[16ch] text-[clamp(2rem,4vw,3.2rem)] leading-[1.04]">{work.title}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-[34rem] text-[0.95rem] leading-[1.75] text-muted">{work.intro}</p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line md:grid-cols-3">
          {work.workshops.map((workshop, i) => (
            <Reveal key={workshop.when} delay={i * 0.06} className="bg-surface-raised">
              <article className="flex h-full flex-col p-6 sm:p-7">
                <span className="caps text-vermilion">{workshop.when}</span>
                <h3 className="serif mt-4 text-[1.4rem] leading-tight">{workshop.title}</h3>
                <p className="mt-2 text-sm text-muted">{workshop.place}</p>
                <p className="mt-auto pt-5 text-xs leading-relaxed text-muted">{workshop.note}</p>
              </article>
            </Reveal>
          ))}

          <Reveal delay={0.12} className="bg-moss-deep text-washi">
            <article className="flex h-full flex-col p-6 sm:p-7">
              <span className="caps text-blush/80">Sakura Quest 2026</span>
              <h3 className="serif mt-4 text-[1.4rem] leading-tight">{work.sakura.title}</h3>
              <p className="mt-2 text-[0.87rem] leading-relaxed text-washi/65">{work.sakura.body}</p>
            </article>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <h3 className="serif text-[clamp(1.6rem,3vw,2.2rem)] leading-[1.1]">{work.reach.title}</h3>
            <p className="mt-4 max-w-[28rem] text-[0.95rem] leading-[1.75] text-muted">{work.reach.body}</p>
          </Reveal>

          <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {work.reach.people.map((person, i) => (
              <Reveal key={person.name} delay={(i % 2) * 0.06}>
                <div className="border-t border-line pt-4">
                  <dt className="serif text-[1.15rem] leading-tight">{person.name}</dt>
                  <dd className="caps mt-1.5 text-[0.54rem] text-vermilion">{person.role}</dd>
                  <dd className="mt-2 text-[0.85rem] leading-relaxed text-muted">{person.note}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section className="border-t border-line bg-surface-raised">
      <div className={cx(CONTAINER, 'py-16 md:py-24')}>
        <PageMark number="06" jp="流れ" label="Bring Kizuna to your school" />

        <Reveal>
          <h2 className="serif mt-10 max-w-[18ch] text-[clamp(2rem,4vw,3.2rem)] leading-[1.04]">{process.title}</h2>
        </Reveal>

        <ol className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((step, i) => (
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

type FormState = {
  school: string
  city: string
  contact: string
  role: string
  email: string
  phone: string
  classes: string
  format: string
  mode: string
  dates: string
  notes: string
}

const EMPTY_FORM: FormState = {
  school: '',
  city: '',
  contact: '',
  role: '',
  email: '',
  phone: '',
  classes: '',
  format: '',
  mode: '',
  dates: '',
  notes: '',
}

const FORMAT_OPTIONS = ['Taster (45 min)', 'One day', 'Two days']
const MODE_OPTIONS = ['In person', 'Online']

const inputClass =
  'mt-2 w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-[0.93rem] text-ink placeholder:text-muted/60 transition-colors focus:border-moss focus:outline-none'

function Field({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  type = 'text',
  autoComplete,
  wide,
  multiline,
  required,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  placeholder?: string
  type?: string
  autoComplete?: string
  wide?: boolean
  multiline?: boolean
  required?: boolean
}) {
  const errorId = `${id}-error`
  return (
    <div className={wide ? 'sm:col-span-2' : undefined}>
      <label htmlFor={id} className="caps block text-[0.58rem] text-muted">
        {label}
        {required && (
          <span aria-hidden className="ml-1 text-vermilion">
            *
          </span>
        )}
      </label>
      {multiline ? (
        <textarea
          id={id}
          rows={4}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={inputClass}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={inputClass}
        />
      )}
      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-vermilion">
          {error}
        </p>
      )}
    </div>
  )
}

function ChoiceGroup({
  id,
  legend,
  options,
  value,
  onChange,
  error,
}: {
  id: string
  legend: string
  options: string[]
  value: string
  onChange: (value: string) => void
  error?: string
}) {
  const errorId = `${id}-error`
  return (
    <fieldset id={id} tabIndex={-1} aria-describedby={error ? errorId : undefined} className="sm:col-span-2">
      <legend className="caps text-[0.58rem] text-muted">
        {legend}
        <span aria-hidden className="ml-1 text-vermilion">
          *
        </span>
      </legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => {
          const checked = value === option
          return (
            <label
              key={option}
              className={cx(
                'cursor-pointer rounded-full border px-4 py-2 text-[0.85rem] transition-colors',
                'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-vermilion',
                checked ? 'border-moss bg-moss-soft text-ink' : 'border-line text-muted hover:border-line-strong',
              )}
            >
              <input
                type="radio"
                name={id}
                value={option}
                checked={checked}
                onChange={() => onChange(option)}
                className="sr-only"
              />
              {option}
            </label>
          )
        })}
      </div>
      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-vermilion">
          {error}
        </p>
      )}
    </fieldset>
  )
}

function RequestForm() {
  const [values, setValues] = useState<FormState>(EMPTY_FORM)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [sent, setSent] = useState<string | null>(null)

  const set = (key: keyof FormState) => (value: string) => {
    setValues((previous) => ({ ...previous, [key]: value }))
    setErrors((previous) => (previous[key] ? { ...previous, [key]: undefined } : previous))
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const next: Partial<Record<keyof FormState, string>> = {}
    const email = values.email.trim()

    if (!values.school.trim()) next.school = 'Please add your school name.'
    if (!values.city.trim()) next.city = 'Please add the city or district.'
    if (!values.contact.trim()) next.contact = 'Please add a contact person.'
    if (!values.classes.trim()) next.classes = 'Tell us the classes and roughly how many students.'
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) next.email = 'That email address looks incomplete.'
    if (!email && !values.phone.trim()) next.email = 'Add an email or a phone number so we can reply.'
    if (!values.format) next.format = 'Choose a format.'
    if (!values.mode) next.mode = 'Choose in person or online.'

    setErrors(next)

    const firstProblem = Object.keys(next)[0]
    if (firstProblem) {
      document.getElementById(`workshop-${firstProblem}`)?.scrollIntoView({ block: 'center', behavior: 'smooth' })
      return
    }

    const body = [
      `School: ${values.school}`,
      `City and district: ${values.city}`,
      `Contact person: ${values.contact}${values.role ? ` (${values.role})` : ''}`,
      `Email: ${values.email || '—'}`,
      `Phone: ${values.phone || '—'}`,
      `Classes and students: ${values.classes}`,
      `Format: ${values.format}`,
      `Mode: ${values.mode}`,
      `Preferred dates: ${values.dates || 'flexible'}`,
      '',
      values.notes ? `Notes: ${values.notes}` : '',
      '',
      'Sent from the workshop request form on kizunayouth.co',
    ].join('\n')

    const href = `mailto:${SITE.email}?subject=${encodeURIComponent(`Workshop request — ${values.school}`)}&body=${encodeURIComponent(body)}`
    setSent(href)
    window.location.href = href
  }

  return (
    <section id="request" className="scroll-mt-24 border-t border-line bg-surface">
      <div className={cx(CONTAINER, 'py-16 md:py-24')}>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <PageMark number="07" jp="依頼" label="Workshop request" />
            <Reveal>
              <h2 className="serif mt-8 text-[clamp(2.2rem,4.4vw,3.4rem)] leading-[1.02]">{FORM.title}</h2>
            </Reveal>
            <p className="mt-5 max-w-[26rem] text-[0.95rem] leading-[1.75] text-muted">{FORM.intro}</p>
            <div className="mt-7 space-y-1 text-sm text-muted">
              <a href={`mailto:${SITE.email}`} className="block text-ink underline-offset-4 hover:underline">
                {SITE.email}
              </a>
              <a href={SITE.instagram.href} target="_blank" rel="noreferrer" className="block text-ink underline-offset-4 hover:underline">
                {SITE.instagram.handle}
              </a>
            </div>
          </div>

          <div className="rounded-[var(--radius-card)] border border-line bg-surface-raised p-6 sm:p-8">
            {sent && (
              <div role="status" className="mb-7 rounded-xl border border-moss bg-moss-soft p-4 text-[0.88rem] leading-relaxed text-ink">
                <p>{FORM.success}</p>
                <a href={sent} className="mt-2 inline-block font-medium underline underline-offset-4">
                  Open the request email again
                </a>
              </div>
            )}

            <form noValidate onSubmit={onSubmit} aria-label="Workshop request">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  id="workshop-school"
                  label="School name"
                  value={values.school}
                  onChange={set('school')}
                  error={errors.school}
                  placeholder="e.g. Government High School"
                  autoComplete="organization"
                  required
                  wide
                />
                <Field
                  id="workshop-city"
                  label="City and district"
                  value={values.city}
                  onChange={set('city')}
                  error={errors.city}
                  placeholder="e.g. Araria, Bihar"
                  autoComplete="address-level2"
                  required
                />
                <Field
                  id="workshop-contact"
                  label="Contact person"
                  value={values.contact}
                  onChange={set('contact')}
                  error={errors.contact}
                  placeholder="Full name"
                  autoComplete="name"
                  required
                />
                <Field
                  id="workshop-role"
                  label="Role"
                  value={values.role}
                  onChange={set('role')}
                  placeholder="Principal, teacher, coordinator…"
                  autoComplete="organization-title"
                />
                <Field
                  id="workshop-email"
                  label="Email"
                  type="email"
                  value={values.email}
                  onChange={set('email')}
                  error={errors.email}
                  placeholder="you@school.edu"
                  autoComplete="email"
                />
                <Field
                  id="workshop-phone"
                  label="Phone"
                  type="tel"
                  value={values.phone}
                  onChange={set('phone')}
                  placeholder="With country code"
                  autoComplete="tel"
                />
                <Field
                  id="workshop-classes"
                  label="Classes and approximate number of students"
                  value={values.classes}
                  onChange={set('classes')}
                  error={errors.classes}
                  placeholder="e.g. Class 9 and 10, about 120 students"
                  required
                  wide
                />
                <ChoiceGroup
                  id="workshop-format"
                  legend="Format"
                  options={FORMAT_OPTIONS}
                  value={values.format}
                  onChange={set('format')}
                  error={errors.format}
                />
                <ChoiceGroup
                  id="workshop-mode"
                  legend="Mode"
                  options={MODE_OPTIONS}
                  value={values.mode}
                  onChange={set('mode')}
                  error={errors.mode}
                />
                <Field
                  id="workshop-dates"
                  label="Preferred dates"
                  value={values.dates}
                  onChange={set('dates')}
                  placeholder="e.g. any week in February, or flexible"
                  wide
                />
                <Field
                  id="workshop-notes"
                  label="Anything we should know"
                  value={values.notes}
                  onChange={set('notes')}
                  placeholder="Timetable limits, languages spoken, rooms available…"
                  multiline
                  wide
                />
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6">
                <button
                  type="submit"
                  className="group inline-flex items-center gap-3 rounded-full bg-cta px-6 py-3.5 text-[0.92rem] font-medium text-washi transition-colors duration-300 hover:bg-cta-hover"
                >
                  {FORM.submit}
                  <span aria-hidden className="transition-transform duration-500 ease-[var(--ease-soft)] group-hover:translate-x-1">
                    →
                  </span>
                </button>
                <p className="max-w-[24rem] text-xs leading-relaxed text-muted">
                  Nothing is stored on this website. Sending opens your email app with the request written out, ready for you to send.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export function WorkshopPage() {
  return (
    <>
      <Header />
      <Letter />
      <Gains />
      <Modules />
      <Logistics />
      <Work />
      <Process />
      <RequestForm />
      <PageCta
        eyebrow="School workshops"
        title="Let’s start a"
        accent="conversation."
        body="Write to us with your school, the classes you teach and the dates you have in mind. A real person from the team will answer, and the workshop stays free for your school."
      />
    </>
  )
}
