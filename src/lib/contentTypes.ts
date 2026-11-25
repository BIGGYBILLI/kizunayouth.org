// The editable half of the site: people, FAQ and contact links.
// This module is imported by both the browser and the Worker, so it must stay
// free of React and of any browser-only globals at module scope.

import { CONTACT, FAQ, SITE, TEAM } from '../data'

export type Person = {
  id: string
  name: string
  nickname: string
  role: string
  jp: string
  photo: string
  photoAlt: string
  tags: string[]
  summary: string
  bio: string[]
  quote: string
}

export type FaqItem = { id: string; q: string; a: string }

export type ContactKind = 'email' | 'instagram' | 'facebook' | 'linkedin' | 'website' | 'phone'

export type ContactItem = { id: string; label: string; value: string; href: string; kind: ContactKind }

export type SiteContent = {
  members: Person[]
  faq: FaqItem[]
  contacts: ContactItem[]
}

export const CONTACT_KINDS: ContactKind[] = ['email', 'instagram', 'facebook', 'linkedin', 'website', 'phone']

const LIMITS = {
  name: 80,
  nickname: 40,
  role: 80,
  jp: 40,
  photo: 500,
  alt: 200,
  tag: 60,
  summary: 400,
  quote: 600,
  paragraph: 1600,
  q: 300,
  a: 3000,
  label: 60,
  value: 140,
  href: 500,
}

export const MAX = {
  members: 24,
  tags: 12,
  paragraphs: 12,
  faq: 60,
  contacts: 12,
}

export function newId(prefix: string): string {
  const uuid =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID().replace(/-/g, '').slice(0, 10)
      : Math.random().toString(36).slice(2, 12)
  return `${prefix}-${uuid}`
}

function text(value: unknown, max: number): string {
  if (typeof value !== 'string') return ''
  return value.replace(/\u0000/g, '').trim().slice(0, max)
}

function safePhoto(value: unknown): string {
  const url = text(value, LIMITS.photo)
  if (!url) return ''
  if (url.startsWith('/')) return url
  if (/^https:\/\//i.test(url)) return url
  return ''
}

function safeHref(value: unknown): string {
  const url = text(value, LIMITS.href)
  if (!url) return ''
  if (/^(https?:\/\/|mailto:|tel:)/i.test(url)) return url
  if (url.startsWith('#') || url.startsWith('/')) return url
  return ''
}

function stringList(value: unknown, maxItems: number, maxLength: number): string[] {
  if (!Array.isArray(value)) return []
  return value
    .map((item) => text(item, maxLength))
    .filter(Boolean)
    .slice(0, maxItems)
}

function normalizePerson(raw: unknown): Person | null {
  if (!raw || typeof raw !== 'object') return null
  const source = raw as Record<string, unknown>
  const name = text(source.name, LIMITS.name)
  const role = text(source.role, LIMITS.role)
  if (!name && !role) return null
  const id = text(source.id, 60) || newId('person')
  return {
    id,
    name,
    nickname: text(source.nickname, LIMITS.nickname),
    role,
    jp: text(source.jp, LIMITS.jp),
    photo: safePhoto(source.photo),
    photoAlt: text(source.photoAlt, LIMITS.alt) || [name, role].filter(Boolean).join(', '),
    tags: stringList(source.tags, MAX.tags, LIMITS.tag),
    summary: text(source.summary, LIMITS.summary),
    bio: stringList(source.bio, MAX.paragraphs, LIMITS.paragraph),
    quote: text(source.quote, LIMITS.quote),
  }
}

function normalizeFaq(raw: unknown): FaqItem | null {
  if (!raw || typeof raw !== 'object') return null
  const source = raw as Record<string, unknown>
  const q = text(source.q, LIMITS.q)
  const a = text(source.a, LIMITS.a)
  if (!q && !a) return null
  return { id: text(source.id, 60) || newId('faq'), q, a }
}

function normalizeContact(raw: unknown): ContactItem | null {
  if (!raw || typeof raw !== 'object') return null
  const source = raw as Record<string, unknown>
  const label = text(source.label, LIMITS.label)
  const value = text(source.value, LIMITS.value)
  const href = safeHref(source.href)
  const kind = CONTACT_KINDS.includes(source.kind as ContactKind) ? (source.kind as ContactKind) : 'website'
  if (!label && !value && !href) return null
  return { id: text(source.id, 60) || newId('contact'), label, value, href, kind }
}

function normalizeList<T>(value: unknown, mapper: (raw: unknown) => T | null, cap: number): T[] | null {
  if (!Array.isArray(value)) return null
  const out: T[] = []
  for (const item of value) {
    const mapped = mapper(item)
    if (mapped) out.push(mapped)
    if (out.length >= cap) break
  }
  return out
}

/** Coerces untrusted input into content the site can render. Missing sections
 *  fall back to the shipped defaults; present-but-empty sections stay empty. */
export function normalizeContent(raw: unknown): SiteContent {
  const fallback = defaultContent()
  if (!raw || typeof raw !== 'object') return fallback
  const source = raw as Record<string, unknown>
  return {
    members: normalizeList(source.members, normalizePerson, MAX.members) ?? fallback.members,
    faq: normalizeList(source.faq, normalizeFaq, MAX.faq) ?? fallback.faq,
    contacts: normalizeList(source.contacts, normalizeContact, MAX.contacts) ?? fallback.contacts,
  }
}

export function emptyPerson(): Person {
  return {
    id: newId('person'),
    name: '',
    nickname: '',
    role: '',
    jp: '',
    photo: '',
    photoAlt: '',
    tags: [],
    summary: '',
    bio: [],
    quote: '',
  }
}

export function emptyFaq(): FaqItem {
  return { id: newId('faq'), q: '', a: '' }
}

export function emptyContact(): ContactItem {
  return { id: newId('contact'), label: '', value: '', href: '', kind: 'website' }
}

/** The content the site shipped with, used as the seed and as the offline fallback. */
export function defaultContent(): SiteContent {
  return {
    members: TEAM.members.map((member) => ({
      id: member.slug,
      name: member.name,
      nickname: member.nickname ?? '',
      role: member.role,
      jp: member.jp,
      photo: member.photo,
      photoAlt: member.photoAlt,
      tags: [...member.tags],
      summary: member.summary,
      bio: member.bio ? [...member.bio] : [],
      quote: member.quote ?? '',
    })),
    faq: FAQ.map((item, index) => ({ id: `faq-${index + 1}`, q: item.q, a: item.a })),
    contacts: [
      {
        id: 'contact-email',
        label: CONTACT.emailLabel,
        value: SITE.email,
        href: `mailto:${SITE.email}`,
        kind: 'email',
      },
      {
        id: 'contact-instagram',
        label: CONTACT.instagramLabel,
        value: SITE.instagram.handle,
        href: SITE.instagram.href,
        kind: 'instagram',
      },
    ],
  }
}

/** Splits a textarea into paragraphs on blank lines. */
export function toParagraphs(value: string): string[] {
  return value
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean)
}
