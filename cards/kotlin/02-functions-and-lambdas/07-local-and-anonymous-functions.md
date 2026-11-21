---
id: kotlin-local-and-anonymous-functions
topic: kotlin/functions
title: Local and anonymous functions
tags: [kotlin, functions, scope]
related: [kotlin-functions, kotlin-trailing-lambdas]
sources:
  - https://kotlinlang.org/docs/functions.html#local-functions
---

## Explanation
A local function is declared inside another function and can use its parameters and locals, which keeps a helper close to its only caller without adding a private member. An anonymous function is a function expression with a block body, useful when a lambda would need an explicit return type or a `return` that targets the function itself. Both are tools for keeping logic readable; if the helper grows or is reused, promote it to a private member or a top-level function. In Android validation code, a local function often replaces a long lambda with nested conditionals.

## Code
```kotlin
fun validate(form: Form): List<String> {
    fun requireNonBlank(value: String, label: String): String? =
        value.ifBlank { "$label is required" }

    return listOfNotNull(
        requireNonBlank(form.email, "Email"),
        requireNonBlank(form.name, "Name"),
    )
}
```
