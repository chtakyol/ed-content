---
id: kotlin-sam-conversions
topic: kotlin/android
title: SAM conversions
tags: [kotlin, android, java-interop]
related: [kotlin-java-interop-pitfalls, kotlin-trailing-lambdas]
sources:
  - https://kotlinlang.org/docs/java-interop.html#sam-conversions
---

## Explanation
A SAM conversion turns a lambda into an instance of a Java functional interface, which is why `setOnClickListener { ... }` works even though the parameter type is `View.OnClickListener`. Kotlin interfaces are not SAM-converted unless they are declared `fun interface`, so a Kotlin callback that should accept a lambda must opt in. SAM conversions are convenient at the boundary with Java and Android APIs, but for new Kotlin APIs a function type is usually simpler and easier to compose. When a lambda parameter is ambiguous, name the parameter or use an explicit object expression to make the target type clear.

## Code
```kotlin
button.setOnClickListener { view ->
    viewModel.onRefresh()
}

fun interface OnArticleClick {
    fun onClick(article: Article)
}

val click = OnArticleClick { article -> open(article) }
```
