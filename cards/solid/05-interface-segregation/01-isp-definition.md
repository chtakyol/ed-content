---
id: solid-isp-definition
topic: solid/isp
title: Interface segregation principle
tags: [solid, isp, interfaces]
related: [solid-fat-interfaces, solid-role-interfaces]
sources:
  - https://en.wikipedia.org/wiki/Interface_segregation_principle
---

## Explanation
The interface segregation principle says no client should be forced to depend on methods it does not use. A large interface that mixes reading, writing, syncing, and analytics forces every implementer to provide all of it and every caller to see all of it. Split the interface by role so each caller depends on the smallest contract it needs, which also makes test doubles smaller and implementations replaceable. This is not about making every method its own interface; group methods that are used together by the same client and change for the same reason.

## Code
```kotlin
// One fat interface forces every client to know everything.
interface ArticleStore {
    fun read(): List<Article>
    fun write(article: Article)
    fun sync()
    fun track(event: String)
}

// Segregated by role.
interface ArticleReader { fun read(): List<Article> }
interface ArticleWriter { fun write(article: Article) }
interface ArticleSyncer { fun sync() }
```
