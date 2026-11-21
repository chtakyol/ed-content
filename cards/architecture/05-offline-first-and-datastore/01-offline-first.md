---
id: architecture-offline-first
topic: architecture/offline
title: Offline-first architecture
tags: [offline, architecture, local]
related: [architecture-local-source, architecture-sync]
sources:
  - https://developer.android.com/topic/architecture/data-layer/offline-first
---

## Explanation
An offline-first app treats the local store as the primary source and the network as an optional way to refresh it. Reads come from the database, writes go to the database first, and synchronization happens in the background. The user can open the app, see the last known data, and act without a connection, so failures become temporary sync problems rather than blank screens. This is a data-layer architecture decision, not a UI feature bolted on at the end.

## Code
```kotlin
class OfflineFirstNotesRepository(
    private val dao: NoteDao,
    private val remote: NotesApi,
) : NotesRepository {
    override fun observeNotes(): Flow<List<Note>> =
        dao.observeAll()
}
```
