---
id: kotlin-dsl-builders
topic: kotlin/idioms
title: DSL builders
tags: [kotlin, idioms, dsl]
related: [kotlin-trailing-lambdas, kotlin-scope-functions]
sources:
  - https://kotlinlang.org/docs/type-safe-builders.html
---

## Explanation
A Kotlin DSL combines receiver lambdas, builder functions, and `@DslMarker` to produce configuration code that reads like a small language. The builder exposes a mutable receiver, and nested builders are scoped so an inner block cannot accidentally configure the outer object. This pattern powers Gradle Kotlin DSL, Compose UI, navigation graphs, and many test fixtures. Keep DSLs shallow and document the entry point, because a DSL that mirrors every possible option becomes harder to learn than the plain API it wraps.

## Code
```kotlin
@DslMarker
annotation class ArticleDsl

@ArticleDsl
class ArticleBuilder {
    var title: String = ""
    fun tag(value: String) { /* ... */ }
    fun build(): Article = Article(title)
}

fun article(block: ArticleBuilder.() -> Unit): Article =
    ArticleBuilder().apply(block).build()
```
