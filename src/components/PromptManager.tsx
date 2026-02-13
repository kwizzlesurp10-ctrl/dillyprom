import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { 
  Plus, 
  Trash, 
  PencilSimple, 
  MagnifyingGlass,
  Star,
  Tag,
  Sparkle,
  Copy,
  CheckCircle
} from '@phosphor-icons/react'
import { toast } from 'sonner'

interface Prompt {
  id: string
  promptText: string
  category: string
  tags: string[]
  aiModel: string
  author: string
  performanceRating: number
  successRate: number
  usageCount: number
  createdAt: string
  updatedAt: string
  version: number
}

const CATEGORIES = [
  'Code Generation',
  'Data Analysis',
  'Creative Writing',
  'Summarization',
  'Translation',
  'Question Answering',
  'Other'
]

const AI_MODELS = [
  'gpt-4',
  'gpt-4o',
  'gpt-4o-mini',
  'claude-3-opus',
  'claude-3-sonnet',
  'claude-3-haiku',
  'gemini-pro',
  'other'
]

export function PromptManager() {
  const [prompts, setPrompts] = useKV<Prompt[]>('prompt-vault-prompts', [])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    promptText: '',
    category: '',
    tags: '',
    aiModel: '',
    author: '',
    performanceRating: 0,
    successRate: 0,
    usageCount: 0
  })

  const resetForm = () => {
    setFormData({
      promptText: '',
      category: '',
      tags: '',
      aiModel: '',
      author: '',
      performanceRating: 0,
      successRate: 0,
      usageCount: 0
    })
    setEditingPrompt(null)
  }

  const handleAddPrompt = () => {
    if (!formData.promptText || !formData.category || !formData.aiModel) {
      toast.error('Please fill in all required fields')
      return
    }

    const newPrompt: Prompt = {
      id: Date.now().toString(),
      promptText: formData.promptText,
      category: formData.category,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      aiModel: formData.aiModel,
      author: formData.author || 'Anonymous',
      performanceRating: formData.performanceRating,
      successRate: formData.successRate,
      usageCount: formData.usageCount,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1
    }

    setPrompts((currentPrompts) => [...(currentPrompts || []), newPrompt])
    toast.success('Prompt added successfully!')
    setIsAddDialogOpen(false)
    resetForm()
  }

  const handleUpdatePrompt = () => {
    if (!editingPrompt || !formData.promptText || !formData.category || !formData.aiModel) {
      toast.error('Please fill in all required fields')
      return
    }

    setPrompts((currentPrompts) =>
      (currentPrompts || []).map(p =>
        p.id === editingPrompt.id
          ? {
              ...p,
              promptText: formData.promptText,
              category: formData.category,
              tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
              aiModel: formData.aiModel,
              author: formData.author || p.author,
              performanceRating: formData.performanceRating,
              successRate: formData.successRate,
              usageCount: formData.usageCount,
              updatedAt: new Date().toISOString(),
              version: p.version + 1
            }
          : p
      )
    )
    toast.success('Prompt updated successfully!')
    setEditingPrompt(null)
    resetForm()
  }

  const handleEditPrompt = (prompt: Prompt) => {
    setEditingPrompt(prompt)
    setFormData({
      promptText: prompt.promptText,
      category: prompt.category,
      tags: prompt.tags.join(', '),
      aiModel: prompt.aiModel,
      author: prompt.author,
      performanceRating: prompt.performanceRating,
      successRate: prompt.successRate,
      usageCount: prompt.usageCount
    })
  }

  const handleDeletePrompt = (id: string) => {
    setPrompts((currentPrompts) => (currentPrompts || []).filter(p => p.id !== id))
    toast.success('Prompt deleted successfully!')
  }

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedId(id)
    toast.success('Prompt copied to clipboard')
    setTimeout(() => setCopiedId(null), 2000)
  }

  const filteredPrompts = (prompts || []).filter(prompt => {
    const matchesSearch = searchQuery === '' || 
      prompt.promptText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = filterCategory === 'all' || prompt.category === filterCategory
    
    return matchesSearch && matchesCategory
  })

  const PromptForm = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="prompt-text">Prompt Text *</Label>
        <Textarea
          id="prompt-text"
          placeholder="Enter your AI prompt here..."
          value={formData.promptText}
          onChange={(e) => setFormData({ ...formData, promptText: e.target.value })}
          className="min-h-[120px] mt-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">Category *</Label>
          <Select 
            value={formData.category} 
            onValueChange={(value) => setFormData({ ...formData, category: value })}
          >
            <SelectTrigger id="category" className="mt-2">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="ai-model">AI Model *</Label>
          <Select 
            value={formData.aiModel} 
            onValueChange={(value) => setFormData({ ...formData, aiModel: value })}
          >
            <SelectTrigger id="ai-model" className="mt-2">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              {AI_MODELS.map(model => (
                <SelectItem key={model} value={model}>{model}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          id="tags"
          placeholder="python, sql, api, analysis..."
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="author">Author</Label>
        <Input
          id="author"
          placeholder="Your name"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          className="mt-2"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="rating">Performance Rating (0-5)</Label>
          <Input
            id="rating"
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={formData.performanceRating}
            onChange={(e) => setFormData({ ...formData, performanceRating: parseFloat(e.target.value) || 0 })}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="success-rate">Success Rate (%)</Label>
          <Input
            id="success-rate"
            type="number"
            min="0"
            max="100"
            value={formData.successRate}
            onChange={(e) => setFormData({ ...formData, successRate: parseFloat(e.target.value) || 0 })}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="usage-count">Usage Count</Label>
          <Input
            id="usage-count"
            type="number"
            min="0"
            value={formData.usageCount}
            onChange={(e) => setFormData({ ...formData, usageCount: parseInt(e.target.value) || 0 })}
            className="mt-2"
          />
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <Card className="p-8 border-primary/20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">My Prompts</h2>
            <p className="text-muted-foreground">
              Manage your AI prompt library with version tracking and performance metrics
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => resetForm()}>
                <Plus className="mr-2" weight="bold" />
                Add Prompt
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Prompt</DialogTitle>
                <DialogDescription>
                  Fill in the details for your new AI prompt. Fields marked with * are required.
                </DialogDescription>
              </DialogHeader>
              <PromptForm />
              <DialogFooter>
                <Button variant="outline" onClick={() => { setIsAddDialogOpen(false); resetForm(); }}>
                  Cancel
                </Button>
                <Button onClick={handleAddPrompt}>Add Prompt</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Separator className="my-6" />

        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search prompts by text or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {CATEGORIES.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="text-sm text-muted-foreground mb-4">
          Showing {filteredPrompts.length} of {prompts?.length || 0} prompts
        </div>

        {filteredPrompts.length === 0 ? (
          <div className="text-center py-12">
            <Sparkle size={48} className="mx-auto text-muted-foreground mb-4" weight="duotone" />
            <h3 className="text-lg font-semibold mb-2">No prompts found</h3>
            <p className="text-muted-foreground mb-4">
              {(prompts?.length || 0) === 0 
                ? "Get started by adding your first prompt"
                : "Try adjusting your search or filter criteria"}
            </p>
            {(prompts?.length || 0) === 0 && (
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="mr-2" weight="bold" />
                Add Your First Prompt
              </Button>
            )}
          </div>
        ) : (
          <ScrollArea className="h-[600px]">
            <div className="space-y-4 pr-4">
              {filteredPrompts.map((prompt) => (
                <Card key={prompt.id} className="p-6 hover:border-accent/50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className="bg-primary">{prompt.category}</Badge>
                        <Badge variant="outline">{prompt.aiModel}</Badge>
                        <span className="text-xs text-muted-foreground">v{prompt.version}</span>
                        {prompt.performanceRating >= 4 && (
                          <div className="flex items-center gap-1 text-xs text-accent">
                            <Star weight="fill" size={14} />
                            <span>{prompt.performanceRating.toFixed(1)}</span>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-sm mb-3 whitespace-pre-wrap break-words">
                        {prompt.promptText}
                      </p>

                      {prompt.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {prompt.tags.map((tag, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              <Tag size={12} className="mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>By {prompt.author}</span>
                        <span>•</span>
                        <span>Success: {prompt.successRate}%</span>
                        <span>•</span>
                        <span>Used {prompt.usageCount} times</span>
                        <span>•</span>
                        <span>Updated {new Date(prompt.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(prompt.promptText, prompt.id)}
                      >
                        {copiedId === prompt.id ? (
                          <CheckCircle weight="fill" className="text-accent" />
                        ) : (
                          <Copy />
                        )}
                      </Button>
                      <Dialog open={editingPrompt?.id === prompt.id} onOpenChange={(open) => !open && resetForm()}>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditPrompt(prompt)}
                          >
                            <PencilSimple />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Edit Prompt</DialogTitle>
                            <DialogDescription>
                              Update your prompt details. A new version will be created.
                            </DialogDescription>
                          </DialogHeader>
                          <PromptForm />
                          <DialogFooter>
                            <Button variant="outline" onClick={() => { setEditingPrompt(null); resetForm(); }}>
                              Cancel
                            </Button>
                            <Button onClick={handleUpdatePrompt}>Update Prompt</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeletePrompt(prompt.id)}
                        className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}
      </Card>
    </div>
  )
}
