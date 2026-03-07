# Prompt Vault — Scalable AI Prompt Management with Apache Spark

**Prompt Vault** is a production-grade, distributed prompt management and prompt engineering platform built on Apache Spark and Delta Lake. It provides a scalable foundation for storing, versioning, searching, rating, A/B testing, and serving millions of LLM prompts together with rich metadata — including tags, performance metrics, template placeholders, associated model families, use-case categories, success rates, average token counts, and cost estimates. The system is designed to survive at scale, leveraging Spark 4.x for distributed compute, Delta Lake 4.x for ACID-compliant storage, and Parquet+VARIANT for semi-structured prompt payloads.

## Tech Stack

| Layer | Technology |
|---|---|
| Language | Scala 2.13.15 |
| Distributed compute | Apache Spark 4.0.x |
| Storage | Delta Lake 4.0.x (ACID, time-travel, schema evolution) |
| File format | Parquet + VARIANT (semi-structured payloads) |
| Build tool | sbt 1.10.x |
| CI | GitHub Actions (sbt test + scalafmt) |
| Testing | ScalaTest 3.2.x |

## Goals

- **Store & version** millions of prompts with full history via Delta Lake time-travel.
- **Search & filter** by tag, model family, use-case, and success metrics.
- **Template engine** — prompts with `{{placeholder}}` tokens rendered at query time.
- **A/B testing** — track variant performance (success rate, token cost, latency).
- **Serve at scale** — low-latency reads via caching layers; batch scoring via Spark jobs.
- **Extensible** — Spark Connect API layer planned for external client access.
- **Summarization & classification** — built-in use-case categories including summarization, code-gen, and more.

## Project Structure

```
prompt-vault/
├── build.sbt                          # sbt build definition
├── project/
│   ├── build.properties               # sbt version pin
│   └── plugins.sbt                    # scalafmt, sbt-assembly
├── src/
│   ├── main/
│   │   ├── resources/
│   │   │   └── application.conf
│   │   └── scala/com/promptvault/
│   │       ├── PromptVaultApp.scala   # Main entry point
│   │       ├── model/Prompt.scala     # Core data model
│   │       └── storage/
│   │           └── PromptRepository.scala
│   └── test/
│       └── scala/com/promptvault/
│           └── PromptVaultSuite.scala
└── .github/workflows/ci.yml
```

## Quick Start

```bash
# Run tests
sbt test

# Format code
sbt scalafmtAll

# Build fat JAR
sbt assembly
```

---

> **Work in progress — being built by autonomous agent.**
