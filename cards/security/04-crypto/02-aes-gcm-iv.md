---
id: security-aes-gcm-iv
topic: security/crypto
title: AES-GCM and IV reuse
tags: [crypto, aes-gcm, iv, masvs-crypto-1, maswe-0007]
related: [security-keystore-key-generation, security-broken-algorithms, security-unencrypted-private-storage]
sources:
  - https://mas.owasp.org/MASTG/tests/android/MASVS-CRYPTO/MASTG-TEST-0309/
  - https://developer.android.com/privacy-and-security/cryptography
---

## Explanation
AES-GCM is the right choice for app data: authenticated, fast, and hardware accelerated. It is also unforgiving. Reusing an IV with the same key, even once, leaks the XOR of the plaintexts and destroys the authentication guarantee, which is why MASWE-0007 and MASTG-TEST-0309 exist. With Keystore keys and the default `setRandomizedEncryptionRequired(true)`, you must not supply an IV yourself on encrypt: initialize the cipher without one and read `cipher.iv` afterwards. Store the IV next to the ciphertext, since it is not secret. Never derive an IV from a counter you keep in prefs, never use a constant, and never use `AES` or `AES/CBC/PKCS5Padding` for new code.

## Code
```kotlin
fun seal(plain: ByteArray, key: SecretKey): ByteArray {
    val cipher = Cipher.getInstance("AES/GCM/NoPadding")
    cipher.init(Cipher.ENCRYPT_MODE, key)      // Keystore supplies the IV
    return cipher.iv + cipher.doFinal(plain)   // 12-byte IV || ciphertext
}

fun open(sealed: ByteArray, key: SecretKey): ByteArray {
    require(sealed.size > 12)
    val cipher = Cipher.getInstance("AES/GCM/NoPadding")
    cipher.init(
        Cipher.DECRYPT_MODE,
        key,
        GCMParameterSpec(128, sealed, 0, 12),
    )
    return cipher.doFinal(sealed, 12, sealed.size - 12)
}
```
