---
id: architecture-conflicts-and-retries
topic: architecture/offline
title: Conflicts and retries
tags: [offline, conflicts, retry]
related: [architecture-sync, architecture-write-path]
sources:
  - https://developer.android.com/topic/architecture/data-layer/offline-first
---

## Explanation
Offline writes can collide with remote changes, so the merge policy must be explicit: last write wins, server wins, or a field-level merge. The policy belongs in the repository or sync layer, never in the UI. Transient failures should be retried with backoff, while permanent failures should stop retrying and surface a sync error. Tracking a per-record sync state makes pending work visible and prevents completed writes from being replayed.

## Code
```kotlin
data class NoteEntity(
    val id: String,
    val body: String,
    val updatedAt: Long,
    val syncState: SyncState,
)

enum class SyncState { SYNCED, PENDING, FAILED }
```
