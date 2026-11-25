import { useRef, useState } from 'react'

import { emptyPerson, toParagraphs, type Person } from '../../lib/contentTypes'
import { titleToJapanese } from '../../lib/kanji'
import { Button, Label, TextArea, TextInput } from './Fields'

/** Downscales and re-encodes a chosen photo before it leaves the browser, so
 *  uploads stay small without losing on-screen quality. */
async function prepareImage(file: File): Promise<Blob> {
  if (!file.type.startsWith('image/')) return file
  try {
    const bitmap = await createImageBitmap(file)
    const longest = Math.max(bitmap.width, bitmap.height)
    const scale = Math.min(1, 1500 / longest)
    const width = Math.round(bitmap.width * scale)
    const height = Math.round(bitmap.height * scale)
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const context = canvas.getContext('2d')
    if (!context) return file
    context.drawImage(bitmap, 0, 0, width, height)
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/webp', 0.9))
    return blob ?? file
  } catch {
    return file
  }
}

function PersonCard({
  person,
  index,
  onChange,
  onRemove,
  onMove,
  canMoveUp,
  canMoveDown,
}: {
  person: Person
  index: number
  onChange: (patch: Partial<Person>) => void
  onRemove: () => void
  onMove: (delta: number) => void
  canMoveUp: boolean
  canMoveDown: boolean
}) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  // Once the admin writes their own Japanese title we stop overwriting it;
  // until then the kanji follows the English title automatically.
  const jpTouched = useRef(false)

  const suggestion = titleToJapanese(person.role)

  function changeRole(role: string) {
    const next = titleToJapanese(role) ?? ''
    const patch: Partial<Person> = { role }
    if (next && !jpTouched.current) patch.jp = next
    onChange(patch)
  }

  async function upload(file: File | undefined) {
    if (!file) return
    setBusy(true)
    setError(null)
    try {
      const body = new FormData()
      body.append('file', await prepareImage(file))
      const res = await fetch('/api/admin/upload', { method: 'POST', body })
      const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string }
      if (!res.ok || !data.url) {
        setError(data.error ?? 'The photo could not be uploaded.')
        return
      }
      onChange({ photo: data.url })
    } catch {
      setError('The photo could not be uploaded. Check your connection.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="rounded-[var(--radius-card)] border border-line bg-surface-raised p-5 sm:p-6">
      <header className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
        <div className="flex items-center gap-3">
          <span className="caps text-muted">Person {index + 1}</span>
          <span className="jp text-base text-moss">{person.jp || '—'}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => onMove(-1)} disabled={!canMoveUp} aria-label="Move person up">
            ↑
          </Button>
          <Button onClick={() => onMove(1)} disabled={!canMoveDown} aria-label="Move person down">
            ↓
          </Button>
          <Button variant="danger" onClick={onRemove}>
            Remove
          </Button>
        </div>
      </header>

      <div className="grid gap-5 sm:grid-cols-[150px_1fr]">
        <div>
          <Label className="mb-1.5">Photo</Label>
          <div className="arch h-[186px] w-[140px] bg-moss-deep">
            {person.photo ? (
              <img src={person.photo} alt="" className="size-full object-cover" />
            ) : (
              <span className="jp grid size-full place-items-center text-2xl text-washi/60">絆</span>
            )}
          </div>
          <label className="mt-3 inline-flex w-[140px] cursor-pointer items-center justify-center rounded-full border border-line-strong px-3 py-2 text-[0.78rem] font-medium hover:border-moss hover:text-moss">
            {busy ? 'Uploading…' : 'Upload photo'}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              className="sr-only"
              disabled={busy}
              onChange={(event) => upload(event.target.files?.[0])}
            />
          </label>
          {error && <p className="mt-2 text-xs leading-snug text-vermilion">{error}</p>}
        </div>

        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextInput label="Name" value={person.name} onChange={(event) => onChange({ name: event.target.value })} />
            <TextInput
              label="Nickname (optional)"
              value={person.nickname}
              placeholder="“Haru”"
              onChange={(event) => onChange({ nickname: event.target.value })}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <TextInput
              label="Title, in English"
              value={person.role}
              placeholder="Founder"
              hint="Shown on the card and in the profile."
              onChange={(event) => changeRole(event.target.value)}
            />
            <div>
              <TextInput
                label="Title in Japanese"
                value={person.jp}
                placeholder="創設者"
                onChange={(event) => {
                  jpTouched.current = true
                  onChange({ jp: event.target.value })
                }}
              />
              {suggestion && suggestion !== person.jp && (
                <button
                  type="button"
                  onClick={() => {
                    jpTouched.current = false
                    onChange({ jp: suggestion })
                  }}
                  className="mt-1.5 text-xs text-moss underline-offset-4 hover:underline"
                >
                  Use {suggestion}
                </button>
              )}
            </div>
          </div>

          <div>
            <Label className="mb-1.5">Special tags</Label>
            <div className="flex flex-wrap items-center gap-2">
              {person.tags.map((tag, tagIndex) => (
                <span key={tagIndex} className="flex items-center gap-1 rounded-full border border-line-strong py-1 pl-3 pr-1">
                  <input
                    value={tag}
                    placeholder="Travelled to Japan at 17"
                    aria-label={`Tag ${tagIndex + 1}`}
                    onChange={(event) =>
                      onChange({ tags: person.tags.map((item, i) => (i === tagIndex ? event.target.value : item)) })
                    }
                    className="w-[20ch] bg-transparent text-xs text-ink outline-none placeholder:text-muted/60"
                  />
                  <button
                    type="button"
                    aria-label={`Remove tag ${tagIndex + 1}`}
                    onClick={() => onChange({ tags: person.tags.filter((_, i) => i !== tagIndex) })}
                    className="grid size-6 place-items-center rounded-full text-muted transition-colors hover:text-vermilion"
                  >
                    ×
                  </button>
                </span>
              ))}
              <Button onClick={() => onChange({ tags: [...person.tags, ''] })} disabled={person.tags.length >= 12}>
                + Add tag
              </Button>
            </div>
          </div>

          <TextArea
            label="Short summary"
            rows={2}
            value={person.summary}
            hint="The two lines under the name on the card."
            onChange={(event) => onChange({ summary: event.target.value })}
          />

          <TextArea
            label="Description"
            rows={7}
            value={person.bio.join('\n\n')}
            hint="Leave a blank line between paragraphs. This is the text inside the profile."
            onChange={(event) => onChange({ bio: toParagraphs(event.target.value) })}
          />

          <TextArea
            label="Quote"
            rows={2}
            value={person.quote}
            hint="The large line in quotation marks under the description. Leave empty to hide it."
            onChange={(event) => onChange({ quote: event.target.value })}
          />

          <TextInput
            label="Photo URL (optional)"
            value={person.photo}
            placeholder="/images/team/haru.webp"
            hint="Filled in by Upload photo. You can paste a path or an https link instead."
            onChange={(event) => onChange({ photo: event.target.value })}
          />
        </div>
      </div>
    </section>
  )
}

