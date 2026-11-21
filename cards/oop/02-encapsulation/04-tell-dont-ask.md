---
id: oop-tell-dont-ask
topic: oop/encapsulation
title: Tell, don't ask
tags: [oop, encapsulation, design]
related: [oop-invariants, oop-anemic-vs-rich-models]
sources:
  - https://martinfowler.com/bliki/TellDontAsk.html
---

## Explanation
"Tell, don't ask" means a caller should request an outcome from an object instead of pulling out its data, deciding what to do, and pushing the result back. Asking breaks encapsulation because the caller now depends on the object's representation, and every caller that performs the same check duplicates the rule. When the behavior lives on the object, there is one place to keep the invariant correct. This does not mean hiding every piece of data: reading immutable values for rendering is fine, but state transitions and validation should be operations the owner performs.

## Code
```kotlin
// Ask: the caller controls validity.
if (account.balance >= amount) {
    account.balance -= amount
}

// Tell: the account enforces the rule.
class Account(private var balance: Int) {
    fun withdraw(amount: Int): Boolean {
        if (amount <= 0 || amount > balance) return false
        balance -= amount
        return true
    }
}
```
