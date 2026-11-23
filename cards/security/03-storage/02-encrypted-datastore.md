---
id: security-encrypted-datastore
topic: security/storage
title: Encrypting DataStore values
tags: [storage, datastore, encryption, jetpack-security]
related: [security-unencrypted-private-storage, security-keystore-key-generation]
sources:
  - https://mas.owasp.org/MASTG/tests/android/MASVS-STORAGE/MASTG-TEST-0305/
  - https://developer.android.com/privacy-and-security/security-best-practices
---

## Explanation
DataStore is the modern replacement for SharedPreferences and is still plaintext on disk, which is why MASTG-TEST-0305 checks it for sensitive values. The old shortcut was `EncryptedSharedPreferences` and `EncryptedFile` from Jetpack Security, but that library is deprecated, so the durable pattern is a serializer that encrypts only the fields that matter with a Keystore key. Keep the encryption boundary at the serializer so callers keep using typed models and no screen has to remember to encrypt. Do not roll the same code in five places: one `CryptoManager`, one key alias, one format with a version byte so you can rotate later.

## Code
```kotlin
object SessionSerializer : Serializer<Session?> {
    override fun readFrom(input: InputStream): Session? =
        runCatching { crypto.decrypt(input.readBytes()) }
            .mapCatching { json.decodeFromString<Session>(it.decodeToString()) }
            .getOrNull() // corrupt or wrong key: treat as signed out

    override fun writeTo(t: Session?, output: OutputStream) {
        if (t == null) return
        output.write(crypto.encrypt(json.encodeToString(t).encodeToByteArray()))
    }
}

val store = DataStoreFactory.create(
    serializer = SessionSerializer,
    produceFile = { context.dataStoreFile("session.pb") },
)
```
