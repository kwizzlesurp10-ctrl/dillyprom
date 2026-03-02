import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useIsMobile } from '@/hooks/use-mobile'

describe('useIsMobile', () => {
  const setInnerWidth = (width: number) => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    })
  }

  beforeEach(() => {
    setInnerWidth(1024)
  })

  afterEach(() => {
    setInnerWidth(1024)
    vi.restoreAllMocks()
  })

  it('returns false for desktop viewport width', () => {
    setInnerWidth(1024)
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)
  })

  it('returns true for mobile viewport width', () => {
    setInnerWidth(375)
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(true)
  })

  it('returns false exactly at mobile breakpoint (768px)', () => {
    setInnerWidth(768)
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)
  })

  it('returns true just below mobile breakpoint (767px)', () => {
    setInnerWidth(767)
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(true)
  })

  it('responds to media query change events', () => {
    let mediaQueryListener: (() => void) | null = null
    vi.stubGlobal('matchMedia', vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn((event: string, handler: () => void) => {
        if (event === 'change') mediaQueryListener = handler
      }),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })))

    setInnerWidth(1024)
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)

    act(() => {
      setInnerWidth(375)
      if (mediaQueryListener) mediaQueryListener()
    })

    expect(result.current).toBe(true)
  })
})

