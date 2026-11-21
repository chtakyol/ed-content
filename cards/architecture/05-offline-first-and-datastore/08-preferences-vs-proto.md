---
id: architecture-preferences-vs-proto
topic: architecture/offline
title: Preferences vs Proto DataStore
tags: [storage, datastore, proto]
related: [architecture-datastore, architecture-data-layer]
sources:
  - https://developer.android.com/topic/libraries/architecture/datastore
---

## Explanation
Preferences DataStore stores untyped key-value pairs, which is convenient for a handful of flags and needs no schema. Proto DataStore stores a typed object generated from a `.proto` schema, giving compile-time safety, defaults, and a versionable format at the cost of code generation and schema management. Choose Preferences for simple settings and Proto when the settings form a coherent object that will evolve, because Proto makes additions and migrations explicit.

## Code
```kotlin
// Preferences: untyped keys.
val THEME = stringPreferencesKey("theme")

// Proto: a typed message generated from settings.proto.
val settings = context.settingsDataStore.data.first()
val dark = settings.theme == Theme.DARK
```
