---
id: architecture-intents
topic: architecture/components
title: Intents and component activation
tags: [android, intents, components]
related: [architecture-app-components, architecture-manifest]
sources:
  - https://developer.android.com/guide/components/fundamentals
---

## Explanation
An intent describes an operation to perform and lets the system decide which component handles it. Explicit intents name a specific component inside the app, while implicit intents declare an action and a data type that any app can satisfy. Because the system creates and routes components, an intent is also the mechanism for crossing process and app boundaries. Passing large objects through an intent is unsafe, so pass identifiers and reload the data from the data layer.

## Code
```kotlin
val intent = Intent(
    Intent.ACTION_VIEW,
    "https://developer.android.com".toUri(),
)
startActivity(intent)
```
