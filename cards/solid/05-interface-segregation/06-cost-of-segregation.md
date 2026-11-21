---
id: solid-cost-of-segregation
topic: solid/isp
title: The cost of segregation
tags: [solid, isp, tradeoffs]
related: [solid-isp-definition, solid-over-engineering]
sources:
  - https://martinfowler.com/bliki/RoleInterface.html
---

## Explanation
Segregation has a cost: more interfaces, more constructor parameters, and more wiring. If a client truly uses the whole contract, splitting it creates ceremony without benefit. The principle is about clients, not about the number of methods, so start from the call sites and see which subsets are used. Two clients that always call the same five methods may be better served by one interface. A good rule is to split when a test double or an implementation is forced to stub unrelated methods, or when a new implementation cannot meaningfully support part of the contract. Otherwise, keep the interface cohesive and move on.

## Code
```kotlin
// Not worth splitting: every client uses both methods together.
interface SessionStore {
    fun read(): Session?
    fun write(session: Session)
}

// Worth splitting: a display client never writes.
interface SessionReader { fun read(): Session? }
interface SessionWriter { fun write(session: Session) }
```
