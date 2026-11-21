---
id: kotlin-operator-overloading
topic: kotlin/idioms
title: Operator overloading
tags: [kotlin, idioms, operators]
related: [kotlin-scope-functions, kotlin-dsl-builders]
sources:
  - https://kotlinlang.org/docs/operator-overloading.html
---

## Explanation
Kotlin lets a function with a fixed name and the `operator` modifier define behavior for operators such as `+`, `-`, `in`, `[]`, or `+=`. Overloading is most valuable for small value types where the operator has an obvious meaning, such as adding a `Duration` or merging two domain collections. It becomes harmful when the symbol hides work, mutates the receiver, or has a meaning that differs from the conventional one. In Android, operator overloading is common in Compose's `Modifier` API and in DSLs such as navigation graphs, where `+=` and `[]` read naturally.

## Code
```kotlin
data class Duration(val minutes: Int) {
    operator fun plus(other: Duration) =
        Duration(minutes + other.minutes)
}

val total = Duration(25) + Duration(5)   // 30 minutes
```
