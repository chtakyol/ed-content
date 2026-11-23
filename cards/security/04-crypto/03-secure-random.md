---
id: security-secure-random
topic: security/crypto
title: Use SecureRandom, not Random
tags: [crypto, random, masvs-crypto-2, maswe-0012]
related: [security-aes-gcm-iv, security-broken-algorithms]
sources:
  - https://mas.owasp.org/MASWE/MASVS-CRYPTO/MASWE-0012/
  - https://mas.owasp.org/MASTG/best-practices/MASTG-BEST-0001/
---

## Explanation
`java.util.Random` and `Math.random()` are deterministic linear generators seeded from the clock, so an attacker who sees a few outputs can predict the rest. Anything security-relevant needs `SecureRandom`: salts, tokens, nonces, one-time codes, and identifiers used for authorization. MASWE-0012 covers improper random number generation and MASTG-TEST-0204 looks for the insecure APIs. Create one `SecureRandom` and reuse it; do not call `setSeed`, and prefer `nextBytes` over arithmetic on `nextInt`. `SecureRandom.getInstanceStrong()` can block on entropy and throw, which is a poor fit for UI paths, so the default `SecureRandom()` is usually the pragmatic and correct choice.

## Code
```kotlin
private val random = SecureRandom()

fun newToken(bytes: Int = 32): String =
    ByteArray(bytes)
        .also(random::nextBytes)
        .toHexString() // or Base64 with NO_WRAP

// Wrong: predictable, seeded from the clock
val weak = Random().nextInt(1_000_000)
```
