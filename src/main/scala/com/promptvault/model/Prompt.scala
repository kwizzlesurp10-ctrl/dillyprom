package com.promptvault.model

import java.time.Instant

/** Represents a single versioned prompt stored in Prompt Vault.
  *
  * @param id            Unique identifier (UUID).
  * @param name          Human-readable name.
  * @param content       The raw prompt text (may contain `{{placeholder}}` tokens).
  * @param version       Monotonically increasing version counter.
  * @param tags          Free-form classification tags.
  * @param modelFamily   Target model family (e.g. "gpt-4", "llama-3").
  * @param useCase       Use-case category (e.g. "summarization", "code-gen").
  * @param successRate   Observed success rate in [0, 1].
  * @param avgTokens     Average token count across executions.
  * @param costEstimate  Estimated USD cost per call.
  * @param createdAt     Creation timestamp (epoch millis).
  * @param updatedAt     Last-updated timestamp (epoch millis).
  */
final case class Prompt(
    id: String,
    name: String,
    content: String,
    version: Int,
    tags: Seq[String],
    modelFamily: String,
    useCase: String,
    successRate: Double,
    avgTokens: Long,
    costEstimate: Double,
    createdAt: Long = Instant.now().toEpochMilli,
    updatedAt: Long = Instant.now().toEpochMilli
)
