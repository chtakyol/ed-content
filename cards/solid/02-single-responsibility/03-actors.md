---
id: solid-actors
topic: solid/srp
title: Actors
tags: [solid, srp, actors]
related: [solid-srp-definition, solid-god-classes]
sources:
  - https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html
---

## Explanation
An actor is the source of a requirement, such as the product team, the design team, the finance team, or an external API owner. The single responsibility principle is easier to apply when you name the actor behind each behavior instead of arguing about whether two methods feel related. Two methods that look similar but serve different actors should usually live apart, because their changes are driven by different schedules and priorities. Two methods that look unrelated but always change together for the same actor can stay together. This keeps the boundary grounded in the organization, not in personal taste.

## Code
```kotlin
// Same actor: both exist to satisfy the reading experience.
class ArticlePresenter(private val formatter: DateFormatter) {
    fun title(article: Article) = article.title
    fun subtitle(article: Article) = formatter.relative(article.publishedAt)
}
```
