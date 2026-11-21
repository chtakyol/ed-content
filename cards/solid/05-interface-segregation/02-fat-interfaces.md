---
id: solid-fat-interfaces
topic: solid/isp
title: Fat interfaces
tags: [solid, isp, interfaces]
related: [solid-isp-definition, solid-role-interfaces]
sources:
  - https://martinfowler.com/bliki/RoleInterface.html
---

## Explanation
A fat interface is a broad contract that accumulates methods as different clients ask for features. Implementers end up with methods they cannot support, often throwing `UnsupportedOperationException` or returning empty values, and callers depend on methods outside their concern. In Kotlin, an interface with eight methods is a warning sign when most implementations only use two. The fix is to identify the clients and the subsets they actually call, then extract those subsets into role interfaces. Keep the original interface only if a client genuinely needs the whole set, and let implementations compose the smaller pieces.

## Code
```kotlin
// Fat: an image loader does not need to delete or rename.
interface FileStore {
    fun read(path: String): ByteArray
    fun write(path: String, bytes: ByteArray)
    fun delete(path: String)
    fun rename(old: String, new: String)
    fun list(): List<String>
}

// A read-only client only needs read.
interface FileReader { fun read(path: String): ByteArray }
```
