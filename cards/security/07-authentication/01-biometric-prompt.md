---
id: security-biometric-prompt
topic: security/authentication
title: Biometrics must authorize a key, not a boolean
tags: [auth, biometric, cryptoobject, masvs-auth-1, maswe-0020]
related: [security-auth-bound-keys, security-biometric-enrollment-invalidation, security-step-up-auth]
sources:
  - https://mas.owasp.org/MASWE/MASVS-AUTH/MASWE-0020/
  - https://mas.owasp.org/MASTG/tests/android/MASVS-AUTH/MASTG-TEST-0018/
---

## Explanation
The weakest biometric integration asks the user for a fingerprint and then trusts a callback to unlock a feature. That boolean can be bypassed by hooking the callback, and it proves nothing about the hardware. MASWE-0020 is local authentication that can be bypassed, and MASTG-TEST-0018 verifies the real thing. Use `BiometricPrompt` with a `CryptoObject` built from a Keystore key that has `setUserAuthenticationRequired(true)`: the cipher can only complete after the biometric succeeds, so a patched callback still has no usable key. Pass `setAllowedAuthenticators(BIOMETRIC_STRONG)` so a weak face unlock cannot satisfy a payment, and handle the failure path by denying the action rather than offering another route.

## Code
```kotlin
val cipher = Cipher.getInstance("AES/GCM/NoPadding").apply {
    init(Cipher.ENCRYPT_MODE, authBoundKey())
}

val prompt = BiometricPrompt(activity, executor, object : BiometricPrompt.AuthenticationCallback() {
    override fun onAuthenticationSucceeded(result: BiometricPrompt.AuthenticationResult) {
        val authorized = result.cryptoObject?.cipher // key released only now
            ?: return deny()
        approve(authorized)
    }
    override fun onAuthenticationError(code: Int, msg: CharSequence) = deny()
})

prompt.authenticate(
    BiometricPrompt.PromptInfo.Builder()
        .setTitle("Confirm payment")
        .setAllowedAuthenticators(BiometricManager.Authenticators.BIOMETRIC_STRONG)
        .setNegativeButtonText("Cancel")
        .build(),
    BiometricPrompt.CryptoObject(cipher),
)
```
