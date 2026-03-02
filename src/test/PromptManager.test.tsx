import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

// Mock the @github/spark/hooks module
vi.mock('@github/spark/hooks', () => ({
  useKV: vi.fn(),
}))

// Mock sonner toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
  Toaster: () => null,
}))

import { useKV } from '@github/spark/hooks'
import { PromptManager } from '@/components/PromptManager'

const mockSetPrompts = vi.fn()

describe('PromptManager', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Default: empty prompts list
    vi.mocked(useKV).mockReturnValue([[], mockSetPrompts])

    // Mock clipboard
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
    })
  })

  it('renders the My Prompts heading', () => {
    render(<PromptManager />)
    expect(screen.getByRole('heading', { name: /my prompts/i })).toBeInTheDocument()
  })

  it('renders the Add Prompt button', () => {
    render(<PromptManager />)
    expect(screen.getByRole('button', { name: /add prompt/i })).toBeInTheDocument()
  })

  it('shows empty state when no prompts exist', () => {
    render(<PromptManager />)
    expect(screen.getByText(/no prompts found/i)).toBeInTheDocument()
    expect(screen.getByText(/get started by adding your first prompt/i)).toBeInTheDocument()
  })

  it('shows prompt count', () => {
    render(<PromptManager />)
    expect(screen.getByText(/showing 0 of 0 prompts/i)).toBeInTheDocument()
  })

  it('renders search input', () => {
    render(<PromptManager />)
    expect(screen.getByPlaceholderText(/search prompts/i)).toBeInTheDocument()
  })

  it('opens Add Prompt dialog when button is clicked', async () => {
    const user = userEvent.setup()
    render(<PromptManager />)
    await user.click(screen.getByRole('button', { name: /add prompt/i }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText(/add new prompt/i)).toBeInTheDocument()
  })

  it('renders prompts when prompts exist', () => {
    const mockPrompts = [
      {
        id: '1',
        promptText: 'Write a function to sort an array',
        category: 'Code Generation',
        tags: ['javascript', 'sorting'],
        aiModel: 'gpt-4',
        author: 'Alice',
        performanceRating: 4.5,
        successRate: 95,
        usageCount: 10,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: 1,
      },
    ]
    vi.mocked(useKV).mockReturnValue([mockPrompts, mockSetPrompts])

    render(<PromptManager />)
    expect(screen.getByText('Write a function to sort an array')).toBeInTheDocument()
    expect(screen.getByText('Code Generation')).toBeInTheDocument()
    expect(screen.getByText('gpt-4')).toBeInTheDocument()
  })

  it('shows correct count with prompts', () => {
    const mockPrompts = [
      {
        id: '1',
        promptText: 'Test prompt',
        category: 'Other',
        tags: [],
        aiModel: 'gpt-4',
        author: 'Bob',
        performanceRating: 3,
        successRate: 80,
        usageCount: 5,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: 1,
      },
    ]
    vi.mocked(useKV).mockReturnValue([mockPrompts, mockSetPrompts])

    render(<PromptManager />)
    expect(screen.getByText(/showing 1 of 1 prompts/i)).toBeInTheDocument()
  })

  it('shows author and metrics when prompt exists', () => {
    const mockPrompts = [
      {
        id: '1',
        promptText: 'Analyze this dataset',
        category: 'Data Analysis',
        tags: ['data'],
        aiModel: 'claude-3-opus',
        author: 'Charlie',
        performanceRating: 3.5,
        successRate: 88,
        usageCount: 25,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: 2,
      },
    ]
    vi.mocked(useKV).mockReturnValue([mockPrompts, mockSetPrompts])

    render(<PromptManager />)
    expect(screen.getByText(/by charlie/i)).toBeInTheDocument()
    expect(screen.getByText(/success: 88%/i)).toBeInTheDocument()
    expect(screen.getByText(/used 25 times/i)).toBeInTheDocument()
  })

  it('filters prompts by search query', async () => {
    const user = userEvent.setup()
    const mockPrompts = [
      {
        id: '1',
        promptText: 'Write Python code',
        category: 'Code Generation',
        tags: ['python'],
        aiModel: 'gpt-4',
        author: 'Alice',
        performanceRating: 4,
        successRate: 90,
        usageCount: 5,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: 1,
      },
      {
        id: '2',
        promptText: 'Translate to Spanish',
        category: 'Translation',
        tags: ['spanish'],
        aiModel: 'gpt-4o',
        author: 'Bob',
        performanceRating: 4,
        successRate: 92,
        usageCount: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: 1,
      },
    ]
    vi.mocked(useKV).mockReturnValue([mockPrompts, mockSetPrompts])

    render(<PromptManager />)
    const searchInput = screen.getByPlaceholderText(/search prompts/i)
    await user.type(searchInput, 'python')

    expect(screen.getByText('Write Python code')).toBeInTheDocument()
    expect(screen.queryByText('Translate to Spanish')).not.toBeInTheDocument()
  })

  it('shows Add Your First Prompt button in empty state', () => {
    render(<PromptManager />)
    expect(screen.getByRole('button', { name: /add your first prompt/i })).toBeInTheDocument()
  })

  it('shows star rating for high-performance prompts', () => {
    const mockPrompts = [
      {
        id: '1',
        promptText: 'High performance prompt',
        category: 'Code Generation',
        tags: [],
        aiModel: 'gpt-4',
        author: 'Alice',
        performanceRating: 4.5,
        successRate: 99,
        usageCount: 100,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: 1,
      },
    ]
    vi.mocked(useKV).mockReturnValue([mockPrompts, mockSetPrompts])

    render(<PromptManager />)
    expect(screen.getByText('4.5')).toBeInTheDocument()
  })
})
