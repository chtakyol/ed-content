---
id: architecture-sync
topic: architecture/offline
title: Syncing local and remote data
tags: [offline, sync, workmanager]
related: [architecture-write-path, architecture-conflicts-and-retries]
sources:
  - https://developer.android.com/topic/architecture/data-layer/offline-first
---

## Explanation
Synchronization reconciles local and remote state in the background, usually with WorkManager so it survives process death and respects constraints such as network availability. A sync job pulls remote changes, merges them into the database, and pushes pending local changes. It must be idempotent, because WorkManager can retry a partially completed run. The UI observes the database throughout and does not wait for the sync to finish.

## Code
```kotlin
class SyncWorker(
    context: Context,
    params: WorkerParameters,
    private val repository: NotesRepository,
) : CoroutineWorker(context, params) {
    override suspend fun doWork(): Result =
        runCatching { repository.sync() }
            .fold(
                onSuccess = { Result.success() },
                onFailure = { Result.retry() },
            )
}
```
