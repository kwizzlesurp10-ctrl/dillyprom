import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { 
  Database, 
  GitBranch, 
  ChartLine, 
  MagnifyingGlass,
  Plus,
  ArrowRight,
  CheckCircle,
  DownloadSimple,
  Gear,
  Archive
} from '@phosphor-icons/react'

export function HowToUse() {
  return (
    <div className="space-y-6">
      <Card className="p-8 border-primary/20">
        <h2 className="text-3xl font-bold mb-4">How to Use the Prompt Vault</h2>
        <Separator className="my-4" />
        
        <div className="prose prose-slate max-w-none">
          <p className="text-lg leading-relaxed mb-6">
            The Prompt Vault is both a comprehensive technical specification and an interactive tool for 
            managing your AI prompts. Follow this guide to get started with organizing and optimizing your prompt library.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Getting Started</h3>
          
          <div className="space-y-6">
            <Card className="p-6 border-l-4 border-l-accent">
              <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Plus className="text-accent" weight="bold" />
                    Create Your Prompts
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Navigate to the <Badge className="inline-flex mx-1">My Prompts</Badge> tab to add your AI prompts. 
                    Each prompt should include:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-accent mt-0.5 flex-shrink-0" weight="fill" size={16} />
                      <span><strong>Prompt Text:</strong> The actual prompt content you'll use with AI models</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-accent mt-0.5 flex-shrink-0" weight="fill" size={16} />
                      <span><strong>Category:</strong> Organize by type (Code Generation, Analysis, Creative Writing, etc.)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-accent mt-0.5 flex-shrink-0" weight="fill" size={16} />
                      <span><strong>Tags:</strong> Add searchable keywords for quick filtering</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-accent mt-0.5 flex-shrink-0" weight="fill" size={16} />
                      <span><strong>AI Model:</strong> Specify the target model (GPT-4, Claude, etc.)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-accent mt-0.5 flex-shrink-0" weight="fill" size={16} />
                      <span><strong>Performance Metrics:</strong> Track rating and success rate</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-l-accent">
              <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <MagnifyingGlass className="text-accent" weight="bold" />
                    Search and Filter
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Use the search and filter tools in the My Prompts tab to quickly find specific prompts:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="text-accent mt-0.5 flex-shrink-0" weight="bold" size={16} />
                      <span>Filter by category to view related prompts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="text-accent mt-0.5 flex-shrink-0" weight="bold" size={16} />
                      <span>Search by keywords in prompt text or tags</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="text-accent mt-0.5 flex-shrink-0" weight="bold" size={16} />
                      <span>Sort by performance rating or usage count</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-l-accent">
              <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <GitBranch className="text-accent" weight="bold" />
                    Version and Iterate
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Track prompt improvements over time by updating existing prompts. The system automatically:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="text-accent mt-0.5 flex-shrink-0" weight="bold" size={16} />
                      <span>Maintains version history with timestamps</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="text-accent mt-0.5 flex-shrink-0" weight="bold" size={16} />
                      <span>Records who made changes and when</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="text-accent mt-0.5 flex-shrink-0" weight="bold" size={16} />
                      <span>Allows you to compare different versions</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-l-accent">
              <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <ChartLine className="text-accent" weight="bold" />
                    Analyze Performance
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Update performance metrics to identify your best prompts:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="text-accent mt-0.5 flex-shrink-0" weight="bold" size={16} />
                      <span>Rate prompts from 0-5 based on output quality</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="text-accent mt-0.5 flex-shrink-0" weight="bold" size={16} />
                      <span>Track success rate percentage (0-100%)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="text-accent mt-0.5 flex-shrink-0" weight="bold" size={16} />
                      <span>Monitor usage count to find your most-used prompts</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          <h3 className="text-2xl font-semibold mt-12 mb-4">Understanding the Technical Specification</h3>
          
          <p className="text-muted-foreground mb-6">
            The other tabs provide comprehensive technical documentation for implementing a production-scale 
            Prompt Vault using Apache Spark:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <Card className="p-6 hover:border-accent/50 transition-colors cursor-pointer">
              <div className="flex items-start gap-3">
                <Database className="text-accent mt-1" size={24} weight="duotone" />
                <div>
                  <h4 className="font-semibold mb-2">Data Model</h4>
                  <p className="text-sm text-muted-foreground">
                    Learn about the schema structure, field types, and how data is organized in Spark DataFrames
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:border-accent/50 transition-colors cursor-pointer">
              <div className="flex items-start gap-3">
                <DownloadSimple className="text-accent mt-1" size={24} weight="duotone" />
                <div>
                  <h4 className="font-semibold mb-2">Ingestion</h4>
                  <p className="text-sm text-muted-foreground">
                    Import prompts from CSV, databases, APIs, or real-time streams using various Spark connectors
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:border-accent/50 transition-colors cursor-pointer">
              <div className="flex items-start gap-3">
                <Gear className="text-accent mt-1" size={24} weight="duotone" />
                <div>
                  <h4 className="font-semibold mb-2">Processing</h4>
                  <p className="text-sm text-muted-foreground">
                    Explore code examples for categorizing, versioning, analyzing, and searching prompts at scale
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:border-accent/50 transition-colors cursor-pointer">
              <div className="flex items-start gap-3">
                <Archive className="text-accent mt-1" size={24} weight="duotone" />
                <div>
                  <h4 className="font-semibold mb-2">Storage</h4>
                  <p className="text-sm text-muted-foreground">
                    Understand storage formats, Delta Lake implementation, and optimization strategies
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="bg-accent/10 border-l-4 border-l-accent p-6 rounded-r-lg mt-8">
            <h4 className="font-semibold mb-2 text-lg">💡 Pro Tip</h4>
            <p className="text-sm text-muted-foreground">
              Start by adding a few test prompts in the My Prompts tab, then explore the technical specification 
              tabs to understand how to scale your prompt management to production with Apache Spark. All your 
              prompts are automatically saved and persist between sessions.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
