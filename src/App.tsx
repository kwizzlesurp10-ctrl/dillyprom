import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { 
  Database, 
  DownloadSimple, 
  Gear, 
  Archive, 
  Code,
  MagnifyingGlass,
  Copy,
  CheckCircle,
  Sparkle,
  BookOpen,
  Plus
} from '@phosphor-icons/react'
import { toast, Toaster } from 'sonner'
import { PromptManager } from '@/components/PromptManager'
import { HowToUse } from '@/components/HowToUse'

function App() {
  const [activeTab, setActiveTab] = useState('how-to-use')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = async (code: string, id: string) => {
    await navigator.clipboard.writeText(code)
    setCopiedCode(id)
    toast.success('Code copied to clipboard')
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const CodeBlock = ({ code, language, id }: { code: string; language: string; id: string }) => (
    <div className="relative group my-6">
      <div className="flex items-center justify-between px-4 py-2 bg-[var(--code-bg)] rounded-t-lg border border-b-0 border-primary/20">
        <Badge variant="secondary" className="bg-primary/10 text-accent-foreground font-mono text-xs">
          {language}
        </Badge>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => copyToClipboard(code, id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity h-8 text-muted-foreground hover:text-accent"
        >
          {copiedCode === id ? (
            <CheckCircle className="text-accent" weight="fill" />
          ) : (
            <Copy />
          )}
        </Button>
      </div>
      <ScrollArea className="w-full rounded-b-lg border border-primary/20">
        <pre className="p-4 bg-[var(--code-bg)] text-[var(--code-text)] text-sm overflow-x-auto">
          <code className="font-mono">{code}</code>
        </pre>
      </ScrollArea>
    </div>
  )

  const SchemaTable = () => (
    <div className="my-6 border border-border rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold">Field Name</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Data Type</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-border">
            <td className="px-4 py-3 font-mono text-sm text-accent">prompt_id</td>
            <td className="px-4 py-3 font-mono text-sm">StringType</td>
            <td className="px-4 py-3 text-sm">Unique identifier (UUID)</td>
          </tr>
          <tr className="border-t border-border bg-muted/30">
            <td className="px-4 py-3 font-mono text-sm text-accent">prompt_text</td>
            <td className="px-4 py-3 font-mono text-sm">StringType</td>
            <td className="px-4 py-3 text-sm">The actual prompt content</td>
          </tr>
          <tr className="border-t border-border">
            <td className="px-4 py-3 font-mono text-sm text-accent">category</td>
            <td className="px-4 py-3 font-mono text-sm">StringType</td>
            <td className="px-4 py-3 text-sm">Primary category (e.g., "Code Generation", "Analysis")</td>
          </tr>
          <tr className="border-t border-border bg-muted/30">
            <td className="px-4 py-3 font-mono text-sm text-accent">tags</td>
            <td className="px-4 py-3 font-mono text-sm">ArrayType(StringType)</td>
            <td className="px-4 py-3 text-sm">Array of searchable tags</td>
          </tr>
          <tr className="border-t border-border">
            <td className="px-4 py-3 font-mono text-sm text-accent">ai_model</td>
            <td className="px-4 py-3 font-mono text-sm">StringType</td>
            <td className="px-4 py-3 text-sm">Target AI model (e.g., "gpt-4", "claude-3")</td>
          </tr>
          <tr className="border-t border-border bg-muted/30">
            <td className="px-4 py-3 font-mono text-sm text-accent">created_at</td>
            <td className="px-4 py-3 font-mono text-sm">TimestampType</td>
            <td className="px-4 py-3 text-sm">Creation timestamp</td>
          </tr>
          <tr className="border-t border-border">
            <td className="px-4 py-3 font-mono text-sm text-accent">updated_at</td>
            <td className="px-4 py-3 font-mono text-sm">TimestampType</td>
            <td className="px-4 py-3 text-sm">Last modification timestamp</td>
          </tr>
          <tr className="border-t border-border bg-muted/30">
            <td className="px-4 py-3 font-mono text-sm text-accent">author</td>
            <td className="px-4 py-3 font-mono text-sm">StringType</td>
            <td className="px-4 py-3 text-sm">Creator/owner of the prompt</td>
          </tr>
          <tr className="border-t border-border">
            <td className="px-4 py-3 font-mono text-sm text-accent">version</td>
            <td className="px-4 py-3 font-mono text-sm">IntegerType</td>
            <td className="px-4 py-3 text-sm">Current version number</td>
          </tr>
          <tr className="border-t border-border bg-muted/30">
            <td className="px-4 py-3 font-mono text-sm text-accent">version_history</td>
            <td className="px-4 py-3 font-mono text-sm">ArrayType(StructType)</td>
            <td className="px-4 py-3 text-sm">Array of version records (timestamp, author, changes)</td>
          </tr>
          <tr className="border-t border-border">
            <td className="px-4 py-3 font-mono text-sm text-accent">performance_rating</td>
            <td className="px-4 py-3 font-mono text-sm">DoubleType</td>
            <td className="px-4 py-3 text-sm">Average user rating (0.0-5.0)</td>
          </tr>
          <tr className="border-t border-border bg-muted/30">
            <td className="px-4 py-3 font-mono text-sm text-accent">success_rate</td>
            <td className="px-4 py-3 font-mono text-sm">DoubleType</td>
            <td className="px-4 py-3 text-sm">Success percentage (0.0-100.0)</td>
          </tr>
          <tr className="border-t border-border">
            <td className="px-4 py-3 font-mono text-sm text-accent">usage_count</td>
            <td className="px-4 py-3 font-mono text-sm">LongType</td>
            <td className="px-4 py-3 text-sm">Number of times prompt has been used</td>
          </tr>
          <tr className="border-t border-border bg-muted/30">
            <td className="px-4 py-3 font-mono text-sm text-accent">output_examples</td>
            <td className="px-4 py-3 font-mono text-sm">ArrayType(StringType)</td>
            <td className="px-4 py-3 text-sm">Sample outputs generated by this prompt</td>
          </tr>
        </tbody>
      </table>
    </div>
  )

  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="min-h-screen bg-background">
        <div className="border-b border-border bg-card">
          <div className="container mx-auto px-6 py-8">
            <div className="flex items-center gap-3 mb-2">
              <Sparkle size={40} weight="fill" className="text-accent" />
              <h1 className="text-4xl font-bold tracking-tight">Prompt Vault</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Apache Spark Technical Specification for Scalable AI Prompt Management
            </p>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-8 h-auto p-1 bg-muted/50">
            <TabsTrigger value="how-to-use" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <BookOpen className="mr-2" />
              How to Use
            </TabsTrigger>
            <TabsTrigger value="manage-prompts" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Plus className="mr-2" />
              My Prompts
            </TabsTrigger>
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Database className="mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="model" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Database className="mr-2" />
              Data Model
            </TabsTrigger>
            <TabsTrigger value="ingestion" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <DownloadSimple className="mr-2" />
              Ingestion
            </TabsTrigger>
            <TabsTrigger value="processing" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Gear className="mr-2" />
              Processing
            </TabsTrigger>
            <TabsTrigger value="storage" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Archive className="mr-2" />
              Storage
            </TabsTrigger>
          </TabsList>

          <TabsContent value="how-to-use">
            <HowToUse />
          </TabsContent>

          <TabsContent value="manage-prompts">
            <PromptManager />
          </TabsContent>

          <TabsContent value="overview" className="space-y-6">
            <Card className="p-8 border-primary/20">
              <h2 className="text-3xl font-bold mb-4">System Overview</h2>
              <Separator className="my-4" />
              
              <div className="prose prose-slate max-w-none">
                <p className="text-lg leading-relaxed mb-6">
                  The <strong>Prompt Vault</strong> is a comprehensive, scalable system designed for managing, organizing, 
                  versioning, and analyzing AI prompts using Apache Spark for distributed data processing. This architecture 
                  enables organizations to treat prompts as critical data assets with full lifecycle management.
                </p>

                <h3 className="text-2xl font-semibold mt-8 mb-4">Key Capabilities</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                  <Card className="p-6 border-l-4 border-l-accent">
                    <h4 className="font-semibold text-lg mb-2">Scalable Storage</h4>
                    <p className="text-sm text-muted-foreground">
                      Handle millions of prompts with distributed processing using Spark DataFrames and optimized storage formats.
                    </p>
                  </Card>
                  
                  <Card className="p-6 border-l-4 border-l-accent">
                    <h4 className="font-semibold text-lg mb-2">Version Control</h4>
                    <p className="text-sm text-muted-foreground">
                      Track every iteration of prompts with timestamps, authors, and change history for complete auditability.
                    </p>
                  </Card>
                  
                  <Card className="p-6 border-l-4 border-l-accent">
                    <h4 className="font-semibold text-lg mb-2">Performance Analytics</h4>
                    <p className="text-sm text-muted-foreground">
                      Aggregate and analyze prompt performance metrics to identify top-performing patterns and optimize results.
                    </p>
                  </Card>
                  
                  <Card className="p-6 border-l-4 border-l-accent">
                    <h4 className="font-semibold text-lg mb-2">Advanced Search</h4>
                    <p className="text-sm text-muted-foreground">
                      Quickly locate prompts using tags, categories, keywords, and performance filters with SQL-based queries.
                    </p>
                  </Card>
                </div>

                <h3 className="text-2xl font-semibold mt-8 mb-4">Architecture Principles</h3>
                
                <ul className="space-y-3 my-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-accent mt-1 flex-shrink-0" weight="fill" />
                    <div>
                      <strong>Data-Driven Optimization:</strong> Use metrics and analytics to continuously improve prompt quality
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-accent mt-1 flex-shrink-0" weight="fill" />
                    <div>
                      <strong>Horizontal Scalability:</strong> Leverage Spark's distributed computing to handle growing datasets
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-accent mt-1 flex-shrink-0" weight="fill" />
                    <div>
                      <strong>Schema Evolution:</strong> Support schema changes over time without breaking existing data
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-accent mt-1 flex-shrink-0" weight="fill" />
                    <div>
                      <strong>Multi-Source Integration:</strong> Ingest prompts from various sources including CSV, databases, and APIs
                    </div>
                  </li>
                </ul>

                <h3 className="text-2xl font-semibold mt-8 mb-4">Technology Stack</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-6">
                  <Badge className="py-2 px-4 text-center justify-center bg-primary">Apache Spark 3.x</Badge>
                  <Badge className="py-2 px-4 text-center justify-center bg-primary">PySpark</Badge>
                  <Badge className="py-2 px-4 text-center justify-center bg-primary">Delta Lake</Badge>
                  <Badge className="py-2 px-4 text-center justify-center bg-primary">Parquet</Badge>
                  <Badge className="py-2 px-4 text-center justify-center bg-secondary">Spark SQL</Badge>
                  <Badge className="py-2 px-4 text-center justify-center bg-secondary">Python 3.8+</Badge>
                  <Badge className="py-2 px-4 text-center justify-center bg-secondary">HDFS / S3</Badge>
                  <Badge className="py-2 px-4 text-center justify-center bg-secondary">Databricks</Badge>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="model" className="space-y-6">
            <Card className="p-8 border-primary/20">
              <h2 className="text-3xl font-bold mb-4">Data Model Definition</h2>
              <Separator className="my-4" />
              
              <p className="text-lg mb-6">
                The Prompt Vault uses a structured schema defined with Spark SQL <code className="px-2 py-1 bg-muted rounded text-sm font-mono">StructType</code> 
                to ensure consistent data storage and efficient query performance.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Schema Definition</h3>
              
              <SchemaTable />

              <h3 className="text-2xl font-semibold mt-8 mb-4">PySpark Schema Implementation</h3>

              <CodeBlock
                language="python"
                id="schema-def"
                code={`from pyspark.sql.types import (
    StructType, StructField, StringType, IntegerType, 
    LongType, DoubleType, TimestampType, ArrayType
)
from datetime import datetime

# Define version history nested structure
version_history_schema = StructType([
    StructField("version_number", IntegerType(), False),
    StructField("timestamp", TimestampType(), False),
    StructField("author", StringType(), False),
    StructField("changes_description", StringType(), True),
    StructField("previous_text", StringType(), True)
])

# Define main prompt schema
prompt_schema = StructType([
    StructField("prompt_id", StringType(), False),
    StructField("prompt_text", StringType(), False),
    StructField("category", StringType(), False),
    StructField("tags", ArrayType(StringType()), True),
    StructField("ai_model", StringType(), False),
    StructField("created_at", TimestampType(), False),
    StructField("updated_at", TimestampType(), False),
    StructField("author", StringType(), False),
    StructField("version", IntegerType(), False),
    StructField("version_history", ArrayType(version_history_schema), True),
    StructField("performance_rating", DoubleType(), True),
    StructField("success_rate", DoubleType(), True),
    StructField("usage_count", LongType(), False),
    StructField("output_examples", ArrayType(StringType()), True)
])`}
              />

              <Accordion type="single" collapsible className="mt-6">
                <AccordionItem value="schema-notes">
                  <AccordionTrigger className="text-lg font-semibold">Schema Design Notes</AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <div>
                      <h4 className="font-semibold mb-2">Nested Structures</h4>
                      <p className="text-muted-foreground">
                        The <code className="px-1 py-0.5 bg-muted rounded text-sm">version_history</code> field uses a nested 
                        StructType to maintain complete version lineage without requiring separate tables.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Array Fields</h4>
                      <p className="text-muted-foreground">
                        Tags and output examples use ArrayType for flexible, multi-valued attributes that can be easily queried 
                        with Spark SQL array functions.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Nullable Constraints</h4>
                      <p className="text-muted-foreground">
                        Critical fields like prompt_id, prompt_text, and timestamps are non-nullable to ensure data integrity. 
                        Optional fields like performance metrics allow for gradual data enrichment.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          </TabsContent>

          <TabsContent value="ingestion" className="space-y-6">
            <Card className="p-8 border-primary/20">
              <h2 className="text-3xl font-bold mb-4">Data Ingestion Strategy</h2>
              <Separator className="my-4" />
              
              <p className="text-lg mb-6">
                The Prompt Vault supports multiple ingestion patterns to accommodate various data sources and use cases, 
                from batch imports to real-time streaming.
              </p>

              <Accordion type="multiple" className="space-y-4">
                <AccordionItem value="csv-ingestion" className="border border-border rounded-lg px-4">
                  <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                    CSV File Ingestion
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <p className="mb-4 text-muted-foreground">
                      Load prompts from CSV files with automatic schema inference and validation.
                    </p>
                    
                    <CodeBlock
                      language="python"
                      id="csv-ingest"
                      code={`from pyspark.sql import SparkSession
from pyspark.sql.functions import col, current_timestamp, monotonically_increasing_id
import uuid

spark = SparkSession.builder \\
    .appName("PromptVault-Ingestion") \\
    .config("spark.sql.adaptive.enabled", "true") \\
    .getOrCreate()

# Read CSV with header and infer schema
raw_prompts = spark.read \\
    .option("header", "true") \\
    .option("inferSchema", "true") \\
    .option("multiLine", "true") \\
    .option("escape", "\\"") \\
    .csv("s3://prompt-vault/incoming/prompts.csv")

# Transform and enrich data
prompts_df = raw_prompts \\
    .withColumn("prompt_id", expr("uuid()")) \\
    .withColumn("created_at", current_timestamp()) \\
    .withColumn("updated_at", current_timestamp()) \\
    .withColumn("version", lit(1)) \\
    .withColumn("usage_count", lit(0)) \\
    .select(
        "prompt_id", "prompt_text", "category", "tags",
        "ai_model", "created_at", "updated_at", "author",
        "version", "version_history", "performance_rating",
        "success_rate", "usage_count", "output_examples"
    )

# Validate and filter invalid records
valid_prompts = prompts_df \\
    .filter(col("prompt_text").isNotNull()) \\
    .filter(col("category").isNotNull()) \\
    .filter(col("ai_model").isNotNull())`}
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="db-ingestion" className="border border-border rounded-lg px-4">
                  <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                    Database Ingestion (JDBC)
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <p className="mb-4 text-muted-foreground">
                      Connect to relational databases and extract prompt data using JDBC connectors.
                    </p>
                    
                    <CodeBlock
                      language="python"
                      id="db-ingest"
                      code={`# JDBC connection configuration
jdbc_url = "jdbc:postgresql://db.example.com:5432/promptvault"
connection_properties = {
    "user": "vault_reader",
    "password": "secure_password",
    "driver": "org.postgresql.Driver",
    "fetchsize": "10000"
}

# Read from database table
db_prompts = spark.read.jdbc(
    url=jdbc_url,
    table="prompts",
    properties=connection_properties
)

# Optional: Incremental ingestion using watermark
max_timestamp_query = """
    (SELECT * FROM prompts 
     WHERE updated_at > '2024-01-01 00:00:00'
     ORDER BY updated_at) AS incremental_prompts
"""

incremental_prompts = spark.read.jdbc(
    url=jdbc_url,
    table=max_timestamp_query,
    properties=connection_properties
)

# Transform to match schema
transformed_prompts = db_prompts \\
    .withColumn("tags", split(col("tags_csv"), ",")) \\
    .withColumn("output_examples", split(col("examples_csv"), "|")) \\
    .select(*[field.name for field in prompt_schema.fields])`}
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="api-ingestion" className="border border-border rounded-lg px-4">
                  <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                    API / JSON Ingestion
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <p className="mb-4 text-muted-foreground">
                      Ingest prompts from REST APIs or JSON files with complex nested structures.
                    </p>
                    
                    <CodeBlock
                      language="python"
                      id="api-ingest"
                      code={`from pyspark.sql.functions import explode, col

# Read JSON data (from API response saved to S3)
json_prompts = spark.read \\
    .option("multiLine", "true") \\
    .json("s3://prompt-vault/api-exports/prompts.json")

# Handle nested JSON structures
flattened_prompts = json_prompts \\
    .select(
        col("id").alias("prompt_id"),
        col("content.text").alias("prompt_text"),
        col("metadata.category").alias("category"),
        col("metadata.tags").alias("tags"),
        col("model").alias("ai_model"),
        col("created").cast("timestamp").alias("created_at"),
        col("modified").cast("timestamp").alias("updated_at"),
        col("owner").alias("author"),
        col("version_num").alias("version"),
        col("history").alias("version_history"),
        col("metrics.rating").alias("performance_rating"),
        col("metrics.success_rate").alias("success_rate"),
        col("metrics.usage").alias("usage_count"),
        col("examples").alias("output_examples")
    )

# Validate against schema
validated_prompts = spark.createDataFrame(
    flattened_prompts.rdd, 
    schema=prompt_schema
)`}
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="streaming-ingestion" className="border border-border rounded-lg px-4">
                  <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                    Real-Time Streaming Ingestion
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <p className="mb-4 text-muted-foreground">
                      Process prompts in real-time using Spark Structured Streaming from Kafka or other sources.
                    </p>
                    
                    <CodeBlock
                      language="python"
                      id="stream-ingest"
                      code={`from pyspark.sql.functions import from_json

# Define Kafka source
kafka_stream = spark.readStream \\
    .format("kafka") \\
    .option("kafka.bootstrap.servers", "kafka:9092") \\
    .option("subscribe", "prompt-submissions") \\
    .option("startingOffsets", "latest") \\
    .load()

# Parse JSON from Kafka messages
parsed_stream = kafka_stream \\
    .select(from_json(col("value").cast("string"), prompt_schema).alias("data")) \\
    .select("data.*")

# Write stream to Delta Lake with checkpointing
query = parsed_stream.writeStream \\
    .format("delta") \\
    .outputMode("append") \\
    .option("checkpointLocation", "s3://prompt-vault/checkpoints/ingestion") \\
    .option("mergeSchema", "true") \\
    .start("s3://prompt-vault/delta/prompts")

query.awaitTermination()`}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          </TabsContent>

          <TabsContent value="processing" className="space-y-6">
            <Card className="p-8 border-primary/20">
              <h2 className="text-3xl font-bold mb-4">Spark Data Processing & Management</h2>
              <Separator className="my-4" />
              
              <p className="text-lg mb-6">
                Comprehensive data processing operations for organizing, versioning, analyzing, and searching prompts at scale.
              </p>

              <Accordion type="multiple" className="space-y-4" defaultValue={["categorization"]}>
                <AccordionItem value="categorization" className="border border-border rounded-lg px-4">
                  <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                    Organizing and Categorizing Prompts
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <p className="mb-4 text-muted-foreground">
                      Use Spark SQL to automatically categorize and tag prompts based on content analysis.
                    </p>
                    
                    <CodeBlock
                      language="python"
                      id="categorization"
                      code={`from pyspark.sql.functions import when, col, array_contains, lower, trim

# Create temporary view for SQL queries
prompts_df.createOrReplaceTempView("prompts")

# SQL-based categorization
categorized_prompts = spark.sql("""
    SELECT 
        *,
        CASE
            WHEN array_contains(tags, 'python') OR lower(prompt_text) LIKE '%python%' 
                THEN 'Code Generation'
            WHEN array_contains(tags, 'analysis') OR lower(prompt_text) LIKE '%analyze%'
                THEN 'Data Analysis'
            WHEN array_contains(tags, 'creative') OR array_contains(tags, 'writing')
                THEN 'Creative Writing'
            WHEN array_contains(tags, 'summary') OR lower(prompt_text) LIKE '%summarize%'
                THEN 'Summarization'
            ELSE category
        END AS refined_category
    FROM prompts
""")

# Tag enrichment based on patterns
from pyspark.sql.functions import array_union, array, lit

enriched_prompts = categorized_prompts \\
    .withColumn("tags",
        when(lower(col("prompt_text")).contains("sql"), 
             array_union(col("tags"), array(lit("sql"))))
        .when(lower(col("prompt_text")).contains("api"),
             array_union(col("tags"), array(lit("api"))))
        .otherwise(col("tags"))
    )

# Group and aggregate by category
category_stats = spark.sql("""
    SELECT 
        category,
        COUNT(*) as prompt_count,
        AVG(performance_rating) as avg_rating,
        AVG(success_rate) as avg_success_rate,
        COLLECT_LIST(prompt_id) as prompt_ids
    FROM prompts
    GROUP BY category
    ORDER BY prompt_count DESC
""")`}
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="versioning" className="border border-border rounded-lg px-4">
                  <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                    Version Tracking and Management
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <p className="mb-4 text-muted-foreground">
                      Track prompt iterations over time with complete version history and rollback capability.
                    </p>
                    
                    <CodeBlock
                      language="python"
                      id="versioning"
                      code={`from pyspark.sql.functions import struct, array_union, current_timestamp, lit
from delta.tables import DeltaTable

# Function to create a new version of a prompt
def create_new_version(prompt_id, new_text, author, changes_desc):
    """
    Creates a new version of an existing prompt
    """
    delta_table = DeltaTable.forPath(spark, "s3://prompt-vault/delta/prompts")
    
    # Read current version
    current = spark.read.format("delta") \\
        .load("s3://prompt-vault/delta/prompts") \\
        .filter(col("prompt_id") == prompt_id) \\
        .first()
    
    # Create version record
    new_version_record = struct(
        (col("version") + 1).alias("version_number"),
        current_timestamp().alias("timestamp"),
        lit(author).alias("author"),
        lit(changes_desc).alias("changes_description"),
        col("prompt_text").alias("previous_text")
    )
    
    # Update with new version
    delta_table.update(
        condition = col("prompt_id") == prompt_id,
        set = {
            "prompt_text": lit(new_text),
            "version": col("version") + 1,
            "updated_at": current_timestamp(),
            "version_history": array_union(
                col("version_history"),
                array(new_version_record)
            )
        }
    )

# Query version history
version_analysis = spark.sql("""
    SELECT 
        prompt_id,
        prompt_text,
        version,
        SIZE(version_history) as total_versions,
        version_history[0].timestamp as first_version_date,
        version_history[SIZE(version_history)-1].timestamp as latest_version_date,
        DATEDIFF(
            version_history[SIZE(version_history)-1].timestamp,
            version_history[0].timestamp
        ) as days_in_development
    FROM prompts
    WHERE SIZE(version_history) > 0
    ORDER BY total_versions DESC
""")

# Track version improvements
version_performance = spark.sql("""
    SELECT 
        p.prompt_id,
        p.category,
        v.version_number,
        v.timestamp,
        v.author,
        LAG(p.performance_rating) OVER (
            PARTITION BY p.prompt_id 
            ORDER BY v.version_number
        ) as previous_rating,
        p.performance_rating as current_rating,
        p.performance_rating - LAG(p.performance_rating) OVER (
            PARTITION BY p.prompt_id 
            ORDER BY v.version_number
        ) as rating_improvement
    FROM prompts p
    LATERAL VIEW EXPLODE(p.version_history) vh AS v
    ORDER BY p.prompt_id, v.version_number
""")`}
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="performance" className="border border-border rounded-lg px-4">
                  <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                    Performance Analysis and Metrics
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <p className="mb-4 text-muted-foreground">
                      Aggregate and analyze performance metrics to identify top-performing prompts and patterns.
                    </p>
                    
                    <CodeBlock
                      language="python"
                      id="performance"
                      code={`from pyspark.sql.functions import (
    avg, max, min, stddev, percentile_approx, 
    count, sum as _sum, desc, rank
)
from pyspark.sql.window import Window

# Calculate comprehensive performance metrics
performance_metrics = spark.sql("""
    SELECT 
        category,
        ai_model,
        COUNT(*) as total_prompts,
        AVG(performance_rating) as avg_rating,
        STDDEV(performance_rating) as rating_std_dev,
        PERCENTILE_APPROX(performance_rating, 0.5) as median_rating,
        PERCENTILE_APPROX(performance_rating, 0.95) as p95_rating,
        AVG(success_rate) as avg_success_rate,
        MAX(success_rate) as max_success_rate,
        SUM(usage_count) as total_usage,
        AVG(usage_count) as avg_usage_per_prompt
    FROM prompts
    GROUP BY category, ai_model
    ORDER BY avg_rating DESC, total_usage DESC
""")

# Identify top-performing prompts
window_spec = Window.partitionBy("category").orderBy(desc("performance_rating"))

top_prompts = prompts_df \\
    .withColumn("rank", rank().over(window_spec)) \\
    .filter(col("rank") <= 10) \\
    .select(
        "prompt_id", "prompt_text", "category", "tags",
        "performance_rating", "success_rate", "usage_count", "rank"
    )

# Trend analysis - performance over time
performance_trends = spark.sql("""
    SELECT 
        DATE_TRUNC('week', created_at) as week,
        category,
        COUNT(*) as prompts_created,
        AVG(performance_rating) as avg_rating,
        AVG(success_rate) as avg_success_rate
    FROM prompts
    WHERE created_at >= DATE_SUB(CURRENT_DATE(), 90)
    GROUP BY DATE_TRUNC('week', created_at), category
    ORDER BY week DESC, category
""")

# Tag performance analysis
tag_performance = spark.sql("""
    SELECT 
        tag,
        COUNT(*) as prompt_count,
        AVG(performance_rating) as avg_rating,
        AVG(success_rate) as avg_success_rate,
        SUM(usage_count) as total_usage
    FROM prompts
    LATERAL VIEW EXPLODE(tags) tags_table AS tag
    GROUP BY tag
    HAVING COUNT(*) >= 5
    ORDER BY avg_rating DESC, total_usage DESC
    LIMIT 50
""")

# Calculate success rate thresholds
success_analysis = prompts_df \\
    .groupBy("category") \\
    .agg(
        avg("success_rate").alias("avg_success_rate"),
        percentile_approx("success_rate", 0.75).alias("success_threshold_75"),
        count("*").alias("total_count")
    ) \\
    .orderBy(desc("avg_success_rate"))`}
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="search" className="border border-border rounded-lg px-4">
                  <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                    Searching and Retrieval
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <p className="mb-4 text-muted-foreground">
                      Implement powerful search capabilities with filters, full-text search, and ranking.
                    </p>
                    
                    <CodeBlock
                      language="python"
                      id="search"
                      code={`from pyspark.sql.functions import array_contains, lower, regexp_extract, size

# Multi-criteria search function
def search_prompts(
    search_term=None,
    categories=None,
    tags=None,
    min_rating=None,
    min_success_rate=None,
    ai_models=None,
    limit=100
):
    """
    Flexible prompt search with multiple filter criteria
    """
    filtered_df = prompts_df
    
    # Text search in prompt content
    if search_term:
        filtered_df = filtered_df.filter(
            lower(col("prompt_text")).contains(search_term.lower())
        )
    
    # Category filter
    if categories:
        filtered_df = filtered_df.filter(col("category").isin(categories))
    
    # Tag filter (match any tag)
    if tags:
        tag_conditions = [array_contains(col("tags"), tag) for tag in tags]
        filtered_df = filtered_df.filter(
            reduce(lambda a, b: a | b, tag_conditions)
        )
    
    # Performance filters
    if min_rating:
        filtered_df = filtered_df.filter(col("performance_rating") >= min_rating)
    
    if min_success_rate:
        filtered_df = filtered_df.filter(col("success_rate") >= min_success_rate)
    
    # AI model filter
    if ai_models:
        filtered_df = filtered_df.filter(col("ai_model").isin(ai_models))
    
    # Rank by relevance (usage * rating)
    return filtered_df \\
        .withColumn("relevance_score", 
                   col("usage_count") * col("performance_rating")) \\
        .orderBy(desc("relevance_score")) \\
        .limit(limit)

# Example searches
high_performers = search_prompts(
    min_rating=4.0,
    min_success_rate=80.0,
    limit=50
)

code_generation_prompts = search_prompts(
    categories=["Code Generation"],
    tags=["python", "sql"],
    min_rating=3.5
)

# Advanced text search with ranking
from pyspark.sql.functions import regexp_count

keyword_search = prompts_df \\
    .filter(
        lower(col("prompt_text")).contains("analyze") |
        lower(col("prompt_text")).contains("generate") |
        lower(col("prompt_text")).contains("create")
    ) \\
    .withColumn("keyword_matches",
        regexp_count(lower(col("prompt_text")), "analyze") +
        regexp_count(lower(col("prompt_text")), "generate") +
        regexp_count(lower(col("prompt_text")), "create")
    ) \\
    .withColumn("tag_count", size(col("tags"))) \\
    .orderBy(
        desc("keyword_matches"),
        desc("performance_rating"),
        desc("usage_count")
    )

# Fuzzy category search
similar_prompts = spark.sql("""
    SELECT 
        p1.prompt_id,
        p1.prompt_text,
        p1.category,
        p2.prompt_id as similar_prompt_id,
        p2.prompt_text as similar_text,
        SIZE(ARRAY_INTERSECT(p1.tags, p2.tags)) as common_tags
    FROM prompts p1
    JOIN prompts p2 
        ON p1.category = p2.category 
        AND p1.prompt_id != p2.prompt_id
    WHERE SIZE(ARRAY_INTERSECT(p1.tags, p2.tags)) >= 3
    ORDER BY common_tags DESC
""")`}
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="optimization" className="border border-border rounded-lg px-4">
                  <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                    Data Optimization Techniques
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <p className="mb-4 text-muted-foreground">
                      Apply Spark optimization strategies for better query performance and storage efficiency.
                    </p>
                    
                    <CodeBlock
                      language="python"
                      id="optimization"
                      code={`# Partition by category and ai_model for efficient filtering
optimized_prompts = prompts_df \\
    .repartition(col("category"), col("ai_model")) \\
    .write \\
    .partitionBy("category", "ai_model") \\
    .format("delta") \\
    .mode("overwrite") \\
    .save("s3://prompt-vault/delta/prompts_optimized")

# Create Z-ordering for common query patterns
from delta.tables import DeltaTable

delta_table = DeltaTable.forPath(spark, "s3://prompt-vault/delta/prompts_optimized")
delta_table.optimize().executeZOrderBy("performance_rating", "created_at")

# Cache frequently accessed data
high_value_prompts = prompts_df \\
    .filter(
        (col("performance_rating") >= 4.0) &
        (col("usage_count") >= 100)
    ) \\
    .cache()

# Broadcast small lookup tables for joins
category_metadata = spark.read.parquet("s3://prompt-vault/metadata/categories")
broadcast_metadata = broadcast(category_metadata)

enriched_prompts = prompts_df.join(
    broadcast_metadata,
    prompts_df.category == broadcast_metadata.category_name,
    "left"
)

# Adaptive Query Execution (enabled by default in Spark 3.x)
spark.conf.set("spark.sql.adaptive.enabled", "true")
spark.conf.set("spark.sql.adaptive.coalescePartitions.enabled", "true")
spark.conf.set("spark.sql.adaptive.skewJoin.enabled", "true")`}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          </TabsContent>

          <TabsContent value="storage" className="space-y-6">
            <Card className="p-8 border-primary/20">
              <h2 className="text-3xl font-bold mb-4">Storage and Persistence</h2>
              <Separator className="my-4" />
              
              <p className="text-lg mb-6">
                Recommended storage formats and strategies for efficient, scalable, and reliable prompt data persistence.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Recommended Storage: Delta Lake</h3>
              
              <div className="bg-accent/10 border-l-4 border-l-accent p-6 rounded-r-lg mb-6">
                <p className="font-semibold mb-2">Why Delta Lake?</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ ACID transactions for data integrity</li>
                  <li>✓ Time travel for version history and audit trails</li>
                  <li>✓ Schema evolution without breaking changes</li>
                  <li>✓ Efficient upserts and deletes</li>
                  <li>✓ Automatic file management and compaction</li>
                  <li>✓ Built on Parquet for columnar storage efficiency</li>
                </ul>
              </div>

              <Accordion type="multiple" className="space-y-4" defaultValue={["delta-write"]}>
                <AccordionItem value="delta-write" className="border border-border rounded-lg px-4">
                  <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                    Writing to Delta Lake
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <CodeBlock
                      language="python"
                      id="delta-write"
                      code={`from delta import DeltaTable
from pyspark.sql.functions import current_timestamp

# Initial write - create Delta table
prompts_df.write \\
    .format("delta") \\
    .mode("overwrite") \\
    .partitionBy("category", "ai_model") \\
    .option("overwriteSchema", "true") \\
    .option("delta.autoOptimize.optimizeWrite", "true") \\
    .option("delta.autoOptimize.autoCompact", "true") \\
    .save("s3://prompt-vault/delta/prompts")

# Append new prompts
new_prompts_df.write \\
    .format("delta") \\
    .mode("append") \\
    .save("s3://prompt-vault/delta/prompts")

# Upsert (merge) for updates
delta_table = DeltaTable.forPath(spark, "s3://prompt-vault/delta/prompts")

delta_table.alias("target").merge(
    updated_prompts_df.alias("source"),
    "target.prompt_id = source.prompt_id"
).whenMatchedUpdate(
    set = {
        "prompt_text": "source.prompt_text",
        "updated_at": current_timestamp(),
        "version": "target.version + 1",
        "performance_rating": "source.performance_rating",
        "success_rate": "source.success_rate",
        "usage_count": "target.usage_count + source.usage_count"
    }
).whenNotMatchedInsertAll() \\
.execute()

# Soft delete (mark as inactive)
delta_table.update(
    condition = "prompt_id IN ('id1', 'id2', 'id3')",
    set = {"is_active": "false", "deleted_at": current_timestamp()}
)`}
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="delta-read" className="border border-border rounded-lg px-4">
                  <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                    Reading from Delta Lake
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <CodeBlock
                      language="python"
                      id="delta-read"
                      code={`# Standard read - latest version
prompts_df = spark.read \\
    .format("delta") \\
    .load("s3://prompt-vault/delta/prompts")

# Time travel - read historical data
prompts_yesterday = spark.read \\
    .format("delta") \\
    .option("timestampAsOf", "2024-01-15 00:00:00") \\
    .load("s3://prompt-vault/delta/prompts")

# Version-based time travel
prompts_v10 = spark.read \\
    .format("delta") \\
    .option("versionAsOf", 10) \\
    .load("s3://prompt-vault/delta/prompts")

# Optimized partition pruning
code_prompts = spark.read \\
    .format("delta") \\
    .load("s3://prompt-vault/delta/prompts") \\
    .filter(col("category") == "Code Generation")

# View table history
delta_table = DeltaTable.forPath(spark, "s3://prompt-vault/delta/prompts")
history_df = delta_table.history()
history_df.select("version", "timestamp", "operation", "operationMetrics").show()

# Describe table details
detail_df = delta_table.detail()
detail_df.select("format", "partitionColumns", "numFiles", "sizeInBytes").show()`}
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="parquet" className="border border-border rounded-lg px-4">
                  <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                    Alternative: Parquet Storage
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <p className="mb-4 text-muted-foreground">
                      For simpler use cases without the need for ACID transactions or time travel.
                    </p>
                    
                    <CodeBlock
                      language="python"
                      id="parquet"
                      code={`# Write to Parquet with compression
prompts_df.write \\
    .mode("overwrite") \\
    .partitionBy("category", "ai_model") \\
    .option("compression", "snappy") \\
    .parquet("s3://prompt-vault/parquet/prompts")

# Read from Parquet
prompts_df = spark.read \\
    .parquet("s3://prompt-vault/parquet/prompts")

# Read with predicate pushdown (partition pruning)
filtered_prompts = spark.read \\
    .parquet("s3://prompt-vault/parquet/prompts") \\
    .filter(
        (col("category") == "Code Generation") &
        (col("ai_model") == "gpt-4")
    )

# Read specific columns (columnar read efficiency)
lightweight_df = spark.read \\
    .parquet("s3://prompt-vault/parquet/prompts") \\
    .select("prompt_id", "prompt_text", "category", "performance_rating")`}
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="maintenance" className="border border-border rounded-lg px-4">
                  <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                    Table Maintenance and Optimization
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <CodeBlock
                      language="python"
                      id="maintenance"
                      code={`from delta.tables import DeltaTable

delta_table = DeltaTable.forPath(spark, "s3://prompt-vault/delta/prompts")

# Optimize - compact small files
delta_table.optimize().executeCompaction()

# Z-order by commonly filtered columns
delta_table.optimize().executeZOrderBy("performance_rating", "created_at", "category")

# Vacuum - remove old files (older than 7 days retention)
delta_table.vacuum(retentionHours=168)

# Update table statistics
spark.sql("ANALYZE TABLE delta.\`s3://prompt-vault/delta/prompts\` COMPUTE STATISTICS")

# Optimize write configuration
spark.conf.set("spark.databricks.delta.optimizeWrite.enabled", "true")
spark.conf.set("spark.databricks.delta.autoCompact.enabled", "true")
spark.conf.set("spark.sql.files.maxPartitionBytes", "134217728")  # 128 MB
spark.conf.set("spark.sql.files.maxRecordsPerFile", "1000000")

# Data quality checks
from pyspark.sql.functions import col, count, isnan, isnull

quality_report = prompts_df.select([
    count(when(col(c).isNull(), c)).alias(f"{c}_nulls")
    for c in prompts_df.columns
])

# Check for duplicates
duplicate_check = prompts_df \\
    .groupBy("prompt_id") \\
    .count() \\
    .filter(col("count") > 1)

if duplicate_check.count() > 0:
    print("WARNING: Duplicate prompt_ids found")
    duplicate_check.show()`}
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="complete-example" className="border border-border rounded-lg px-4">
                  <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                    Complete Implementation Example
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <p className="mb-4 text-muted-foreground">
                      End-to-end example combining ingestion, processing, and storage.
                    </p>
                    
                    <CodeBlock
                      language="python"
                      id="complete"
                      code={`from pyspark.sql import SparkSession
from pyspark.sql.functions import col, current_timestamp, lit
from delta.tables import DeltaTable

# Initialize Spark session
spark = SparkSession.builder \\
    .appName("PromptVault") \\
    .config("spark.sql.extensions", "io.delta.sql.DeltaSparkSessionExtension") \\
    .config("spark.sql.catalog.spark_catalog", "org.apache.spark.sql.delta.catalog.DeltaCatalog") \\
    .config("spark.sql.adaptive.enabled", "true") \\
    .getOrCreate()

# 1. INGEST: Load prompts from CSV
raw_prompts = spark.read \\
    .option("header", "true") \\
    .option("inferSchema", "true") \\
    .csv("s3://prompt-vault/incoming/prompts.csv")

# 2. TRANSFORM: Prepare data
from pyspark.sql.functions import expr

prepared_prompts = raw_prompts \\
    .withColumn("prompt_id", expr("uuid()")) \\
    .withColumn("created_at", current_timestamp()) \\
    .withColumn("updated_at", current_timestamp()) \\
    .withColumn("version", lit(1)) \\
    .withColumn("usage_count", lit(0)) \\
    .filter(col("prompt_text").isNotNull())

# 3. PERSIST: Write to Delta Lake
prepared_prompts.write \\
    .format("delta") \\
    .mode("overwrite") \\
    .partitionBy("category", "ai_model") \\
    .save("s3://prompt-vault/delta/prompts")

# 4. PROCESS: Analyze performance
prompts_df = spark.read.format("delta").load("s3://prompt-vault/delta/prompts")
prompts_df.createOrReplaceTempView("prompts")

high_performers = spark.sql("""
    SELECT 
        prompt_id,
        prompt_text,
        category,
        tags,
        ai_model,
        performance_rating,
        success_rate,
        usage_count
    FROM prompts
    WHERE performance_rating >= 4.5
        AND success_rate >= 90.0
        AND usage_count >= 50
    ORDER BY performance_rating DESC, usage_count DESC
    LIMIT 100
""")

# 5. EXPORT: Save results
high_performers.write \\
    .format("delta") \\
    .mode("overwrite") \\
    .save("s3://prompt-vault/delta/top_prompts")

# 6. OPTIMIZE: Maintain table
delta_table = DeltaTable.forPath(spark, "s3://prompt-vault/delta/prompts")
delta_table.optimize().executeZOrderBy("performance_rating", "created_at")

print("Prompt Vault processing complete!")
print(f"Total prompts: {prompts_df.count()}")
print(f"High performers: {high_performers.count()}")`}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
    </>
  )
}

export default App
