---
id: security-broken-algorithms
topic: security/crypto
title: Broken algorithms and defaults
tags: [crypto, aes, ecb, hashing, masvs-crypto-1, maswe-0008]
related: [security-aes-gcm-iv, security-secure-random, security-keystore-key-generation]
sources:
  - https://mas.owasp.org/MASTG/tests/android/MASVS-CRYPTO/MASTG-TEST-0221/
  - https://mas.owasp.org/MASTG/best-practices/MASTG-BEST-0009/
---

## Explanation
Most crypto bugs in apps are defaults, not exotic attacks. `Cipher.getInstance("AES")` silently gives you ECB, which encrypts identical blocks identically and leaves structure visible; `AES/CBC` without a MAC is malleable; MD5 and SHA-1 are unsuitable for signatures and password storage; DES and 3DES are obsolete. MASWE-0007 and 0008 cover improper encryption and hashing, and MASTG-TEST-0221 and 0232 look for the broken modes. Pick algorithms through the platform's vetted providers, name the full transformation every time, use Argon2id or bcrypt server-side for passwords rather than any fast hash, and let the Keystore generate keys instead of deriving them from a password with a single SHA-256 call.

## Code
```kotlin
// Wrong
Cipher.getInstance("AES")
Cipher.getInstance("AES/CBC/PKCS5Padding")
MessageDigest.getInstance("MD5")

// Right
Cipher.getInstance("AES/GCM/NoPadding")
Mac.getInstance("HmacSHA256")
Signature.getInstance("SHA256withECDSA")
SecureRandom() // never a hash of the package name as a key
```
