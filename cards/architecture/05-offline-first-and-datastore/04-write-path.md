---
id: architecture-write-path
topic: architecture/offline
title: The offline write path
tags: [offline, write, queue]
related: [architecture-read-path, architecture-sync]
sources:
  - https://developer.android.com/topic/architecture/data-layer/offline-first
---

## Explanation
In an offline-first write path, the app writes to the local store first and records that the change still needs to be sent. The write is therefore durable and immediately visible, even without a connection. A background worker later pushes pending changes and marks them synced. The repository owns this protocol; the UI calls one suspend function and does not manage queues, retries, or sync flags.

## Code
```kotlin
override suspend fun save(note: Note) {
    dao.upsert(note.toEntity(pendingSync = true))
    syncScheduler.enqueue()
}
```
