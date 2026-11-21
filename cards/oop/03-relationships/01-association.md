---
id: oop-association
topic: oop/relationships
title: Association
tags: [oop, relationships, design]
related: [oop-aggregation-and-composition, oop-dependency]
sources:
  - https://refactoring.guru/design-patterns/uml
---

## Explanation
Association is a general relationship where one object knows about another and may call it. In Kotlin it usually appears as a constructor parameter or a property, such as a `ViewModel` holding a repository or an `Article` holding an `Author`. Association does not say who owns whom or how long the relationship lasts, so it is the loosest of the object relationships. Keep associations directed and minimal: an object that knows about many unrelated collaborators is harder to test and often a sign that responsibilities should be split. In Android, a ViewModel should associate with a repository, not with an Activity.

## Code
```kotlin
class Article(
    val title: String,
    val author: Author,
)

class ArticleViewModel(
    private val repository: ArticleRepository,
) : ViewModel()
```
