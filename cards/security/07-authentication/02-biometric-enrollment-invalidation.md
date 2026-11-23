---
id: security-biometric-enrollment-invalidation
topic: security/authentication
title: Invalidate keys when biometrics change
tags: [auth, biometric, keystore, masvs-auth-1, maswe-0022]
related: [security-auth-bound-keys, security-biometric-prompt]
sources:
  - https://mas.owasp.org/MASWE/MASVS-AUTH/MASWE-0022/
  - https://mas.owasp.org/MASTG/tests/android/MASVS-AUTH/MASTG-TEST-0328/
---

## Explanation
A biometric-bound key is only as trustworthy as the enrollment set behind it. If someone with your unlocked phone adds their fingerprint, a key that survives that change now unlocks for them. MASWE-0022 is exactly this, and the platform handles it if you leave `setInvalidatedByBiometricEnrollment(true)` alone: enrolling a new biometric permanently invalidates keys created with it. Your job is to catch `KeyPermanentlyInvalidatedException` and treat it as "signed out", not as a crash or an invitation to fall back to a stored PIN. The same applies after a device restore or a lock-screen removal, so the recovery path has to be a real re-authentication against the server, capped to the account, not a silent key regeneration.

## Code
```kotlin
fun authorizePayment(): ByteArray? = try {
    encryptWith(strongBiometricKey(), payload)
} catch (e: KeyPermanentlyInvalidatedException) {
    // New fingerprint, restored device, or lock removed.
    sessionRepository.forceReauth() // server-issued challenge
    null
} catch (e: UserNotAuthenticatedException) {
    promptBiometric() // no silent downgrade
}
```
