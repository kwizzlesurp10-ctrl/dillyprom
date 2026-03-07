package com.promptvault

import com.promptvault.model.Prompt
import org.apache.spark.sql.SparkSession
import org.scalatest.funsuite.AnyFunSuite
import org.scalatest.matchers.should.Matchers
import org.scalatest.BeforeAndAfterAll

class PromptVaultSuite extends AnyFunSuite with Matchers with BeforeAndAfterAll {

  private var spark: SparkSession = _

  override def beforeAll(): Unit = {
    spark = SparkSession
      .builder()
      .master("local[2]")
      .appName("PromptVaultTest")
      .config("spark.sql.shuffle.partitions", "4")
      .getOrCreate()
    spark.sparkContext.setLogLevel("ERROR")
  }

  override def afterAll(): Unit = {
    if (spark != null) spark.stop()
  }

  test("Prompt case class holds expected fields") {
    val p = Prompt(
      id           = "abc-123",
      name         = "summarise",
      content      = "Summarise the following: {{text}}",
      version      = 1,
      tags         = Seq("nlp", "summary"),
      modelFamily  = "gpt-4",
      useCase      = "summarization",
      successRate  = 0.92,
      avgTokens    = 512L,
      costEstimate = 0.002
    )

    p.id          shouldBe "abc-123"
    p.name        shouldBe "summarise"
    p.version     shouldBe 1
    p.tags        should contain("nlp")
    p.modelFamily shouldBe "gpt-4"
    p.successRate shouldBe 0.92
  }

  test("SparkSession is active") {
    spark.sql("SELECT 1 + 1 AS result").collect().head.getAs[Int]("result") shouldBe 2
  }

  test("Dataset round-trip for Prompt") {
    import spark.implicits._

    val prompts = Seq(
      Prompt("id-1", "p1", "content 1", 1, Seq("a"), "gpt-4", "chat", 0.9, 100L, 0.001),
      Prompt("id-2", "p2", "content 2", 2, Seq("b"), "llama-3", "code", 0.8, 200L, 0.002)
    )

    val ds = spark.createDataset(prompts)
    ds.count() shouldBe 2

    val families = ds.map(_.modelFamily).collect().toSet
    families should contain("gpt-4")
    families should contain("llama-3")
  }
}
