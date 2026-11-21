---
id: architecture-local-source
topic: architecture/offline
title: The local source as source of truth
tags: [offline, ssot, local]
related: [architecture-offline-first, architecture-read-path]
sources:
  - https://developer.android.com/topic/architecture/data-layer/offline-first
---

## Explanation
Making the local database the single source of truth means every read observes the database and every network result is written into it. The UI never consumes a network response directly, so it cannot show data that disappears on the next screen or after a restart. Writes also go through the database first, which gives the app a durable record even if the network call fails. Synchronization then becomes a background reconciliation between local and remote state.

## Code
```kotlin
override fun observeNotes(): Flow<List<Note>> =
    dao.observeAll()

override suspend fun refresh() {
    val remoteNotes = remote.fetchNotes()
    dao.upsertAll(remoteNotes.map(NoteDto::toEntity))
}
```
