---
id: kotlin-trailing-lambdas
topic: kotlin/functions
title: Trailing lambdas
tags: [kotlin, lambdas, syntax]
related: [kotlin-higher-order-functions, kotlin-scope-functions]
sources:
  - https://kotlinlang.org/docs/lambdas.html#passing-trailing-lambdas
---

## Explanation
When the last parameter of a function is a lambda, Kotlin lets you move it outside the parentheses, which produces the familiar builder and event-handler syntax. If the lambda is the only argument, the parentheses disappear entirely. A lambda with one parameter receives it implicitly as `it`, but naming the parameter is clearer once the body grows or the meaning is not obvious. Android APIs such as click listeners, `withContext`, and Compose content slots rely on this convention, so reading trailing-lambda code is a core Kotlin skill.

## Code
```kotlin
button.setOnClickListener { view ->
    viewModel.onRefresh()
}

viewModelScope.launch {
    repository.refresh()
}
```
