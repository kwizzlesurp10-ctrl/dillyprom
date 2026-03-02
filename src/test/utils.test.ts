import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('cn utility', () => {
  it('merges class names correctly', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('handles conditional classes', () => {
    expect(cn('base', false && 'conditional', 'end')).toBe('base end')
    expect(cn('base', true && 'conditional', 'end')).toBe('base conditional end')
  })

  it('resolves tailwind conflicts', () => {
    // tailwind-merge should keep the later class when there's a conflict
    expect(cn('p-4', 'p-6')).toBe('p-6')
  })

  it('handles undefined and null values', () => {
    expect(cn('foo', undefined, null, 'bar')).toBe('foo bar')
  })

  it('returns empty string when no arguments given', () => {
    expect(cn()).toBe('')
  })

  it('handles object syntax', () => {
    expect(cn({ 'text-red-500': true, 'text-blue-500': false })).toBe('text-red-500')
  })
})
