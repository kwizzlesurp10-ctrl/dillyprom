import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { ErrorFallback } from '@/ErrorFallback'

// Force production mode so ErrorFallback renders its UI instead of rethrowing
vi.stubEnv('DEV', false)

describe('ErrorFallback', () => {
  const mockError = new Error('Something went wrong')
  const mockReset = vi.fn()

  it('renders error message', () => {
    render(<ErrorFallback error={mockError} resetErrorBoundary={mockReset} />)
    expect(screen.getByText('This spark has encountered a runtime error')).toBeInTheDocument()
  })

  it('shows error details', () => {
    render(<ErrorFallback error={mockError} resetErrorBoundary={mockReset} />)
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('renders a Try Again button', () => {
    render(<ErrorFallback error={mockError} resetErrorBoundary={mockReset} />)
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument()
  })

  it('calls resetErrorBoundary when Try Again is clicked', async () => {
    const user = userEvent.setup()
    render(<ErrorFallback error={mockError} resetErrorBoundary={mockReset} />)
    await user.click(screen.getByRole('button', { name: /try again/i }))
    expect(mockReset).toHaveBeenCalledTimes(1)
  })

  it('renders the error description', () => {
    render(<ErrorFallback error={mockError} resetErrorBoundary={mockReset} />)
    expect(
      screen.getByText(/something unexpected happened/i)
    ).toBeInTheDocument()
  })
})
