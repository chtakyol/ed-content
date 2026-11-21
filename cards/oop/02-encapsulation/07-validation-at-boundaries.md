---
id: oop-validation-at-boundaries
topic: oop/encapsulation
title: Validation at boundaries
tags: [oop, encapsulation, validation]
related: [oop-invariants, oop-constructors-and-validity]
sources:
  - https://developer.android.com/topic/architecture/data-layer
---

## Explanation
Validation belongs at the boundary where data enters the system, and the core should receive values it can trust. Parse and validate a network response or a form submission once, convert it into a domain type, and let the rest of the code rely on the invariants of that type. Scattering defensive checks through the ViewModel, repository, and UI duplicates rules and makes it unclear which layer is authoritative. This does not mean trusting external input: it means every external input passes through one place that either produces a valid model or a typed error.

## Code
```kotlin
@JvmInline
value class Email private constructor(val value: String) {
    companion object {
        fun parse(raw: String): Result<Email> =
            if ("@" in raw) Result.success(Email(raw.trim()))
            else Result.failure(IllegalArgumentException("invalid email"))
    }
}
```
