---
id: oop-god-objects
topic: oop/pitfalls
title: God objects
tags: [oop, pitfalls, design]
related: [solid-srp-definition, oop-anemic-vs-rich-models]
sources:
  - https://martinfowler.com/bliki/GodClass.html
---

## Explanation
A god object is a class that knows too much and does too much: it orchestrates the screen, validates input, calls the network, formats dates, and tracks analytics. It becomes the place every change touches, so it is hard to test, hard to review, and easy to break in unrelated ways. The usual cause is incremental convenience, because adding one more method is easier than introducing a collaborator. Split by reason to change rather than by line count: extract a state holder, a repository, a formatter, or an analytics wrapper, and let the original class coordinate them.

## Code
```kotlin
// Before: one class owns unrelated reasons to change.
class ArticleScreenManager { /* fetch, cache, format, analytics, render */ }

// After: each object has one job.
class ArticleViewModel(repository, formatter, analytics)
class ArticleRepository(api, dao)
class ArticleAnalytics(tracker)
```
