package com.promptvault

import org.apache.spark.sql.SparkSession

/** Entry point for the Prompt Vault application. */
object PromptVaultApp {

  def main(args: Array[String]): Unit = {
    val spark = SparkSession
      .builder()
      .appName("PromptVault")
      .config("spark.sql.extensions", "io.delta.sql.DeltaSparkSessionExtension")
      .config(
        "spark.sql.catalog.spark_catalog",
        "org.apache.spark.sql.delta.catalog.DeltaCatalog"
      )
      .getOrCreate()

    spark.sparkContext.setLogLevel("WARN")

    println("Prompt Vault — initialised successfully.")
    spark.stop()
  }
}
