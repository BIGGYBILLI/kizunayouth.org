import { emptyFaq, type FaqItem } from '../../lib/contentTypes'
import { Button, TextArea, TextInput } from './Fields'

export function FaqEditor({ items, onChange }: { items: FaqItem[]; onChange: (next: FaqItem[]) => void }) {
  function update(index: number, patch: Partial<FaqItem>) {
    onChange(items.map((item, i) => (i === index ? { ...item, ...patch } : item)))
  }

  return (
    <div className="space-y-5">
      {items.map((item, index) => (
        <section key={item.id} className="rounded-[var(--radius-card)] border border-line bg-surface-raised p-5 sm:p-6">
          <header className="mb-4 flex items-center justify-between gap-3">
            <span className="caps text-muted">Question {index + 1}</span>
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
                aria-label="Move question up"
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
                aria-label="Move question down"
              >
                ↓
              </Button>
              <Button variant="danger" onClick={() => onChange(items.filter((_, i) => i !== index))}>
                Remove
              </Button>
            </div>
          </header>

          <div className="space-y-4">
            <TextInput label="Question" value={item.q} onChange={(event) => update(index, { q: event.target.value })} />
            <TextArea label="Answer" rows={4} value={item.a} onChange={(event) => update(index, { a: event.target.value })} />
          </div>
        </section>
      ))}

      {items.length === 0 && (
        <p className="rounded-[var(--radius-frame)] border border-dashed border-line-strong p-6 text-sm text-muted">
          No questions yet. The FAQ section stays on the page with its heading.
        </p>
      )}

      <Button variant="primary" onClick={() => onChange([...items, emptyFaq()])} disabled={items.length >= 60}>
        + Add question
      </Button>
    </div>
  )
}
