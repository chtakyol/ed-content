---
id: solid-extension-over-modification
topic: solid/ocp
title: Extension over modification
tags: [solid, ocp, design]
related: [solid-ocp-definition, solid-strategy-pattern]
sources:
  - https://refactoring.guru/design-patterns/strategy
---

## Explanation
Extending a design means adding a new type or value that satisfies an existing contract, while modifying means changing tested code and risking its current callers. Extension works best when the contract is stable and the variation is expected: a new export format, a new payment provider, a new sync policy. Modification is still necessary when the contract itself must change, and pretending otherwise produces awkward adapter layers. The practical question is whether the new behavior can be expressed as another implementation of an existing role. If yes, prefer that; if no, change the contract deliberately and update its callers.

## Code
```kotlin
interface SyncPolicy {
    fun shouldSync(lastSync: Long, now: Long): Boolean
}

class IntervalPolicy(private val interval: Long) : SyncPolicy {
    override fun shouldSync(lastSync: Long, now: Long) = now - lastSync >= interval
}

class ManualPolicy : SyncPolicy {
    override fun shouldSync(lastSync: Long, now: Long) = false
}
```
