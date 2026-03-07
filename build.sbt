name         := "prompt-vault"
organization := "com.promptvault"
version      := "0.1.0-SNAPSHOT"
scalaVersion := "2.13.14"

val sparkVersion = "3.5.3"
val deltaVersion = "3.2.1"

libraryDependencies ++= Seq(
  "org.apache.spark" %% "spark-core" % sparkVersion % Provided,
  "org.apache.spark" %% "spark-sql"  % sparkVersion % Provided,
  "io.delta"         %% "delta-spark" % deltaVersion
)

// allow running in local Spark mode during tests
Test / fork := true
Test / javaOptions += "-Dspark.master=local[*]"
