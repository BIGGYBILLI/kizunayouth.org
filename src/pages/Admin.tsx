import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react'

import { ContactsEditor } from '../components/admin/ContactsEditor'
import { Button, TextInput } from '../components/admin/Fields'
import { FaqEditor } from '../components/admin/FaqEditor'
import { PeopleEditor } from '../components/admin/PeopleEditor'
import { defaultContent, normalizeContent, type SiteContent } from '../lib/contentTypes'

type Status = 'checking' | 'signed-out' | 'signed-in'
type Tab = 'people' | 'faq' | 'contacts'

const TABS: { id: Tab; label: string; jp: string }[] = [
  { id: 'people', label: 'The people', jp: '仲間' },
  { id: 'faq', label: 'FAQ', jp: '質問' },
  { id: 'contacts', label: 'Contacts', jp: '連絡' },
]

function SignIn({ onSignedIn }: { onSignedIn: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) {
        setError(data.error ?? 'Sign-in failed. Please try again.')
        return
      }
      onSignedIn()
    } catch {
      setError('We could not reach the server. Check your connection and try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto flex min-h-[70svh] w-full max-w-[420px] flex-col justify-center px-5">
      <form onSubmit={submit} className="rounded-[var(--radius-card)] border border-line bg-surface-raised p-6 sm:p-8">
        <p className="caps text-moss">Admin</p>
        <h1 className="serif mt-3 text-[2rem] leading-tight">Sign in to edit the site.</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Only the Kizuna administrator account can sign in here. Everything else on the site is public.
        </p>

        <div className="mt-7 space-y-4">
          <TextInput
            label="Email"
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextInput
            label="Password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        {error && (
          <p role="alert" className="mt-4 rounded-lg border border-vermilion/40 px-3 py-2 text-sm text-vermilion">
            {error}
          </p>
        )}

        <Button variant="primary" type="submit" className="mt-6 w-full" disabled={busy}>
          {busy ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>

      <a href="/" className="mt-6 text-center text-sm text-muted underline-offset-4 hover:text-moss hover:underline">
        ← Back to the site
      </a>
    </div>
  )
}

