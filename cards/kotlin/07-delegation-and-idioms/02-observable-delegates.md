---
id: kotlin-observable-delegates
topic: kotlin/idioms
title: Observable delegates
tags: [kotlin, delegation, observable]
related: [kotlin-by-lazy, kotlin-delegates-in-viewmodels]
sources:
  - https://kotlinlang.org/docs/delegated-properties.html#observable
---

## Explanation
`Delegates.observable` runs a callback after a property changes, while `Delegates.vetoable` can reject the change by returning false. They are useful for small pieces of state that must trigger a side effect, such as persisting a preference or invalidating a cache. The callback receives the old and new values, so it can react only when the value actually changes. For screen state, prefer an explicit `MutableStateFlow` or `MutableState`, because delegated observables are local to the object and do not compose with streams or lifecycle-aware collection.

## Code
```kotlin
var query: String by Delegates.observable("") { _, old, new ->
    if (old != new) onQueryChanged(new)
}

var page: Int by Delegates.vetoable(0) { _, _, new ->
    new >= 0
}
```
