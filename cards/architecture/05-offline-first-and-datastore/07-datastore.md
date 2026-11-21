---
id: architecture-datastore
topic: architecture/offline
title: DataStore
tags: [storage, datastore, flow]
related: [architecture-preferences-vs-proto, architecture-data-layer]
sources:
  - https://developer.android.com/topic/libraries/architecture/datastore
---

## Explanation
DataStore is the recommended replacement for `SharedPreferences` for small amounts of data. It stores values asynchronously, exposes them as a `Flow`, and guarantees that reads see a consistent snapshot while writes are serialized. It avoids the main-thread disk access and inconsistent multi-process behavior of `SharedPreferences`. Use it for preferences and small typed state, not for large collections or queries, which belong in Room.

## Code
```kotlin
val Context.dataStore by preferencesDataStore(name = "settings")

class SettingsRepository(private val context: Context) {
    val theme: Flow<String> = context.dataStore.data
        .map { it[THEME] ?: "system" }
}
```
