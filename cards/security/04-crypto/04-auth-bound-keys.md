---
id: security-auth-bound-keys
topic: security/crypto
title: Bind keys to user authentication
tags: [crypto, keystore, biometric, masvs-auth-1, maswe-0020]
related: [security-keystore-key-generation, security-aes-gcm-iv]
sources:
  - https://mas.owasp.org/MASWE/MASVS-AUTH/MASWE-0020/
  - https://developer.android.com/privacy-and-security/keystore
---

## Explanation
A Keystore key can require the user to authenticate before every use, which turns "the app has a token" into "this person, on this device, just proved who they are". Set `setUserAuthenticationRequired(true)` and, on API 30+, `setUserAuthenticationParameters` with a zero timeout and `AUTH_BIOMETRIC_STRONG` so only a strong biometric releases the key and no fallback to the device PIN silently weakens it. Pair the key with `BiometricPrompt` and a `CryptoObject`, so success is cryptographically tied to the operation instead of a boolean the app could get wrong. Keep `setInvalidatedByBiometricEnrollment` at its default: a newly enrolled fingerprint should invalidate the key, which is MASWE-0022's whole point.

## Code
```kotlin
val spec = KeyGenParameterSpec.Builder(
    "payment_key",
    KeyProperties.PURPOSE_ENCRYPT or KeyProperties.PURPOSE_DECRYPT,
)
    .setBlockModes(KeyProperties.BLOCK_MODE_GCM)
    .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE)
    .setUserAuthenticationRequired(true)
    .setInvalidatedByBiometricEnrollment(true)
    .apply {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            setUserAuthenticationParameters(0, KeyProperties.AUTH_BIOMETRIC_STRONG)
        }
    }
    .build()

val cipher = Cipher.getInstance("AES/GCM/NoPadding").apply {
    init(Cipher.ENCRYPT_MODE, key) // then pass to BiometricPrompt
}
biometricPrompt.authenticate(promptInfo, CryptoObject(cipher))
```
