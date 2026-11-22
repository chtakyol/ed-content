---
id: compose-custom-savers
topic: jetpack-compose/state
title: Custom Savers
tags: [compose, state, saved-state]
related: [compose-remember-saveable, compose-state-lifespans]
sources:
  - https://developer.android.com/develop/ui/compose/state-saving
---

## Explanation
When a type cannot be stored in a `Bundle` directly, provide a `Saver` that converts it to a supported representation and back. `listSaver` and `mapSaver` cover simple types, while a custom `Saver` handles more complex conversions. Pass the saver to `rememberSaveable`, along with any inputs that should reset the value. Keep the saved representation small and stable, and validate it when restoring, because saved state comes back from an older version of the app after an update.

## Code
```kotlin
data class Filters(val query: String, val category: String)

val FiltersSaver = listSaver<Filters, String>(
    save = { listOf(it.query, it.category) },
    restore = { Filters(it[0], it[1]) },
)

@Composable
fun FiltersState(): Filters {
    return rememberSaveable(saver = FiltersSaver) {
        Filters("", "all")
    }
}
```
