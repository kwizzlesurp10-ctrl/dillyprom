package com.promptvault.storage

import org.apache.spark.sql.SparkSession

object PromptStorage {

  /** Base path for Delta table storage. Override via PROMPT_VAULT_BASE_PATH env var. */
  val basePath: String =
    sys.env.getOrElse("PROMPT_VAULT_BASE_PATH", "/delta/prompt_vault")

  val promptsTablePath: String        = s"$basePath/prompts"
  val promptVersionsTablePath: String = s"$basePath/prompt_versions"
  val promptUsagesTablePath: String   = s"$basePath/prompt_usages"

  /**
   * Creates the three core Delta tables if they do not already exist.
   *
   * Tables:
   *   - prompts           – primary prompt records, keyed on id; merge-on-read friendly
   *   - prompt_versions   – immutable version snapshots, composite key (prompt_id, version_id)
   *   - prompt_usages     – append-only telemetry, partitioned by date(timestamp)
   */
  def initTables(spark: SparkSession): Unit = {
    initPromptsTable(spark)
    initPromptVersionsTable(spark)
    initPromptUsagesTable(spark)
  }

  // ---------------------------------------------------------------------------
  // prompts
  // ---------------------------------------------------------------------------
  private def initPromptsTable(spark: SparkSession): Unit =
    spark.sql(
      s"""
         |CREATE TABLE IF NOT EXISTS delta.`$promptsTablePath` (
         |  id                   STRING        NOT NULL,
         |  created_at           TIMESTAMP     NOT NULL,
         |  updated_at           TIMESTAMP     NOT NULL,
         |  owner_id             STRING        NOT NULL,
         |  name                 STRING        NOT NULL,
         |  description          STRING        NOT NULL,
         |  tags                 ARRAY<STRING>,
         |  categories           ARRAY<STRING>,
         |  family               STRING        NOT NULL,
         |  template             STRING        NOT NULL,
         |  variables_schema     MAP<STRING, STRING>,
         |  default_model_params MAP<STRING, STRING>,
         |  extra                VARIANT
         |)
         |USING DELTA
         |TBLPROPERTIES (
         |  'delta.enableChangeDataFeed'        = 'true',
         |  'delta.minReaderVersion'            = '1',
         |  'delta.minWriterVersion'            = '2'
         |)
         |""".stripMargin
    )

  // ---------------------------------------------------------------------------
  // prompt_versions
  // ---------------------------------------------------------------------------
  private def initPromptVersionsTable(spark: SparkSession): Unit =
    spark.sql(
      s"""
         |CREATE TABLE IF NOT EXISTS delta.`$promptVersionsTablePath` (
         |  prompt_id           STRING    NOT NULL,
         |  version_id          STRING    NOT NULL,
         |  version_number      INT       NOT NULL,
         |  created_at          TIMESTAMP NOT NULL,
         |  commit_message      STRING    NOT NULL,
         |  template            STRING    NOT NULL,
         |  metadata            MAP<STRING, STRING>,
         |  performance_metrics MAP<STRING, DOUBLE>,
         |  extra               VARIANT
         |)
         |USING DELTA
         |TBLPROPERTIES (
         |  'delta.enableChangeDataFeed' = 'true',
         |  'delta.minReaderVersion'     = '1',
         |  'delta.minWriterVersion'     = '2'
         |)
         |""".stripMargin
    )

  // ---------------------------------------------------------------------------
  // prompt_usages  (append-only, partitioned by date)
  // ---------------------------------------------------------------------------
  private def initPromptUsagesTable(spark: SparkSession): Unit =
    spark.sql(
      s"""
         |CREATE TABLE IF NOT EXISTS delta.`$promptUsagesTablePath` (
         |  usage_id          STRING    NOT NULL,
         |  prompt_version_id STRING    NOT NULL,
         |  timestamp         TIMESTAMP NOT NULL,
         |  model             STRING    NOT NULL,
         |  input_tokens      BIGINT    NOT NULL,
         |  output_tokens     BIGINT    NOT NULL,
         |  latency_ms        DOUBLE    NOT NULL,
         |  success           BOOLEAN   NOT NULL,
         |  score             DOUBLE,
         |  cost_usd          DOUBLE    NOT NULL,
         |  extra             VARIANT
         |)
         |USING DELTA
         |PARTITIONED BY (date(timestamp))
         |TBLPROPERTIES (
         |  'delta.appendOnly'           = 'true',
         |  'delta.minReaderVersion'     = '1',
         |  'delta.minWriterVersion'     = '2'
         |)
         |""".stripMargin
    )
}
