import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react'

import { cx } from '../../lib/cx'

const inputClass =
  'w-full rounded-lg border border-line bg-surface px-3 py-2 text-[0.92rem] text-ink placeholder:text-muted/70 transition-colors focus:border-moss focus:outline-none'

export function Label({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cx('caps block text-[0.58rem] text-muted', className)}>
      {children}
    </span>
  )
}

export function TextInput({
  label,
  hint,
  className,
  id,
  ...props
}: { label: string; hint?: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block" htmlFor={id}>
      <Label className="mb-1.5">{label}</Label>
      <input id={id} className={cx(inputClass, className)} {...props} />
      {hint && <span className="mt-1 block text-xs leading-snug text-muted">{hint}</span>}
    </label>
  )
}

export function TextArea({
  label,
  hint,
  className,
  id,
  ...props
}: { label: string; hint?: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="block" htmlFor={id}>
      <Label className="mb-1.5">{label}</Label>
      <textarea id={id} className={cx(inputClass, 'leading-relaxed', className)} {...props} />
      {hint && <span className="mt-1 block text-xs leading-snug text-muted">{hint}</span>}
    </label>
  )
}

export function Button({
  variant = 'ghost',
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' | 'danger' }) {
  return (
    <button
      type="button"
      className={cx(
        'inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-[0.85rem] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-45',
        variant === 'primary' && 'bg-cta text-washi hover:bg-cta-hover',
        variant === 'ghost' && 'border border-line-strong text-ink hover:border-moss hover:text-moss',
        variant === 'danger' && 'border border-line-strong text-vermilion hover:border-vermilion',
        className,
      )}
      {...props}
    />
  )
}
