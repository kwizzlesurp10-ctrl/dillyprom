package com.promptvault.core

import java.sql.Timestamp

case class PromptId(value: String) // ULID or UUIDv7
case class PromptVersionId(value: String)

case class Prompt(
  id: PromptId,
  created_at: Timestamp,
  updated_at: Timestamp,
  owner_id: String,               // user/team/org
  name: String,                   // human-readable e.g. "Customer Support Tier 3"
  description: String,
  tags: Array[String],
  categories: Array[String],      // e.g. sales, support, codegen, reasoning
  family: String,                 // gpt-4o, claude-3.5, gemini-2.0, llama-4
  template: String,               // mustache/handlebars style with {{variable}}
  variables_schema: Map[String, String], // name → type/description
  default_model_params: Map[String, String]
)

case class PromptVersion(
  prompt_id: PromptId,
  version_id: PromptVersionId,
  version_number: Int,
  created_at: Timestamp,
  commit_message: String,
  template: String,               // frozen copy
  metadata: Map[String, String],
  performance_metrics: Option[Map[String, Double]] // optional at creation
)

case class PromptUsage(
  usage_id: String,
  prompt_version_id: PromptVersionId,
  timestamp: Timestamp,
  model: String,
  input_tokens: Long,
  output_tokens: Long,
  latency_ms: Double,
  success: Boolean,
  score: Option[Double],          // human/LLM judge 0-10
  cost_usd: Double
)
