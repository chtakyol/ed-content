---
id: solid-reasons-to-change
topic: solid/srp
title: Reasons to change
tags: [solid, srp, change]
related: [solid-srp-definition, solid-actors]
sources:
  - https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html
---

## Explanation
A reason to change is a person or group who can ask for a modification: product wants a new empty state, design wants different spacing, the backend team changes a field name, and legal wants a consent notice. If one class must be edited for all of those requests, it has several responsibilities even when the code looks cohesive. Mapping reasons to change is more useful than mapping code to layers, because it exposes the real coupling. When a class has one reason to change, a change request has a predictable blast radius, and code review can focus on the people affected by it.

## Code
```kotlin
// Product changes copy, design changes layout, backend changes parsing:
// three different owners in one class.
class ArticleBinder {
    fun bind(view: View, dto: ArticleDto) {
        view.title.text = dto.title ?: "Untitled"
        view.setPadding(16, 16, 16, 16)
    }
}
```
