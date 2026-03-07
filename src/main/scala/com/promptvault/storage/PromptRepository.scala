package com.promptvault.storage

import com.promptvault.model.Prompt
import org.apache.spark.sql.{Dataset, SparkSession}
import org.apache.spark.sql.functions._

/** Delta Lake-backed repository for [[Prompt]] records.
  *
  * @param spark     Active SparkSession.
  * @param tablePath Path to the Delta table (local path or cloud URI).
  */
class PromptRepository(spark: SparkSession, tablePath: String) {

  import spark.implicits._

  /** Write a batch of prompts to the Delta table (append). */
  def save(prompts: Seq[Prompt]): Unit = {
    val ds = spark.createDataset(prompts)
    ds.write
      .format("delta")
      .mode("append")
      .save(tablePath)
  }

  /** Read all prompts from the Delta table. */
  def findAll(): Dataset[Prompt] =
    spark.read.format("delta").load(tablePath).as[Prompt]

  /** Find prompts by tag (case-insensitive contains). */
  def findByTag(tag: String): Dataset[Prompt] =
    findAll().filter(array_contains(col("tags"), lit(tag)))

  /** Find prompts by model family. */
  def findByModelFamily(family: String): Dataset[Prompt] =
    findAll().filter(col("modelFamily") === family)

  /** Find the latest version of every distinct prompt name. */
  def latestVersions(): Dataset[Prompt] = {
    import org.apache.spark.sql.expressions.Window
    val w = Window.partitionBy("name").orderBy(col("version").desc)
    findAll()
      .withColumn("_rank", rank().over(w))
      .filter(col("_rank") === 1)
      .drop("_rank")
      .as[Prompt]
  }
}