export function PeopleEditor({ people, onChange }: { people: Person[]; onChange: (next: Person[]) => void }) {
  function update(index: number, patch: Partial<Person>) {
    onChange(people.map((person, i) => (i === index ? { ...person, ...patch } : person)))
  }

  function move(index: number, delta: number) {
    const target = index + delta
    if (target < 0 || target >= people.length) return
    const next = [...people]
    const [item] = next.splice(index, 1)
    next.splice(target, 0, item)
    onChange(next)
  }

  return (
    <div className="space-y-5">
      {people.map((person, index) => (
        <PersonCard
          key={person.id}
          person={person}
          index={index}
          onChange={(patch) => update(index, patch)}
          onRemove={() => {
            if (!window.confirm(`Remove ${person.name || 'this person'} from the site?`)) return
            onChange(people.filter((_, i) => i !== index))
          }}
          onMove={(delta) => move(index, delta)}
          canMoveUp={index > 0}
          canMoveDown={index < people.length - 1}
        />
      ))}

      {people.length === 0 && (
        <p className="rounded-[var(--radius-frame)] border border-dashed border-line-strong p-6 text-sm text-muted">
          No people yet. The section stays on the page and waits for the first person.
        </p>
      )}

      <Button variant="primary" onClick={() => onChange([...people, emptyPerson()])} disabled={people.length >= 24}>
        + Add person
      </Button>
    </div>
  )
}
