---
id: security-unencrypted-private-storage
topic: security/storage
title: The app sandbox is not encrypted
tags: [storage, masvs-storage-1, maswe-0001, encryption]
related: [security-encrypted-datastore, security-keystore-key-generation, security-backup-exclusion]
sources:
  - https://mas.owasp.org/MASVS/controls/MASVS-STORAGE-1/
  - https://mas.owasp.org/MASTG/tests/android/MASVS-STORAGE/MASTG-TEST-0207/
---

## Explanation
Files under `/data/data/<package>/` are private to the app but not encrypted, and they are readable on a rooted device, through a debuggable build, or from an extracted backup. MASVS-STORAGE-1 requires sensitive data to be protected at rest, and MASWE-0001 is the unencrypted-sandbox failure that MASTG-TEST-0207, 0287, and 0305 look for. Do not rely on the OS to do this for you: DataStore and SharedPreferences write plaintext, and so does Room unless SQLCipher is added. Encrypt the sensitive fields or files with a key held in the Android Keystore, and keep non-sensitive state in plaintext so the app stays debuggable and fast.

## Code
```kotlin
// Encrypt with a Keystore key; store IV + ciphertext together.
fun encrypt(plain: ByteArray, key: SecretKey): ByteArray {
    val cipher = Cipher.getInstance("AES/GCM/NoPadding")
    cipher.init(Cipher.ENCRYPT_MODE, key) // Keystore picks the IV
    return cipher.iv + cipher.doFinal(plain)
}

fun decrypt(blob: ByteArray, key: SecretKey): ByteArray {
    val cipher = Cipher.getInstance("AES/GCM/NoPadding")
    val iv = blob.copyOfRange(0, 12)
    cipher.init(Cipher.DECRYPT_MODE, key, GCMParameterSpec(128, iv))
    return cipher.doFinal(blob, 12, blob.size - 12)
}
```
