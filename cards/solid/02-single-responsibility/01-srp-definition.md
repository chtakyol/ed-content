---
id: solid-srp-definition
topic: solid/srp
title: Single responsibility principle
tags: [solid, srp, responsibility]
related: [solid-reasons-to-change, solid-actors]
sources:
  - https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html
---

## Explanation
The single responsibility principle says a module should have one reason to change, where a reason is a group of stakeholders or an actor who could request that change. It is not about counting methods or limiting a class to a few lines; a class can be large and still have one responsibility. The test is whether unrelated changes keep landing in the same file. A ViewModel that formats text, validates input, and decides analytics events has several reasons to change even if it is short. Split by the source of the request, not by the mechanics of the code.

## Code
```kotlin
// Several reasons to change: layout, validation, analytics.
class ArticleViewModel : ViewModel() {
    fun onShare(article: Article) {
        analytics.track("share")
        if (article.title.isBlank()) return
        shareSheet.open(article.title)
    }
}

// One responsibility per collaborator.
class ShareArticle(
    private val analytics: Analytics,
    private val shareSheet: ShareSheet,
) {
    fun share(article: Article) { /* ... */ }
}
```
