import { Hono, type Context } from 'hono'
import { deleteCookie, getCookie, setCookie } from 'hono/cookie'

import { defaultContent, normalizeContent } from '../lib/contentTypes'

// The Worker in front of the static site. It serves the editable content
// (people, FAQ, contact links), the uploaded portraits, and the admin API.
// Content lives in D1 and portraits in R2; when those bindings are missing the
// site falls back to the content it ships with.

type Env = {
  ASSETS: Fetcher
  DB?: D1Database
  FILES?: R2Bucket
  ADMIN_EMAIL?: string
  ADMIN_PASSWORD?: string
  ADMIN_SESSION_SECRET?: string
}

const ADMIN_EMAIL_FALLBACK = 'husainarib57@gmail.com'
const COOKIE_NAME = 'kizuna_admin'
const SESSION_DAYS = 7
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024
const MAX_CONTENT_BYTES = 250_000
const IMAGE_TYPES: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/avif': 'avif',
}

const encoder = new TextEncoder()
const app = new Hono<{ Bindings: Env }>()

function toHex(buffer: ArrayBuffer): string {
  return [...new Uint8Array(buffer)].map((byte) => byte.toString(16).padStart(2, '0')).join('')
}

async function sha256Hex(value: string): Promise<string> {
  return toHex(await crypto.subtle.digest('SHA-256', encoder.encode(value)))
}

