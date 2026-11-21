---
id: kotlin-strings-and-templates
topic: kotlin/basics
title: Strings and templates
tags: [kotlin, strings, formatting]
related: [kotlin-when-expressions, kotlin-scope-functions]
sources:
  - https://kotlinlang.org/docs/strings.html
---

## Explanation
Kotlin strings support interpolation with `$name` or `${expression}`, which keeps formatting readable and avoids manual concatenation. Triple-quoted strings preserve newlines and can be cleaned up with `trimIndent` or `trimMargin`, which is useful for multiline UI copy, SQL, and JSON fixtures. Interpolation calls `toString()` on the value, so nullable values need a fallback or a safe call to avoid printing the literal "null". For user-facing text in Android, prefer string resources with placeholders when localization matters.

## Code
```kotlin
val count = 3
val label = "$count unread ${if (count == 1) "message" else "messages"}"

val query = """
    SELECT * FROM articles
    WHERE read = 0
""".trimIndent()
```
