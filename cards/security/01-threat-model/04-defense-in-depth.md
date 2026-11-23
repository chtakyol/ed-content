---
id: security-defense-in-depth
topic: security/threat-model
title: Defense in depth and fail closed
tags: [threat-model, defense-in-depth, failure-modes]
related: [security-client-is-untrusted, security-masvs-profiles]
sources:
  - https://mas.owasp.org/MASVS/03-Using_the_MASVS/
---

## Explanation
No single control survives a determined attacker, so stack controls that cover different failure modes: TLS plus pinning, Keystore-backed encryption plus backup exclusion, biometric binding plus server-side step-up, Play Integrity signals plus server-side rules. Each layer should still be useful when the one in front of it is bypassed. Equally important is failing closed. A biometric error must deny the action, not fall back to a password prompt; a missing Play Integrity verdict must not be treated as "probably fine"; an unrecognized deep link must land on a safe screen instead of a privileged one. Fail-open defaults are how "hardening" becomes decoration.

## Code
```kotlin
suspend fun confirmTransfer(amount: Money): Result<Receipt> {
    val auth = biometrics.authenticate(cryptoObject)
    if (auth !is AuthResult.Success) {
        return Result.failure(AuthError.Denied) // never fall through
    }
    val verdict = integrity.check()
    if (verdict !is Verdict.PlayRecognized) {
        return Result.failure(AuthError.UntrustedDevice)
    }
    return api.transfer(amount, auth.token)
}
```
