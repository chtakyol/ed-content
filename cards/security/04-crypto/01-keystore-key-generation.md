---
id: security-keystore-key-generation
topic: security/crypto
title: Generate keys in the Keystore
tags: [crypto, keystore, key-generation, masvs-crypto-1, maswe-0013]
related: [security-aes-gcm-iv, security-auth-bound-keys, security-unencrypted-private-storage]
sources:
  - https://mas.owasp.org/MASWE/MASVS-CRYPTO/MASWE-0013/
  - https://developer.android.com/privacy-and-security/keystore
---

## Explanation
The Android Keystore generates and stores key material outside your process, backed by the TEE or StrongBox where the hardware allows it, so the raw key never enters app memory and cannot be extracted from a backup or a rooted filesystem. MASWE-0003 is keys stored outside the platform keystore and MASWE-0013 is improper key generation. Generate the key once with `KeyGenParameterSpec`, declaring exactly the purposes, block mode, and padding you need, then reference it by alias forever after. Keep the spec minimal: a key that can encrypt and decrypt is fine, a key that can also sign is a key you did not need. Handle the case where the key was invalidated or the user restored to a new device.

## Code
```kotlin
private const val ALIAS = "session_key"

fun sessionKey(): SecretKey {
    val store = KeyStore.getInstance("AndroidKeyStore").apply { load(null) }
    (store.getEntry(ALIAS, null) as? KeyStore.SecretKeyEntry)
        ?.let { return it.secretKey }

    val spec = KeyGenParameterSpec.Builder(
        ALIAS,
        KeyProperties.PURPOSE_ENCRYPT or KeyProperties.PURPOSE_DECRYPT,
    )
        .setBlockModes(KeyProperties.BLOCK_MODE_GCM)
        .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE)
        .setKeySize(256)
        .setRandomizedEncryptionRequired(true) // default; forces a fresh IV
        .build()

    return KeyGenerator
        .getInstance(KeyProperties.KEY_ALGORITHM_AES, "AndroidKeyStore")
        .apply { init(spec) }
        .generateKey()
}
```
