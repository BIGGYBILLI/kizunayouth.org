import { CONTACT_KINDS, emptyContact, type ContactItem, type ContactKind } from '../../lib/contentTypes'
import { Button, Label, TextInput } from './Fields'

const KIND_LABELS: Record<ContactKind, string> = {
  email: 'Email',
  instagram: 'Instagram',
  facebook: 'Facebook',
  linkedin: 'LinkedIn',
  website: 'Website',
  phone: 'Phone',
}

function suggestHref(kind: ContactKind, value: string): string {
  const trimmed = value.trim()
  if (kind === 'email') return trimmed.includes('@') ? `mailto:${trimmed}` : trimmed
  if (kind === 'phone') return trimmed ? `tel:${trimmed.replace(/\s+/g, '')}` : ''
  if (kind === 'instagram') return trimmed ? `https://www.instagram.com/${trimmed.replace(/^@/, '')}/` : ''
  if (kind === 'facebook') return trimmed ? `https://www.facebook.com/${trimmed.replace(/^@/, '')}` : ''
  if (kind === 'linkedin') return trimmed.startsWith('http') ? trimmed : `https://www.linkedin.com/in/${trimmed.replace(/^@/, '')}`
  return trimmed
}

export function ContactsEditor({ items, onChange }: { items: ContactItem[]; onChange: (next: ContactItem[]) => void }) {
  function update(index: number, patch: Partial<ContactItem>) {
    onChange(items.map((item, i) => (i === index ? { ...item, ...patch } : item)))
  }

  return (
    <div className="space-y-5">
      {items.map((item, index) => (
        <section key={item.id} className="rounded-[var(--radius-card)] border border-line bg-surface-raised p-5 sm:p-6">
          <header className="mb-4 flex items-center justify-between gap-3">
            <span className="caps text-muted">Contact {index + 1}</span>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  if (index === 0) return
                  const next = [...items]
                  const [moved] = next.splice(index, 1)
                  next.splice(index - 1, 0, moved)
                  onChange(next)
                }}
                disabled={index === 0}
                aria-label="Move contact up"
              >
                ↑
              </Button>
              <Button
                onClick={() => {
                  if (index === items.length - 1) return
                  const next = [...items]
                  const [moved] = next.splice(index, 1)
                  next.splice(index + 1, 0, moved)
                  onChange(next)
                }}
                disabled={index === items.length - 1}
                aria-label="Move contact down"
              >
                ↓
              </Button>
              <Button variant="danger" onClick={() => onChange(items.filter((_, i) => i !== index))}>
                Remove
              </Button>
            </div>
          </header>

          <div className="grid gap-4 sm:grid-cols-[160px_1fr]">
            <label className="block">
              <Label className="mb-1.5">Type</Label>
              <select
                value={item.kind}
                onChange={(event) => {
                  const kind = event.target.value as ContactKind
                  update(index, { kind, href: suggestHref(kind, item.value) })
                }}
                className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-[0.92rem] text-ink focus:border-moss focus:outline-none"
              >
                {CONTACT_KINDS.map((kind) => (
                  <option key={kind} value={kind}>
                    {KIND_LABELS[kind]}
                  </option>
                ))}
              </select>
            </label>
            <TextInput
              label="Small label above the link"
              value={item.label}
              placeholder="Follow and DM"
              onChange={(event) => update(index, { label: event.target.value })}
            />
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <TextInput
              label="What visitors see"
              value={item.value}
              placeholder="@kizunayouth.co"
              onChange={(event) => update(index, { value: event.target.value, href: suggestHref(item.kind, event.target.value) })}
            />
            <TextInput
              label="Link"
              value={item.href}
              placeholder="https://…"
              hint="Filled in automatically for email, phone and social handles."
              onChange={(event) => update(index, { href: event.target.value })}
            />
          </div>
        </section>
      ))}

      {items.length === 0 && (
        <p className="rounded-[var(--radius-frame)] border border-dashed border-line-strong p-6 text-sm text-muted">
          No contacts yet. The contact section keeps its heading and message.
        </p>
      )}

      <Button variant="primary" onClick={() => onChange([...items, emptyContact()])} disabled={items.length >= 12}>
        + Add contact
      </Button>
    </div>
  )
}