export function Admin() {
  const [status, setStatus] = useState<Status>('checking')
  const [draft, setDraft] = useState<SiteContent>(defaultContent)
  const [saved, setSaved] = useState<SiteContent>(defaultContent)
  const [tab, setTab] = useState<Tab>('people')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<{ tone: 'ok' | 'bad'; text: string } | null>(null)

  useEffect(() => {
    document.title = 'Admin · Kizuna Youth Project'
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    return () => {
      meta.remove()
    }
  }, [])

  const loadContent = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/content', { headers: { accept: 'application/json' } })
      if (!res.ok) {
        setStatus('signed-out')
        return
      }
      const data = (await res.json()) as { content?: unknown }
      const next = normalizeContent(data.content)
      setDraft(next)
      setSaved(next)
      setStatus('signed-in')
    } catch {
      setStatus('signed-out')
    }
  }, [])

  useEffect(() => {
    let alive = true
    fetch('/api/admin/session', { headers: { accept: 'application/json' } })
      .then((res) => {
        if (!alive) return
        if (res.ok) loadContent()
        else setStatus('signed-out')
      })
      .catch(() => {
        if (alive) setStatus('signed-out')
      })
    return () => {
      alive = false
    }
  }, [loadContent])

  const dirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(saved), [draft, saved])

  useEffect(() => {
    if (!dirty) return
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [dirty])

  async function save() {
    setBusy(true)
    setMessage(null)
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ content: draft }),
      })
      const data = (await res.json().catch(() => ({}))) as { content?: unknown; error?: string }
      if (!res.ok) {
        setMessage({ tone: 'bad', text: data.error ?? 'Could not save. Please try again.' })
        return
      }
      const next = normalizeContent(data.content ?? draft)
      setDraft(next)
      setSaved(next)
      setMessage({ tone: 'ok', text: 'Saved. The public page shows these changes now.' })
    } catch {
      setMessage({ tone: 'bad', text: 'We could not reach the server. Check your connection and try again.' })
    } finally {
      setBusy(false)
    }
  }

  async function signOut() {
    await fetch('/api/admin/logout', { method: 'POST' }).catch(() => undefined)
    setStatus('signed-out')
    setDraft(defaultContent())
    setSaved(defaultContent())
  }

  if (status !== 'signed-in') {
    return (
      <div className="min-h-screen bg-surface text-ink">
        {status === 'checking' ? (
          <p className="grid min-h-screen place-items-center text-sm text-muted">Checking your session…</p>
        ) : (
          <SignIn onSignedIn={loadContent} />
        )}
      </div>
    )
  }

  const counts: Record<Tab, number> = {
    people: draft.members.length,
    faq: draft.faq.length,
    contacts: draft.contacts.length,
  }

  return (
    <div className="min-h-screen bg-surface text-ink">
      <header className="sticky top-0 z-40 border-b border-line bg-surface/92 backdrop-blur-md">
        <div className="mx-auto flex h-[68px] w-full max-w-[1100px] items-center justify-between gap-4 px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <span aria-hidden className="jp grid size-9 place-items-center rounded-full bg-seal text-sm text-washi">
              絆
            </span>
            <div className="leading-tight">
              <p className="text-sm font-medium">Kizuna admin</p>
              <p className="caps text-[0.52rem] text-muted">Edit the public site</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="/"
              className="hidden rounded-full border border-line-strong px-4 py-2 text-[0.82rem] hover:border-moss hover:text-moss sm:inline-flex"
            >
              View site ↗
            </a>
            <Button onClick={signOut}>Sign out</Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1100px] px-5 pb-4 pt-9 sm:px-8">
        <h1 className="serif text-[clamp(1.9rem,3.4vw,2.5rem)] leading-tight">Make the changes you need.</h1>
        <p className="mt-2 max-w-[46rem] text-sm leading-relaxed text-muted">
          Edit the people, their titles and quotes, the questions and the contact links. Press save when you are done and
          the public page updates straight away.
        </p>

        <nav aria-label="Admin sections" className="mt-7 flex flex-wrap gap-2 border-b border-line pb-0">
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              aria-current={tab === item.id ? 'page' : undefined}
              className={
                tab === item.id
                  ? 'relative -mb-px flex items-baseline gap-2 border-b-2 border-moss px-3 py-3 text-sm font-medium text-ink'
                  : 'relative -mb-px flex items-baseline gap-2 border-b-2 border-transparent px-3 py-3 text-sm text-muted hover:text-ink'
              }
            >
              {item.label}
              <span className="jp text-xs opacity-70">{item.jp}</span>
              <span className="rounded-full bg-surface-sunk px-1.5 text-[0.65rem] tabular-nums text-muted">{counts[item.id]}</span>
            </button>
          ))}
        </nav>

        <div className="mt-6">
          {tab === 'people' && (
            <PeopleEditor people={draft.members} onChange={(members) => setDraft({ ...draft, members })} />
          )}
          {tab === 'faq' && <FaqEditor items={draft.faq} onChange={(faq) => setDraft({ ...draft, faq })} />}
          {tab === 'contacts' && (
            <ContactsEditor items={draft.contacts} onChange={(contacts) => setDraft({ ...draft, contacts })} />
          )}
        </div>

        {message && (
          <p
            role="status"
            className={
              message.tone === 'ok'
                ? 'mt-6 rounded-lg border border-moss/40 px-3 py-2 text-sm text-moss'
                : 'mt-6 rounded-lg border border-vermilion/40 px-3 py-2 text-sm text-vermilion'
            }
          >
            {message.text}
          </p>
        )}
      </main>

      <div className="sticky bottom-0 z-30 mt-6 border-t border-line bg-surface/95 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1100px] flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-8">
          <p className="text-sm text-muted">
            {dirty ? (
              <span className="text-ink">Unsaved changes</span>
            ) : (
              'Everything is saved'
            )}
          </p>
          <div className="flex items-center gap-3">
            <Button onClick={() => setDraft(saved)} disabled={!dirty || busy}>
              Discard
            </Button>
            <Button variant="primary" onClick={save} disabled={!dirty || busy}>
              {busy ? 'Saving…' : 'Save changes'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
