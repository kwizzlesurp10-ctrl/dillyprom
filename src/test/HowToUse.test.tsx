import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HowToUse } from '@/components/HowToUse'

describe('HowToUse', () => {
  it('renders the main heading', () => {
    render(<HowToUse />)
    expect(screen.getByRole('heading', { name: /how to use the prompt vault/i })).toBeInTheDocument()
  })

  it('renders Getting Started section', () => {
    render(<HowToUse />)
    expect(screen.getByRole('heading', { name: /getting started/i })).toBeInTheDocument()
  })

  it('renders Create Your Prompts step', () => {
    render(<HowToUse />)
    expect(screen.getByText(/create your prompts/i)).toBeInTheDocument()
  })

  it('renders Search and Filter step', () => {
    render(<HowToUse />)
    const elements = screen.getAllByText(/search and filter/i)
    expect(elements.length).toBeGreaterThan(0)
  })

  it('renders Version and Iterate step', () => {
    render(<HowToUse />)
    expect(screen.getByText(/version and iterate/i)).toBeInTheDocument()
  })

  it('renders My Prompts badge reference', () => {
    render(<HowToUse />)
    expect(screen.getByText('My Prompts')).toBeInTheDocument()
  })

  it('renders performance metrics description', () => {
    render(<HowToUse />)
    const elements = screen.getAllByText(/performance metrics/i)
    expect(elements.length).toBeGreaterThan(0)
  })

  it('renders step numbers 1, 2, and 3', () => {
    render(<HowToUse />)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })
})
