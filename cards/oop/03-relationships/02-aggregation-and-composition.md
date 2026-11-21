---
id: oop-aggregation-and-composition
topic: oop/relationships
title: Aggregation and composition
tags: [oop, relationships, composition]
related: [oop-association, oop-composition-over-inheritance]
sources:
  - https://refactoring.guru/design-patterns/uml
---

## Explanation
Aggregation and composition both describe a whole-part relationship, but they differ in ownership. In aggregation, the whole uses parts that can exist independently, such as a playlist referencing songs that also exist in a library. In composition, the whole owns its parts and is responsible for their lifecycle, such as a screen owning its UI state or a document owning its paragraphs. The distinction affects deletion and lifetime rules, not just diagrams. In Android, a ViewModel owning its state and a repository owning a cache are composition-like, while an adapter receiving a list from the screen is closer to aggregation.

## Code
```kotlin
// Composition: the cache belongs to the repository.
class ArticleRepository {
    private val cache = ArticleCache()
}

// Aggregation: the playlist does not own its songs.
class Playlist(private val songs: List<Song>)
```
