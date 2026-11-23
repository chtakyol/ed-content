---
id: security-keys-not-in-app-package
topic: security/storage
title: Nothing secret ships in the APK
tags: [storage, secrets, buildconfig, masvs-storage-1, maswe-0004]
related: [security-unencrypted-private-storage, security-keystore-key-generation]
sources:
  - https://mas.owasp.org/MASWE/MASVS-STORAGE/MASWE-0004/
  - https://developer.android.com/privacy-and-security/security-best-practices
---

## Explanation
A key in `BuildConfig`, `strings.xml`, a Gradle property, or a native library is in the APK, and the APK is public. Moving it to `local.properties` or CI secrets only hides it from git, not from the artifact: the value is still compiled into the dex or resources. MASWE-0004 covers hardcoded secrets and MASTG-TEST-0212 looks for hardcoded cryptographic keys. The only durable answers are to keep the secret on a server and have the client request short-lived, scoped credentials, or to accept that the value is public and restrict it where it can be restricted, such as a maps or analytics key bound to your package name and signing certificate.

## Code
```kotlin
// Wrong: the value is in the APK no matter where the property lives.
buildConfigField("String", "API_KEY", "\"$apiKey\"")

// Right: exchange a user or device credential for a short-lived token.
class TokenRepository(private val api: AuthApi) {
    suspend fun token(): String =
        api.exchange(attestation = integrity.standardToken())
            .accessToken // minutes, not months
}
```
