ThisBuild / organization := "com.promptvault"
ThisBuild / version      := "0.1.0-SNAPSHOT"
ThisBuild / scalaVersion := "2.13.15"

lazy val root = (project in file("."))
  .settings(
    name := "prompt-vault",

    // ── Dependencies ──────────────────────────────────────────────────────────
    libraryDependencies ++= Seq(
      // Apache Spark 4.x
      "org.apache.spark" %% "spark-sql"  % "4.0.0" % "provided",
      "org.apache.spark" %% "spark-core" % "4.0.0" % "provided",

      // Delta Lake 4.x (Spark 4 compatible)
      "io.delta" %% "delta-spark" % "4.0.0" % "provided",

      // Logging
      "org.slf4j"      % "slf4j-api"       % "2.0.16",
      "ch.qos.logback" % "logback-classic" % "1.5.15",

      // Testing
      "org.scalatest" %% "scalatest"       % "3.2.19" % Test,
      "org.apache.spark" %% "spark-sql"    % "4.0.0"  % Test,
      "io.delta"          %% "delta-spark" % "4.0.0"  % Test
    ),

    // ── Compiler settings ─────────────────────────────────────────────────────
    scalacOptions ++= Seq(
      "-encoding", "utf8",
      "-Xfatal-warnings",
      "-deprecation",
      "-feature",
      "-unchecked",
      "-Wunused:imports"
    ),

    // ── Test settings ─────────────────────────────────────────────────────────
    Test / fork              := true,
    Test / parallelExecution := false,
    Test / javaOptions ++= Seq(
      "-Xmx2g",
      "--add-opens=java.base/sun.nio.ch=ALL-UNNAMED"
    ),

    // ── Assembly settings ─────────────────────────────────────────────────────
    assembly / assemblyMergeStrategy := {
      case PathList("META-INF", xs @ _*) => MergeStrategy.discard
      case "reference.conf"              => MergeStrategy.concat
      case _                             => MergeStrategy.first
    }
  )