async function hmacHex(secret: string, value: string): Promise<string> {
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  return toHex(await crypto.subtle.sign('HMAC', key, encoder.encode(value)))
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

function b64url(value: string): string {
  return btoa(value).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function fromB64url(value: string): string {
  return atob(value.replace(/-/g, '+').replace(/_/g, '/'))
}

function adminEmail(env: Env): string {
  return (env.ADMIN_EMAIL || ADMIN_EMAIL_FALLBACK).trim().toLowerCase()
}

function sessionSecret(env: Env): string {
  return env.ADMIN_SESSION_SECRET || env.ADMIN_PASSWORD || 'kizuna-local-session-secret'
}

async function createToken(env: Env, email: string): Promise<string> {
  const payload = b64url(JSON.stringify({ e: email, x: Date.now() + SESSION_DAYS * 86_400_000 }))
  return `${payload}.${await hmacHex(sessionSecret(env), payload)}`
}

async function readSession(env: Env, token: string | undefined): Promise<string | null> {
  if (!token) return null
  const [payload, signature] = token.split('.')
  if (!payload || !signature) return null
  const expected = await hmacHex(sessionSecret(env), payload)
  if (!safeEqual(expected, signature)) return null
  try {
    const data = JSON.parse(fromB64url(payload)) as { e?: string; x?: number }
    if (!data.e || typeof data.x !== 'number' || data.x < Date.now()) return null
    if (data.e !== adminEmail(env)) return null
    return data.e
  } catch {
    return null
  }
}

async function currentAdmin(c: Context<{ Bindings: Env }>): Promise<string | null> {
  return readSession(c.env, getCookie(c, COOKIE_NAME))
}

function sameOrigin(c: Context<{ Bindings: Env }>): boolean {
  const origin = c.req.header('origin')
  if (!origin) return true
  try {
    return new URL(origin).host === new URL(c.req.url).host
  } catch {
    return false
  }
}

function unauthorised(c: Context<{ Bindings: Env }>) {
  return c.json({ error: 'Please sign in as the admin to make changes.' }, 401)
}

async function ensureSchema(db: D1Database): Promise<void> {
  await db
    .prepare('CREATE TABLE IF NOT EXISTS site_content (id TEXT PRIMARY KEY, json TEXT NOT NULL, updated_at TEXT NOT NULL)')
    .run()
}

async function loadContent(db: D1Database): Promise<{ content: ReturnType<typeof normalizeContent>; updatedAt: string }> {
  await ensureSchema(db)
  const row = await db
    .prepare('SELECT json, updated_at FROM site_content WHERE id = ?')
    .bind('main')
    .first<{ json: string; updated_at: string }>()

  if (!row) {
    const seeded = defaultContent()
    const now = new Date().toISOString()
    await db
      .prepare('INSERT INTO site_content (id, json, updated_at) VALUES (?, ?, ?)')
      .bind('main', JSON.stringify(seeded), now)
      .run()
    return { content: seeded, updatedAt: now }
  }

  try {
    return { content: normalizeContent(JSON.parse(row.json)), updatedAt: row.updated_at }
  } catch {
    return { content: defaultContent(), updatedAt: row.updated_at }
  }
}

app.get('/api/health', (c) => c.json({ ok: true }))

app.get('/api/content', async (c) => {
  if (!c.env.DB) return c.json({ content: defaultContent(), updatedAt: null, stored: false })
  try {
    const { content, updatedAt } = await loadContent(c.env.DB)
    return c.json({ content, updatedAt, stored: true })
  } catch {
    return c.json({ content: defaultContent(), updatedAt: null, stored: false })
  }
})

app.post('/api/admin/login', async (c) => {
  if (!sameOrigin(c)) return c.json({ error: 'Blocked request.' }, 403)
  if (!c.env.ADMIN_PASSWORD) {
    return c.json({ error: 'Admin sign-in is not configured. Set the ADMIN_PASSWORD secret first.' }, 503)
  }

  const body = (await c.req.json().catch(() => null)) as { email?: unknown; password?: unknown } | null
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
  const password = typeof body?.password === 'string' ? body.password : ''
  const passwordOk = password.length > 0 && safeEqual(await sha256Hex(password), await sha256Hex(c.env.ADMIN_PASSWORD))

  if (email !== adminEmail(c.env) || !passwordOk) {
    await new Promise((resolve) => setTimeout(resolve, 400))
    return c.json({ error: 'Those details did not match the admin account.' }, 401)
  }

  setCookie(c, COOKIE_NAME, await createToken(c.env, email), {
    httpOnly: true,
    sameSite: 'Strict',
    path: '/',
    secure: new URL(c.req.url).protocol === 'https:',
    maxAge: SESSION_DAYS * 86_400,
  })
  return c.json({ email })
})

app.post('/api/admin/logout', (c) => {
  deleteCookie(c, COOKIE_NAME, { path: '/' })
  return c.json({ ok: true })
})

app.get('/api/admin/session', async (c) => {
  const email = await currentAdmin(c)
  if (!email) return unauthorised(c)
  return c.json({ email })
})

app.get('/api/admin/content', async (c) => {
  const email = await currentAdmin(c)
  if (!email) return unauthorised(c)
  if (!c.env.DB) return c.json({ error: 'Content storage is not connected yet.' }, 503)
  const { content, updatedAt } = await loadContent(c.env.DB)
  return c.json({ content, updatedAt })
})

app.put('/api/admin/content', async (c) => {
  if (!sameOrigin(c)) return c.json({ error: 'Blocked request.' }, 403)
  const email = await currentAdmin(c)
  if (!email) return unauthorised(c)
  if (!c.env.DB) return c.json({ error: 'Content storage is not connected yet.' }, 503)

  const body = (await c.req.json().catch(() => null)) as { content?: unknown } | null
  if (!body) return c.json({ error: 'That request was not valid JSON.' }, 400)

  const content = normalizeContent(body.content)
  const json = JSON.stringify(content)
  if (json.length > MAX_CONTENT_BYTES) return c.json({ error: 'That is too much content to save at once.' }, 413)
  if (content.members.some((member) => !member.name.trim())) {
    return c.json({ error: 'Every person needs a name before you can save.' }, 400)
  }

  const now = new Date().toISOString()
  await ensureSchema(c.env.DB)
  await c.env.DB
    .prepare(
      'INSERT INTO site_content (id, json, updated_at) VALUES (?, ?, ?) ON CONFLICT(id) DO UPDATE SET json = excluded.json, updated_at = excluded.updated_at',
    )
    .bind('main', json, now)
    .run()

  return c.json({ ok: true, content, updatedAt: now })
})

app.post('/api/admin/upload', async (c) => {
  if (!sameOrigin(c)) return c.json({ error: 'Blocked request.' }, 403)
  const email = await currentAdmin(c)
  if (!email) return unauthorised(c)
  if (!c.env.FILES) return c.json({ error: 'Photo storage is not connected yet.' }, 503)

  const form = await c.req.formData().catch(() => null)
  const file = form?.get('file')
  if (!(file instanceof File)) return c.json({ error: 'Choose an image to upload.' }, 400)
  if (file.size === 0) return c.json({ error: 'That file is empty.' }, 400)
  if (file.size > MAX_UPLOAD_BYTES) return c.json({ error: 'That image is larger than 5 MB.' }, 413)

  const extension = IMAGE_TYPES[file.type]
  if (!extension) return c.json({ error: 'Photos must be JPEG, PNG, WebP or AVIF.' }, 415)

  const key = `portraits/${Date.now().toString(36)}-${crypto.randomUUID().slice(0, 8)}.${extension}`
  await c.env.FILES.put(key, await file.arrayBuffer(), { httpMetadata: { contentType: file.type } })
  return c.json({ url: `/api/media/${key}` })
})

app.get('/api/media/:key{.+}', async (c) => {
  if (!c.env.FILES) return c.json({ error: 'Not found' }, 404)
  const key = c.req.param('key')
  if (key.includes('..')) return c.json({ error: 'Not found' }, 404)
  const object = await c.env.FILES.get(key)
  if (!object) return c.json({ error: 'Not found' }, 404)
  return new Response(object.body, {
    headers: {
      'content-type': object.httpMetadata?.contentType ?? 'application/octet-stream',
      'cache-control': 'public, max-age=31536000, immutable',
      etag: object.httpEtag,
    },
  })
})

app.all('/api/*', (c) => c.json({ error: 'Not found' }, 404))
app.all('*', (c) => c.env.ASSETS.fetch(c.req.raw))

export default app
