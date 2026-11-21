---
id: oop-factories
topic: oop/object-design
title: Factories
tags: [oop, factories, creation]
related: [oop-constructors-and-validity, oop-singletons]
sources:
  - https://refactoring.guru/design-patterns/factory-method
---

## Explanation
A factory is a function or object whose job is to create instances, which is useful when construction involves validation, defaults, or choosing a subtype. In Kotlin a companion function such as `Article.fromDto(dto)` is often enough, and it keeps the constructor private so callers cannot bypass the rules. Factories also give expected failures a typed result instead of an exception, for example `ArticleId.parse(raw): Result<ArticleId>`. Avoid a factory that only calls a public constructor with the same arguments; it adds indirection without protecting anything.

## Code
```kotlin
class Article private constructor(
    val id: ArticleId,
    val title: String,
) {
    companion object {
        fun fromDto(dto: ArticleDto): Article? {
            val title = dto.title?.trim().orEmpty()
            if (title.isEmpty()) return null
            return Article(ArticleId(dto.id), title)
        }
    }
}
```
